import { createTheme } from "@mui/material/styles"

// https://coolors.co/13162a-01baef-26c485-744fc6-efe9e7

export default function theme(mode) {

    return createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#01BAEF"
            },
            secondary: {
                main: "#26C485"
            },
            background: {
                default: "#272838",
                box: "#494949"
            }
        },
        typography: {
            fontFamily: 'Source Sans Pro, sans-serif',
            h1: {
                fontWeight: 600,
                fontSize: 56
            },
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 600,
            }
        }
    })
}