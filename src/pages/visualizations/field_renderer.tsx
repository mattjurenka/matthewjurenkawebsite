import React from "react";
import VizualizerGenerator from "../../components/vizualizer_generator"
import { guess } from "web-audio-beat-detector";

const get_time_since_last_function = () => {
    let time_since_last = Array.from({length: 12}, () => Number.POSITIVE_INFINITY)
    return (current_note: number) => {
        time_since_last = time_since_last.map(n => n + 1)
        time_since_last[current_note] = 0
        return time_since_last
    }
}

const Field = () => <VizualizerGenerator
    name="field"
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
        
        const time_since_last_func = get_time_since_last_function()


        const capturer = !is_realtime ? 
                new CCapture({
                    display: true,
                    format: "webm",
                    framerate,
                    name: "boids"
                }) : null

        guess(audio_buffer).then(({ bpm, offset}) =>{
            new p5((p: any) => {
                let canvas:any = null
                let downloaded = false
                const start = Date.now()
    
                const grid_width = width / 12
                const grid_height = height / 12
    

                const analyzer = audio_context.createAnalyser()
                const data_array = new Uint8Array(analyzer.frequencyBinCount)
    
                const low_pass_filter = audio_context.createBiquadFilter()
                low_pass_filter.type = "lowpass"
                low_pass_filter.frequency.setValueAtTime(100, 0)
    
                analyzer.minDecibels = -90;
                analyzer.maxDecibels = -10;
                analyzer.smoothingTimeConstant = 0.85;

                let theta = 0
    
                p.setup = () => {
                    canvas = p.createCanvas(width, height, p.P2D)
                    p.frameRate(framerate)
                    p.strokeWeight(4)
                    p.stroke(fill)
                    p.fill(background)
    
    
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
                    console.log(real_elapsed)
    
                    let source = audio_context.createBufferSource()
                    source.buffer = audio_buffer
                    source.connect(low_pass_filter)
                    low_pass_filter.connect(analyzer)
    
                    source.start(0, real_elapsed)
                    analyzer.getByteFrequencyData(data_array)
                    const avg_size = Math.sqrt(data_array.reduce((acc, current) => acc + Math.pow(current, 2) , 0) / data_array.length)
                    source = undefined;
                    
                    const beat_progression = (real_elapsed - offset) / bpm * 60
                    theta = (beat_progression % 4) * Math.PI


                    Array.from({length: 12}, (_, i) => {
                        const size_x = avg_size / 64 * grid_width
                        const size_y = avg_size / 64 * grid_height
    
                        Array.from({length: 12}, (_, k) => k).map(j => {
                            const center_x = grid_width / 2 + j * grid_width
                            const center_y = grid_height / 2 + i * grid_width
    
                            p.line(center_x, center_y, center_x + size_x * Math.cos(theta), center_y + size_y * Math.sin(theta))
                        })
                    })
    
                    
                    if (!is_realtime) {
                        p.frameCount === 1 && capturer.start()
                        capturer.capture(canvas.canvas)
                    }

                }
            }, mount.current)
        })
    }}
/>
export default Field