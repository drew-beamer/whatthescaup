import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material"

export default function Navbar(props) {

    if (props.user !== null) console.log(props.user.photoURL);
    return <AppBar sx={{ bgcolor: "background.default", backgroundImage: "none", boxShadow: 0 }} position="static">
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                whatthescaup.
            </Typography>
            {props.user === null ? <Button color="inherit" sx={{ fontSize: 14, p: 1, fontWeight: 600 }} onClick={props.login}>Login</Button> : <Box onClick={props.logout}><Avatar src={props.user.photoURL} /></Box>}

        </Toolbar>
    </AppBar>
}