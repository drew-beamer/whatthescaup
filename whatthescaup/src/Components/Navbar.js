import { AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton, Backdrop } from "@mui/material"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import scaup from "./scaup.png"
import { useState } from "react";
import Leaderboard from "./Leaderboard";


export default function Navbar(props) {

    const [leaderboardShow, setLeaderboardShow] = useState(false);

    if (props.user !== null) console.log(props.user.photoURL);
    return <Box><AppBar sx={{ bgcolor: "background.default", backgroundImage: "none", boxShadow: 0 }} position="static">
        <Toolbar sx={{display: "flex", flexWrap: "none"}}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
                <img src={scaup} alt={"a geometric scaup head"} style={{ height: "25px" }} />
                <Typography variant="h5" component="div" sx={{ pl: 2, display: {xs: "none", sm: "block"} }}>
                    whatthescaup.
                </Typography>
            </Box>

            <Box sx={{display: "flex"}}>
                <IconButton onClick={props.handleMode} mx={0}>
                    {props.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <Button color="inherit" sx={{ fontSize: 14, p: 1, mx: 2, fontWeight: 600 }} onClick={() => setLeaderboardShow(true)}>Leaderboard</Button>
                {props.user === null ? <Button color="primary" sx={{ fontSize: 14, p: 1, mx: 0, fontWeight: 600 }} onClick={props.login}>Login</Button> : <Box onClick={props.logout}><Avatar src={props.user.photoURL} /></Box>}
            </Box>

        </Toolbar>
    </AppBar>
    <Leaderboard open={leaderboardShow} close={() => setLeaderboardShow(false)}/>
    </Box>
}