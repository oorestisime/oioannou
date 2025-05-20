import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { Tag } from "./tag"

interface PostContentProps {
  title: string
  date: string
  content: string
  tags?: string[]
  className?: string
}

export function PostContent({
  title,
  date,
  content,
  tags = [],
  className,
}: PostContentProps) {
  const formattedDate = format(new Date(date), "MMMM d, yyyy")

  return (
    <article className={cn("max-w-none", className)}>
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={date}>{formattedDate}</time>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className="prose dark:prose-invert mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
