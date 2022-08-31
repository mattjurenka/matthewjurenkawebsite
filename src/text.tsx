import {Project} from "."
import React from "react"

export const linkedin = "https://www.linkedin.com/in/matthewjurenka"
export const github = "https://github.com/mattjurenka"
export const email = "mailto:main@matthewjurenka.com"

export const intro = "I love programming because it's hard. There are \
    an infinite number of ways to approach a problem and an infinite number of \
    ways you can shoot yourself in the foot. The reason I wake up in the \
    morning is to find new ways to manage that complexity and discover new \
    solutions nobody has thought of before."

export const intent = <>
    {"My current specialty is blockchain and cryptocurrency projects, whether \
    that be creating tokens, smart contracts, project websites, or anything\
    else you may need to make your project a success. I have worked with \
    most popular frameworks, and can pick up any other platform out there. If \
    you have a project you need help with, feel free to send me an email "}
    <a href={email}>here,</a>
    {" and I will get back to you within two business days."}
</>


export const featured_projects: Project[] = [
    [
        "MayhemHeroes",
        "https://forallsecure.com/mayhem-heroes",
        <>{"Earned roughly"} <bold>$31,000</bold> {"through a hackathon by integrating a software \
            testing tool with"} <bold>36</bold> {"open-source repositories totaling over"} <bold>28,725</bold>
            {" stars on GitHub. This led to the discovery of"} <bold>5</bold> {"potential Zero-Day \
            Vulnerabilities."}</>,
        ["Rust", "Docker", "Go", "Github Actions", "Fuzzing"],
        undefined
    ],
    [
        "Content Curation Webapp",
        "/contentcuration/",
        <>{"I led a team of three to build a website to handle \
            at least"} <bold>100,000</bold> {"content items and"} <bold>10</bold>
	    {" concurrent members of the  SolarSPELL content curation team."}</>,
        [
            "TypeScript", "React", "Django", "PostgreSQL", "Redux", "RxJS",
            "OAuth", "Babel"
        ],
        "https://github.com/SolarSPELL-Main/content-curation",
    ],
    [
        "Ethereum Environmental Certifications",
        "/happyfeet/",
        "Platform that environmental organizations can use to certify that \
            a given group or manufacturer uses green processes. Built on the \
            Ethereum blockchain.",
        [
            "Ethereum", "Solidity", "TypeScript", "React", "Web3.js", "hardhat",
        ],
        undefined
    ],
    [
        "Lambda Lounge",
        "https://lambdalounge.net/",
        "Mini-Blogging platform that allows users to upload code snippets and \
            share functional programming knowledge. (Posting disabled because \
            I am unwilling to moderate it)",
        [
            "Rust", "TypeScript", "MongoDB", "WebAssembly", "Actix",
            "Cloudflare Workers", "React"
        ],
        "https://github.com/mattjurenka/lambda-lounge"
    ],
]

export const more_projects: Project[] = [
    [
        "VanaLabs",
        "https://www.vanalabs.com/",
        "Designed six pages for CBD infusion brand VanaLabs. Included a focus \
            on SEO-optimized design, and element placement that leads to \
            increased conversion",
        ["SquareSpace", "Google Analytics", "Hotjar"],
        undefined
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
        "Digital Library Management System",
        "/dlms/",
        "Internal webapp that packages curated content into a format usable \
            in the actual SolarSPELL device.",
        ["TypeScript", "React", "Django", "PostgreSQL"],
        "https://github.com/SolarSPELL-Main/solarspell-dlms",
    ],
    [
        "Instagram Post Slack Bot",
        "https://github.com/mattjurenka/mayoinstagram",
        "Slack bot that makes it easy for users to create inspirational quote \
            posts for Instagram.",
        ["TypeScript", "MongoDB", "Node.js", "Express"],
        "https://github.com/mattjurenka/mayoinstagram"
    ],
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
        "Personal Website",
        "/",
        "This website.",
        ["TypeScript", "React", "Heroku"],
        "https://github.com/mattjurenka/matthewjurenkawebsite"
    ],
    [
        "AMA Website Redesign 2019",
        "/ama_redesign/",
        "Original Redesign of ASU's American Marketing Association's website.",
        ["WiX"],
        undefined
    ],
]
