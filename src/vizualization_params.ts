type param_info = ({
    type: "color",
    default: string
} | {
    type: "range",
    default: number
    range: [number, number]
} | {
    type: "option",
    default: string
    options: string[]
}) & {
    name: string,
    title: string,
    column: 1 | 2 | 3
}

const vizualizations_dict: {
    specific: {
        [name: string]: param_info[]
    }
    all: param_info[]
} = {
    specific: {
        boids: [
            {
                name: "numboids",
                title: "Number of Boids",
                type: "range",
                default: 75,
                range: [1, 150],
                column: 3
            },
            
            {
                name: "background",
                title: "Background Color",
                type: "color",
                default: "2D2D2D",
                column: 1
            },
            {
                name: "fill",
                title: "Fill Color",
                type: "color",
                default: "E6E6E6",
                column: 2
            },
        ],
        spinning: [
            {
                name: "colorone",
                type: "color",
                title: "Color One",
                default: "0B8ABD",
                column: 1
            },
            {
                name: "colortwo",
                type: "color",
                title: "Color Two",
                default: "F05C22",
                column: 1
            },
            {
                name: "background",
                type: "color",
                title: "Background",
                default: "FFDB6E",
                column: 2
            },
            {
                name: "cutoff",
                title: "Cutoff Frequency",
                type: "range",
                default: 200,
                range: [1, 8192],
                column: 3
            },
        ],
        field: [
            
        ]
    },
    all: [
        {
            name: "height",
            title: "Video Height",
            type: "range",
            default: 1024,
            range: [128, 2048],
            column: 3
        },
        {
            name: "width",
            title: "Video Width",
            type: "range",
            default: 1024,
            range: [128, 2048],
            column: 3
        },
        {
            type: "option",
            default: "Yes",
            options: ["Yes", "No"],
            column: 3,
            name: "is_realtime",
            title: "Realtime"
        },
        {
            name: "duration",
            title: "Duration in Seconds",
            type: "range",
            default: 60,
            range: [5, 2048],
            column: 3
        },
        {
            name: "framerate",
            title: "Framerate",
            type: "range",
            default: 30,
            range: [1, 128],
            column: 3
        },
    ]
}

export default vizualizations_dict