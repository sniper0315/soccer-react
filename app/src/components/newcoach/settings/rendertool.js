import React from 'react';

import Step1 from '../../../assets/render-step1.png';

import '../coach_style.css';

const showList = [
    { image: Step1, title: 'DOWNLOAD' },
    { image: Step1, title: 'Install by clicking on Setup.exe file' },
    { image: Step1, title: 'Click the Browse button to select the XML file' },
    { image: Step1, title: 'Select the output path' },
    { image: Step1, title: 'Keep files switch selected to save clip path' },
    { image: Step1, title: 'Click the Process button to create the video file' }
];

const SettingsRenderTool = () => {
    return (
        <div className="tab-page settings-render">
            <div className="render-container-split">
                <div className="render-container">
                    {showList.slice(0, 3).map((item, index) => (
                        <div key={index} className="render-item">
                            <p className="render-item-text">STEP #{index + 1}</p>
                            <div className="render-item-container">
                                <img src={item.image} />
                                <p className="normal-text">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="render-container">
                    {showList.slice(3, 6).map((item, index) => (
                        <div key={index + 3} className="render-item">
                            <p className="render-item-text">STEP #{index + 4}</p>
                            <div className="render-item-container">
                                <img src={item.image} />
                                <p className="normal-text">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsRenderTool;
