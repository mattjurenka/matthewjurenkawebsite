import React from "react"
import { Box, Grid, ThemeProvider, Typography } from "@material-ui/core"
import theme, { pointer_style } from "../theme"
import Experiences from "../sections/Experiences"
import { LinkedIn, GitHub, Email } from "@material-ui/icons"
import { Link } from "gatsby"

const Home = () => {
    return <ThemeProvider theme={theme}>
        <Grid
            container
            style={{
                width: "100%",
                margin: "0 auto",
                marginTop: "16vh"
            }}
        >
            <Grid item container xs={12} justify="center">
                <Grid item container xs={8} md={7} spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="h1">
                            Matthew Jurenka
                        </Typography>
                        <Typography variant="h2">
                            Web Developer
                        </Typography>
                        <Box display="flex">
                            <GitHub
                                style={pointer_style}
                                onClick={() => location.href = "https://github.com/mattjurenka"}
                            />
                            <LinkedIn
                                style={Object.assign({marginLeft: "4px"}, pointer_style)}
                                onClick={() => location.href = "https://www.linkedin.com/in/matthew-jurenka-a4177618a/"}
                            />
                            <Email
                                style={Object.assign({marginLeft: "4px"}, pointer_style)}
                                onClick={() => location.href = "mailto:main@matthewjurenka.com"}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            For as long as I can remember, I have been voraciously curious about computers,
                            programming, and the internet. Tinkering with online creation naturally led me
                            to the world of web development, and I have been building, breaking, and exploring ever since.
                        </Typography>
                        <Typography variant="body1" style={{marginTop: "1em"}}>
                            This website is intended to showcase my projects, abilities, and experiences as a programmer, but also to
                            organize and share websites and tools I have found useful that others may not have heard of.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Experiences />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={6} style={{
                        backgroundImage: "url(/mountains.png)",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        zIndex: -1,
                        width: "calc(50vw)",
                        height: "calc(50vw *.335)",
                        position: "relative",
                        top: "-3vh",
                        left: "5vw"
                    }} />
                    <Grid container item xs={6} style={{marginTop: "4em", paddingLeft:"32px"}}>
                        <Grid item xs={8}>
                            <Typography variant="h3">
                                Featured Projects
                            </Typography>
                            {[
                                ["Music Vizualizer", "/vizualizations/boids", "Automatically generate video of pulsing and moving triangles from an audio file."],
                                ["AMA Website Redesign 2020", "/ama_new_redesign", "Design of ASU's American Marketing Association's website. Follows last year's redesign which led to a \
                                100% increase in monthly views."],
                                ["AMA Website Redesign 2019", "/ama_redesign", "Original Design of "],
                            ].map(v => <>
                                <div style={{marginTop: "1em"}}>
                                    <Link to={v[1]}>
                                        <Typography variant="h4" style={{background: "white"}}>
                                            {v[0]}
                                        </Typography>
                                    </Link>
                                    <Typography variant="body1">{v[2]}</Typography>
                                </div>
                            </>)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </ThemeProvider>
}

export default Home