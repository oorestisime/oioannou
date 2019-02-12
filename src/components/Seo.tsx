import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

interface SeoType {
  title?: string
  slug?: string
  description?: string
  image?: string
  lang?: string
}

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
      }
    }
    avatar: file(relativePath: { eq: "me.png" }) {
      childImageSharp {
        fixed(width: 190, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const SEO: React.SFC<SeoType> = ({ title, description, slug, lang = "en" }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const {
          site: { siteMetadata },
          avatar,
        } = data
        const metaDescription = description || siteMetadata.description
        const url = `${siteMetadata.siteUrl}${slug}`
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: `${siteMetadata.title}`,
                })}
            meta={[
              {
                name: "description",
                content: description,
              },
              {
                property: "og:url",
                content: url,
              },
              {
                property: "og:title",
                content: title || siteMetadata.title,
              },
              {
                name: "og:description",
                content: metaDescription,
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:title",
                content: title || siteMetadata.title,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
              {
                property: "og:image",
                content: avatar.childImageSharp.fixed.src,
              },
              {
                name: "twitter:image",
                content: avatar.childImageSharp.fixed.src,
              },
            ]}
          />
        )
      }}
    />
  )
}

export default SEO
