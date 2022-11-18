import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import '../../../coach_style.css';
import GameStatsVideoPlayer from './videoDialog';

let boxList = [
    [
        { id: 'goal', title: 'Goals Scored', total: 0, data: [] },
        { id: 'Shot', title: 'Shots', total: 0, data: [] },
        { id: 'Pass', title: 'Passes', total: 0, data: [] }
    ],
    [
        { id: 'Blocked', title: 'Blocked', total: 0, data: [] },
        { id: 'Clearance', title: 'Clearance', total: 0, data: [] },
        { id: 'Saved', title: 'Saved', total: 0, data: [] }
    ],
    [
        { id: 'Interception', title: 'Interceptions', total: 0, data: [] },
        { id: 'Tackle', title: 'Tackles', total: 0, data: [] },
        { id: 'Draw Foul', title: 'Draw Fouls', total: 0, data: [] }
    ]
];

const GameStatsBoxList = ({ game, list }) => {
    const [actionList, setActionList] = useState([]);
    const [videoOpen, setVideoOpen] = useState(false);
    const [playData, setPlayData] = useState([]);

    const handleDisplayVideo = (player) => {
        setPlayData(
            player.data.map((item) => {
                return {
                    start_time: item.player_tag_start_time,
                    end_time: item.player_tag_end_time,
                    player_name: item.player_names,
                    action_name: item.action_names,
                    action_type: item.action_type_names,
                    action_result: item.action_result_names
                };
            })
        );
        setVideoOpen(true);
    };

    useEffect(() => {
        let temp = [];

        boxList.map((row, rId) => {
            return row.map((item, cId) => {
                boxList[rId][cId].total =
                    item.id === 'Saved'
                        ? list.filter((stat) => stat.action_names === 'Saved' || stat.action_names === 'Super Saved').length
                        : list.filter((stat) => stat.action_names === item.id).length;
                boxList[rId][cId].data =
                    item.id === 'Saved' ? list.filter((stat) => stat.action_names === 'Saved' || stat.action_names === 'Super Saved') : list.filter((stat) => stat.action_names === item.id);

                return boxList;
            });
        });
        list.map((item) => {
            const filtered = temp.filter((data) => data === item.action_names);

            if (filtered.length === 0) temp = [...temp, item.action_names];

            return temp;
        });
        boxList[0][0].total += list.filter((item) => item.action_names === 'Shot' && item.action_result_names === 'Goal').length;
        boxList[0][0].data = list.filter((item) => item.action_names === 'Shot' && item.action_result_names === 'Goal');
        setActionList(temp);
    }, [list]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', paddingTop: '0px', paddingBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {boxList[0].map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '4px',
                            borderRadius: '16px',
                            border: '1px solid #1A1B1D',
                            background: '#F2F7F2',
                            width: '120px',
                            height: '60px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleDisplayVideo(item)}
                    >
                        <p className="normal-text">{item.title}</p>
                        <p className="normal-text">{item.total}</p>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {boxList[1].map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '4px',
                            borderRadius: '16px',
                            border: '1px solid #1A1B1D',
                            background: '#F2F7F2',
                            width: '120px',
                            height: '60px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleDisplayVideo(item)}
                    >
                        <p className="normal-text">{item.title}</p>
                        <p className="normal-text">{item.total}</p>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {boxList[2].map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '4px',
                            borderRadius: '16px',
                            border: '1px solid #1A1B1D',
                            background: '#F2F7F2',
                            width: '120px',
                            height: '60px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleDisplayVideo(item)}
                    >
                        <p className="normal-text">{item.title}</p>
                        <p className="normal-text">{item.total}</p>
                    </Box>
                ))}
            </Box>
            {videoOpen && <GameStatsVideoPlayer onClose={() => setVideoOpen(false)} video_url={game.video_url} tagList={playData} />}
        </Box>
    );
};

export default GameStatsBoxList;
