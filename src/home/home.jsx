import React from 'react';

import './index.css';

export function Home() {
  return (
    <main id="main-content">
        <section id="websocket">
            <div class="Game-Notifications">
            </div>
        </section>
        <section id="game-container">
            <div id="timer">
                <div id="score-container">Score: 00</div>
                <div id="timer-word">Time Left:</div>
                <div id="timer-text">3:00</div>
                <button id="start-button">Start</button>
            </div>
            <div id="game-board">
                <div id='1' class='gridbox'>W</div>
                <div id='2' class='gridbox'>E</div>
                <div id='3' class='gridbox'>L</div>
                <div id='4' class='gridbox'>C</div>
                <div id='5' class='gridbox'>O</div>
                <div id='6' class='gridbox'>M</div>
                <div id='7' class='gridbox'>E</div>
                <div id='8' class='gridbox'>T</div>
                <div id='9' class='gridbox'>O</div>
                <div id='10' class='gridbox'>B</div>
                <div id='11' class='gridbox'>O</div>
                <div id='12' class='gridbox'>G</div>
                <div id='13' class='gridbox'>G</div>
                <div id='14' class='gridbox'>L</div>
                <div id='15' class='gridbox'>E</div>
                <div id='16' class='gridbox'>!</div>
            </div>
            <div id="word-handling">
                <button id="reset-word">Reset Word</button>
                <button id="submit-word">Submit Word</button>
            </div>
        </section>
        <section id="UserWords">
            <div class="Words-found">
                <div class="word">Here is where words you spell will apear and </div>
                <div class="word">notifications on if a word is valid</div>
            </div>
        </section>
    </main>
  );
}