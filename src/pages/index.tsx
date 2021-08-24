import React from "react"
import { Grid, Typography, useMediaQuery } from "@material-ui/core"
import Experiences from "../sections/Experiences"
import Metadata from "../components/metadata"

import { featured_projects, intent, intro, more_projects } from "../text"
import theme from "../theme"
import {Header} from "../sections/Header"
import Projects from "../sections/Projects"


export default () => {
    const is_md = useMediaQuery(theme.breakpoints.up("sm"))
    const is_lg = useMediaQuery(theme.breakpoints.up("md"))

    return <Metadata
        title={"Home | Matthew Jurenka"}
        description={intro}
    >
        <Grid
            container
            style={{
                width: "100%",
                margin: "0 auto",
                paddingTop: is_md ? "16vh" : "8vh",
                paddingLeft: is_md ? "20%" : 0,
                paddingRight: is_md ? "20%" : 0,
                overflow: "hidden",
            }}
            spacing={8}
        >
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">
                    {intro}
                </Typography>
                <Typography variant="body1" style={{marginTop: "1em"}}>
                    {intent}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Experiences />
            </Grid>
            <Grid item xs={6} style={{position: "relative", zIndex: -1}}> 
                <img src={"/mountains.png"} style={{
                    position: "absolute",
                    zIndex: -1,
                    transform: "translate(-45%, -45%) scale(.5)",
                }}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Projects
                    title="Featured Projects"
                    projects={featured_projects}
                />
            </Grid>
            <Grid item xs={12} md={6} style={{marginTop: is_lg ? "-32em" : "initial"}}>
                <Projects
                    title="More Projects"
                    projects={more_projects}
                />
            </Grid>
        </Grid>
    </Metadata>
}
