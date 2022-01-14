import React from "react"

import {Typography, Box } from "@material-ui/core"
import {GitHub, LinkedIn, Email} from "@material-ui/icons"
import {github, linkedin, email} from "../text"
import { Link } from "gatsby"

export const Header = () => <>
    <Typography variant="h1">
        Matthew Jurenka
    </Typography>
    <Typography variant="h2">
        Web Developer
    </Typography>
    <Box display="flex">
        <Link
            to={github}
            style={{color: "black"}}
        >
            <GitHub />
        </Link>
        <Link
            to={linkedin}
            style={{color: "black", marginLeft: "4px"}}
        >
            <LinkedIn />
        </Link>
        <a
            href={email}
            style={{color: "black", marginLeft: "4px"}}
        >
            <Email />
        </a>
    </Box>
</>
