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
            color: "black",
            lineHeight: "1.75rem",
            position: "relative",
            top: "-0.25rem",
            textAlign: "justify",
        },
    },
    overrides: {
        MuiButton: {
            outlined: {
                fontWeight: 600
            }
        },
        MuiChip: {
            label: {
                fontFamily: josephine_sans,
            },
            root: {
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.2)"
            }
        }
    }
})

export default theme
