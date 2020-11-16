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
        [name: string]: {
            url_params: param_info[]
            example: {
                artist: string,
                artist_url: string,
                song: string
            }
            order: number
        }
    }
    default_params: param_info[]
} = {
    specific: {
        boids: {
            url_params: [
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
            example: {
                artist: "HWLS",
                artist_url: "https://open.spotify.com/artist/4ODo634wVqDxqgVSlXE2LO",
                song: "Met-U",
            },
            order: 3
        },
        spinning: {
            url_params: [
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
            example: {
                artist: "Quiet Bison",
                artist_url: "https://open.spotify.com/artist/5PmmaiHnrygDvhj3kaPT0f",
                song: "Thimble",
            },
            order: 2
        },
        field: {
            url_params: [
                {
                    name: "fill",
                    type: "color",
                    title: "Fill",
                    default: "F7DBA7",
                    column: 1
                },
                {
                    name: "background",
                    type: "color",
                    title: "Background",
                    default: "1E1E24",
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
            example: {
                artist: "PARTÎ",
                artist_url: "https://soundcloud.com/officialparti/boundaries",
                song: "Boundaries",
            },
            order: 4
        },
        voronoi: {
            url_params: [
                {
                    name: "fill",
                    type: "color",
                    title: "Fill",
                    default: "FFA200",
                    column: 1
                },
                {
                    name: "background",
                    type: "color",
                    title: "Background",
                    default: "1E1E24",
                    column: 2
                },
            ],
            example: {
                artist: "Kapote",
                artist_url: "https://open.spotify.com/artist/3sySIHNL0hqR7eOlm3LNTH?si=d4tujuD0RSid8eKZ8xfqpQ",
                song: "Get Down Brother 2020",
            },
            order: 1
        },
    },
    default_params: [
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