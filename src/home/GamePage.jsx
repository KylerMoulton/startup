import React from 'react';

export const GamePage = () => {
  return (
<main id="main-content">
    <section id="websocket">
        <div className="Game-Notifications">
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
            <div id='1' className='gridbox'>W</div>
            <div id='2' className='gridbox'>E</div>
            <div id='3' className='gridbox'>L</div>
            <div id='4' className='gridbox'>C</div>
            <div id='5' className='gridbox'>O</div>
            <div id='6' className='gridbox'>M</div>
            <div id='7' className='gridbox'>E</div>
            <div id='8' className='gridbox'>T</div>
            <div id='9' className='gridbox'>O</div>
            <div id='10' className='gridbox'>B</div>
            <div id='11' className='gridbox'>O</div>
            <div id='12' className='gridbox'>G</div>
            <div id='13' className='gridbox'>G</div>
            <div id='14' className='gridbox'>L</div>
            <div id='15' className='gridbox'>E</div>
            <div id='16' className='gridbox'>!</div>
        </div>
        <div id="word-handling">
            <button id="reset-word">Reset Word</button>
            <button id="submit-word">Submit Word</button>
        </div>
    </section>
    <section id="UserWords">
        <div className="Words-found">
            <div className="word">Here is where words you spell will apear and </div>
            <div className="word">notifications on if a word is valid</div>
        </div>
    </section>
</main>
);
};

export default GamePage;