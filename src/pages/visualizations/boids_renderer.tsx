import React from "react"
import { guess } from "web-audio-beat-detector"
import VizualizerGenerator from "../../components/vizualizer_generator"

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
        x: boids.map(boid => boid.x).reduce((acc, current) => current + acc) / boids.length,
        y: boids.map(boid => boid.y).reduce((acc, current) => current + acc) / boids.length
    }
}

type Boid = {
    x: number,
    y: number,
    rotation: number
}

const get_triangle_points = (boid: Boid, radius:number): [number, number][] => {
    return Array.from({length: 3}, (_, n) => {
        const point_rotation = 2*Math.PI/3 * n
        return [
            boid.x + radius * Math.cos(boid.rotation + point_rotation),
            boid.y + radius * Math.sin(boid.rotation + point_rotation)
        ]
    })
}

const BoidsRenderer = () => {
    return <VizualizerGenerator
        name="boids"
        script_cdns={[
            "https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js",
            "https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js"
        ]}
        start_rendering={(param_dict, set_ui_state, set_video_blob, mount, audio_buffer, audio_context) => {
            const framerate = param_dict.framerate as number
            const width = param_dict.width as number
            const height = param_dict.height as number
            const fill = `#${param_dict.fill}` as string
            const background = `#${param_dict.background}` as string
            const numboids = param_dict.numboids as number
            const duration = param_dict.duration as number
            const is_realtime = param_dict.is_realtime === "Yes"
            
            const capturer = !is_realtime ? 
                new CCapture({
                    display: true,
                    format: "webm",
                    framerate,
                    name: "boids"
                }) : null
            

            guess(audio_buffer).then(({ bpm, offset }) => {
                //P5.js loaded via load_js
                new p5((p: any) => {
                    let canvas:any = null
                    let boids: Boid[] = []
                    let downloaded = false
                    const start = Date.now()
    
                    p.setup = () => {
                        canvas = p.createCanvas(width, height, p.P2D)
                        p.frameRate(framerate)
                        p.noStroke()
                        p.fill(fill)
            
                        boids = Array.from({length: numboids}, () => {
                            return {
                                x: Math.random() * width,
                                y: Math.random() * height,
                                rotation: Math.random() * 2 * Math.PI
                            }
                        })
                        boids.map(boid => {
                            const points = get_triangle_points(boid, 14)
                            p.triangle(
                                points[0][0], points[0][1],
                                points[1][0], points[1][1],
                                points[2][0], points[2][1],
                            )
                        })

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
                        const speed = 140 + 300 * Math.sin(bpm/60*Math.PI * real_elapsed)**6
                        const radius = 14 + 10 * Math.sin(bpm/120*Math.PI * real_elapsed + Math.PI/4)**16
                        const dist_diff = speed * time_diff
                        
                        if (!is_realtime && real_elapsed >= duration) {
                            p.noLoop()
                            if (!downloaded) {
                                downloaded = true
                                capturer.stop()
                                capturer.save(set_video_blob)
                            }
                        }
            
                        boids.map(boid => {
                            const rotation = boid.rotation
                            boid.x = normalize_to(
                                boid.x + dist_diff * Math.cos(rotation),
                                width
                            )
                            boid.y = normalize_to(
                                boid.y + dist_diff * Math.sin(rotation),
                                width
                            )
                            
                            const close = boids.filter(any_boid => {
                                if(any_boid == boid) return false
                                const diff_x = boid.x - any_boid.x
                                const diff_y = boid.y - any_boid.y
                                return 10000 >= (diff_x ** 2 + diff_y ** 2)
                            })
            
                            if (close.length >= 1) {
                                const avg_position = get_avg_position(boids)
                                const target = get_circular_mean([
                                    get_circular_mean(close.map(any_boid => any_boid.rotation)),
                                    normalize_to(Math.atan2(
                                        avg_position.y - boid.y,
                                        avg_position.x - boid.x
                                    ) + Math.PI/4, 2 * Math.PI)
                                ])
                                const max = 2 * Math.PI
            
                                const add = (target > rotation) ?
                                    target - rotation :
                                    target + max - rotation
                                const sub = (target > rotation) ?
                                    rotation + max - target :
                                    rotation - target
                                boid.rotation = normalize_to(
                                    add < sub ?
                                        rotation + time_diff*1/2*add :
                                        rotation - time_diff*1/2*sub,
                                    max
                                )
                            }
                            
                            const points = get_triangle_points(boid, radius)
                            p.triangle(
                                points[0][0], points[0][1],
                                points[1][0], points[1][1],
                                points[2][0], points[2][1],
                            )
                        })
                        
                        if (!is_realtime) {
                            capturer.capture(canvas.canvas)
                            p.frameCount === 1 && capturer.start()
                        }
                    }
                }, mount.current)
            })
        }}
    />
}

export default BoidsRenderer