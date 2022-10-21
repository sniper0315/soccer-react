import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined';
import { TEAM_ICON_DEFAULT } from '../../../common/staticData';

import GameService from '../../../services/game.service';
import OpponentOverview from './tabs/overview';
import OpponentPlayers from './tabs/players';
import { getFormattedDate } from '../components/utilities';

const Tabs = ['Overview', 'Summary', 'Stats', 'Players'];

const OpponentPage = () => {
    const params = useParams();
    const [values, setValues] = useState({
        game: {},
        tabSelected: 0,
        loading: false,
        loadingDone: false,
        curTab: 0
    });

    const handleTabClick = (idx) => {
        setValues({ ...values, curTab: idx });
    };

    useEffect(() => {
        const pathname = window.location.pathname;

        if (pathname.match(/\/new_coach\/opponents\//) !== null) {
            setValues({ ...values, loading: true });
            GameService.getGameById(atob(params.gameId)).then((res) => {
                setValues({ ...values, game: res, loading: false, loadingDone: true });
            });
        }
    }, [params.gameId]);

    return (
        <Box sx={{ width: '98%', margin: '0 auto' }}>
            {values.loading && (
                <div style={{ width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            )}
            {values.loadingDone && (
                <>
                    <Box sx={{ padding: '24px 24px 24px 48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px', 'svg path': { fill: 'black' } }}>
                                <Link to="/new_coach/opponents">
                                    <ChevronLeftIcon sx={{ width: '30px', height: '30px' }} />
                                </Link>
                                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#1a1b1d' }}>Game</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px' }}>
                                    <img style={{ width: '20px' }} src={values.game.home_team_image ? values.game.home_team_image : TEAM_ICON_DEFAULT} />
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1b1d' }}>{values.game.home_team_name}</Typography>
                                </Box>
                                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: '#1a1b1d' }}>VS</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 16px' }}>
                                    <img style={{ width: '20px' }} src={values.game.away_team_image ? values.game.away_team_image : TEAM_ICON_DEFAULT} />
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1b1d' }}>{values.game.away_team_name}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '400px', padding: '4px 8px' }}>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: '#1a1b1d' }}>{getFormattedDate(values.game.date)}</Typography>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: '#1a1b1d' }}>{values.game.league_name}</Typography>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: '#1a1b1d' }}>{values.game.season_name}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '32px', paddingLeft: '56px' }}>
                            {Tabs.map((tab, index) => (
                                <Box
                                    key={index}
                                    onClick={() => handleTabClick(index)}
                                    sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '4px', width: 'fit-content', cursor: 'pointer' }}
                                >
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 700, color: '#1a1b1d' }}>{tab}</Typography>
                                    <Box sx={{ width: '100%', height: '2px', backgroundColor: values.curTab === index ? '#0A7304' : '#F8F8F8' }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {values.curTab === 0 && <OpponentOverview game={values.game} />}
                    {values.curTab === 3 && <OpponentPlayers game={values.game} />}
                </>
            )}
        </Box>
    );
};

export default OpponentPage;
