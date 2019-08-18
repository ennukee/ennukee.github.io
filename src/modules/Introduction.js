import React from 'react'
import '../assets/css/Introduction.css'

export default () => {
    return (
        <div id="intro-container">
            <div id="name">Dylan Bowers</div>
            <div id="slogan">Code&nbsp;
                <span className="typeWriter" 
                    data-speed="2.5"
                    data-random="True"
                    data-dltSpeed="False"
                    data-text='["aesthetically.", "cleanly.", "with the future in mind."]'>
                </span>
            </div>
        </div>
    );
}
