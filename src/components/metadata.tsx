import {ThemeProvider} from "@material-ui/core/styles"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import React from "react"
import {Helmet} from "react-helmet"
import theme from "../theme"

const Metadata = (props: {
    children: JSX.Element[] | JSX.Element
    title: string
    description: string
}) => <ThemeProvider theme={theme}>
    <Helmet>
        <title>{props.title}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <link rel="shortcut icon" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.ico" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-181063669-1"></script>
        <script>
            {"window.dataLayer = window.dataLayer || [];\
            function gtag() { \
                dataLayer.push(arguments);\
            } \
            gtag('js', new Date());\
            gtag('config', 'UA-181063669-1');"}
        </script>
    </Helmet>
    {props.children}
</ThemeProvider>

export default Metadata
