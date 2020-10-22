import { Grid, ThemeProvider, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import theme from "../theme"

const pages: Array<[string, string]> = [
    ["Home", "/"],
    ["Audio Visualizers", "/visualizations"],
    ["AMA Redesign", "/ama_new_redesign"],
]

const FourOFour = () => {
    return <ThemeProvider theme={theme}>
        <Grid container style={{
            paddingLeft: "25vw",
            paddingTop: "8em",
        }}>
            <div>
                <Typography variant="h1">404 Not Found 😭</Typography>
                <Typography variant="body1">Were you looking for?</Typography>
                <ul>
                    {pages.map(val => <li style={{marginBottom: "1em"}}>
                        <Link to={val[1]}>
                            <Typography variant="h4">
                                {val[0]}
                            </Typography>
                        </Link>
                    </li>)}
                </ul>
            </div>
        </Grid>    
    </ThemeProvider>
}

export default FourOFour