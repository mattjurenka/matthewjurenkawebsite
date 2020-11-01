import React from "react";
import VizualizerGenerator from "../../components/vizualizer_generator"
import * as Tone from "tone"

const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const get_time_since_last_function = () => {
    let time_since_last = Array.from({length: 12}, () => Number.POSITIVE_INFINITY)
    return (current_note: number) => {
        time_since_last = time_since_last.map(n => n + 1)
        time_since_last[current_note] = 0
        return time_since_last
    }
} 

const noteFromPitch = (frequency: number) => (Math.round(
    12 * Math.log(frequency / 440) / Math.log(2)
) + 69) % 12;
/*
const get_tone_function = (sample_rate: number, audio_buffer: Float32Array) => {
    const pitch_analyzer = new PitchAnalyzer(sample_rate)
    let last_tone = {}
    return (time_in_s: number) => {
        const current_sample = Math.floor(sample_rate * time_in_s)
        
        const sample_start_raw = current_sample - 2048
        const sample_end_raw = current_sample + 2048
        
        const sample_start = sample_start_raw < 0 ? 0 : sample_start_raw
        const sample_end = sample_end_raw >= audio_buffer.length ? audio_buffer.length : sample_end_raw

        const slice = audio_buffer.slice(sample_start, sample_end)

        pitch_analyzer.input(slice)
        pitch_analyzer.process()
        const tone = pitch_analyzer.findTone()
        if (tone == null) {
            return last_tone
        } else {
            last_tone = tone
            return tone
        }
    }
}*/

const Field = () => <VizualizerGenerator
    name="boids"
    script_cdns={[
        "https://cdn.jsdelivr.net/npm/fft@0.2.1/lib/node.min.js",
        "https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js",
        "/dependencies/pitch.js",
    ]}
    start_rendering={(param_dict, set_ui_state, set_video_blob, mount, audio_buffer, audio_context) => {
        const framerate = param_dict.framerate as number
        const width = param_dict.width as number
        const height = param_dict.height as number
        const fill = `#${param_dict.fill}` as string
        const background = `#${param_dict.background}` as string
        const duration = param_dict.duration as number
        const is_realtime = param_dict.is_realtime === "Yes"
        
        const channel_zero = audio_buffer.getChannelData(0)
        //const pitch_finder = get_tone_function(audio_buffer.sampleRate, channel_zero)
        const time_since_last_func = get_time_since_last_function()


        const capturer = !is_realtime ? 
                new CCapture({
                    display: true,
                    format: "webm",
                    framerate,
                    name: "boids"
                }) : null

        new p5((p: any) => {
            let canvas:any = null
            let downloaded = false
            const start = Date.now()

            const grid_width = width / 12
            const grid_height = height / 12

            const filter = new Tone.Filter(350, "highpass")
            
            const player = new Tone.Player(audio_buffer)
            console.log(player.buffer)
            filter.input

            p.setup = () => {
                canvas = p.createCanvas(width, height, p.P2D)
                p.frameRate(framerate)
                p.noStroke()
                p.fill(fill)


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
    
                //const tone = pitch_finder(real_elapsed)
                //const note = noteFromPitch(tone.freq)
                //const time_since_last = time_since_last_func(note).map(v => v <= 0 ? 1 : v)
                
                [0,1,2,3,4,5,6,7,8,9,10,11].map((since_last, i) => {
                    const size_x = grid_width / since_last
                    const size_y = grid_height / since_last
                    Array.from({length: 12}, (_, k) => k).map(j => {
                        p.square(grid_width / 2 + j * grid_width - size_x/2, grid_height / 2 + i * grid_width - size_y/2, size_x)
                    })
                })

                
                if (!is_realtime) {
                    capturer.capture(canvas.canvas)
                    p.frameCount === 1 && capturer.start()
                }
            }
        }, mount.current)
    }}
/>
export default Field