import React from "react"
import { Box, Grid, Typography, useMediaQuery } from "@mui/material"
import Experiences from "../sections/Experiences"
import Metadata from "../components/metadata"

import { featured_projects, intent, intro, more_projects } from "../text"
import theme from "../theme"
import {Header} from "../sections/Header"
import Projects from "../sections/Projects"


export default () => {
    const is_xs = useMediaQuery(theme.breakpoints.up("xs"))
    const is_sm = useMediaQuery(theme.breakpoints.up("sm"))
    const is_md = useMediaQuery(theme.breakpoints.up("md"))
    const is_lg = useMediaQuery(theme.breakpoints.up("lg"))
    const is_xl = useMediaQuery(theme.breakpoints.up("xl"))

    return <Metadata
        title={"Home | Matthew Jurenka"}
        description={intro}
    >
        <Box sx={{
            flexGrow: 1,
            margin: "0 auto",
            marginBottom: "8rem",
            paddingTop: is_sm ? "20vh" : "12vh",
            paddingLeft: is_lg ? "20%" : is_sm ? "10%" : "2rem",
            paddingRight: is_lg ? "20%" : is_sm ? "10%" : "2rem",
            overflow: "hidden",
        }}>
            <Grid
                container
                //style={{
                //    width: "100%",
                //    margin: "0 auto",
                //    marginBottom: "8rem",
                //    paddingTop: is_sm ? "16vh" : "8vh",
                //    paddingLeft: is_md ? "20%" : 0,
                //    paddingRight: is_md ? "20%" : 0,
                //    overflow: "hidden",
                //}}
                spacing={8}
            >
                <Grid item xs={12} style={{marginBottom: is_sm ? "2vh" : "4vh"}}>
                    <Header />
                </Grid>
                <Grid item xs={12} md={6} style={{position: "relative"}}>
                    <Typography variant="body1">
                        {intro}
                    </Typography>
                    <Typography variant="body1" style={{marginTop: "2rem"}}>
                        {intent}
                    </Typography>
                    <img src={"/mountains.png"} style={{
                        position: is_md ? "absolute" : "initial",
                        right: 0,
                        zIndex: -1,
                        marginTop: "4rem",
                        transform: is_lg ? "translate(0%, 0%)" : "",
                        width: is_lg ? "43vw" : "100%",
                    }}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Experiences />
                </Grid>
                <Grid item xs={6} style={{
                    zIndex: -1,
                    height: "0px",
                }}> 
                </Grid>
                <Grid item xs={12} md={6}>
                    <Projects
                        title="Featured Projects"
                        projects={featured_projects}
                    />
                </Grid>
                <Grid item xs={12} md={6} style={{
                    marginTop: is_md ? "calc(-100rem + 40vw)" : "initial"
                }}>
                    <Projects
                        title="More Projects"
                        projects={more_projects}
                    />
                </Grid>
            </Grid>
        </Box>
    </Metadata>
}
