/**
  * Configure your Gatsby site with this file.
  *
  * See: https://www.gatsbyjs.com/docs/gatsby-config/
  */

const siteUrl = process.env.URL || "https://www.matthewjurenka.com"

module.exports = {
    siteMetadata: {
        siteUrl: "https://www.matthewjurenka.com",
    },
    /* Your site config here */
    plugins: [
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    "Josefin Sans",
                    "Crimson Text"
                ],
            },
        },
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                query: `
                    {
                        allSitePage(filter: {
                            path: {glob: "!/visualizations/*_renderer/"}
                        }) {
                            nodes {
                                path
                            }
                        }
                    }
                `,
                resolveSiteUrl: () => siteUrl,
                resolvePages: ({
                    allSitePage: { nodes: allPages },
                }) => {
                    return allPages.map(page => {
                        return { ...page }
                    })
                },
                serialize: ({ path, modifiedGmt }) => {
                    return {
                        url: path,
                        lastmod: modifiedGmt,
                    }
                },
            },
        },
        "gatsby-plugin-material-ui",
        "gatsby-plugin-emotion",
        "gatsby-plugin-use-query-params",
	"gatsby-plugin-styled-components",
	"styled-components",
	"babel-plugin-styled-components"
    ],
}
