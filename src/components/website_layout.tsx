import React from "react"
import { Box, Grid, Link, Typography } from "@material-ui/core"
import Metadata from "./metadata"

interface website_layout_props {
    title: string,
    since: string,
    link?: string,
    description: string,
    img_href: string,
    link_href?: string
}

const WebsiteLayout = (props: website_layout_props) => {
    return <Metadata
        title={`${props.title} | M Jurenka`}
        description={props.description}
    >
        <Grid container >
            <Grid container item style={{margin: "2em 2em"}}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h1" style={{marginTop: "0vh"}}>
                        {props.title}
                    </Typography>
                    <Box display="flex">
                        {props.link ? <Link
                            href={props.link_href}
                            variant="h4"
                            color="inherit"
                            underline="always"
                            style={{marginRight: "1em"}}
                        >
                            {props.link}
                        </Link> : <></>}
                        <Typography variant="subtitle1" style={{marginBottom: "2em"}}>
                            {props.since}
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography>
                        {props.description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <img
                    style={{
                        objectFit: "cover",
                        width: "100%",
                    }}
                    src={props.img_href}
                />
            </Grid>
        </Grid>
    </Metadata>
}

export default WebsiteLayout;
