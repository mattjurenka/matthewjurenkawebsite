import React, { useState } from "react";
import { Button, Grid, ThemeProvider, Typography } from "@material-ui/core";
import theme from "../../theme";

import { ChromePicker } from "react-color"
import { Link } from "gatsby";
import { Link as ExternalLink } from "@material-ui/core"
import NumericInput from "react-numeric-input"

const Boids = () => {
    const [fill, setFill] = useState("#E6E6E6")
    const [background, setBackground] = useState("#2D2D2D")
    const [framerate, setFramerate] = useState(30)
    const [numboids, setNumboids] = useState(75)
    const [width, setWidth] = useState(1024)
    const [height, setHeight] = useState(1024)
    const [duration, setDuration] = useState(60)

    const url = `/vizualizations/boids_generator?${
        [
            ["bground", background],
            ["fill", fill],
            ["height", 1024],
            ["width", 1024],
            ["framerate", framerate],
            ["numboids", numboids],
            ["duration", duration]
        ]
        .filter(v => v[1] !== undefined && v[1] !== null)
        .map(v => (v[1] = v[1].toString().replace(/#/, ""), v))
        .map(v => `${v[0]}=${v[1]}`)
        .join("&")
    }`

    return (
    <ThemeProvider theme={theme}>
        <Grid container style={{marginTop: "4em"}}>
            <Grid item xs={6} style={{textAlign: "right"}}>
                <video src={"/metu_viz.mp4"} controls/>
                <br />
                <ExternalLink
                    variant="h4"
                    color="inherit"
                    underline="always"
                    href="https://open.spotify.com/artist/4ODo634wVqDxqgVSlXE2LO"
                    target="_blank"
                >HWLS — Met-U</ExternalLink>
            </Grid>
            <Grid item xs={6} style={{padding: "3em"}}>
                <Typography variant="h1">Boids Music Vizualizer</Typography>
                <Typography variant="body1" style={{marginBottom: "1em"}}>
                    This app creates boids style vizualizations of music. First customize the vizualizer settings on this page as desired,
                    then click "Start Vizualizer". A new tab will open, where you will be prompted to select an mp3 file. No files will be transmitted over the internet,
                    everything will be generated on your local browser. The vizualization will start to generate, and you will be able to see the progress. Once it ends it will be automatically downloaded.
                    Please feel free to use videos generated from this for whatever purpose, I only ask that you link to my website in return!
                </Typography>
                <Grid item xs={12} style={{marginTop: "1em", marginBottom: "1em"}}>
                    <Button variant="outlined">
                        <Link to={url} style={{
                            color: "black",
                            textDecoration: "none"
                        }}> Start Vizualization</Link>
                    </Button>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Typography variant="h2" style={{marginBottom: "1em"}}>Triangle Fill</Typography>
                        <div style={{paddingBottom: "4em", paddingRight: "2em", backgroundColor: fill}}>
                            <ChromePicker color={fill} onChange={color => setFill(color.hex)}/>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h2" style={{marginBottom: "1em"}}>Background</Typography>                        
                        <div style={{paddingBottom: "4em", paddingRight: "2em", backgroundColor: background}}>
                            <ChromePicker color={background} onChange={color => setBackground(color.hex)} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        {[
                            ["Framerate", <NumericInput
                                min={5}
                                max={60}
                                value={framerate}
                                onChange={setFramerate}
                            />],
                            ["Number of Boids", <NumericInput
                                min={1}
                                max={150}
                                value={numboids}
                                onChange={setNumboids}
                            />],
                            ["Canvas Width", <NumericInput
                                min={128}
                                max={4096}
                                value={width}
                                onChange={setWidth}
                            />],
                            ["Canvas Height", <NumericInput
                                min={128}
                                max={4096}
                                value={height}
                                onChange={setHeight}
                            />], 
                            ["Duration in Seconds", <NumericInput
                                min={5}
                                max={1024}
                                value={duration}
                                onChange={setDuration}
                            />]
                        ].map((v: [string, JSX.Element]) => (
                            <>
                                <Typography variant="h2" style={{marginBottom: "0.5em"}}>{v[0]}</Typography>
                                {v[1]}
                                <div style={{marginTop: "2em"}}></div>
                            </>
                        ))}
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    </ThemeProvider>
)}
export default Boids