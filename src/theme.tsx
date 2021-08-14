import { createMuiTheme } from "@material-ui/core";


const josephine_sans = "'Josefin Sans', sans-serif"
const crimson_text = "'Crimson Text', sans-serif"
const navy_blue = "#00008B"

const theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: josephine_sans,
            fontSize: 32,
        },
        h2: {
            fontFamily: josephine_sans,
            fontSize: 24,
            color: navy_blue 
        },
        h3: {
            fontFamily: josephine_sans,
            fontSize: 16,
            color: navy_blue,
            textTransform: "uppercase",
            fontWeight: 600
        },
        h4: {
            fontFamily: josephine_sans,
            fontSize: 16,
            color: "black",
            fontWeight: 600,
        },
        subtitle1: {
            fontFamily: josephine_sans,
            fontSize: 12,
            color: "black",
            marginBottom: 0,
            paddingBottom: 0,
            fontWeight: 600
        },
        body1: {
            fontFamily: crimson_text,
            fontSize: 16,
            color: "black"
        },
    },
    overrides: {
        MuiButton: {
            outlined: {
                fontWeight: 600
            }
        }
    }
})

export default theme
