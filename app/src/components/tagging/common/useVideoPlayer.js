import { useState, useEffect, useRef } from 'react';
import gameService from '../../../services/game.service';


const useVideoPlayer = (videoElement, game_id) => {
    const [labeldata, setLabeldata] = useState({})
    const [videoCufr, setVideoCufr] = useState(0)
    const retreiving = useRef(false);

    let detectdata = {};
    let currentDetectFr = -10000;
    let frameTobackward = 1800;
    let frameToforward = 5400;
    let totalTobackword = 1800;
    let previousSec = -1;
    let previousDeFr = -1;

    const retreivedata = async (strHr, strMin, strsec, minTobackward, minToforward, detectFr, isMerge) => {
        let videoTime = `${strHr}:${strMin}:${strsec}`;
        await gameService.getPlayersDetection(game_id, videoTime, minTobackward, minToforward).then((data) => {   
            console.log(videoTime)
            if (data.length == 0) {
                console.log('data is empty--');
                retreiving.current = false;                
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
                var secs = parseFloat(parseFloat(timearray[2])?.toFixed(1));
                var hours = parseInt(timearray[0]);
                var mins = parseInt(timearray[1]);
                var frames = Math.round((mins * 60 + hours * 3600 + secs) * 30);
                newCategory[frames] = groupByCategory[key];
            }

            if (isMerge) {
                const asArray = Object.entries(detectdata);
                const filtered = asArray.filter(([key, value]) => key > detectFr - 2700); // store 5 minutes data backward
                const backToObject = Object.fromEntries(filtered);

                totalTobackword = detectFr - Math.min(...Object.keys(backToObject));
                detectdata = {
                    ...backToObject,
                    ...newCategory
                };
            } else {
                detectdata = newCategory;
            }
            setLabeldata(detectdata)
            currentDetectFr = detectFr;
            retreiving.current = false;
            console.log('success fetched');
        });
    };

    const detect = async () => {
        let currentsec = videoElement.current.getCurrentTime();
        let currentframe = parseInt(parseFloat(currentsec?.toFixed(1)) * 30);
        setVideoCufr(currentframe)

        if (previousDeFr === currentDetectFr && previousSec === currentsec) return;
        previousDeFr = currentDetectFr;
        previousSec = currentsec;
        if (currentframe > currentDetectFr - totalTobackword && currentframe < currentDetectFr + frameToforward) {

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

                    retreivedata(strHr, strMin, strsec, minToforward, totalSec * 30, true);
                }
            }
        }

        if (currentframe <= currentDetectFr - frameTobackward || currentframe >= currentDetectFr + frameToforward) {
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

                retreivedata(strHr, strMin, strsec, minTobackward, minToforward, totalSec * 30, false);
            }
        }
    };

    useEffect(() => {
        let timeInt = setInterval(() => {
            detect();
        }, 30);
        return () => clearInterval(timeInt);
    }, []);

    return {
        labeldata,
        videoCufr
    };
};

export default useVideoPlayer;
