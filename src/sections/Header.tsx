import React from "react"

import {Typography, Box } from "@material-ui/core"
import {GitHub, LinkedIn, Email} from "@material-ui/icons"
import {github, linkedin, email} from "../text"
import { Link } from "gatsby"

export const Header = () => <>
    <Typography variant="h1">
        Matthew Jurenka
    </Typography>
    <Typography variant="h2" style={{marginTop: "0.5rem"}}>
        Freelance Fullstack Engineer
    </Typography>
    <Box display="flex" style={{marginTop: "0.5rem"}}>
        <Link
            to={github}
            style={{color: "black"}}
        >
            <GitHub style={{marginTop: "0.25rem", height: "1.5rem", width: "1.5rem"}} />
        </Link>
        <Link
            to={linkedin}
            style={{color: "black", marginLeft: "0.5rem"}}
        >
            <LinkedIn style={{height: "2rem", width: "2rem"}} />
        </Link>
        <a
            href={email}
            style={{color: "black", marginLeft: "0.5rem"}}
        >
            <Email style={{height: "2rem", width: "2rem"}} />
        </a>
    </Box>
</>
