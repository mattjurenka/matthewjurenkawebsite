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
                <Grid item container spacing={8}>
                    <Grid item xs={6} style={{
                        backgroundImage: "url(/mountains.png)",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        zIndex: -1,
                        width: "50vh",
                        height: "16.75vh",
                        position: "relative",
                        top: "-3vh",
                        left: "5vw"
                    }} />
                    <Grid item xs={6} spacing={8} style={{marginTop: "4em"}}>
                        <Typography variant="h3">
                            Featured Projects
                        </Typography>
                        <Link to="/ama_new_redesign">AMA Website Redesign 2020</Link>
                        <br />
                        <Link to="/ama_redesign">AMA Website Redesign 2019</Link>
                        <br />
                        <Typography variant="body1">More Coming Soon (Site in-progress)</Typography>
                        {/*Typography variant="h4">
                            Music Visualizations Generator
                        </Typography>
                        <Typography variant="h4">
                            In Progress AMA Website
                        </Typography>
                        <Typography variant="h4">
                            Reddit Scraper
                        </Typography>
                        <Typography variant="h4">
                            PGM Editor
                        </Typography>
                        <Typography variant="h4">
                            Stock Slack App
                        </Typography>
                        <Typography variant="h4">
                            Julia Set Generator
                        </Typography>
                        <Typography variant="h4">
                            MAYO Slack app
                        </Typography>
                        <Typography variant="h4">
                            MAYO Funtions
                        </Typography>*/}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </ThemeProvider>
}

export default Home
