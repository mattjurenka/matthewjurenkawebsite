import { Box, Link, Typography } from "@material-ui/core"
import React from "react"

interface Experience {
    title: string,
    description: string,
    link: string,
    from: string
    to: string
}

const experiences_list: Experience[] = [
    {
        title: "SolarSPELL",
        description: "Developed and improving a webapp that manages the content \
            of the SolarSPELL device, a textbook delivery system that impacts \
            100,000 community members in the developing world.",
        link: "https://solarspell.org/",
        from: "Sept 2019",
        to: "Current"
    },
    {
        title: "ASU American Marketing Association",
        description: "Re-designed our chapter website which led to an increase \
            of monthly views by 100%",
        link: "https://www.amaasu.com/",
        from: "Mar 2020",
        to: "Current"
    },
    {
        title: "HeyMayo",
        description: "Integrated Firebase and Google Maps APIs to create a \
            dashboard used to visualize posts from all across the world.",
        link: "https://www.heymayo.com/",
        from: "Aug 2019",
        to: "Feb 2020"
    },
]

export default () => {
    return <>
        <Typography variant="h3">Experiences</Typography>
        <div style={{marginBottom: "2vh"}} />
        {experiences_list.map(experience => <div style={{marginTop: "2vh"}}>
            <Box display="flex">
                <Link
                    href={experience.link}
                    variant="h4"
                    color="inherit"
                    underline="always"
                    style={{marginRight: "1em"}}
                >
                    {experience.title}
                </Link>
                <Typography variant="subtitle1">
                    {`${experience.from} — ${experience.to}`}
                </Typography>
            </Box>
            <Typography variant="body1">
                {experience.description}
            </Typography>
        </div>)}
    </>
}
