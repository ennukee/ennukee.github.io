import React from 'react'
import '../assets/css/Header.css'

function Header() {
    return (
        <div id="header-container">
            <div class="header-item text" id="top">
                <a href="#">Top</a>
                <div class="link-highlight"></div>
            </div>
            <div class="header-item text" id="top">
                <a href="#">About</a>
                <div class="link-highlight"></div>
            </div>
            <div class="header-item text" id="top">
                <a href="#">Work</a>
                <div class="link-highlight"></div>
            </div>
            <div class="header-item text" id="top">
                <a href="#">Contact</a>
                <div class="link-highlight"></div>
            </div>
            <div class="header-item text" id="top">
                <a href="#">Blog</a>
                <div class="link-highlight"></div>
            </div>
        </div>
    );
}

export default Header;