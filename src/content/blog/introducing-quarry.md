---
title: "Introducing Quarry: Type-Safe ClickHouse Queries for TypeScript"
path: /introducing-quarry/
date: 2026-09-14
tags: ["Engineering", "TypeScript", "ClickHouse", "Open Source"]
description: "A ClickHouse-native query builder heavily inspired by Kysely, with composable queries and inferred results on top of the official client."
---

I've been building [Quarry](https://github.com/oorestisime/quarry), an open-source, ClickHouse-native query builder for TypeScript. We're using it at [Bold.org](https://bold.org/) in application services and data-processing jobs.

I wanted schema-aware query composition while keeping `@clickhouse/client` and direct control over the SQL.

The problem isn't writing SQL. It's maintaining queries whose structure varies with application inputs, sharing aggregations across call sites, and keeping manually declared result types aligned with projections. That's what I wanted Quarry to handle.

## Heavily inspired by Kysely

Quarry is heavily inspired by [Kysely](https://kysely.dev/), which we already use for PostgreSQL at Bold. I like its immutable builders, schema-derived types, and API that stays close to SQL. I wanted that experience for ClickHouse.

I considered using a ClickHouse dialect for Kysely. The mismatch was in the query API, not connectivity: I wanted `FINAL`, `PREWHERE`, `ARRAY JOIN` and ClickHouse aggregates to have first-class typed support. A dialect alone doesn't add that surface to Kysely's builder. Raw SQL and extensions remain viable, but I chose a dedicated builder rather than making them the primary interface for ClickHouse-specific queries.

For this project, I was happy to give up database portability and focus on ClickHouse's syntax and result semantics.

## ClickHouse-native composition

For example, a top-pages query over a MergeTree-backed analytics table, using a schema-typed `db`:

```ts
let query = db
  .selectFrom("page_views")
  .select("device_type", "path")
  .selectExpr((eb) => [
    eb.fn.count().as("views"),
    eb.fn.quantile(0.95, "load_time_ms").as("load_time_p95"),
  ])
  .prewhere("site_id", "=", siteId)
  .groupBy("device_type", "path");

if (country) {
  query = query.where("country", "=", country);
}

const pages = await query
  .orderBy("views", "desc")
  .orderBy("path", "asc")
  .limitBy(3, "device_type")
  .execute();
```

This is the API I was after: ClickHouse clauses and aggregates compose with application filters, and the result type follows the query.

I also wanted adoption to work one query at a time. Existing SQL can stay on the official client, and `.toSQL()` exposes SQL and parameter bindings for inspection or integration with handwritten statements.

## Types at the driver boundary

One detail I care about is that the inferred types match what the driver actually returns. In the example, `views` is a `string`: `count()` returns `UInt64`, serialized as a JSON string. `load_time_p95` is a `number`.

Quarry's typed execution pins the JSON serialization settings its result types depend on and rejects conflicting overrides. Schema types can distinguish read, insert and predicate values. The checks are still compile-time: a stale schema or an incorrect type annotation on a raw expression can invalidate the inferred result.

## Try it on one query

The [introspection CLI](https://ch-quarry.vercel.app/docs/guides/introspection) generates TypeScript definitions from existing tables, views and dictionaries for use with `createClickHouseDB<DB>({ client })`. It is experimental and ships separately as `@oorestisime/quarry-cli`. Handwritten interfaces work too; there's no schema DSL or migration system to adopt.

Quarry is at **0.10.0**, and minor releases may still change the API.

The [documentation](https://ch-quarry.vercel.app/docs/guides/getting-started) includes a runnable example, and the [playground](https://ch-quarry.vercel.app/playground) lets you inspect generated SQL without a database. If you're composing ClickHouse queries in TypeScript, try it on one of the queries you already maintain.

I'm especially interested in examples where the builder falls short or infers the wrong type. [Bring one to the issue tracker](https://github.com/oorestisime/quarry/issues/new?template=query.yml). I'd rather shape the next release around real queries than a generic SQL feature checklist.
