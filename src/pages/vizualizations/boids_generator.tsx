import * as React from "react"
import * as p5 from "p5"
import { Button, Grid, ThemeProvider, Typography } from "@material-ui/core"
import { guess } from 'web-audio-beat-detector';
import download from "downloadjs";
import { useQueryParam } from "gatsby-query-params";
import theme from "../../theme";


const max_width = 900
const max_height = 900

var load = require('load-script')

const audio_context = new AudioContext()


const normalize_to = (x:number, max: number) => {
    if (x < 0) return max + x
    if (x > max) return x - max
    return x
}

const get_circular_mean = (angles: number[]) => {
    const sin_avg = angles.reduce((accumulator, current) => {
        return accumulator + Math.sin(current)
    }, 0) / angles.length
    const cos_avg = angles.reduce((accumulator, current) => {
        return accumulator + Math.cos(current)
    }, 0) / angles.length
    return Math.atan2(sin_avg, cos_avg)
}

const get_avg_position = (boids:Boid[]) => {
    return {
        x: boids.map(boid => boid.x()).reduce((acc, current) => current + acc) / boids.length,
        y: boids.map(boid => boid.y()).reduce((acc, current) => current + acc) / boids.length
    }
}

const help_text = "Make sure you are using a modern browser that supports the Web Audio API. Make sure the supplied audio file is in a common audio format. \
This APP is tested to work with the MPEG 3 and WAVE codecs in Chrome. \
If you continue to have problems and really want to use this application shoot me an email at main@matthewjurenka.com"

class Boid {
    _x: number
    _y: number
    _rotation: number

    constructor(x:number, y:number, rotation:number) {
        this._x = x
        this._y = y
        this._rotation = rotation
    }

    x(new_x?: number) {
        if (typeof new_x === 'number') {
            this._x = new_x
        }
        return this._x
    }

    y(new_y?: number) {
        if (typeof new_y === 'number') {
            this._y = new_y
        }
        return this._y
    }

    rotation(new_rotation?: number) {
        if (typeof new_rotation === 'number') {
            this._rotation = new_rotation
        }
        return this._rotation
    }

    get_points(radius:number) {
        return Array.from({length: 3}, (_, n) => {
            const point_rotation = 2*Math.PI/3 * n
            return [
                this._x + radius * Math.cos(this._rotation + point_rotation),
                this._y + radius * Math.sin(this._rotation + point_rotation)
            ]
        })
    }

}

interface BoidsState {
    sketch: (p: any) => void | null
    capturer: CCapture | null
    p5: p5 | null
    ui_state: "upload" | "rendering" | "done" | "error"
    video_blob: Blob
    show_help: boolean
}
interface BoidsProps {
    num_boids: number
    background: string
    fill: string
    framerate: number
    height: number
    width: number
    duration: number
}

//Parent must be a functional component to access the useQueryParam hook
const boidsGenerator = () => {
    
    const num_boids_raw = Number.parseInt(useQueryParam("numboids", "75"))
    const framerate_raw = Number.parseInt(useQueryParam("framerate", "30"))
    const height_raw = Number.parseInt(useQueryParam("height", "1024"))
    const width_raw = Number.parseInt(useQueryParam("width", "1024"))
    const duration_raw = Number.parseInt(useQueryParam("duration", "60"))

    return <Boids
        background={`#${useQueryParam("bground", "2D2D2D")}`}
        fill={`#${useQueryParam("fill", "E6E6E6")}`}
        num_boids={0 < num_boids_raw && num_boids_raw <= 150 ? num_boids_raw : 75}
        framerate={5 <= framerate_raw && framerate_raw <= 60 ? framerate_raw : 30}
        height={128 <= height_raw && height_raw <= 4096 ? height_raw : 1024}
        width={128 <= width_raw && width_raw <= 4096 ? width_raw : 1024}
        duration={5 <= duration_raw && duration_raw <= 1024 ? duration_raw : 60}
    />
}

export default boidsGenerator;

class Boids extends React.Component<BoidsProps, BoidsState> {
    mount: any
    inputFile: HTMLInputElement
    myP5: any
    downloaded: boolean
    constructor(props: BoidsProps) {
        super(props)
        this.state = {
            sketch: null,
            capturer: null,
            p5: null,
            ui_state: "upload",
            video_blob: null,
            show_help: false
        }

        this.mount = React.createRef()
        this.inputFile = null

        this.downloaded = false

        this.startVizualization = this.startVizualization.bind(this)
    }

    async startVizualization(evt:React.ChangeEvent<HTMLInputElement>) {
        evt.preventDefault()
        const file = evt.target.files.item(0)
        const audio_array_buffer = await file.arrayBuffer()
        const audio_buffer = await audio_context.decodeAudioData(audio_array_buffer)
        const { bpm, offset } = await guess(audio_buffer)

        this.setState({
            ui_state: "rendering",
            sketch: (p:any) => {

                let canvas:any = null;
                let boids:Boid[] = null;
                let framerate = this.props.framerate;
                
        
                p.setup = () => {
                    canvas = p.createCanvas(max_width, max_height, p.P2D)
                    p.frameRate(framerate)
                    p.noStroke()
                    p.fill(this.props.fill)
        
                    boids = Array.from({length: this.props.num_boids}, () => {
                        return new Boid(
                            Math.random() * max_width,
                            Math.random() * max_height,
                            Math.random() * 2 * Math.PI
                        )
                    })
                }
        
                p.draw = () => {
                    p.background(this.props.background)
                    
                    const elapsed_time = p.frameCount / framerate
                    const time_diff = 1 / framerate
                    const speed = 140 + 300 * Math.sin(bpm/60*Math.PI * elapsed_time)**6
                    const radius = 14 + 10 * Math.sin(bpm/120*Math.PI * elapsed_time + Math.PI/4)**16
                    const dist_diff = speed * time_diff
                    
                    if (elapsed_time >= this.props.duration) {
                        p.noLoop()
                        if (!this.downloaded) {
                            this.downloaded = true

                            this.state.capturer.stop()
                            this.state.capturer.save(video_blob => {
                                this.setState({
                                    ui_state: "done",
                                    video_blob
                                })
                            })
                        }
                    }
        
                    boids.map(boid => {
                        const rotation = boid.rotation()
                        boid.x(normalize_to(
                            boid.x() + dist_diff * Math.cos(rotation),
                            max_width
                        ))
                        boid.y(normalize_to(
                            boid.y() + dist_diff * Math.sin(rotation),
                            max_height
                        ))
                        
                        const close = boids.filter(any_boid => {
                            if(any_boid == boid) return false
                            const diff_x = boid.x() - any_boid.x()
                            const diff_y = boid.y() - any_boid.y()
                            return 10000 >= (diff_x ** 2 + diff_y ** 2)
                        })
        
                        if (close.length >= 1) {
                            const avg_position = get_avg_position(boids)
                            const target = get_circular_mean([
                                get_circular_mean(close.map(any_boid => any_boid.rotation())),
                                normalize_to(Math.atan2(
                                    avg_position.y - boid.y(),
                                    avg_position.x - boid.x()
                                ) + Math.PI/4, 2 * Math.PI)
                            ])
                            const max = 2 * Math.PI
        
                            const add = (target > rotation) ? target - rotation : target + max - rotation
                            const sub = (target > rotation) ? rotation + max - target : rotation - target
                            boid.rotation(normalize_to(
                                (add < sub) ? rotation + time_diff*1/2*add : rotation - time_diff*1/2*sub,
                                max
                            ))
                        }
                        
                        const points = boid.get_points(radius)
                        p.triangle(
                            points[0][0], points[0][1],
                            points[1][0], points[1][1],
                            points[2][0], points[2][1],
                        )
                    })
                    
                    p.frameCount === 1 && this.state.capturer.start()
                    this.state.capturer.capture(canvas.canvas)
                }
            },
            capturer: new CCapture({
                display: true,
                format: "webm",
                framerate: this.props.framerate,
                name: "metu"
            })
        }, () => this.setState(prevState => {
            return {
                p5: new p5(this.state.sketch, this.mount.current)
            }})
        )

    }

    componentDidMount() {
        new Promise((res, reject) => load(
            "https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js",
            (err, script) => {
                if (err) {
                    reject(err)
                } else {
                    res(script)
                }
            }
        ))
    }

    static getDerivedStateFromError(error: any) {
        console.log(error)
        return {
            ui_state: "error"
        }
    }

    render() {
        return <ThemeProvider theme={theme}>
            {this.state.ui_state === "error" ?
            <Grid container style={{
                marginTop: "16vh",
                marginLeft: "16em",
                width: "60vw"
            }}>
                <Typography variant="h1">An Error Occurred 😭</Typography>
                <Typography variant="body1">{help_text}</Typography>
            </Grid> :
            <>
                {this.state.ui_state === "rendering" ? 
                    <div ref={this.mount} /> : <></>}
                <Grid container style={{
                    marginTop: "16vh",
                    width: "100%",
                    display: this.state.ui_state === "upload" ? "inherit" : "none"
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
                            ref={ref => this.inputFile = ref}
                            id="contained-button-file"
                            onChange={this.startVizualization}
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
                    display: this.state.ui_state === "done" ? "inherit" : "none"
                }}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography variant="h1">
                            Download Video
                        </Typography>
                        <Button
                            variant="outlined"
                            style={{marginTop: "1em"}}
                            onClick={() => download(this.state.video_blob, "vizualized.webm")}
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
                            onClick={() => this.setState(props => {
                                return {
                                    show_help: !props.show_help
                                }
                            })}
                        >Not Working?</Typography>
                        <Typography variant="body1" style={{
                            width: "60vw",
                            display: this.state.show_help ? "inherit" : "none",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}>
                            {help_text}
                        </Typography>
                    </Grid>
                </Grid>
            </>}
        </ThemeProvider>
    }
}