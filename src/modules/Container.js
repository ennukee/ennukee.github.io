import React, { useState } from 'react'
import '../assets/css/Container.css'

const userDefaultDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const projects = [
    {
        title: 'Tinctures', ghLink: 'https://github.com/ennukee/tinctures', liveLink: 'https://dbowers.io/tinctures/',
        description: 'tool to generate a trade search query to look up Tinctures in PoE 3.23, prior to a supporting update',
    },
    {
        title: 'DF SimC Gen', ghLink: 'https://github.com/ennukee/df-simc-gen', liveLink: 'https://dbowers.io/df-simc-gen/',
        description: 'tool to create profilesets for WoW: Dragonflight Simc to simplify minmaxing',
    },
    {
        title: 'Crucible Filter', ghLink: 'https://github.com/ennukee/crucible-filter', liveLink: 'https://dbowers.io/crucible-filter/',
        description: 'tool to help simplify searching for the super vast crucible tree mod list in PoE 3.21',
    },
    {
        title: 'PoE Waitlist', ghLink: 'https://github.com/ennukee/poe-waitlist', liveLink: 'https://dbowers.io/poe-waitlist/',
        description: 'tool to help PoE service providers keep track of wait lists',
    },
    {
        title: 'Exile Leveling', ghLink: 'https://github.com/heartofphos/exile-leveling', liveLink: 'https://heartofphos.github.io/exile-leveling/#/',
        description: 'open source tool I\'ve contributed to that helps streamline the campaign in PoE',
    },
    {
        title: 'Gem Planner V2', ghLink: 'https://github.com/ennukee/gemplanner', liveLink: 'https://dbowers.io/gemplanner/',
        description: 'second iteration tool to help plan out what gems to select + buy in early PoE campaign',
    },
    {
        title: 'Relic Helper', ghLink: 'https://github.com/ennukee/relic-helper', liveLink: 'https://dbowers.io/relic-helper/',
        description: 'tool for helping users be able to figure out what relic sets they have access to in OSRS Shattered Relics league',
    },
    {
        title: 'Gem Planner V1', ghLink: 'https://github.com/ennukee/gem-planner', liveLink: 'https://dbowers.io/gem-planner/',
        description: 'first iteration tool to help plan out where to buy gems in early PoE campaign',
    },
    {
        title: 'PoE Seedcraft Stock', ghLink: 'https://github.com/ennukee/PoE-Seedcraft-Stock', liveLink: '',
        description: 'script to assist in accumulating all stored harvest crafts in PoE prior to changes in 3.18',
    },
    {
        title: 'Corruption Replacer', ghLink: 'https://github.com/ennukee/corruption-replacer', liveLink: 'https://dbowers.io/corruption-replacer',
        description: 'tool to help generate items with specific affixes in SimC for WoW patch 8.3',
    },
]

function Container() {
    const [ isLightMode, setLightMode ] = useState(userDefaultDarkMode)
    const [ viewMode, setViewMode ] = useState('intro');

    return (
        <div
            id="body"
            className={isLightMode ? 'light' : 'dark'}
        >
            <div id="background-color-fader" />
            <div id="light-mode-controls">
                <div
                    className={`mode-select ${!isLightMode && 'selected'}`}
                    id="dark-mode-select"
                    onClick={() => setLightMode(false)}
                />
                <div
                    className={`mode-select ${isLightMode && 'selected'}`}
                    id="light-mode-select"
                    onClick={() => setLightMode(true)}
                />
            </div>
            <div id="intro-container" className={`${viewMode} container`}>
                <div className="text" id="name">ennukee<span id="period"></span></div>
                <div className="text" id="pronunciation">en·nOO·kay</div>
                <div className="text" id="slogan">code&nbsp;
                    <span className="typeWriter" 
                        data-speed="2.5"
                        data-random="True"
                        data-dltSpeed="False"
                        data-text='["aesthetically", "cleanly", "with the future in mind"]'>
                    </span>
                </div>
                <div id="socials">
                    <a href="https://twitter.com/PriestismJP">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="https://github.com/ennukee">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/dylan-bowers/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="mailto:dylanvolibowers@gmail.com">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
                    </a>
                </div>
                <div className="swap-projects" onClick={() => setViewMode('projects')}>
                    interested in my personal projects to date? click here
                </div>
            </div>
            <div id="projects-container" className={`${viewMode} container`}>
                <div className="swap-projects" onClick={() => setViewMode('intro')}>
                    {'< '}back to landing page
                </div>
                <div id="project-section-details">
                    <div id="project-section-title">Personal projects</div>
                    <div id="project-section-subtitle">This section are non-professional, personal projects that I've developed for quality of life purposes primarily in gaming.</div>
                    <div id="project-section-subtitle" className="gap-top">Most recent projects are listed first.</div>
                    <div id="project-section-subtitle" className="gap-top">Please note I'm not a UX designer, so some UI elements may not be perfect{' :)'}</div>
                </div>
                <div id="individual-project-container">
                    {projects.map(project => (
                        <div className="ip-item">
                            <div className="ip-links">
                                <div className="ip-gh">
                                    <a href={project.ghLink} target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>
                                </div>
                                <div className="ip-live">
                                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="ip-content">
                                <div className="ip-title">{project.title}</div>
                                <div className="ip-description">{project.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Container;