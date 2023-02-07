import * as React from 'react';

const LabelView = ({positions, width, height}) => {

    return(
        <>
            {
                positions && positions.map((item) => {
                    let x = item.x;
                    let y = item.y;
                    let w = item.w;
                    let h = item.h;
                    let playerId = item.pui;
                    let frame_id = item.id;

                    let xpos = (width * x) / 1920;
                    let ypos = (height * y) / 1080;
                    let rect_w = (width * w) / 1920;
                    let rect_h = (height * h) / 1080;


                    return (
                        <div
                            key={frame_id}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                                position: 'absolute',
                                left: xpos,
                                top: ypos - 16,
                                width: rect_w,
                                height: rect_h + 16,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    width: 'fitContent',
                                    height: 16,
                                    leftMargin: 'auto',
                                    rightMargin: 'auto',
                                    fontSize: 12,
                                    color: 'white'
                                }}
                            >
                                {playerId}
                            </div>

                            <div
                                style={{
                                    flexGrow: 1,
                                    border: '1px solid red',
                                    width: '100%'
                                }}
                            ></div>
                        </div>
                    );
                })
            }       
        </>
    );
}

export default LabelView;