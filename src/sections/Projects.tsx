import React from "react"

import {Typography, Box } from "@material-ui/core"
import {Link} from "gatsby"
import {Link as ExternalLink} from "@material-ui/core"

export default () => <>
    <Typography variant="h3">
        Featured Projects
    </Typography>
    {([
        [
            "Music Visualizers",
            "/visualizations/",
            "Collection of music visualizers that operate completely in the browser using technologies like P5, THREE, and CCapture.",
            "https://github.com/mattjurenka/matthewjurenkawebsite/tree/master/src/pages/visualizations"
        ],
        [
            "AMA Website Redesign 2020",
            "/ama_new_redesign",
            "Design of ASU's American Marketing Association's website. Follows last year's redesign which led to a \
            100% increase in monthly views."
        ],
        [
            "AMA Website Redesign 2019",
            "/ama_redesign",
            "Original Redesign of ASU's American Marketing Association's website."
        ],
    ] as [string, string, string, string | undefined][]).map(
        ([title, link, description, href]) => <>
        <div style={{marginTop: "1em"}}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <Link to={link}>
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
            <Typography variant="body1" style={{background: "white"}}>
                {description}
            </Typography>
        </div>
    </>)}
</>
