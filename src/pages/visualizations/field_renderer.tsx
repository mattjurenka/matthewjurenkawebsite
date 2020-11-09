import React from "react";
import VizualizerGenerator from "../../components/vizualizer_generator"
import * as Tone from "tone"
import { CodeSharp } from "@material-ui/icons";
import { guess } from "web-audio-beat-detector";

const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/*const init_range = [61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.50, 98, 103.83, 110, 116.54, 123.47, 130.81]
console.log(Array.from({length: 12}).map((_, i) => {
    return [(init_range[i] + init_range[i + 1]) / 2, (init_range[i+1] + init_range[i+2])/2]
}))*/

const ranges: Array<[number, number]> = [
    [63.575, 67.355],
    [67.355, 71.36],
    [71.36, 75.6],
    [75.6, 80.095],
    [80.095, 84.86],
    [84.86, 89.905],
    [89.905, 95.25],
    [95.25, 100.915],
    [100.915, 106.915],
    [106.915, 113.27],
    [113.27, 120],
    [120, 127.14]
]




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
        "https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js",
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
                low_pass_filter.frequency.setValueAtTime(350, 0)
    
                analyzer.minDecibels = -90;
                analyzer.maxDecibels = -10;
                analyzer.smoothingTimeConstant = 0.85;

                let theta = 0
    
                p.setup = () => {
                    canvas = p.createCanvas(width, height, p.P2D)
                    p.frameRate(framerate)
                    p.strokeWeight(4)
                    p.stroke(0xFFF)
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
    
                    let source = audio_context.createBufferSource()
                    source.buffer = audio_buffer
                    source.connect(low_pass_filter)
                    low_pass_filter.connect(analyzer)
    
                    source.start(0, real_elapsed)
                    analyzer.getByteFrequencyData(data_array)
                    const avg_size = data_array.reduce((acc, current) => acc + current, 0) / analyzer.frequencyBinCount
                    source = undefined;
                    
                    console.log(offset)
                    
                    const beat_progression = (real_elapsed + offset) / bpm * 60
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
    
                    /*sums.map((avg, i) => {
                        const normalized = (avg - 30) / 100
                        const size_x = normalized * grid_width
                        const size_y = normalized * grid_height
                        Array.from({length: 12}, (_, k) => k).map(j => {
                            p.square(grid_width / 2 + j * grid_width - size_x/2, grid_height / 2 + i * grid_width - size_y/2, size_x)
                        })
                    })*/
    
                    
                    if (!is_realtime) {
                        capturer.capture(canvas.canvas)
                        p.frameCount === 1 && capturer.start()
                    }
                }
            }, mount.current)
        })
    }}
/>
export default Field