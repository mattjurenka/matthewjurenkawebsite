import React, { useState } from "react";
import {
    Button, capitalize, Grid, MenuItem, Select, Typography
} from "@material-ui/core";

import { ChromePicker } from "react-color"
import { Link } from "gatsby";
import { Link as ExternalLink } from "@material-ui/core"
import NumericInput from "react-numeric-input"
import vizualizations_dict from "../vizualization_params";
import Metadata from "./metadata";

import type { query_params } from "../index"

type VizualizerControllerProps = {
    name: string
    title: string
}

export default ({
    name,
    title
}: VizualizerControllerProps) => {
    const [{
        url_params, example
    }] = useState(vizualizations_dict.specific[name])
    const { artist, artist_url, song } = example
    const param_list = url_params.concat(vizualizations_dict.default_params)

    const [params, set_params] = useState(param_list.reduce((acc, param_info) => {
        acc[param_info.name] = param_info.default
        return acc
    }, {} as query_params))

    const visualizer_url = `/visualizations/${name}_renderer?${
        Object.entries(params).map(([name, value]) => `${name}=${value}`)
        .join("&")
    }`

    return <Metadata
        title={`${capitalize(name)} Visualizer | M Jurenka`}
        description={`100% FREE ${capitalize(title)} Music Visualizer \
            that can render to video or run in real-time. \
            Create videos perfect for Instagram with your favorite music.`}
    >
        <Grid container item spacing={8} style={{
            width: "100%",
            margin: "0 auto",
            paddingTop: "10%em",
            paddingLeft: "10%em",
            paddingRight: "10%em",
        }}>
            <Grid item xs={12} md={5}>
                <video
                    style={{
                        maxHeight: "80vh",
                        maxWidth: "100%",
                        marginBottom: "1em"
                    }}
                    src={`/visualizer_examples/${name}.mp4`}
                    controls
                />
                <br />
                <ExternalLink
                    variant="h4"
                    color="inherit"
                    underline="always"
                    href={artist_url}
                    target="_blank"
                >{artist} — {song}</ExternalLink>
            </Grid>
            <Grid
                item container xs={12} md={7}
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        style={{paddingBottom: "1em"}}
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h1"
                            style={{marginBottom: "0.5em"}}
                        >
                            Step 1
                        </Typography>
                        <Typography variant="body1">
                            Adjust the vizualizer settings below. The
                            video on the left is an example of the default
                            settings. <b>Make sure Realtime is set to No
                            if you want to download a video.</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h1"
                            style={{marginBottom: "0.5em"}}
                        >
                            Step 2
                        </Typography>
                        <Typography variant="body1">
                            Upload an audio file. The vizualisation will
                            begin to render automatically. Once it finishes
                            you will be able to download the video as webm.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h1"
                            style={{marginBottom: "0.5em"}}
                        >
                            Step 3
                        </Typography>
                        <Typography variant="body1">
                            Sync the audio to the vizualiser using the video
                            editor of choice. If your system does not support
                            webm you can convert it to a mp4 online.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop: "1em", marginBottom: "1em"}}>
                    <Button variant="outlined">
                        <Link to={visualizer_url} style={{
                            color: "black",
                            textDecoration: "none"
                        }}>Start Vizualization</Link>
                    </Button>
                </Grid>
                <Grid item xs={12} container spacing={4}>
                    {[1, 2, 3].map(column => param_list.filter(param_info => param_info.column === column))
                        .map((column_params, i) => <Grid key={i} item xs={12} md={4}>
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
                                            styles={{
                                                default: {
                                                    picker: {
                                                        width: "100%"
                                                    }
                                                }
                                            }}
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
                    </Grid>)}
                </Grid>
            </Grid>
        </Grid>
    </Metadata>
}
