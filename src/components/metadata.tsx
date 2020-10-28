import {ThemeProvider} from "@material-ui/core/styles"
import React from "react"
import {Helmet} from "react-helmet"
import theme from "../theme"

const Metadata = (props: {
    children: JSX.Element[] | JSX.Element
    title: string
    description: string
}) => <Helmet>
    <ThemeProvider theme={theme}>
        <title>{props.title}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <link rel="shortcut icon" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.ico" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.ico" />
    </ThemeProvider>
    {props.children}
</Helmet>

export default Metadata
