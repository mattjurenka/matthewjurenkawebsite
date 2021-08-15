import { capitalize, Grid, Typography } from "@material-ui/core";
import { Link } from "gatsby";
import React from "react";
import Metadata from "../../components/metadata";
import vizualizations_dict from "../../vizualization_params";

const home = () => <Metadata
    title={`Music Visualizers | M Jurenka`}
    description={`Create 100% FREE music visualizations with Boids and Spinning \
        visualizers. Perfect for creating Instagram videos of your favorite music.`}
>
    <Grid
        container
        spacing={8}
        style={{
            width: "100%",
            paddingLeft: "10%",
            paddingRight: "10%",
            margin: "0 auto",
            overflow: "hidden",
        }}
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
        {Object.entries(vizualizations_dict.specific)
            .sort((a, b)=> a[1].order - b[1].order)
            .map(([name]) => <Grid
                item
                xs={12}
                sm={6}
                md={3}
            >
                <Link to={`./${name}`}>
                    <Grid
                        container
                        style={{
                            position: "relative",
                            paddingBottom: "100%",
                            cursor: "pointer"
                        }}
                    >
                        <video
                            src={`/visualizer_examples/${name}.mp4`}
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
                            }}>{capitalize(name)}</Typography>
                        </div>
                    </Grid>
                </Link>
            </Grid>)}
    </Grid>
</Metadata>

export default home
