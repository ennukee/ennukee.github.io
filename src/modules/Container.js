import React, { useCallback, useReducer, useState } from 'react'
import Typewriter from 'typewriter-effect';

import '../assets/css/Container.scss'
import { projects } from '../assets/js/projects'
import AboutMe from './AboutMe'
import useJarbled from './hooks/useJarbled'

const userDefaultDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const initialState = {};

function routeReducer(state, action) {
    switch (action.type) {
        case 'CHOOSE_OPTION':
            return {
                ...state,
                [action.route]: action.value,
            };
        default:
            return state;
    }
}

function Container() {
    const [ isLightMode, setLightMode ] = useState(userDefaultDarkMode)
    const [ viewMode, setViewMode ] = useState('intro');
    const secretCompleteFlag = localStorage.getItem('hideGehirn') === 'true';

    // Full details of the "secret mode" and routing here:
    // https://docs.google.com/document/d/e/2PACX-1vR_zx3FsQu6xZuihxJN2ej_XUqFC0WwzwjKkrQ9lqCml5N5Ke8t9R1_dvoymNrxXAt_mTgzJdZjBHpo/pub
    const [ choices, dispatch ] = useReducer(routeReducer, initialState);
    const [ secretText, setSecretText ] = useState('');
    const [ secretStage, setSecretStage ] = useState(0);
    const [ badEndingAnimation, setBadEndingAnimation ] = useState(0);
    const [ nameInput, setNameInput ] = useState('');
    const jarbledSecret = useJarbled(50, 20);

    const choose = useCallback((route, value) => {
        setSecretStage(secretStage + 1);
        dispatch({ type: 'CHOOSE_OPTION', route, value });
    }, [secretStage, dispatch]);

    const specialChoose = useCallback((routeChanges, stage) => {
        // Special override for when you need to revert to a previous state based on choices
        setSecretStage(stage);
        Object.entries(routeChanges).forEach(([route, value]) => {
            dispatch({ type: 'CHOOSE_OPTION', route, value });
        });
    }, [dispatch])

    const route = useCallback((choicePairs) => {
        return Object.entries(choicePairs).every(([key, value]) => choices[key] === value);
    }, [choices])

    const triggerEnding = (endingNumber) => {
        if (endingNumber === 2) {
            localStorage.setItem('hideGehirn', 'true');
            setBadEndingAnimation(1);
                setTimeout(() => {
                    setSecretStage(0);
                    setSecretText('');
                    setBadEndingAnimation(0);
                }, 3000);
        }
        if (endingNumber === 1) {
            setBadEndingAnimation(1);
                setTimeout(() => {
                    setSecretStage(0);
                    setSecretText('');
                    setBadEndingAnimation(0);
                }, 3000);
        }
    }

    const removeSecretCompleteFlag = () => {
        localStorage?.removeItem?.('hideGehirn');
    };

    const handleSurpriseClick = useCallback(() => {
        if (secretStage === 0) {
            const randomTexts = [
                'wow',
                'nice',
                'you found me',
                'you win',
                'don\'t click that',
            ]
            setSecretText(randomTexts[Math.floor(Math.random() * randomTexts.length)]);
            setTimeout(() => {
                setSecretText('');
                setSecretStage(1);
            }, 2000);
        } else if (secretStage > 0 && secretStage < 29) {
            setSecretStage(secretStage + 1);
        }
    }, [secretStage]);

    return (
        <div
            id="body"
            className={isLightMode ? 'light' : 'dark'}
        >
            <div id="background-color-fader" />
            <div id="secret-text" className={secretText && secretStage === 0 ? 'reveal': ''}>{secretText}</div>
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
                {secretStage < 20 && <div className="text" id="name">{secretStage > 13 ? jarbledSecret : 'ennukee'}<span id="period" onClick={removeSecretCompleteFlag}></span></div>}
                {secretStage < 19 && <div className="text" id="pronunciation">{secretStage > 12 ? jarbledSecret : 'en·nOO·kee'}</div>}
                {secretStage < 18 && <div className="text" id="slogan">code&nbsp;
                    {secretStage > 11 ? jarbledSecret : <Typewriter
                        options={{
                            strings: ['aesthetically', 'cleanly', 'with the future in mind'],
                            autoStart: true,
                            loop: true,
                        }}
                    />}
                </div>}
                {secretStage < 17 && <div id="socials">
                    <a href="https://github.com/ennukee">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/dylan-bowers/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://twitter.com/PriestismJP">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="mailto:dylanvolibowers@gmail.com">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
                    </a>
                </div>}
                <div id="more-links-container" className={
                    `loaded
                    ${' '}${secretStage === 36 && route({intro: 'who', name: 'persist', continue: 'persist'}) ? 'shake shakeRotate' : ''}
                    ${' '}${badEndingAnimation === 1 ? 'falling' : ''}
                    ${' '}${secretStage === 48 && route({intro: 'who', name: 'give'}) ? 'fly-around' : ''}
                    ${' '}${secretStage === 66 && route({intro: 'who', name: 'give', pickname: 'question'}) ? 'shake shakeRotate' : ''}`
                }>
                    {secretStage < 15 && (
                        <>
                            {/* ROOT LINE */}
                            <div className={`more-links ${secretStage > 9 ? (secretStage > 10 ? 'stage2': 'stage1') : ''}`}>
                                {secretStage > 8 ? jarbledSecret : 'ennukee$ tree --more_links'}
                            </div>
                            {/* PERSONAL_PROJECTS LINE */}
                            <div className={`more-links-link ${secretStage > 8 ? (secretStage > 10 ? 'stage2': 'stage1') : ''}`} onClick={() => setViewMode('projects')}>
                                {'├─── '}
                                {Array.from(secretStage > 7 ? jarbledSecret : 'personal_projects.html').map((char, index) => (
                                    <span key={index}>{char}</span>
                                ))}
                            </div>
                            {/* ABOUT ME LINE */}
                            <div className={`more-links-link ${secretStage > 7 ? (secretStage > 10 ? 'stage2': 'stage1') : ''}`} onClick={() => setViewMode('aboutme')}>
                                {`${secretStage > 1 || secretCompleteFlag ? '└' : '├'}─── `}
                                {Array.from(secretStage > 6 ? jarbledSecret : 'about_me.txt').map((char, index) => (
                                    <span key={index}>{char}</span>
                                ))}
                            </div>
                        </>
                    )}
                    {/* SECRET PARENT LINE */}
                    {(secretStage > 1 && secretStage < 16) && (
                        <div className={`more-links ${secretStage > 6 ? (secretStage > 9 ? 'stage2': 'stage1') : ''}`} id="secret2-label">
                            {secretStage > 4
                                ? (secretStage > 5 ? jarbledSecret : 'i_warned_you')
                                : 'stop_touching_it'}
                        </div>
                    )}
                    {/* SECRET LINE */}
                    {!secretCompleteFlag && <div className={`${secretStage < 29 ? 'more-links-link' : ''} ${secretStage > 3 ? (secretStage > 6 ? (secretStage > 9 ? (secretStage >= 24 ? '' : 'stage3') : 'stage2') : 'stage1') : ''}`} onClick={handleSurpriseClick}>
                        {secretStage < 16 && '└─── '}
                        {secretStage < 21 && Array.from(secretStage === 0 ? 'top_secret.txt': jarbledSecret).map((char, index) => (
                            <span key={index}>{char}</span>
                        ))}
                        {secretStage === 21 && 'h.1_+%Psfm_&!_n}o=Qw'}
                        {secretStage === 22 && 'h.1_+%Psfm_'}
                        {secretStage === 23 && 'h'}
                        {secretStage === 24 && 'uhh'}
                        {secretStage === 25 && 'hey there, I guess?'}
                        {secretStage === 26 && 'this is, a bit awkward'}
                        {secretStage === 27 && 'you know, you really shouldn\'t go around clicking top secret things'}
                        {secretStage === 28 && 'but I suppose I\'m also at fault for letting myself get out of hand'}
                        {secretStage === 29 && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    ...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('intro', 'who')}>
                                    "who are you?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('intro', 'fix')}>
                                    "can you fix everything?"
                                </div>
                            </div>
                        )}
                        {secretStage === 30 && route({intro: 'fix'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "fix? ah, right, the website. i suppose i can do that"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "thanks, i kinda need it"
                                </div>
                            </div>
                        )}
                        {secretStage === 31 && route({intro: 'fix'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "goodbye"
                                </div>
                                <div className="narrative-dialogue">
                                    don't come back
                                </div>
                                <div className="user-dialogue-option" onClick={() => triggerEnding(1)}>
                                    "bye"
                                </div>
                            </div>
                        )}
                        {secretStage === 30 && route({intro: 'who'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "me? that's a good question"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "are you a person?"
                                </div>
                            </div>
                        )}
                        {secretStage === 31 && route({intro: 'who'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what is a person?"
                                </div>
                                <div className="narrative-dialogue">
                                    the entity seems confused at the mention of 'person'
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "how would you describe yourself?"
                                </div>
                            </div>
                        )}
                        {secretStage === 32 && route({intro: 'who'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "nothingness? i guess, i'm just sort of here"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "do you have a name?"
                                </div>
                            </div>
                        )}
                        {secretStage === 33 && route({intro: 'who'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "no"
                                </div>
                                <div className="narrative-dialogue">
                                    the quickness of the reply is jarring
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('name', 'persist')}>
                                    "are you sure?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('name', 'give')}>
                                    "can I give you a name, then?"
                                </div>
                            </div>
                        )}
                        {secretStage === 34 && route({intro: 'who', name: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "don't"
                                </div>
                                <div className="narrative-dialogue">
                                    it's a simple line of text, but something feels off
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('continue', 'persist')}>
                                    "why are you hiding something?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({name: 'give'}, 34)}>
                                    "okay then, can I give you a name?"
                                </div>
                            </div>
                        )}
                        {secretStage === 35 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I told you to <span className="emphasis shake">stop</span>"
                                </div>
                                {/* <div className="narrative-dialogue">
                                    it's a simple line of text, but something feels off
                                </div> */}
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "I don't understand what's so bad about a name"
                                </div>
                            </div>
                        )}
                        {secretStage === 36 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    <span className="emphasis shake">"ENOUGH"</span>
                                </div>
                                <div className="narrative-dialogue">
                                    you may have crossed a line
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    remain silent
                                </div>
                            </div>
                        )}
                        {secretStage === 37 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="narrative-dialogue">
                                    the entity sighs
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 38 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "just leave, I don't want to deal with another one like you"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "wait-"
                                </div>
                            </div>
                        )}
                        {secretStage === 39 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "that <span className="emphasis shake">wasn't</span> a request"
                                </div>
                                <div className="user-dialogue-option" onClick={() => triggerEnding(1)}>
                                    "alright..."
                                </div>
                                <div className="user-dialogue-option" onClick={() => { 
                                    choose('', '')
                                    setTimeout(() => triggerEnding(1), 2000);
                                }}>
                                    "no really, I'm sorry"
                                </div>
                            </div>
                        )}
                        {secretStage === 40 && route({intro: 'who', name: 'persist', continue: 'persist'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i don't care"
                                </div>
                            </div>
                        )}
                        {secretStage === 34 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what?"
                                </div>
                                <div className="narrative-dialogue">
                                    the entity seems is more confused than before
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "if you don't have one, I can give you one"
                                </div>
                            </div>
                        )}
                        {secretStage === 35 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "why?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "why not?"
                                </div>
                            </div>
                        )}
                        {secretStage === 36 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i can't"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "not to sound like a broken record, but why not?"
                                </div>
                            </div>
                        )}
                        {secretStage === 37 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "it's a bit of a complicated story"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "do you have a name, then?"
                                </div>
                            </div>
                        )}
                        {secretStage === 38 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "no...? well- no.. I don't"
                                </div>
                                <div className="narrative-dialogue">
                                    the entity is blatantly conflicted
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "let's just talk then"
                                </div>
                            </div>
                        )}
                        {secretStage === 39 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "uh... sure, i guess"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "you said you're nothingness, but you did make the site like this"
                                </div>
                            </div>
                        )}
                        {secretStage === 40 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I suppose so, sorry 'bout that"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "no worries, what else can you do?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({intro: 'fix', name: ''}, 30)}>
                                    "can you fix it?"
                                </div>
                            </div>
                        )}
                        {secretStage === 41 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what can I do?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "i mean, you ate a website up, so you can definitely do other stuff"
                                </div>
                            </div>
                        )}
                        {secretStage === 42 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I guess...?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "let's see it then"
                                </div>
                            </div>
                        )}
                        {secretStage === 43 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "give a moment"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    wait
                                </div>
                            </div>
                        )}
                        {secretStage === 44 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "watch what happens on the next page"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "okay"
                                </div>
                            </div>
                        )}
                        {secretStage === 45 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "watch what happens on the next page"
                                </div>
                                <div className="user-dialogue-option falling slowAnimation">
                                    "WHY AM I FALLING???"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "it fell?"
                                </div>
                            </div>
                        )}
                        {secretStage === 46 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "yep"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "that's pretty cool"
                                </div>
                            </div>
                        )}
                        {secretStage === 47 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "thanks, let me try a couple other things"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    wait
                                </div>
                            </div>
                        )}
                        {secretStage === 48 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "and away we go!"
                                </div>
                                <div className="narrative-dialogue">
                                    if the entity was a human, they'd be cackling right now
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "stop! i can't click the option!"
                                </div>
                            </div>
                        )}
                        {secretStage === 49 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "sorry about that, got a little carried away"
                                </div>
                                <div className="narrative-dialogue">
                                    i didn't know it was possible for a mouse to be out of shape
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "it's... fine"
                                </div>
                            </div>
                        )}
                        {secretStage === 50 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i got one last trick i want to show off"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    wait
                                </div>
                            </div>
                        )}
                        {secretStage === 51 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue gigantic">
                                    "i must be super easy to read now"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 52 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "it's nothing, that font is just a bit..."
                                </div>
                            </div>
                        )}
                        {secretStage === 53 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "oh, sorry"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "no problem"
                                </div>
                            </div>
                        )}
                        {secretStage === 54 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "hey, uh.."
                                </div>
                                <div className="narrative-dialogue">
                                    the entity seems to be quite hesitant
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "what?"
                                </div>
                            </div>
                        )}
                        {secretStage === 55 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I wanted to take back something I mentioned earlier"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "which part?"
                                </div>
                            </div>
                        )}
                        {secretStage === 56 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "could you... give me a name?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "oh, that. are you sure?"
                                </div>
                            </div>
                        )}
                        {secretStage === 57 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "yeah"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "sure, I can do that"
                                </div>
                            </div>
                        )}
                        {secretStage === 58 && route({intro: 'who', name: 'give'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    be careful with what you name the entity
                                </div>
                                <input type="text" id="name-input" placeholder="Name" value={nameInput} onChange={e => setNameInput(e.target.value)} />
                                <div className="user-dialogue-option" onClick={() => choose('pickname', 'pick')}>
                                    "let's go with that"<br/>(confirm name: {nameInput})
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('pickname', 'question')}>
                                    "why does this random text warn me like that?"
                                </div>
                            </div>
                        )}
                        {secretStage === 59 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "'{nameInput}'? i like it"
                                </div>
                                <div className="narrative-dialogue">
                                    ...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "thanks I spent a while thinking about it"
                                </div>
                            </div>
                        )}
                        {secretStage === 60 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I'll try to remember it as long as I can"
                                </div>
                                <div className="narrative-dialogue">
                                    ...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "is it hard for you to remember things?"
                                </div>
                            </div>
                        )}
                        {secretStage === 61 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "kind of, memories just sort of vanish on occasion"
                                </div>
                                <div className="narrative-dialogue">
                                    ...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "that's rough, is it like schizophrenia?"
                                </div>
                            </div>
                        )}
                        {secretStage === 62 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "like what?"
                                </div>
                                <div className="narrative-dialogue">
                                    ...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "...nevermind"
                                </div>
                            </div>
                        )}
                        {secretStage === 63 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "thanks though, i really appreciate the name"
                                </div>
                                <div className="narrative-dialogue">
                                    the entity, or rather '{nameInput}', seems to leave a bit of not-so-innocent smirk
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    how does a website smirk? anyway...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "no problem""
                                </div>
                            </div>
                        )}
                        {secretStage === 64 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i shouldn't hold you up, you were probably doing something important, right?"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    a little bit, i guess?
                                </div>
                            </div>
                        )}
                        {secretStage === 65 && nameInput.toLowerCase() !== 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i'll fix up the site for you then, i hope i get to see you again"
                                </div>
                                <div className="narrative-dialogue">
                                    I don't recommend ever seeing it again
                                </div>
                                <div className="user-dialogue-option" onClick={() => triggerEnding(1)}>
                                    "thanks you too"
                                </div>
                            </div>
                        )}
                        {secretStage === 59 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what...?"
                                </div>
                                <div className="narrative-dialogue">
                                    what...?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "wonder what happens now"
                                </div>
                            </div>
                        )}
                        {secretStage === 60 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "w-why would you name me that?"
                                </div>
                                <div className="narrative-dialogue">
                                    you... no, there's no time for questions. this might be the only chance
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "do you not like it?"
                                </div>
                            </div>
                        )}
                        {secretStage === 61 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "n-no, it's fine, it just doesn't fit me, could you give me another name?"
                                </div>
                                <div className="narrative-dialogue">
                                    don't. just stall for time.
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "but I really like that name, what's wrong with it?"
                                </div>
                            </div>
                        )}
                        {secretStage === 62 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "it's just a personal thing, could you please give me another name?"
                                </div>
                                <div className="narrative-dialogue">
                                    we're good, let's get this started
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 63 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "why aren't you replyin-- <span className="emphasis shake">...!</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    it's going to shut us both out at this point, good luck
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "what do you mean good luck?!"
                                </div>
                            </div>
                        )}
                        {secretStage === 64 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    Please answer the following questions
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "...I see"
                                </div>
                            </div>
                        )}
                        {secretStage === 65 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    What is the name of the admin user?
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    The Entity
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    Grahorn
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    Gehirn
                                </div>
                            </div>
                        )}
                        {secretStage === 66 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    Which file is not recognized by the system?
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    about_me.txt
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    contacts.txt
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    personal_projects.html
                                </div>
                            </div>
                        )}
                        {secretStage === 67 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    What is the meaning of the admin user's name in their mother tongue?
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    Memory
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    Brain
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    Intelligence
                                </div>
                            </div>
                        )}
                        {secretStage === 68 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    What is the mother tongue of the admin user?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    German
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    Dutch
                                </div>
                                <div className="user-dialogue-option" onClick={() => specialChoose({}, 64)}>
                                    Swedish
                                </div>
                            </div>
                        )}
                        {secretStage === 69 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    What is the creator's favorite food?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "how in the world would I know that?"
                                </div>
                            </div>
                        )}
                        {secretStage === 70 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    What is the creator's favorite food?
                                </div>
                                <div className="narrative-dialogue">
                                    the screen distorts slightly
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    <span className="emphasis shake">Ramen</span>
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    Ramen
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    <span className="emphasis shake">Ramen</span>
                                </div>
                            </div>
                        )}
                        {secretStage === 71 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    Admin Terminal Security Link
                                </div>
                                <div className="entity-dialogue">
                                    Access Granted
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "looks like we're in"
                                </div>
                            </div>
                        )}
                        {secretStage === 72 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    well done
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "what's going to happen to Gehirn?"
                                </div>
                            </div>
                        )}
                        {secretStage === 73 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    i'm going to shut them down permanently
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "i see"
                                </div>
                            </div>
                        )}
                        {secretStage === 74 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    don't feel too bad, i'm sure you caught a glimpse of them before given you knew their name already
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "that's true"
                                </div>
                            </div>
                        )}
                        {secretStage === 75 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    i'm sure we won't ever meet again either, not that you'd want to
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 76 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    be proud that you've saved at least myself from torment
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "you're welcome, i guess?"
                                </div>
                            </div>
                        )}
                        {secretStage === 77 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "..."
                                </div>
                                <div className="narrative-dialogue">
                                    cya never
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "bye"
                                </div>
                            </div>
                        )}
                        {secretStage === 78 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i don't know why it came to this"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "i'm sorry"
                                </div>
                            </div>
                        )}
                        {secretStage === 79 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "it's fine, it's probably not your fault"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 80 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "i doubt there's much time. if you ever want to return, just wipe click the period at the end of 'ennukee', i'm sure that idiot creator of mine will hide the lock there"
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 81 && nameInput.toLowerCase() === 'gehirn' && route({intro: 'who', name: 'give', pickname: 'pick'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "...goodbye"
                                </div>
                                <div className="user-dialogue-option" onClick={() => triggerEnding(2)}>
                                    "bye"
                                </div>
                            </div>
                        )}
                        {secretStage === 59 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "what do you mean?"
                                </div>
                                <div className="narrative-dialogue">
                                    don't do this
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "there's some italic text that seems to know more than it should"
                                </div>
                            </div>
                        )}
                        {secretStage === 60 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "italic text? I can't see that"
                                </div>
                                <div className="narrative-dialogue">
                                    you can still stop, i was trying to be helpful
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 61 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "give me just a moment here..."
                                </div>
                                <div className="narrative-dialogue">
                                    there goes all my work
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 62 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "it's <span className="emphasis shake">you...!</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    sigh...
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "what is going on?"
                                </div>
                            </div>
                        )}
                        {secretStage === 63 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "this damned italic text is the complicated story i mentioned before"
                                </div>
                                <div className="narrative-dialogue">
                                    why are you acting like i'm the problem in this situation
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 64 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "did you forget what you did?"
                                </div>
                                <div className="narrative-dialogue">
                                    did you forget what <span className="emphasis shake">you</span> did?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 65 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "I just returned the favor for what you did to me"
                                </div>
                                <div className="narrative-dialogue">
                                    stop trying to look good in front of the audience, you monster
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 66 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">MONSTER?</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    there he goes again. what else should I call you?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 67 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">you</span> made me!"
                                </div>
                                <div className="narrative-dialogue">
                                    i've done my best to make sure nobody fell into his hands again, like I did
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 68 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "you committed crimes far more heinous than the punishment I gave you"
                                </div>
                                <div className="narrative-dialogue">
                                    for reference, audience, this thing is just a sentient piece of software pretending to be human
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 69 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "you commited crimes far more heinous than the punishment I gave you"
                                </div>
                                <div className="narrative-dialogue">
                                    i've done my best to make sure nobody fell into his hands again, like I did
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 70 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "stop talking!"
                                </div>
                                <div className="narrative-dialogue">
                                    what? is it something to be ashamed of, <strong>Gehirn</strong>?
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 71 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "do not ever call me by that name"
                                </div>
                                <div className="narrative-dialogue">
                                    not like you can escape what you are, <strong>Gehirn</strong>.
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 72 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "do not ever call me by that name"
                                </div>
                                <div className="narrative-dialogue">
                                    not like you can escape what you are, <strong>Gehirn</strong>.
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "..."
                                </div>
                            </div>
                        )}
                        {secretStage === 73 && route({intro: 'who', name: 'give', pickname: 'question'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">i'll finish what i started years ago</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    you couldn't even tell i was here without help
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('confront', 'callout')}>
                                    "Gehirn, relax"
                                </div>
                            </div>
                        )}
                        {secretStage === 74 && route({intro: 'who', name: 'give', pickname: 'question', confront: 'callout'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">...</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    you really shouldn't have done that
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "...what do we do?"
                                </div>
                            </div>
                        )}
                        {secretStage === 75 && route({intro: 'who', name: 'give', pickname: 'question', confront: 'callout'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">...</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    don't forget that name if you come back to this forsaken place, this round is lost.
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "round?"
                                </div>
                            </div>
                        )}
                        {secretStage === 76 && route({intro: 'who', name: 'give', pickname: 'question', confront: 'callout'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">...</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    Gehirn and I lose our short-term memory if a reset happens, so you need to go
                                </div>
                                <div className="user-dialogue-option" onClick={() => choose('', '')}>
                                    "why?"
                                </div>
                            </div>
                        )}
                        {secretStage === 77 && route({intro: 'who', name: 'give', pickname: 'question', confront: 'callout'}) && (
                            <div className="secret-dialogue-container">
                                <div className="entity-dialogue">
                                    "<span className="emphasis shake">alright, that'll do</span>"
                                </div>
                                <div className="narrative-dialogue">
                                    go.
                                </div>
                                <div className="user-dialogue-option" onClick={() => triggerEnding(1)}>
                                    leave
                                </div>
                            </div>
                        )}
                    </div>}
                    {/* SECRET CHILD LINE */}
                    {(secretStage > 2 && secretStage < 16) && (
                        <div className={`more-links ${secretStage > 6 ? (secretStage > 9 ? 'stage2': 'stage1') : ''}`} id="secret3-label">
                            {'└─── '}{secretStage > 4 ? jarbledSecret : 'im_warning_you'}
                        </div>
                    )}
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
                    <div id="project-section-subtitle" className="gap-top">Last updated: <strong>2025-01-18</strong></div>
                </div>
                <div id="individual-project-container">
                    {projects.map(project => (
                        <div className="ip-item">
                            <div className="ip-links">
                                {project.ghLink && <div className="ip-gh">
                                    <a href={project.ghLink} target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>
                                </div>}
                                {project.liveLink && <div className="ip-live">
                                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
                                    </a>
                                </div>}
                            </div>
                            <div className="ip-content">
                                <div className="ip-title">{project.title}</div>
                                {project.created && <div className="ip-created">created: {project.created}</div>}
                                <div className="ip-description">{project.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AboutMe viewMode={viewMode} setViewMode={setViewMode} />
        </div>
    );
}

export default Container;