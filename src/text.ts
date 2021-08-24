import {Project} from "."

export const intro = "I love software engineering because it's hard. There are \
    an infinite number of ways to approach a problem and an infinite number of \
    ways you can shoot yourself in the foot. The reason I wake up in the \
    morning is to find new ways to manage that complexity and discover new \
    solutions nobody has thought of before."

export const intent = "This website is intended to showcase my projects, \
    abilities, and experiences as a programmer, but also to organize and share \
    websites and tools I have found useful that others may not have heard of."

export const linkedin = "https://www.linkedin.com/in/matthew-jurenka-a4177618a/"
export const github = "https://github.com/mattjurenka"
export const email = "mailto:main@matthewjurenka.com"

export const featured_projects: Project[] = [
    [
        "Content Curation Webapp",
        "/contentcuration/",
        "I led a team of graduate students to build a website to handle \
            at least 100,000 content items and 10 concurrent members \
            of the  SolarSPELL content curation team.",
        ["TypeScript", "React", "Django", "PostgreSQL", "Redux", "RxJS", "OAuth"],
        "https://github.com/SolarSPELL-Main/content-curation",
    ],
    [
        "Digital Library Management System",
        "/dlms/",
        "Internal webapp that packages curated content into a format usable \
            in the actual SolarSPELL device.",
        ["TypeScript", "React", "Django", "PostgreSQL"],
        "https://github.com/SolarSPELL-Main/solarspell-dlms",
    ],
    [
        "Music Visualizers",
        "/visualizations/",
        "Collection of music visualizers that operate completely in the \
            browser, creating downloadable video programatically.",
        ["TypeScript", "React", "P5"],
        "https://github.com/mattjurenka/matthewjurenkawebsite/tree/master/"
            + "src/pages/visualizations"
    ],
    [
        "Personal Website",
        "/",
        "This website.",
        ["TypeScript", "React", "Heroku"],
        "https://github.com/mattjurenka/matthewjurenkawebsite"
    ],
    [
        "Instagram Post Slack Bot",
        "https://github.com/mattjurenka/mayoinstagram",
        "Slack bot that makes it easy for users to create inspirational quote \
            posts for Instagram.",
        ["TypeScript", "MongoDB", "Node.js", "Express"],
        "https://github.com/mattjurenka/mayoinstagram"
    ],
]

export const more_projects: Project[] = [
    [
        "AMA Website Redesign 2020",
        "/ama_new_redesign/",
        "Design of ASU's American Marketing Association's website. \
            Follows last year's redesign which led to a 100% increase \
            in monthly views.",
        ["WiX"],
        undefined
    ],
    [
        "Exeggutor Discord Bot",
        "https://github.com/mattjurenka/exeggutor",
        "Winning submission of the Summer 2021 ASU Software Developer Association \
            Discord bot contest.",
        ["TypeScript"],
        "https://github.com/mattjurenka/exeggutor",
    ],
    [
        "AMA Website Redesign 2019",
        "/ama_redesign/",
        "Original Redesign of ASU's American Marketing Association's website.",
        ["WiX"],
        undefined
    ]
]
