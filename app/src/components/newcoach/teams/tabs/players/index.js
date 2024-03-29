import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from '@mui/material';

import { PLAYER_ICON_DEFAULT } from '../../../../../common/staticData';
import { getComparator, stableSort } from '../../../components/utilities';
import { ActionData } from '../../../components/common';
import GameService from '../../../../../services/game.service';
import TeamPlayerStatDialog from './status';
import { getPeriod } from '../../../games/tabs/overview/tagListItem';
import TeamStatsVideoPlayer from '../stats/videoDialog';
import GameExportToEdits from '../../../games/tabs/overview/exportEdits';

const headCells = [
    { id: 'total_player_games', title: 'Games' },
    { id: 'total_goal', title: 'Goals', action: 'Goal' },
    { id: 'total_shot', title: 'Shots', action: 'GoalKick' },
    { id: 'total_dribble', title: 'Dribbles', action: 'Dribble' },
    { id: 'total_crosses', title: 'Crosses', action: 'Cross' },
    { id: 'total_corner', title: 'Corners', action: 'Corner' },
    { id: 'total_free_kick', title: 'Free Kicks', action: 'FreeKick' },
    { id: 'total_passes', title: 'Passes', action: 'Passes' },
    { id: 'total_turnover', title: 'Turnovers', action: 'Turnover' },
    { id: 'total_fouls', title: 'Fouls', action: 'Foul' },
    { id: 'total_draw_fouls', title: 'Draw Fouls', action: 'DrawFoul' },
    { id: 'total_interception', title: 'Interceptions', action: 'Interception' },
    { id: 'total_tackle', title: 'Tackles', action: 'Tackle' },
    { id: 'total_saved', title: 'Saved', action: 'Saved' },
    { id: 'total_blocked', title: 'Blocked', action: 'Blocked' },
    { id: 'total_clearance', title: 'Clearance', action: 'Clearance' }
];

const TeamPlayersStats = ({ teamId, seasonId, leagueId, gameIds, games, t }) => {
    const [playerList, setPlayerList] = useState([]);
    const [playerIds, setPlayerIds] = useState([]);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('total_player_games');
    const [statOpen, setStatOpen] = useState(false);
    const [playerStat, setPlayerStat] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [playData, setPlayData] = useState([]);
    const [videoOpen, setVideoOpen] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [detectStats, setDetectStats] = useState([]);
    const [exportOpen, setExportOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    const getPlayerStatus = (id) => {
        if (detectStats.length > 0) return detectStats.filter((item) => item.player_id === id)[0];

        return null;
    };

    const handleRequestSort = (prop) => {
        const isAsc = orderBy === prop && order === 'desc';

        setOrder(isAsc ? 'asc' : 'desc');
        setOrderBy(prop);
    };

    const getSortedArray = () => {
        if (playerList.length > 0 && detectStats.length > 0) {
            const sortedStats = stableSort(detectStats, getComparator(order, orderBy));
            const inside = playerList.filter((item) => playerIds.includes(item.id));
            let newList = [];

            sortedStats.map((item) => {
                const newItem = inside.filter((data) => data.id === item.player_id);

                if (newItem.length === 1) newList = [...newList, newItem[0]];

                return newList;
            });

            return newList;
        }

        return [];
    };

    const handleDisplayList = (player) => {
        if (gameIds.length > 0) {
            if (player.pos_name === 'Goalkeeper') {
                GameService.getGoalkeepersStatsAdvanceSummary({
                    seasonId: seasonId,
                    leagueId: null,
                    gameId: gameIds.join(','),
                    teamId: teamId,
                    playerId: player.id,
                    gameTime: '1,2,3,4,5,6',
                    courtAreaId: '1,2,3,4',
                    insidePaint: null,
                    homeAway: null,
                    gameResult: null
                }).then((res) => {
                    setCurrentPlayer(player);
                    setPlayerStat(res[0]);
                    setStatOpen(true);
                });
            } else {
                GameService.getPlayersStatsAdvanced({
                    seasonId: seasonId,
                    leagueId: null,
                    gameId: gameIds.join(','),
                    teamId: teamId,
                    playerId: player.id,
                    gameTime: '1,2,3,4,5,6',
                    courtAreaId: '1,2,3,4',
                    insidePaint: null,
                    homeAway: null,
                    gameResult: null
                }).then((res) => {
                    setCurrentPlayer(player);
                    setPlayerStat(res[0]);
                    setStatOpen(true);
                });
            }
        } else window.alert("No selected games. Please click 'Select Games' button to select.");
    };

    const handleDisplayVideo = (cell, player_id) => {
        if (playerIds.includes(player_id) && getPlayerStatus(player_id) && getPlayerStatus(player_id)[cell.id] !== 0 && cell.title !== 'Games') {
            GameService.getGamePlayerTags(
                currentUser.id,
                teamId,
                `${player_id}`,
                gameIds.join(','),
                ActionData[cell.action].action_id,
                ActionData[cell.action].action_type_id,
                ActionData[cell.action].action_result_id,
                null,
                null,
                null,
                null,
                null
            ).then((res) => {
                setPlayData(
                    res.map((item) => {
                        return {
                            tag_id: item.id,
                            start_time: item.player_tag_start_time,
                            end_time: item.player_tag_end_time,
                            player_name: item.player_names,
                            action_name: item.action_names,
                            action_type: item.action_type_names,
                            action_result: item.action_result_names,
                            game_id: item.game_id,
                            team_id: teamId,
                            court_area: item.court_area_id,
                            inside_pain: item.inside_the_pain,
                            period: getPeriod(item.period),
                            time: item.time_in_game,
                            home_team_image: item.home_team_logo,
                            away_team_image: item.away_team_logo,
                            home_team_goals: item.home_team_goal,
                            away_team_goals: item.away_team_goal
                        };
                    })
                );
                setVideoOpen(true);
            });
        }
    };

    const handleExportTags = (cell, player_id) => (e) => {
        e.preventDefault();

        if (playerIds.includes(player_id) && getPlayerStatus(player_id) && getPlayerStatus(player_id)[cell.id] !== 0 && cell.title !== 'Games') {
            GameService.getGamePlayerTags(
                currentUser.id,
                teamId,
                `${player_id}`,
                gameIds.join(','),
                ActionData[cell.action].action_id,
                ActionData[cell.action].action_type_id,
                ActionData[cell.action].action_result_id,
                null,
                null,
                null,
                null,
                null
            ).then((res) => {
                setPlayData(res);
                setExportOpen(true);
            });
        }
    };

    useEffect(async () => {
        setGameList(games.filter((item) => gameIds.includes(item.id)));
        await GameService.getCoachTeamPlayers(teamId, seasonId, leagueId).then((res) => {
            setPlayerList(res);
        });
        await GameService.getPlayersStatsAdvanceSummary({
            seasonId: seasonId,
            leagueId: null,
            gameId: gameIds.join(','),
            teamId: `${teamId}`,
            playerId: null,
            gameTime: null,
            courtAreaId: null,
            insidePaint: null,
            homeAway: null,
            gameResult: null
        }).then((data) => {
            let newArray = [];

            data.map((item) => {
                const filt = newArray.filter((res) => item.player_id === res.player_id);

                if (filt.length === 0) newArray = [...newArray, item];

                return newArray;
            });
            setDetectStats(newArray);
            setPlayerIds(newArray.map((item) => item.player_id));
        });
    }, [refresh, gameIds]);

    return (
        <Box sx={{ width: '100%', background: 'white', maxHeight: '80vh', minHeight: '65vh', overflowY: 'auto', display: 'flex', padding: '4px' }}>
            <TableContainer sx={{ maxHeight: '80vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow height="36px">
                            <TableCell key="name" align="center" colSpan={2}>
                                {t('Name')}
                            </TableCell>
                            {headCells.map((cell) => (
                                <TableCell key={cell.id} align="center" sortDirection={orderBy === cell.id ? order : false}>
                                    <TableSortLabel active={orderBy === cell.id} direction={orderBy === cell.id ? order : 'asc'} onClick={() => handleRequestSort(cell.id)}>
                                        {t(cell.title)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getSortedArray().map((player, index) => (
                            <TableRow key={index} height="70px" hover>
                                <TableCell width="4%" align="center" sx={{ cursor: 'pointer' }} onClick={() => handleDisplayList(player)}>
                                    <img
                                        style={{ height: '70px', borderRadius: '8px', paddingTop: '2px', paddingBottom: '2px' }}
                                        src={player ? (player.image.length > 0 ? player.image : PLAYER_ICON_DEFAULT) : PLAYER_ICON_DEFAULT}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ paddingLeft: '10px', cursor: 'pointer' }} onClick={() => handleDisplayList(player)}>
                                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: '#1a1b1d' }}>
                                            #{player?.jersey_number ?? 0} {player?.name ?? '-'}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: '#a5a5a8' }}>{player?.pos_name ?? '-'}</Typography>
                                    </Box>
                                </TableCell>
                                {headCells.map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        align="center"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleDisplayVideo(cell, player?.id ?? 0)}
                                        onContextMenu={handleExportTags(cell, player?.id ?? 0)}
                                    >
                                        {playerIds.includes(player?.id ?? 0)
                                            ? getPlayerStatus(player?.id ?? 0)
                                                ? cell.id === 'total_saved'
                                                    ? getPlayerStatus(player?.id ?? 0)[cell.id] + getPlayerStatus(player?.id ?? 0)['total_super_save']
                                                    : getPlayerStatus(player?.id ?? 0)[cell.id]
                                                : '-'
                                            : '-'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TeamPlayerStatDialog
                t={t}
                open={statOpen}
                onClose={() => setStatOpen(false)}
                player={currentPlayer}
                teamId={teamId}
                seasonId={seasonId}
                games={games}
                gameIds={gameIds}
                initialState={playerStat}
            />
            <TeamStatsVideoPlayer
                t={t}
                open={videoOpen}
                onClose={(flag) => {
                    setVideoOpen(false);

                    if (flag) setRefresh((r) => !r);
                }}
                video_url={gameList}
                tagList={playData}
            />
            <GameExportToEdits t={t} open={exportOpen} onClose={() => setExportOpen(false)} tagList={playData} isTeams={false} />
        </Box>
    );
};

export default TeamPlayersStats;
