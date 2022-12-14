import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import GameService from '../../../../../services/game.service';
import TeamStatsBoxList from './statBoxList';
import TeamStatsChart from './statChart';

const action_results_interception = [
    { order: 1, title: 'Short Pass', color: 'rgb(100,134,74)' },
    { order: 2, title: 'Long Pass', color: 'rgb(255,140,15)' },
    { order: 3, title: 'Through Pass', color: 'rgb(37,148,204)' },
    { order: 4, title: 'Free Kick', color: 'rgb(255,40,74)' },
    { order: 5, title: 'Throw-In', color: 'rgb(108,137,197)' }
];

const action_results_cross = [
    { order: 1, title: 'Cleared', color: 'rgb(100,134,74)' },
    { order: 2, title: 'Successful', color: 'rgb(255,140,15)' },
    { order: 3, title: 'Blocked', color: 'rgb(37,148,204)' },
    { order: 4, title: 'Unsuccessful', color: 'rgb(255,40,74)' },
    { order: 5, title: 'Offside', color: 'rgb(108,137,197)' }
];

const action_results_dribble = [
    { order: 1, title: 'Successful', color: 'rgb(100,134,74)' },
    { order: 2, title: 'Stolen', color: 'rgb(255,140,15)' },
    { order: 3, title: 'Deflected', color: 'rgb(37,148,204)' },
    { order: 4, title: 'Unsuccessful', color: 'rgb(255,40,74)' },
    { order: 5, title: 'Draw Foul', color: 'rgb(108,137,197)' }
];

const action_results_shot = [
    { order: 1, title: 'Goal', color: 'rgb(100,134,74)' },
    { order: 2, title: 'On Target', color: 'rgb(255,140,15)' },
    { order: 3, title: 'Off Target', color: 'rgb(37,148,204)' },
    { order: 4, title: 'Blocked', color: 'rgb(255,40,74)' }
];

const action_results_pass = [
    { order: 1, title: 'Successful', color: 'rgb(100,134,74)' },
    { order: 2, title: 'Bad Pass', color: 'rgb(255,140,15)' },
    { order: 3, title: 'Blocked', color: 'rgb(37,148,204)' },
    { order: 4, title: 'Offside', color: 'rgb(255,40,74)' },
    { order: 5, title: 'Stolen', color: 'rgb(108,137,197)' }
];

const TeamStats = ({ games, gameIds, teamId, t }) => {
    const [playerList, setPlayerList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (games.length > 0 && gameIds.length > 0) {
            setGameList(games.filter((item) => gameIds.includes(item.id)));
            GameService.getGamePlayerTags(currentUser.id, teamId, null, gameIds.join(','), null, null, null, null, null, null, null, null).then((res) => {
                setPlayerList(res);
            });
        } else {
            setGameList([]);
            setPlayerList([]);
        }
    }, [games, gameIds, refresh]);

    return (
        <Box sx={{ width: '100%', background: 'white', maxHeight: '80vh', overflowY: 'auto', display: 'flex', padding: '20px 10px', gap: '10px' }}>
            <Box sx={{ minWidth: '34%', display: 'flex', flexDirection: 'column', gap: '52px' }}>
                <TeamStatsBoxList games={gameList} t={t} list={playerList} teamId={teamId} refreshPage={setRefresh} />
                <TeamStatsChart
                    t={t}
                    chartId="shot"
                    title={t('Shoting')}
                    isType={false}
                    action_results={action_results_shot}
                    list={playerList}
                    filterText="Shot"
                    games={gameList}
                    teamId={teamId}
                    refreshPage={setRefresh}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TeamStatsChart
                        t={t}
                        chartId="dribble"
                        title={t('Dribbling')}
                        isType={false}
                        action_results={action_results_dribble}
                        list={playerList}
                        filterText="Dribble"
                        games={gameList}
                        teamId={teamId}
                        refreshPage={setRefresh}
                    />
                    <TeamStatsChart
                        t={t}
                        chartId="cross"
                        title={t('Crossing')}
                        isType={false}
                        action_results={action_results_cross}
                        list={playerList}
                        filterText="Cross"
                        games={gameList}
                        teamId={teamId}
                        refreshPage={setRefresh}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TeamStatsChart
                        t={t}
                        chartId="pass"
                        title={t('Passing')}
                        isType={false}
                        action_results={action_results_pass}
                        list={playerList}
                        filterText="Pass"
                        games={gameList}
                        teamId={teamId}
                        refreshPage={setRefresh}
                    />
                    <TeamStatsChart
                        t={t}
                        chartId="interception"
                        title={t('Interception')}
                        isType={true}
                        action_results={action_results_interception}
                        list={playerList}
                        filterText="Interception"
                        games={gameList}
                        teamId={teamId}
                        refreshPage={setRefresh}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default TeamStats;
