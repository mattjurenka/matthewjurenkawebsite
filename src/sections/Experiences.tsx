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
    	title: "Core Protect",
	description: "Co-Founded a Web3 security company around a product that \
	    helps users screen their transactions for scams and unsafe smart \
	    contracts.",
	link: "https://coreprotect.io/",
	from: "October 2022",
    	to: "PRESENT",
    },
    {
        title: "Amazon",
        description: "Spearheading transcript upload and auto-generation \
            service for Seller University, an onboarding program that \
            supports the millions of annual new sellers who build businesses \
            on-top of amazon.com, increasing accessibility and ease-of-use.",
        link: "https://amazon.com/",
        from: "May 2022",
        to: "Aug 2022"
    },
    {
        title: "SolarSPELL",
        description: <>{"Led a team of 3 to impact "} <bold>97,497</bold> {" students and educators through continued \
            development of the SolarSPELL device, a textbook delivery system \
            providing textbooks to more than "} <bold>395</bold> {" off-grid schools in "} <bold>9</bold>
            {" countries in the developing world."}</>,
        link: "https://solarspell.org/",
        from: "Sept 2019",
        to: "Jan 2022"
    },
]

export default () => {
    return <>
        <Typography variant="h3">Recent Experiences</Typography>
        {experiences_list.map((experience, idx) => <div
            key={idx} style={{marginTop: "2rem"}}
        >
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
            <Typography variant="body1" style={{marginTop: "0.5rem"}}>
                {experience.description}
            </Typography>
        </div>)}
    </>
}
