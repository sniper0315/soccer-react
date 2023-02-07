import { Button, FormControlLabel, IconButton, Switch, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp';
import SkipPreviousSharpIcon from '@mui/icons-material/SkipPreviousSharp';
import EditIcon from '@mui/icons-material/Edit';

import GameService from '../../../services/game.service';
import { toSecond } from '../../../common/utilities';
import { TEAM_ICON_DEFAULT } from '../../../common/staticData';
import TeamPlayerTagEditDialog from './tabs/stats/playerTagEdit';

import '../../player/Profile.css';

const MultipleStatsVideoPlayer = ({ t }) => {
    const params = useParams();
    const [tagList, setTagList] = useState([]);
    const handle = useFullScreenHandle();
    const player = useRef(null);
    const [playRate, setPlayRate] = useState(1);
    const [play, setPlay] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoURL, setVideoURL] = useState('');
    const [videoList, setVideoList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showLogo, setShowLogo] = useState(true);
    const [tagEditOpen, setTagEditOpen] = useState(false);

    const fastVideo = (param) => {
        player.current && player.current.seekTo(currentTime + param);
    };

    const onProgress = (seconds) => {
        if (tagList.length === 0) return;

        setCurrentTime(seconds);

        const start = toSecond(tagList[currentIndex].start_time);
        const end = toSecond(tagList[currentIndex].end_time);

        if (seconds >= end) {
            if (currentIndex < tagList.length - 1) PlayVideo(1);
            else setPlay(false);
        } else if (seconds <= start) {
            if (playRate !== 1) {
                setPlay(false);
                setPlayRate(1);
            }

            player.current.seekTo(start);
            setPlay(true);
        }
    };

    const PlayVideo = (add) => {
        const index = currentIndex + add;

        if (index >= tagList.length) {
            setPlay(false);

            return;
        } else if (index < 0) index = 0;

        setCurrentIndex(index);
        setVideoURL(videoList.filter((item) => item.id === tagList[index].game_id)[0].url);
        player.current.seekTo(toSecond(tagList[index].start_time));
    };

    const deleteRowsBeforeUnload = (rows) => (e) => {
        e.preventDefault();
        window.alert(rows);
        console.log('unload =>', rows);

        GameService.deleteMultipleDataByIds(rows);
        e.returnValue = rows;

        return '';
    };

    useEffect(async () => {
        const pathname = window.location.pathname;

        if (pathname.match(/\/new_coach\/multiple\//) !== null) {
            let list = [];
            let splits = atob(params.ids).split('|');

            console.log('multiple params =>', splits);
            setCurrentIndex(0);
            setVideoList([]);
            window.addEventListener('beforeunload', deleteRowsBeforeUnload(splits[1]));
            await GameService.getGamesByIds(splits[0]).then((res) => {
                res.map(async (game) => {
                    if (game.video_url.startsWith('https://www.youtube.com')) {
                        await GameService.getNewStreamURL(game.video_url).then((res) => {
                            list = [...list, { id: game.id, url: res.url }];
                        });
                    } else if (game.video_url.toLowerCase() !== 'no video') list = [...list, { id: game.id, url: game.video_url }];
                });
                setVideoList(list);
            });
            await GameService.getAllMultipleDataByIds(splits[1]).then((res) => {
                setTagList(res);

                if (list.length > 0 && res.length > 0) setVideoURL(list.filter((item) => item.id === res[0].game_id)[0].url);
            });

            return () => {
                window.removeEventListener('beforeunload', deleteRowsBeforeUnload);
            };
        }
    }, [params]);

    console.log('multiple =>', videoURL);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <div style={{ width: '80%', margin: 'auto' }}>
                <div style={{ width: '100%', margin: 'auto', position: 'relative' }}>
                    <FullScreen handle={handle}>
                        <div style={{ width: '100%', margin: 'auto', minWidth: '700px' }}>
                            <div className="player-wrapper">
                                <ReactPlayer
                                    className="react-player"
                                    url={videoURL}
                                    ref={player}
                                    onPlay={() => setPlay(true)}
                                    onPause={() => setPlay(false)}
                                    onProgress={(p) => onProgress(p.playedSeconds)}
                                    playing={play}
                                    controls={false}
                                    playbackRate={playRate}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                position: 'absolute',
                                padding: '0 16px',
                                top: '12px',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', flex: 6 }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', flex: 0 }}
                                    onClick={() => {
                                        setPlay(false);
                                        setTagEditOpen(true);
                                    }}
                                >
                                    <EditIcon style={{ color: 'red', padding: 3, borderRadius: 60, textAlign: 'center', cursor: 'pointer' }} />
                                </div>
                                <FormControlLabel control={<Switch checked={showLogo} onChange={(e) => setShowLogo(e.target.checked)} />} label="" sx={{ color: 'white', margin: 0, flex: 0 }} />
                                {tagList.length > 0 && currentIndex < tagList.length && showLogo && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', flex: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'blue', width: '100px' }}>
                                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.4rem', fontWeight: 500, color: 'white' }}>
                                                {`${tagList[currentIndex].period} - ${tagList[currentIndex].time}'`}
                                            </Typography>
                                        </div>
                                        <img src={tagList[currentIndex].home_team_image ? tagList[currentIndex].home_team_image : TEAM_ICON_DEFAULT} style={{ width: '56px', height: '56px' }} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', width: '80px' }}>
                                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.4rem', fontWeight: 500, color: 'blue' }}>
                                                {`${tagList[currentIndex].home_team_goals} : ${tagList[currentIndex].away_team_goals}`}
                                            </Typography>
                                        </div>
                                        <img src={tagList[currentIndex].away_team_image ? tagList[currentIndex].away_team_image : TEAM_ICON_DEFAULT} style={{ width: '56px', height: '56px' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 0, bottom: '16px', justifyContent: 'space-between', width: '100%', padding: '0 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <IconButton onClick={() => PlayVideo(-1)} style={{ color: 'white', backgroundColor: '#80808069' }}>
                                    <SkipPreviousSharpIcon color="white" />
                                </IconButton>
                                <IconButton style={{ color: 'white', backgroundColor: '#80808069' }} onClick={() => fastVideo(-3)}>
                                    <FastRewindIcon color="white" />
                                </IconButton>
                                <Button variant="outlined" sx={{ width: '60px', color: 'white' }} onClick={() => setPlayRate(0.5)}>
                                    Slow
                                </Button>
                                <IconButton
                                    onClick={() => {
                                        if (playRate === 1) setPlay((p) => !p);
                                        else setPlayRate(1);
                                    }}
                                    style={{ color: 'white', backgroundColor: '#80808069' }}
                                >
                                    {play && playRate === 1 ? <PauseIcon /> : <PlayIcon />}
                                </IconButton>
                                <Button variant="outlined" sx={{ width: '60px', color: 'white' }} onClick={() => setPlayRate((s) => s + 0.5)}>
                                    Fast
                                </Button>
                                <IconButton style={{ color: 'white', backgroundColor: '#80808069' }} onClick={() => fastVideo(3)}>
                                    <FastForwardIcon color="white" />
                                </IconButton>
                                <IconButton onClick={() => PlayVideo(1)} style={{ color: 'white', backgroundColor: '#80808069' }}>
                                    <SkipNextSharpIcon />
                                </IconButton>
                            </div>
                            {tagList.length > 0 && currentIndex < tagList.length && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 12px', background: '#80808069' }}>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 500, color: 'white' }}>
                                        {`${tagList[currentIndex].player_name}, ${tagList[currentIndex].action_name}, ${tagList[currentIndex].action_type}, ${tagList[currentIndex].action_result}`}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </FullScreen>
                </div>
                {tagList.length > 0 && (
                    <TeamPlayerTagEditDialog
                        t={t}
                        open={tagEditOpen}
                        onClose={(flag) => {
                            setTagEditOpen(false);
                            setPlay(true);
                        }}
                        player={tagList[currentIndex]}
                    />
                )}
            </div>
        </div>
    );
};

export default MultipleStatsVideoPlayer;
