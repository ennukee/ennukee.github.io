import React from 'react';

import '../assets/css/Container.scss'
import '../assets/css/AboutMe.scss'

const AboutMe = ({
  viewMode,
  setViewMode,
}) => {
  return (
    <div id="aboutme-container" className={`${viewMode} container`}>
      <div className="swap-projects" onClick={() => setViewMode('intro')}>
        {'< '}back to landing page
      </div>
      <div id="about-section-details">
        <div id="about-section-title">About Me</div>
        <div id="about-section-subtitle" className="gap-top">
          Hey there, I'm Dylan (or otherwise known as ennukee online).
        </div>
        <div id="about-section-subtitle" className="gap-top">
          My go-to fun fact is that when I was a kid, my first toy was a keyboard. Really.
        </div>
        <div id="about-section-subtitle" className="gap-top">
          My primary expertise is working on the <b>front end for data/logic
          heavy web applications</b>. I have dabled in more creative oriented works, just not professionally.
        </div>
        <div id="about-section-subtitle" className="gap-top">
          My main hobby is <b>gaming</b>, and I particularly enjoy automating or simplifying menial tasks where reasonable with a web UI or node scripts 
          (you'll find a whole lot of these in my personal projects section).
        </div>
        <div id="about-section-subtitle" className="gap-top">
          My other notable passions are <b>artificial intelligence, interactive animated media (VTubing, etc), media, photography</b>, and <b>overall aesthetics</b>.
          Although my skillset doesn't always make me the best for contributing to these areas, I always welcome a good opportunity to get involved. 
        </div>
        <div id="about-section-subtitle" className="gap-top">
          For more details, make sure to check my GitHub or LinkedIn linked on the main page on the landing page!  
         </div>
      </div>
    </div>
  );
};

export default AboutMe;