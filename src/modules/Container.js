import React from 'react'
import '../assets/css/Container.css'
import Header from './Header';
import Introduction from './Introduction';

class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            svgFill: '#222222',
            introBgState: '#222222',
            isScrolled: false,
            svgDirection: '0',
            svgFillOpacity: '1'
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    /* why must they make svg opacity animations so difficult */
    svgFillOpacityConversion = async (time, steps, start, end) => {
        const gap = end - start;
        const timePerStep = time / steps;
        const gapPerStep = gap / steps;

        console.log('DEBUG DATA', gap, steps,  timePerStep, gapPerStep);

        this.setState({
            svgFillOpacity: start
        })
        for ( let i = 0; i < steps; i++ ) {
            // console.log(this.state.svgFillOpacity);
            await this.setState({
                svgFillOpacity: parseFloat(this.state.svgFillOpacity) + gapPerStep
            })
            await new Promise(r => setTimeout(r, timePerStep));
        }
        this.setState({
            svgFillOpacity: end
        })
    }

    handleScroll = async () => {
        const Y = window.scrollY;
        if ( Y > 0 && !this.state.isScrolled ) {
            this.setState({
                isScrolled: true,
                introBgState: '#22222200'
            });
            await this.svgFillOpacityConversion(250, 10, 1, 0);
            this.setState({
                svgDirection: '320',
                
            });
            this.svgFillOpacityConversion(250, 10, 0, 1);
        }
        else if ( Y === 0 && this.state.isScrolled ) {
            this.setState({
                isScrolled: false,
                
            });
            await this.svgFillOpacityConversion(250, 10, 1, 0);
            this.setState({
                svgDirection: '0',
                introBgState: '#222222'
            });
            this.svgFillOpacityConversion(250, 10, 0, 1);
        }
    }

    render() {
        return (
            <div id="body">
                <Header/>
                <div id="top-container" style={{backgroundColor: this.state.introBgState}}>
                    <Introduction/>
                </div>
                <div id="wave-hr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill={this.state.svgFill} fill-opacity={this.state.svgFillOpacity} 
                        d={`M0,160L26.7,176C53.3,192,107,224,160,213.3C213.3,203,267,149,320,112C373.3,75,427,53,480,58.7C533.3,64,587,96,640,122.7C693.3,149,747,171,800,170.7C853.3,171,907,149,960,165.3C1013.3,181,1067,235,1120,234.7C1173.3,235,1227,181,1280,160C1333.3,139,1387,149,1413,154.7L1440,160L1440,${this.state.svgDirection}L1413.3,${this.state.svgDirection}C1386.7,${this.state.svgDirection},1333,${this.state.svgDirection},1280,${this.state.svgDirection}C1226.7,${this.state.svgDirection},1173,${this.state.svgDirection},1120,${this.state.svgDirection}C1066.7,${this.state.svgDirection},1013,${this.state.svgDirection},960,${this.state.svgDirection}C906.7,${this.state.svgDirection},853,${this.state.svgDirection},800,${this.state.svgDirection}C746.7,${this.state.svgDirection},693,${this.state.svgDirection},640,${this.state.svgDirection}C586.7,${this.state.svgDirection},533,${this.state.svgDirection},480,${this.state.svgDirection}C426.7,${this.state.svgDirection},373,${this.state.svgDirection},320,${this.state.svgDirection}C266.7,${this.state.svgDirection},213,${this.state.svgDirection},160,${this.state.svgDirection}C106.7,${this.state.svgDirection},53,${this.state.svgDirection},27,${this.state.svgDirection}L0,${this.state.svgDirection}Z`}></path>
                    </svg>
                </div>
            </div>
        );
    }
}

export default Container;