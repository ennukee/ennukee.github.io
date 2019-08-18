import React from 'react'
import '../assets/css/Container.css'
import Header from './Header';
import Introduction from './Introduction';

function Container() {
    return (
        <div>
            <Header/>
            <div id="top-container">
                <Introduction/>
            </div>
            <div id="wave-hr">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#83cdff" fill-opacity="1" d="M0,160L26.7,176C53.3,192,107,224,160,213.3C213.3,203,267,149,320,112C373.3,75,427,53,480,58.7C533.3,64,587,96,640,122.7C693.3,149,747,171,800,170.7C853.3,171,907,149,960,165.3C1013.3,181,1067,235,1120,234.7C1173.3,235,1227,181,1280,160C1333.3,139,1387,149,1413,154.7L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default Container;