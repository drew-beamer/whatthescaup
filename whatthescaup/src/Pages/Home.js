import { Alert, Box, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import imagedata from '../imagedata.json';

var data = imagedata.scaups;

export default function Home(props) {

    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);

    const [currentImage, setCurrentImage] = useState(0);

    const [alertShow, setAlertShow] = useState("none");

    const getNewScaup = () => {
        let newImage = Math.floor(Math.random() * data.length)
        while (newImage === currentImage) {
            newImage = Math.floor(Math.random() * data.length);
        }
        setCurrentImage(newImage);
    }

    useEffect(() => {
        getNewScaup();
    }, [])

    useEffect(() => {
        if (best < streak) {
            setBest(best + 1);
        };
    })

    const validate = (response) => {
        if (response == data[currentImage].type) {
            setAlertShow("success");
            setStreak(streak + 1);
            getNewScaup();
        } else {
            setAlertShow("wrong");
            setStreak(0);
            getNewScaup();
        }
    }

    return <Box sx={{py: 2, px: 3}}>
        <Typography variant="h4" sx={{pb: 2}}>whatthescaup.</Typography>
        <Box alignItems="center" justifyContent="center" sx={{ display: "flex" }}>
            <Grid container spacing={1.5} alignItems="center" justifyContent="center" sx={{maxWidth: "750px" }}>
                <Grid item xs={6}>
                    <Box bgcolor="primary.main" sx={{ borderRadius: 5, boxShadow: 5 }}>
                        <Box sx={{ borderRadius: 5, px: 3, py: 2, background: "linear-gradient(to bottom right, #ffffff50, #00000015)", width: "100%", height: "100%" }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4} md={2} lg={2}>
                                    <Typography variant="h4">🔥</Typography>
                                </Grid>
                                <Grid item xs={8} md={10} lg={10} sx={{ color: "white" }}>
                                    <Typography variant="h5" sx={{ lineHeight: "80%" }}>STREAK</Typography>
                                    <Typography sx={{ fontSize: 24, }}>{streak}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box bgcolor="secondary.main" sx={{ borderRadius: 5, boxShadow: 5 }}>
                        <Box sx={{ borderRadius: 5, px: 3, py: 2, background: "linear-gradient(to bottom right, #ffffff50, #00000015)", width: "100%", height: "100%" }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4} md={2} lg={2}>
                                    <Typography variant="h4">🏆</Typography>
                                </Grid>
                                <Grid item xs={8} md={10} lg={10} sx={{ color: "white" }}>
                                    <Typography variant="h5" sx={{ lineHeight: "80%" }}>BEST</Typography>
                                    <Typography sx={{ fontSize: 24 }}>{best}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {alertShow === "success" ? <Alert sx={{ borderRadius: 2, boxShadow: 0.5 }} severity="success">Correct!</Alert> : alertShow === "wrong" ? <Alert sx={{ borderRadius: 2, boxShadow: 0.5 }} severity="error">Incorrect!</Alert> : null}
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ borderRadius: 5, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: 5 }}>
                            <img src={data[currentImage].filepath} style={{ borderRadius: "20px", width: "100%", height: "350px", objectFit: "cover" }} />

                        </Box>


                    </Box>
                    <Typography sx={{ textAlign: "center", mt: 1 }}>This scaup was made possible by {data[currentImage].photographer}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ border: "1px solid #DFD9E2", px: 3, py: 2, boxShadow: 5, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", transition: "0.3s", "&:hover": { boxShadow: 10, cursor: "pointer" } }} onClick={() => {
                        validate("Greater Scaup")
                    }}>
                        <Typography sx={{ textAlign: "center" }} variant="h5">Greater</Typography>

                    </Box>

                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ border: "1px solid #DFD9E2", px: 3, py: 2, boxShadow: 5, backgroundColor: "", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", transition: "0.3s", "&:hover": { boxShadow: 10, cursor: "pointer" } }} onClick={() => {
                        validate("Lesser Scaup")
                    }}>
                        <Typography sx={{ textAlign: "center" }} variant="h5">Lesser</Typography>

                    </Box>
                </Grid>
            </Grid>
            <Box>

            </Box>

        </Box></Box>
}