import React, { useState, useEffect } from 'react';

import './index.css';

function Home() {
    const [timerSeconds, setTimerSeconds] = useState(180);
    const [score, setScore] = useState(0);
    const [selectedBoxes, setSelectedBoxes] = useState(new Set());
    const [selectedWord, setSelectedWord] = useState('');
    const [lastSelectedBox, setLastSelectedBox] = useState(null);
    const [foundWords, setFoundWords] = useState([]);
    const [longestWord, setLongestWord] = useState('');

    useEffect(() => {
        let loggedInUsername = localStorage.getItem('loggedInUsername');
        const startButton = document.getElementById("start-button");
        const gameBoard = document.getElementById("game-board");
        const timerText = document.getElementById("timer-text");
        const scoreContainer = document.getElementById("score-container");
        const submitButton = document.getElementById("submit-word");
        const resetButton = document.getElementById("reset-word");
        const wordsFound = document.querySelector(".Words-found");

        const GameEndEvent = 'gameEnd';
        const GameStartEvent = 'gameStart';
        const LongestWordEvent = 'longestWord';

        const characterSets = [
            "RIFOBX", "IFEHEY", "DENOWS", "UTOKND",
            "HMSRAO", "LUPETS", "ACITOA", "YLGKUE",
            "QBMJOA", "EHISPN", "VETIGN", "BALIYT",
            "EZAVND", "RALESC", "UWILRG", "PACEMD"
        ];

        let timerInterval;
        let gameInProgress = false;

        function shuffleGameBoard() {
            clearInterval(timerInterval);
            setTimerSeconds(180);
            resetSelected();
            setScore(0);
            setFoundWords([]);
            setLongestWord("");

            const gridBoxes = gameBoard.querySelectorAll('.gridbox');
            const shuffledSets = shuffleArray(characterSets);

            gridBoxes.forEach(function (box) {
                const randomSet = shuffledSets[Math.floor(Math.random() * shuffledSets.length)];
                const randomCharacter = randomSet[Math.floor(Math.random() * randomSet.length)];
                box.textContent = randomCharacter;
            });

            startTimer();
            gameInProgress = true;
        }

        function resetSelected() {
            selectedBoxes.forEach(box => {
                box.style.backgroundColor = '';
            });
            setSelectedBoxes(new Set());
            setSelectedWord("");
            setLastSelectedBox(null);
        }

        function startTimer() {
            timerInterval = setInterval(function () {
                setTimerSeconds(prevSeconds => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        clearInterval(timerInterval);
                        // Game over, store data
                        broadcastEvent(loggedInUsername, GameEndEvent, score);
                        broadcastEvent(loggedInUsername, LongestWordEvent, longestWord);
                        storeGameData(score);
                        return 0;
                    }
                });
            }, 1000);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function isAdjacentOrDiagonal(box1, box2) {
          console.log("Hello?");
          const id1 = parseInt(box1.id);
          const id2 = parseInt(box2.id);
          const row1 = Math.floor((id1 - 1) / 4);
          const col1 = (id1 - 1) % 4;
          const row2 = Math.floor((id2 - 1) / 4);
          const col2 = (id2 - 1) % 4;
          const rowDiff = Math.abs(row1 - row2);
          const colDiff = Math.abs(col1 - col2);
          return rowDiff <= 1 && colDiff <= 1;
      }
      
        function handleBoxClick(event) {
          if (!gameInProgress) return;
          const clickedBox = event.target;
      
          if (selectedBoxes.size === 0 ||(lastSelectedBox && isAdjacentOrDiagonal(clickedBox, lastSelectedBox))) {
              if (!selectedBoxes.has(clickedBox)) {
                  clickedBox.style.backgroundColor = '#1ac2ce';
                  setSelectedBoxes(new Set([...selectedBoxes, clickedBox]));
                  setSelectedWord(prevWord => prevWord + clickedBox.textContent);
                  setLastSelectedBox(clickedBox);
              }
          }
      }
      
      

        startButton.addEventListener("click", shuffleGameBoard);

        gameBoard.addEventListener("click", function (event) {
            handleBoxClick(event);
        });

        submitButton.addEventListener("click", function () {
            // Implement submit button click handling logic here
        });

        resetButton.addEventListener("click", function () {
            resetSelected();
        });

        return () => {
            startButton.removeEventListener("click", shuffleGameBoard);
            gameBoard.removeEventListener("click", handleBoxClick);
            submitButton.removeEventListener("click", submitButton);
            resetButton.removeEventListener("click", resetSelected);
        };
    }, []);

    function broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        // Implement broadcast logic here
    }

    async function storeGameData(score) {
        const userName = localStorage.getItem('loggedInUsername');
        const newScore = { name: userName, score: score, longestWord: longestWord };
        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newScore),
            });
            const newScores = await response.json();
            localStorage.setItem('gameData', JSON.stringify(newScores));
        } catch {
            updateScores(score);
        }
    }

    function updateScores(newScore) {
        // Implement update scores logic here
    }

    return (
        <main id="main-content">
            <section id="websocket">
                <div className="Game-Notifications">
                    {/* WebSocket notifications go here */}
                </div>
            </section>
            <section id="game-container">
                <div id="timer">
                    <div id="score-container">Score: {score.toString().padStart(2, '0')}</div>
                    <div id="timer-word">Time Left:</div>
                    <div id="timer-text">{Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? '0' : ''}{timerSeconds % 60}</div>
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
}

export { Home };
