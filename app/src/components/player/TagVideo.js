import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp';
import SkipPreviousSharpIcon from '@mui/icons-material/SkipPreviousSharp';
import { toSecond } from '../../common/utilities';
import gameService from '../../services/game.service';

import PlayerSelector from './PlayerSelector';
import EditIcon from '@mui/icons-material/Edit';

const styles = {
    action: {
        color: 'white',
        fontSize: 14,
        display: 'flex',
        width: '50%'
    },
    buttonBox: {
        width: '45%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    actionControls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
        direction: 'ltr'
    },
    correctionControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto'
    },
    correctionAction: {
        border: '2px solid red',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        fontSize: 16,
        display: 'flex',
        width: '30px',
        height: '30px',
        borderRadius: '50%'
    },
    button: {
        color: 'white',
        backgroundColor: '#80808069'
    }
};
export default function TagVideo({ tagList, url, muteState, setOpen, gameId }) {
    const player = useRef(null);
    const [play, setPlay] = useState(true);
    const [ready, setReady] = useState(false);
    const [curIdx, setCurIdx] = useState(0);
    const [videoURL, setVideoURL] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [playerList, setPlayerList] = useState([]);
    const [currPlayerId, setCurrPlayerId] = useState('');

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        setModalOpen(false);
        setPlay(true);
    };

    useEffect(() => {
        if (url?.startsWith('https://www.youtube.com') || url?.startsWith('https://youtu.be')) {
            gameService.getNewStreamURL(url).then((res) => {
                setVideoURL(res.url);
            });
        } else setVideoURL(url);
    }, [url]);

    useEffect(() => {
        if (!ready) return;

        if (!tagList.length) return;

        playTagByIdx(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagList, ready]);

    const seekTo = (sec) => player.current.seekTo(sec);

    const playTagByIdx = (i) => seekTo(toSecond(tagList[i]?.start_time) + 3);

    const onProgress = (currentTime) => {
        const startTime = toSecond(tagList[curIdx]?.start_time) + 3;
        const endTime = toSecond(tagList[curIdx]?.end_time) - 3;

        if (currentTime <= startTime) {
            seekTo(startTime);
            setPlay(true);
        } else if (currentTime >= endTime) {
            if (curIdx < tagList.length - 1) PlayVideo(1);
            else {
                setPlay(true);
                setOpen(false);
            }
        }
    };

    const PlayVideo = (add) => {
        let index = curIdx + add;

        if (index >= tagList.length) {
            setPlay(false);
            setOpen(false);

            return;
        } else if (index < 0) index = 0;

        playTagByIdx(index);
        setPlay(true);
        setCurIdx(index);
    };

    const clipCorrections = async (tags) => {
        let teamId;

        if (tags) {
            tags.map((data) => {
                teamId = data.team_id;
                setCurrPlayerId(data.player_id);
            });
        }

        await gameService.getGameTeamPlayersByTeam(teamId, gameId).then((res) => {
            setPlayerList(res);
            setPlay(false);
            handleOpen();
        });
    };

    console.log('tagvideo => ', curIdx);

    return (
        <>
            <PlayerSelector
                playerList={playerList}
                currPlayerId={currPlayerId}
                tagList={tagList}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleClose={handleClose}
                setPlay={setPlay}
                curIdx={curIdx}
            />

            <div className="player-wrapper tag-video">
                <ReactPlayer
                    className="react-player"
                    url={videoURL}
                    muted={muteState}
                    // url={VIDEO}
                    ref={player}
                    onPlay={() => setPlay(true)}
                    onPause={() => setPlay(false)}
                    onReady={() => setReady(true)}
                    onProgress={(p) => onProgress(p.playedSeconds)}
                    playing={play}
                    controls={false}
                    width="100%"
                    height="100%"
                />
            </div>

            {ready && (
                <div style={styles.correctionControl} className="play-action-controls">
                    {!!tagList[curIdx] && (
                        <div style={styles.correctionAction}>
                            <EditIcon
                                style={{
                                    color: 'red',
                                    padding: 3,
                                    borderRadius: 60,
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => clipCorrections(tagList)}
                            />
                        </div>
                    )}
                </div>
            )}

            {ready && (
                <div style={styles.actionControls} className="play-action-controls">
                    {!!tagList[curIdx] && (
                        <div style={styles.action}>
                            <div
                                style={{
                                    backgroundColor: 'rgb(62 62 62 / 62%)',
                                    padding: 5,
                                    borderRadius: 5,
                                    width: '40%',
                                    maxWidth: 120,
                                    textAlign: 'center'
                                }}
                            >
                                {tagList[curIdx]?.action_name}
                            </div>
                            <div
                                style={{
                                    backgroundColor: 'rgb(254 124 1 / 69%)',
                                    padding: '5px 10px',
                                    borderRadius: 5
                                }}
                            >
                                #{tagList[curIdx]?.jersey} {tagList[curIdx]?.player_lname} {tagList[curIdx]?.player_fname.slice(0, 1)}.
                            </div>
                        </div>
                    )}
                    <div style={styles.buttonBox}>
                        <IconButton onClick={() => PlayVideo(-1)} style={styles.button}>
                            <SkipPreviousSharpIcon color="white" />
                        </IconButton>

                        <IconButton onClick={() => setPlay((p) => !p)} style={styles.button}>
                            {play ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>

                        <IconButton onClick={() => PlayVideo(1)} style={styles.button}>
                            <SkipNextSharpIcon />
                        </IconButton>
                    </div>
                </div>
            )}
        </>
    );
}
