import { useState, useEffect, useRef, createElement } from 'react';

import * as settings from '../../config/settings';

const useVideoPlayer = (videoElement, displayFunc, gameId) => {
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [isMuted, setMuted] = useState(false);
    const refPlaying = useRef(false);
    const [positions, setPositions] = useState([]);
    const retreiving = useRef(false);

    let detectdata = {};
    let currentDetectFr = -10000;
    let frameTobackward = 3600;
    let frameToforward = 9000;
    let totalTobackword = 3600;
    let previousSec = -1;
    let previousDeFr = -1;

    async function retreivedata(url, detectFr, isMerge) {
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.length == 0) {
                    console.log('data is empty--');
                    retreiving.current = false;
                    setPositions([]);
                    return;
                }

                const groupByCategory = data.reduce((group, product) => {
                    const { st } = product;
                    group[st] = group[st] ?? [];
                    group[st].push(product);
                    return group;
                }, {});

                var newCategory = {};
                for (var key in groupByCategory) {
                    var timearray = key.split(':');
                    var secs = parseFloat(parseFloat(timearray[2]).toFixed(1));
                    var hours = parseInt(timearray[0]);
                    var mins = parseInt(timearray[1]);
                    var frames = Math.round((mins * 60 + hours * 3600 + secs) * 30);
                    newCategory[frames] = groupByCategory[key];
                }

                if (isMerge) {
                    const asArray = Object.entries(detectdata);
                    const filtered = asArray.filter(([key, value]) => key > detectFr - 9000); // store 5 minutes data backward
                    const backToObject = Object.fromEntries(filtered);

                    totalTobackword = detectFr - Math.min(...Object.keys(backToObject));
                    detectdata = {
                        ...backToObject,
                        ...newCategory
                    };
                } else {
                    detectdata = newCategory;
                }
                currentDetectFr = detectFr;
                retreiving.current = false;
            });
    }

    function detect() {
        let currentsec = videoElement.current.currentTime;
        let currentframe = parseInt(parseFloat(currentsec.toFixed(1)) * 30);

        if (previousDeFr === currentDetectFr && previousSec === currentsec) return;
        previousDeFr = currentDetectFr;
        previousSec = currentsec;
        if (currentframe > currentDetectFr - totalTobackword && currentframe < currentDetectFr + frameToforward) {
            if (detectdata[currentframe] != undefined) {
                let posData = [];
                for (let i = 0; i < detectdata[currentframe].length; i++) {
                    let pos = {};
                    pos['x'] = detectdata[currentframe][i].x;
                    pos['y'] = detectdata[currentframe][i].y;
                    pos['pui'] = detectdata[currentframe][i].pui;
                    pos['w'] = detectdata[currentframe][i].w;
                    pos['h'] = detectdata[currentframe][i].h;
                    pos['id'] = detectdata[currentframe][i].id;
                    posData.push(pos);
                }
                setPositions(posData);
            }

            if (currentframe < currentDetectFr + frameToforward && currentframe >= currentDetectFr + frameToforward - 900) {
                if (!retreiving.current) {
                    let totalSec = Math.floor((currentDetectFr + frameToforward) / 30);
                    let hr = Math.floor(totalSec / 3600);
                    let min = Math.floor((totalSec - hr * 3600) / 60);
                    let sec = totalSec - hr * 3600 - min * 60;
                    let strHr = hr < 10 ? '0' + hr.toString() : hr.toString();
                    let strMin = min < 10 ? '0' + min.toString() : min.toString();
                    let strsec = sec < 10 ? '0' + sec.toString() : sec.toString();
                    let minToforward = frameToforward / 1800;
                    retreiving.current = true;
                    retreivedata(`${settings.APIBASEURL}/player/player_detection/${gameId}/${strHr}:${strMin}:${strsec}/0/${minToforward}`, totalSec * 30, true);
                }
            }
        }

        if (currentframe <= currentDetectFr - frameTobackward || currentframe >= currentDetectFr + frameToforward) {
            videoElement.current.pause();
            videoElement.current.currentTime = currentsec;
            if (!retreiving.current) {
                let totalSec = Math.floor(currentsec);
                let hr = Math.floor(totalSec / 3600);
                let min = Math.floor((totalSec - hr * 3600) / 60);
                let sec = totalSec - hr * 3600 - min * 60;
                let strHr = hr < 10 ? '0' + hr.toString() : hr.toString();
                let strMin = min < 10 ? '0' + min.toString() : min.toString();
                let strsec = sec < 10 ? '0' + sec.toString() : sec.toString();
                let minTobackward = frameTobackward / 1800;
                let minToforward = frameToforward / 1800;
                retreiving.current = true;
                retreivedata(`${settings.APIBASEURL}/player/player_detection/${gameId}/${strHr}:${strMin}:${strsec}/${minTobackward}/${minToforward}`, totalSec * 30, false);
            }
        }
    }

    const togglePlay = () => {
        setPlaying(!isPlaying);
    };

    useEffect(() => {
        refPlaying.current = isPlaying;
        if (isPlaying && !retreiving.current) {
            videoElement.current.play();
        } else {
            videoElement.current.pause();
        }
    }, [isPlaying, videoElement]);

    useEffect(() => {
        let timeInt = setInterval(() => {
            detect();

            if (videoElement !== null) displayFunc();
        }, 25);
        return () => clearInterval(timeInt);
    }, []);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;

        setProgress(progress);
        displayFunc();
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setProgress(manualChange);
    };

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setSpeed(speed);
    };

    const toggleMute = () => {
        setMuted(!isMuted);
    };

    useEffect(() => {
        isMuted ? (videoElement.current.muted = true) : (videoElement.current.muted = false);
    }, [isMuted, videoElement]);

    return {
        isPlaying,
        progress,
        isMuted,
        speed,
        positions,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute
    };
};

export default useVideoPlayer;
