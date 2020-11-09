import React, { useEffect, useState } from "react";
import { Box, Button, capitalize, Grid, MenuItem, Select, ThemeProvider, Typography } from "@material-ui/core";
import theme from "../theme";

import { ChromePicker } from "react-color"
import { Link } from "gatsby";
import { Link as ExternalLink } from "@material-ui/core"
import NumericInput from "react-numeric-input"
import vizualizations_dict from "../vizualization_params";
import Metadata from "./metadata";



const VizualizerController = (props: {
    name: string,
    title: string
    example: {
        artist_url: string,
        artist: string,
        song: string,
        video_url: string
    }
}) => {
    const [param_list] = useState(vizualizations_dict.specific[props.name].concat(vizualizations_dict.all))
    const [params, set_params] = useState(param_list.reduce((acc, param_info) => {
        acc[param_info.name] = param_info.default
        return acc
    }, {} as query_params))

    const visualizer_url = `/visualizations/${props.name}_renderer?${
        Object.entries(params).map(([name, value]) => `${name}=${value}`)
        .join("&")
    }`

    return <Metadata
        title={`${capitalize(props.name)} Visualizer | M Jurenka`}
        description={`100% FREE ${capitalize(props.title)} Music Visualizer that can render to video or run in real-time.\
            Create videos perfect for Instagram with your favorite music.`}
    >
        <ThemeProvider theme={theme}>
            <Grid container style={{
                marginTop: "4em",
            }}>
                <Grid item xs={5} style={{paddingLeft: "4em"}}>
                    <video
                        style={{
                            maxHeight: "80vh",
                            maxWidth: "100%",
                            marginBottom: "1em"
                        }}
                        src={props.example.video_url}
                        controls
                    />
                    <br />
                    <ExternalLink
                        variant="h4"
                        color="inherit"
                        underline="always"
                        href={props.example.artist_url}
                        target="_blank"
                    >{props.example.artist} — {props.example.song}</ExternalLink>
                </Grid>
                <Grid item container xs={7} spacing={2} style={{paddingLeft: "3em", paddingRight: "3em"}}>
                    <Grid item xs={12}>
                        <Typography variant="h1" style={{paddingBottom: "1em"}}>{props.title}</Typography>
                    </Grid>
                    <Grid item container xs={12} spacing={4}>
                        <Grid item xs={4}>
                            <Typography variant="h1" style={{marginBottom: "0.5em"}}>Step 1</Typography>
                            <Typography variant="body1">
                                Adjust the vizualizer settings below. The video on the left is an example of the default settings.
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h1" style={{marginBottom: "0.5em"}}>Step 2</Typography>
                            <Typography variant="body1">
                                Upload an audio file. The vizualisation will begin to render automatically. Once it finishes you will be able to download the video as webm.
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h1" style={{marginBottom: "0.5em"}}>Step 3</Typography>
                            <Typography variant="body1">
                                Sync the audio to the vizualiser using your video editor of choice. If your system does not support webm you can convert it to a mp4 online.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: "1em", marginBottom: "1em"}}>
                        <Button variant="outlined">
                            <Link to={visualizer_url} style={{
                                color: "black",
                                textDecoration: "none"
                            }}> Start Vizualization</Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12} container spacing={4}>
                        {
                            [1, 2, 3].map(column => param_list.filter(param_info => param_info.column === column))
                            .map((column_params, i) => <Grid key={i} item xs={4}>
                                {column_params.map(param_info => param_info.type === "color" ?
                                    [
                                        <Typography key="1" variant="h2" style={{
                                            marginBottom: "1em",
                                        }}>{param_info.title}</Typography>,
                                        <div key="2" style={{
                                            marginBottom: "2em",
                                            padding: "2em 2em 2em 2em",
                                            backgroundColor: `#${params[param_info.name]}`
                                        }}>
                                            <ChromePicker
                                                color={`#${params[param_info.name]}`}
                                                onChange={color => set_params(params => {
                                                    params[param_info.name] = color.hex.substring(1)
                                                    return {
                                                        ...params
                                                    }
                                                })}
                                            />
                                        </div>
                                    ] :
                                    param_info.type === "range" ?
                                        [
                                            <Typography
                                                key="1"
                                                variant="h2"
                                                style={{
                                                    marginBottom: "0.5em"
                                                }}
                                            >
                                                {param_info.title}
                                            </Typography>,
                                            <NumericInput
                                                key="2"
                                                min={param_info.range[0]}
                                                max={param_info.range[1]}
                                                value={params[param_info.name]}
                                                onChange={value => set_params(params => {
                                                    params[param_info.name] = value
                                                    return {
                                                        ...params
                                                    }
                                                })}
                                            />,
                                            <div key="3" style={{marginTop: "2em"}} />,
                                        ] : 
                                        [
                                            <Typography
                                                key="1"
                                                variant="h2"
                                                style={{
                                                    marginBottom: "0.5em"
                                                }}
                                            >
                                                {param_info.title}
                                            </Typography>,
                                            <Select
                                                key="2"
                                                value={params[param_info.name] as String}
                                                onChange={evt => set_params(params => {
                                                    params[param_info.name] = evt.target.value as string
                                                    return {
                                                        ...params
                                                    }
                                                })}
                                                style={{
                                                    marginBottom: "2em"
                                                }}
                                            >
                                                {param_info.options.map(option => <MenuItem
                                                    value={option}
                                                >
                                                    <Typography variant="subtitle1">{option}</Typography>
                                                </MenuItem>)}
                                            </Select>
                                        ]
                                )}
                            </Grid>)
                        }
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    </Metadata>
}
export default VizualizerController
