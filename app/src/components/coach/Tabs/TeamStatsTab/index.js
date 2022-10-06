import React, { useEffect, useState, useReducer, useRef } from "react";
import moment from 'moment'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Table, } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@mui/material";

import gameService from "../../../../services/game.service";
import PlayersTab from "./PlayersTab";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const TeamStatsTab = ({ gameList, team, t }) => {

    const [games, setGames] = useState(gameList.slice(0, 1));
    const [tagList, setTagList] = useState([])
    const [data, setData] = useReducer((old, action) => ({ ...old, ...action }), {
        team_score: 0,
        opponent_score: 0
    })

    const RULE = [
        {
            opponent: false,
            title: t("Shot"),
            id: "Shot",
            successful: [1, 3],
            unsuccessful: [2],
            row: [
                { action_id: 1, action_type_id: [1], title: t("Right") },
                { action_id: 1, action_type_id: [2], title: t("Left") },
                { action_id: 1, action_type_id: [3], title: t("Header") },
                { action_id: 1, action_type_id: [11], title: t("FreeKick") },
                { action_id: 1, action_type_id: [13], title: t("Penalty") }
            ]
        },
        {
            opponent: false,
            title: t("Pass"),
            id: "Pass",
            successful: [4],
            unsuccessful: [11, 15],
            row: [
                { action_id: 2, action_type_id: [7], title: t("KeyPass") },
                { action_id: 2, action_type_id: [6], title: t("ThroughPass") },
                { action_id: 2, action_type_id: [5], title: t("LongPass") },
                { action_id: 2, action_type_id: [4], title: t("ShortPass") },
                { action_id: 2, action_type_id: [14], title: t("ThrowIn") },
                { action_id: 2, action_type_id: [11], title: t("FreeKick") }]
        },
        {
            opponent: false,
            title: t("Dribble"),
            id: "Dribble",
            successful: [4],
            unsuccessful: [12, 17],
            row: [
                { action_id: 4, action_type_id: [1], title: t("Right") },
                { action_id: 4, action_type_id: [2], title: t("Left") }
            ]
        },
        {
            opponent: false,
            title: t("Cross"),
            id: "Cross",
            successful: [4],
            unsuccessful: [7, 8, 15],
            row: [
                { action_id: 3, action_type_id: [1], title: t("Right") },
                { action_id: 3, action_type_id: [2], title: t("Left") },
                { action_id: 3, action_type_id: [11], title: t("FreeKick") },
                { action_id: 3, action_type_id: [12], title: t("Corner") }
            ]
        },
        {
            opponent: false,
            title: t("Foul"),
            id: "Foul",
            row: [
                { action_id: 5, action_type_id: [8], title: t("Regular") },
                { action_id: 5, action_type_id: [9], title: t("YellowCard") },
                { action_id: 5, action_type_id: [10], title: t("RedCard") }
            ]
        },
        {
            opponent: false,
            title: t("DrawFoul"),
            id: "DrawFoul",
            row: [
                { action_id: 6, action_type_id: [8], title: t("Regular") },
                { action_id: 6, action_type_id: [9], title: t("YellowCard") },
                { action_id: 6, action_type_id: [10], title: t("RedCard") }]
        },
        {
            opponent: false,
            title: t("Interception"),
            id: "Interception",
            row: [
                { action_id: 10, action_type_id: [1, 2], title: t("Dribble") },
                { action_id: 10, action_type_id: [7], title: t("KeyPass") },
                { action_id: 10, action_type_id: [6], title: t("ThroughPass") },
                { action_id: 10, action_type_id: [5], title: t("LongPass") },
                { action_id: 10, action_type_id: [4], title: t("ShortPass") },
                { action_id: 10, action_type_id: [14], title: t("ThrowIn") }]
        },
        {
            opponent: false,
            title: t("Turnover"),
            id: "Turnover",
            row: [
                { action_id: 2, action_result_id: [11], title: t("BadPass") },
                { action_id: 4, action_result_id: [10, 12], title: t("BadDribble") },
                { action_id: 7, action_result_id: [15], title: t("Offside") },
            ]
        },
        {
            opponent: false,
            title: t("Saved"),
            id: "Saved",
            row: [
                { action_id: 8, action_type_id: [1, 2], title: t("Foot") },
                { action_id: 8, action_type_id: [3], title: t("Header") }
            ]
        },
        {
            opponent: false,
            title: t("Clearance"),
            id: "Clearance",
            row: [
                { action_id: 11, action_type_id: [1, 2], title: t("Foot") },
                { action_id: 11, action_type_id: [3], title: t("Header") }
            ]
        },
        {
            opponent: true,
            title: t("OpponentShot"),
            id: "OpponentShot",
            successful: [1, 3],
            unsuccessful: [2],
            row: [
                { action_id: 1, action_type_id: [1], title: t("Right") },
                { action_id: 1, action_type_id: [2], title: t("Left") },
                { action_id: 1, action_type_id: [3], title: t("Header") },
                { action_id: 1, action_type_id: [11], title: t("FreeKick") },
                { action_id: 1, action_type_id: [13], title: t("Penalty") }
            ]
        },
        {
            opponent: true,
            title: t("OpponentCross"),
            id: "OpponentCross",
            successful: [4],
            unsuccessful: [7, 8, 15],
            row: [
                { action_id: 3, action_type_id: [1], title: t("Right") },
                { action_id: 3, action_type_id: [2], title: t("Left") },
                { action_id: 3, action_type_id: [11], title: t("FreeKick") },
                { action_id: 3, action_type_id: [12], title: t("Corner") }
            ]
        },
    ]

    const { team_score, opponent_score } = data

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        if (value[value.length - 1] === "all") {
            setGames(gameList);
            return;
        }
        setGames(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const gameIds = games.length > 0 ? games.map(g => g.id).join(",") : 0;
        gameService.getScoreInGames(gameIds, team?.team_id ?? 0).then(res => {
            setData({ team_score: res.team_score, opponent_score: res.opponent_score })
        })
        gameService.getAllPlayerTagsByTeam(team?.team_id ?? 0, gameIds).then(res => {
            setTagList(res)
        })
    }, [games])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <FormControl sx={{ width: 600 }} className="my-3">
                    <InputLabel id="game-multiple-checkbox-label">{t("Games")}</InputLabel>
                    <Select
                        labelId="game-multiple-checkbox-label"
                        id="game-multiple-checkbox"
                        multiple
                        value={games}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {`${selected.length} ${t("Games")} ${t("selected")}`}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        <MenuItem value="all">
                            <Checkbox
                                checked={gameList.length > 0 && games.length === gameList.length}
                                indeterminate={games.length > 0 && games.length < gameList.length}
                                onChange={e => !e.target.checked && setGames([])}
                            />
                            <ListItemText
                                primary={'Select All'}
                            />
                        </MenuItem>
                        {gameList.map((g) => (
                            <MenuItem key={g.id} value={g}>
                                <Checkbox checked={games.indexOf(g) > -1} />
                                <ListItemText primary={`${moment(g.date).format('DD MMM, YYYY')} ${g.home_team_name} VS ${g.away_team_name}`} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={handlePrint}>Print this out!</Button>
            </Box>

            <div ref={componentRef}>
                <style type="text/css" media="print">{"\
                    @page {\ size: landscape;\ }\
                "}</style>
                <Box className="printable-data" sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 1}}>
                    <img src={require("../../../../assets/LogoforLightBackground.png")} alt="logo" />
                    <h3>{team.team_name}</h3>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: "50rem" }}>
                        <Card sx={{ m: 1, }}>
                            <Typography sx={{ textAlign: 'center', backgroundColor: 'lightgray' }}>{t("Goals")}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: "space-evenly", m: 2 }}>
                                <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{team?.team_name ?? t("MyTeam")}:</Typography>
                                <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{team_score ?? 0}{' '}({games.length > 0 ? (team_score / games.length).toFixed(1) || 0 : 0})</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: "space-evenly", m: 2 }}>
                                <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{t("Opponents")}:</Typography>
                                <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{opponent_score ?? 0}{' '}({games.length > 0 ? (opponent_score / games.length).toFixed(1) || 0 : 0})</Typography>
                            </Box>
                        </Card>

                        <Card sx={{ m: 1 }}>
                            <PlayersTab gameIds={games.length > 0 ? games.map(g => g.id).join(",") : 0} teamId={team.team_id} />
                        </Card>
                    </Box>
                    <div style={{ textAlign: "justify" }}>
                        {RULE.map((rule, idx) => {
                            let sum_success = 0, sum_unsuccess = 0
                            return <Card sx={{ fontSize: "0.8rem", position: "relative", margin: "0.5rem", maxWidth: 500, minWidth: 320, display: "inline-block", verticalAlign: "top" }} key={idx}>
                                <Typography sx={{ textAlign: 'center', backgroundColor: 'lightgray', fontWeight: "bold", textTransform: "uppercase" }}>
                                    {rule.title}
                                </Typography>
                                <Table responsive="sm" striped borderless hover size="sm" className='text-uppercase coach-actionlist-table'>
                                    <tbody className='text-center' style={{ m: 0 }}>
                                        {!!rule?.successful && <tr>
                                            {rule.id === "Shot" ?
                                                <>
                                                    <td></td>
                                                    <td><p style={{ fontWeight: "bold" }}>{t("OnTarget")}</p></td>
                                                    <td><p style={{ fontWeight: "bold" }}>{t("OffTarget")}</p></td>
                                                </>
                                                :
                                                <>
                                                    <td></td>
                                                    <td><p style={{ fontWeight: "bold" }}>{t("Successful")}</p></td>
                                                    <td><p style={{ fontWeight: "bold" }}>{t("Unsuccessful")}</p></td>
                                                </>
                                            }
                                        </tr>}
                                        {rule.row.map((type, i) => {
                                            const data = !!tagList ? tagList.filter(t =>
                                                (RULE[idx]?.opponent === (t.team_id !== team?.team_id ?? 0)) &&
                                                t.action_id === type.action_id &&
                                                (!type?.action_result_id ? true : type.action_result_id.includes(t.action_result_id)) &&
                                                (!type?.action_type_id ? true : type.action_type_id.includes(t.action_type_id))
                                            ) : []
                                            const success = data.filter(f => !rule?.successful ? true : rule?.successful.includes(f.action_result_id))
                                            const unsuccess = data.filter(f => !rule?.unsuccessful ? true : rule?.unsuccessful.includes(f.action_result_id))
                                            sum_success += success.length
                                            sum_unsuccess += unsuccess.length
                                            return (<>
                                                <tr key={i}>
                                                    <td style={{ width: "20%", minWidth: 120 }}><p>{type.title}</p></td>
                                                    <td
                                                        width="40%"
                                                    >
                                                        <span style={success.length > 0 ? { color: "#007200" } : {}}>
                                                            {success.length}
                                                        </span>{" "}
                                                        ({games.length > 0 ? (success.length / games.length).toFixed(1) || 0 : 0})
                                                    </td>
                                                    {
                                                        !!rule?.successful &&
                                                        <td
                                                            width="40%"
                                                        >
                                                            <span style={unsuccess.length > 0 ? { color: "red" } : {}}>
                                                                {unsuccess.length}
                                                            </span>{" "}
                                                            ({games.length > 0 ? (unsuccess.length / games.length).toFixed(1) || 0 : 0})
                                                        </td>
                                                    }
                                                </tr>
                                                {!!rule?.successful && rule.row.length === i + 1 &&
                                                    <tr key={i + 1}>
                                                        <td></td>
                                                        <td style={{ fontWeight: "bold", color: "#007200" }}>
                                                            {(sum_success / (sum_success + sum_unsuccess) * 100 || 0).toFixed(1)}%
                                                        </td>
                                                        <td style={{ fontWeight: "bold", color: "red" }}>
                                                            {(sum_unsuccess / (sum_success + sum_unsuccess) * 100 || 0).toFixed(1)}%
                                                        </td>
                                                    </tr>
                                                }
                                            </>)
                                        })}
                                    </tbody>
                                </Table>
                            </Card>
                        })}
                    </div>
                </Box>
            </div>

        </Box >
    );
}

export default TeamStatsTab;