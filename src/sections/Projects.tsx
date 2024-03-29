import React from "react"

import {Typography, Box, Chip } from "@material-ui/core"
import {Link} from "gatsby"
import {Link as ExternalLink} from "@material-ui/core"
import {Project} from ".."

interface ProjectsProps {
    title: string
    projects: Project[]
}

export default ({title, projects}: ProjectsProps) => <>
    <Typography variant="h3">
        {title}
    </Typography>
    {projects.map(
        ([title, link, description, technologies, href]) => <>
        <div style={{marginTop: "2rem"}}>
            <Box
                display="flex" flexDirection="row"
                flexWrap="wrap" alignItems="center"
            >
                <Box>
                    <Link to={link} style={{textDecorationColor: "black"}}>
                        <Typography
                            variant="h4"
                            style={{background: "white"}}
                        >
                            {title}
                        </Typography>
                    </Link>
                </Box>
            {href !== undefined ?
                <Box style={{marginLeft: "1em"}}>
                    <ExternalLink
                        variant="subtitle1"
                        href={href}
                        style={{
                            textDecoration: "underline",
                            background: "white"
                        }}>
                        Source Code
                    </ExternalLink>
                </Box> :
                <></>}
            </Box>
            <Typography variant="body1" style={{background: "inherit", marginTop: "0.5rem"}}>
                {description}
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                {technologies.map(tech => <Chip
                    label={tech}
                    style={{marginRight: "1rem", marginTop: "1rem"}}
                />)}
            </Box>
        </div>
    </>)}
</>
