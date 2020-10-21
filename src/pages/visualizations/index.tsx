import { Grid, ThemeProvider, Typography } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { KeyboardBackspaceOutlined } from "@material-ui/icons";
import { Link } from "gatsby";
import React from "react";
import theme from "../../theme";

const vizualisers: Array<[string, string, string]> = [
    [
        "/metu_viz.mp4",
        "Boids",
        "./boids"
    ],
    [
        "/boundaries_viz.mp4",
        "Spinning",
        "./spinning"
    ],
]

const home = () => <ThemeProvider theme={theme}>
    <Grid
        container
        spacing={8}
        style={{paddingLeft: "8em", paddingRight: "8em"}}
    >
        <Grid item xs={12} style={{
            marginTop: "4em"
        }}>
            <Link to={"../"}>
                <img
                    src={"/signature.svg"}
                    style={{
                        height: "75px"
                    }}
                />
            </Link>
        </Grid>
        {
            vizualisers.map((vizualiser, idx) => <Grid
                item
                xs={6}
                md={3}
            >
                <Link to={vizualiser[2]}>
                    <Grid
                        container
                        style={{
                            position: "relative",
                            paddingBottom: "100%",
                            cursor: "pointer"
                        }}
                    >
                        <video
                            src={vizualiser[0]}
                            style={{
                                maxWidth: "100%",
                                position: "absolute"
                            }}
                        />
                        <div style={{
                            width: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            position: "absolute",
                            zIndex: 10,
                            textAlign: "center",
                            bottom: 0,
                            paddingTop: ".5em",
                            paddingBottom: ".5em",
                        }}>
                            <Typography variant="h1" style={{
                                color: "white"
                            }}>{vizualiser[1]}</Typography>
                        </div>

                    </Grid>
                </Link>

            </Grid>)
        }
    </Grid>
</ThemeProvider>


export default home