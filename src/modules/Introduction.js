import React from 'react'
import '../assets/css/Introduction.css'

class Introduction extends React.Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.sloganRef = React.createRef();
    }

    render() {
        return (
            <div id="intro-container">
                <div ref={this.nameRef} class="text" id="name">Dylan Bowers</div>
                <div ref={this.sloganRef} class="text" id="slogan">Code&nbsp;
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
}

export default Introduction;
