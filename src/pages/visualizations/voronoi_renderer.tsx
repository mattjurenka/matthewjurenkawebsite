import React from "react";
import VizualizerGenerator from "../../components/vizualizer_generator"
import { guess } from "web-audio-beat-detector";

import Voronoi from "../../lib/rhill-voronoi-core"

const VoronoiRenderer = () => <VizualizerGenerator
    name="voronoi"
    script_cdns={[
        "https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js",
        "https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js",
    ]}
    start_rendering={(param_dict, set_ui_state, set_video_blob, mount, audio_buffer, audio_context) => {
        const framerate = param_dict.framerate as number
        const width = param_dict.width as number
        const height = param_dict.height as number
        const fill = `#${param_dict.fill}` as string
        const background = `#${param_dict.background}` as string
        const duration = param_dict.duration as number
        const is_realtime = param_dict.is_realtime === "Yes"

        console.log(fill, background)
        
        const channel_zero = audio_buffer.getChannelData(0)

        const capturer = !is_realtime ? 
                new CCapture({
                    display: true,
                    format: "webm",
                    framerate,
                    name: "boids"
                }) : null

        guess(audio_buffer).then(({ bpm, offset}) =>{
            new p5((p: any) => {
                bpm = Math.round(bpm)

                let canvas:any = null
                let downloaded = false
                const start = Date.now()
    
                const analyzer = audio_context.createAnalyser()
    
                const low_pass_filter = audio_context.createBiquadFilter()
                low_pass_filter.type = "lowpass"
                low_pass_filter.frequency.setValueAtTime(350, 0)
    
                analyzer.minDecibels = -90;
                analyzer.maxDecibels = -10;
                analyzer.smoothingTimeConstant = 0.85;

                const points: {
                    x: number,
                    y: number,
                    theta: number
                }[] = Array.from({length: 30}, (_, i) => {
                    return {
                        x: Math.random() * width,
                        y: Math.random() * height,
                        theta: Math.random() * 2 * Math.PI
                    }
                })

                const voronoi = new Voronoi()
                const bounding_box = {xl: 0, xr: width, yt:0, yb: height}

                let theta = 0
    
                p.setup = () => {
                    canvas = p.createCanvas(width, height, p.P2D)
                    p.frameRate(framerate)
                    p.strokeWeight(4)
                    p.stroke(fill)
    
                    if (is_realtime) {
                        const source = audio_context.createBufferSource()
                        source.buffer = audio_buffer
                        source.connect(audio_context.destination)
                        source.start()
                    }
                }
    
                p.draw = () => {
                    p.background(background)
                    const real_elapsed = (Date.now() - start) / 1000
                    const time_diff = 1 / framerate
                    
                    if (!is_realtime && real_elapsed >= duration) {
                        p.noLoop()
                        if (!downloaded) {
                            downloaded = true
                            capturer.stop()
                            capturer.save(set_video_blob)
                        }
                    }

                    const current_beat = bpm * (real_elapsed - offset) / 60
                    const current_points = points.map(point => {
                        return {
                            x: point.x + width / 12 * Math.cos(point.theta) * Math.sin(current_beat * Math.PI / 2),
                            y: point.y + height / 12 * Math.sin(point.theta) * Math.sin(current_beat * Math.PI / 2)
                        }
                    })
                    console.log(current_beat)
                    const result = voronoi.compute(current_points, bounding_box)
                    result.edges.map(({va, vb}) => p.line(Math.floor(va.x), Math.floor(va.y), Math.floor(vb.x), Math.floor(vb.y)))
                    
                    if (!is_realtime) {
                        p.frameCount === 1 && capturer.start()
                        capturer.capture(canvas.canvas)
                    }
                }
            }, mount.current)
        })
    }}
/>
export default VoronoiRenderer