import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { useQueryParams } from "use-query-params";
import { Button, capitalize, Grid, Typography } from "@material-ui/core";
import download from "downloadjs";
import { useUpdateEffect } from "../hooks";
import vizualizations_dict from "../vizualization_params";
import Metadata from "./metadata";

const load = require('load-script')

const help_text = "Make sure you are using a modern browser that supports the Web Audio API. Make sure the supplied audio file is in a common audio format. "
+ "This APP is tested to work with the MPEG 3 and WAVE codecs in Chrome."
+ "If you continue to have problems and really want to use this application shoot me an email at main@matthewjurenka.com"

const VizualizerGenerator = (props: {
    name: string
    script_cdns: string[]
    start_rendering: (
        query_params: query_params,
        set_ui_state: (ui_state: ui_state) => void,
        set_video_blob: (video_blob: Blob) => void,
        mount: React.MutableRefObject<HTMLDivElement>,
        audio_buffer: AudioBuffer,
        audio_context: AudioContext,
        init_timestamp: number
    ) => void
}) => {
    const { script_cdns, start_rendering, name } = props

    const [params] = useQueryParams({});

    const query_params = vizualizations_dict.specific[name].url_params
        .concat(vizualizations_dict.default_params)
        .reduce((acc, param_info) => {
            acc[param_info.name] = param_info.type === "range" ?
                (parsed_raw => Number.isNaN(parsed_raw) ?
                    param_info.default :
                    parsed_raw)(Number.parseInt(
                        params[param_info.name] || param_info.default
                    )) :
                params[param_info.name] || param_info.default
            return acc
        }, {} as query_params)

    return <Metadata
        title={`${capitalize(name)} | M Jurenka`}
        description={`Create 100% FREE music visualizations with our ${capitalize(name)} visualizer. Perfect for creating Instagram videos of your favorite music.`}
    >
        <VizualizerRenderer
            query_params={query_params}
            script_cdns={script_cdns}
            start_rendering={start_rendering}
        />
    </Metadata>
}

type ui_state = "upload" | "rendering" | "done" | "error"

const VizualizerRenderer: FunctionComponent<{
    script_cdns: string[],
    query_params: query_params
    start_rendering: (
        query_params: query_params,
        set_ui_state: (ui_state: ui_state) => void,
        set_video_blob: (video_blob: Blob) => void,
        mount: React.MutableRefObject<HTMLDivElement>,
        audio_buffer: AudioBuffer,
        audio_context: AudioContext,
        init_timestamp: number
    ) => void
}> = (props) => {
    const [loaded, set_loaded] = useState(false)
    const [ui_state, set_ui_state] = useState<ui_state>("upload")
    const [show_help, set_show_help] = useState(false)
    const [error_code, set_error_code] = useState(0)
    
    const [video_blob, set_video_blob] = useState(null)

    let render_ref = useRef<HTMLDivElement>(null)
    let audio_file_ref = useRef<HTMLInputElement>(null)
    
    //Loads all scripts after mount of component
    useEffect(() => {
        Promise.all(
            props.script_cdns.map(script => 
                new Promise((res, reject) => load(script, (err, script) => {
                    err ? reject(err) : res(script)
                }))
            )
        ).then(
            () => set_loaded(true),
            () => set_error_code(1)
        )
    }, [])

    useUpdateEffect(() => {
        set_ui_state("error")
    }, [error_code])

    useUpdateEffect(() => {
        set_ui_state("done")
    }, [video_blob])

    useUpdateEffect(() => {
        if (ui_state === "rendering") {
            const audio_context = new AudioContext()

            const file = audio_file_ref.current.files.item(0)
            new Promise(async (res, reject) => {
                const audio_array_buffer = await file.arrayBuffer()
                const audio_buffer = await audio_context.decodeAudioData(audio_array_buffer)
                res(props.start_rendering(
                    props.query_params,
                    set_ui_state,
                    set_video_blob,
                    render_ref,
                    audio_buffer,
                    audio_context,
                    Date.now()
                ))
            })
        }
    }, [ui_state])
    
    if (!loaded) {
        return <Typography variant="h1">Loading External Scripts... ⏳</Typography>
    }

    if (ui_state === "error") {
        return <Grid container style={{
            marginTop: "16vh",
            marginLeft: "16em",
            width: "60vw"
        }}>
            <Typography variant="h1">An Error Occurred 😭</Typography>
            <Typography variant="subtitle1">
                {[
                    "Unknown Error",
                    "Failed to load one or more external scripts",
                    "Failed to render"
                ][error_code]}
            </Typography>
            <Typography variant="body1">
                {[
                    "Unknown Error",
                    "Try to reset your browser cache",
                    help_text,
                ][error_code]}
            </Typography>
        </Grid>
    }

    return (
        <>
            {ui_state === "rendering" ? <div ref={render_ref} /> : <></>}
            <Grid container style={{
                marginTop: "16vh",
                width: "100%",
                display: ui_state === "upload" ? "inherit" : "none"
            }}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="h1">
                        Upload Audio
                    </Typography>
                </Grid>                
                <Grid item xs={12} style={{
                    textAlign: "center",
                    marginTop: "1em",
                }}>
                    <input
                        accept="audio/*"
                        ref={audio_file_ref}
                        id="contained-button-file"
                        onChange={() => {
                            set_ui_state("rendering")
                        }}
                        type="file"
                        style={{
                            display: "none",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
            <Grid container style={{
                marginTop: "16vh",
                width: "100%",
                display: ui_state === "done" ? "inherit" : "none"
            }}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="h1">
                        Download Video
                    </Typography>
                    <Button
                        variant="outlined"
                        style={{marginTop: "1em"}}
                        onClick={() => download(video_blob, "vizualized.webm")}
                    >
                        Download Video
                    </Button>
                    <Typography
                        variant="subtitle1"
                        style={{
                            marginTop: "1em",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }}
                        onClick={() => set_show_help(!show_help)}
                    >Not Working?</Typography>
                    <Typography variant="body1" style={{
                        width: "60vw",
                        display: show_help ? "inherit" : "none",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        {help_text}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default VizualizerGenerator
