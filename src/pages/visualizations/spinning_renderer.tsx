import { useQueryParam } from "gatsby-query-params";
import * as React from "react";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    Sphere,
    SphereGeometry,
    LineBasicMaterial,
    BufferGeometry,
    Line
} from "three"
import VizualizerGenerator from "../../components/vizualizer_generator";

import { lowPassFilter } from 'low-pass-filter';

const randomInteger = (from: number, to: number) => {
    return Math.floor(Math.random() * (to - from + 1)) + from
}

const get_rms_function = (array: Float32Array) => {
    const squared = array.map(float => float ** 2)

    return (from: number, to: number) => {
        const lower = from < 0 ? 0 : Math.floor(from)
        const upper = from > array.length - 1 ? array.length - 1 : Math.floor(to)
        let acc = 0
        for (let i = from; i <= to; i++) {
            acc += squared[i]
        }
        return Math.sqrt(acc / (to - from))
    }
}

const getRMS = (nums: Float32Array) => {
    const sum = nums.reduce((acc, current) => acc + current ** 2, 0)
    return Math.sqrt(sum / nums.length)
}


const SpinningRenderer = () => {
    return <VizualizerGenerator
        name="spinning"
        script_cdns={[
            "https://rawgit.com/spite/ccapture.js/master/build/CCapture.all.min.js",
        ]}
        start_rendering={(param_dict, set_ui_state, set_video_blob, mount, audio_buffer, audio_context) => {
            const width = param_dict.width as number
            const height = param_dict.height as number
            const duration = param_dict.duration as number
            const framerate = param_dict.framerate as number
            const colorone = Number.parseInt(param_dict.colorone as string, 16)
            const colortwo = Number.parseInt(param_dict.colortwo as string, 16)
            const background = Number.parseInt(param_dict.background as string, 16)
            const cutoff = param_dict.cutoff as number

            const sampleRate = audio_buffer.sampleRate
            const channel_zero = audio_buffer.getChannelData(0)

            lowPassFilter(channel_zero, cutoff, sampleRate, 1)
            const capturer = new CCapture({
                display: true,
                framerate,
                format: "webm",
                name: "boids"
            })
    
            const scene = new Scene();
            const camera = new PerspectiveCamera(75, width/height, 0.1, 1000);
            const renderer = new WebGLRenderer();
            
            renderer.setSize(width, height);
            mount.current.appendChild(renderer.domElement);
            renderer.setClearColor(background)
            camera.position.set(0, 0, 10)
            const origin = new Vector3(0, 0, 0)
    
            const meshMaterials = [colorone, colortwo].map(color => {
                return new MeshBasicMaterial({color})
            })
            const lineMaterials = [colorone, colortwo].map(color => {
                return new LineBasicMaterial({color})
            })
            
            const cubes = [...Array(150).keys()].map((_) => {
                const cubeGeometry = new SphereGeometry(.1, .1, .1);
                const mesh_idx = randomInteger(0, 1)
                const cube = new Mesh(
                    cubeGeometry,
                    meshMaterials[mesh_idx]
                )
    
                const starting_phi = Math.random() * Math.PI
                const starting_rho = Math.random() * 2 * Math.PI
                cube.position.setFromSphericalCoords(3, starting_phi, starting_rho)
                
                const expands = mesh_idx === 1 ? true : false
    
                var line = null
    
                if (!expands) {
                    const points = [
                        origin,
                        new Vector3().setFromSphericalCoords(3, starting_phi, 0)
                    ]
                    const lineGeometry = new BufferGeometry().setFromPoints(points)
                    line = new Line(lineGeometry, lineMaterials[mesh_idx])
                    scene.add(line)
                }
    
                scene.add(cube)
                return {
                    instance: cube,
                    line,
                    starting_phi,
                    starting_rho,
                    expands
                }
            })

            const get_rms = get_rms_function(channel_zero)
            capturer.start();
            
            let time_in_ms = 0
            const animate = () => {
                requestAnimationFrame(animate)
                
                const time_in_seconds = time_in_ms / 1000

                if (time_in_ms / 1000 > duration) {
                    capturer.stop()
                    capturer.save(set_video_blob)
                    return
                }

                const currentFrame = Math.floor(sampleRate * time_in_seconds)
                const bump = Math.log10(get_rms(currentFrame - 2500, currentFrame + 2500) / 20) + 3
                
                cubes.forEach(cube => {
                    const radius = cube.expands ? Math.max(3 + bump, 3) : 3
                    cube.instance.position.setFromSphericalCoords(
                        radius,
                        cube.starting_phi,
                        (cube.starting_rho + time_in_seconds) % (2 * Math.PI)
                    )
    
                    if (!cube.expands) {
                        cube.line.setRotationFromAxisAngle(
                            new Vector3(0, 1, 0),
                            (cube.starting_rho + time_in_seconds) % (2 * Math.PI)
                        )
                    }
                })

                renderer.render(scene, camera)
                capturer.capture(renderer.domElement)

                time_in_ms += 1000 / framerate
            }

            animate()
        }}
    />
}

export default SpinningRenderer;