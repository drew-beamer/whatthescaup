import { Typography, Backdrop, Box, CircularProgress, TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Paper, RadioGroup, Radio, FormControlLabel } from "@mui/material";

import { getDatabase, ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { useEffect, useState } from "react";







export default function Leaderboard(props) {
    const [leaders, setLeaders] = useState(undefined);
    const [category, setCategory] = useState("best")



    const fetchLeaders = () => {
        const database = getDatabase();
        const topUsers = query(ref(database, 'users/'));
        get(topUsers).then((snapshot) => {
            if (snapshot.exists()) {
                setLeaders(snapshot.val())
            }
        })

    }

    fetchLeaders();

    let loading = true;
    const rows = []

    if (leaders !== undefined) {
        loading = false;
        let users = []
        Object.keys(leaders).reverse().forEach((key) => {
            users.push(leaders[key]);
        })

        users.sort((a, b) => {
            if (category === "accuracy") {
                users = users.filter((user) => {
                    return user["scaup_" + "total"] > 100;
                })
                return (b["scaup_" + "right"] / b["scaup_" + "total"]) - (a["scaup_" + "right"] / a["scaup_" + "total"]);
            }
            return b["scaup_" + category] - a["scaup_" + category]
        })

        let rank = 1;
        users.forEach((user) => {
            const formatted = {
                rank: rank,
                name: user["user_name"],
                score: category === "accuracy" ? (100 * user["scaup_" + "right"] / user["scaup_" + "total"]).toPrecision(4) + "%" : user["scaup_" + category]
            }
            rows.push(formatted)
            rank++
        })

    }

    const columns = [
        { id: "rank", label: "Rank", width: 50 },
        { id: "name", label: "Name", align: "left", width: 50 },
        { id: "blank", width: 50 },
        { id: "score", label: category === "accuracy" ? "% Correct" : category === "right" ? "Number Correct" : "Streak", align: "right", width: 150 },
    ]

    return <Backdrop open={props.open} sx={{ zIndex: 2000 }}>
        <Box sx={{ bgcolor: "background.default", minWidth: "60%", maxWidth: "90%", maxHeight: "95%", minHeight: "80%", p:4, borderRadius: 5, overflowY: "auto" }}>
            <Box onClick={props.close} sx={{ width: "100%", display: "flex", justifyContent: "right", "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                close
            </Box>
            <Typography variant={"h3"}>leaderboard.</Typography>
            
            <Box>
                <RadioGroup value={category} row name="horiz-group" sx={{ display: { xs: "flex", sm: "flex" } }} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="best" label="Longest Streak" control={<Radio />} />
                    <FormControlLabel value="streak" label="Current Streak" control={<Radio />} />
                    <FormControlLabel value="accuracy" label="Overall Accuracy*" control={<Radio />} />
                    <FormControlLabel value="right" label="Total Right" control={<Radio />} />
                </RadioGroup>
            </Box>



            {loading ? <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress /></Box> : <Paper sx={{ mt: 1, overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 350}}>
                    <Table stickyHeader sx={{ bgcolor: "background.default"}}>


                        <TableHead>
                            <TableRow >
                                {columns.map((column) => {
                                    return <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.width }}
                                    >
                                        {column.label}
                                    </TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return <TableRow hover>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return <TableCell key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.width }}>
                                            {value}
                                        </TableCell>
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>            </Paper>}
                <Typography sx={{mt: 2, fontSize: 12}}>*min. 100 quizzes to qualify for overall accuracy</Typography>
        </Box>
    </Backdrop>
}