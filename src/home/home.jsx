import React, { useState, useEffect, useRef } from 'react';
import './index.css';

export const Home = () => {
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername'));
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [selectedBoxes, setSelectedBoxes] = useState(new Set());
  const [selectedWord, setSelectedWord] = useState('');
  const [lastSelectedBox, setLastSelectedBox] = useState(null);
  const [score, setScore] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [longestWord, setLongestWord] = useState('');

  const socketRef = useRef(null);

  useEffect(() => {
    configureWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timerSeconds < 0) {
      clearInterval(timerInterval);
      handleGameOver();
    }
  }, [timerSeconds]);

  const startButtonHandler = () => {
    shuffleGameBoard();
    setGameInProgress(true);
    // Start the timer interval here
    const timerInterval = setInterval(() => {
        setTimerSeconds(prevSeconds => {
            if (prevSeconds <= 0) {
                clearInterval(timerInterval); // Stop the timer when it reaches 0
                handleGameOver(); // Handle game over logic
                return 0; // Return 0 to stop decrementing the timer
            } else {
                return prevSeconds - 1; // Decrement the timer by 1 second
            }
        });
    }, 1000); // Run the interval every second
};



  const gameBoardClickHandler = (event) => {
    handleBoxClick(event);
  };

  const submitButtonHandler = () => {
    if (selectedWord.length >= 3) {
      const lowerCaseWord = selectedWord.toLowerCase();
      if (!foundWords.includes(lowerCaseWord)) {
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
              .then(response => {
                  if (response.ok) {
                      return response.json();
                  } else {
                      throw new Error('Word not found in dictionary');
                  }
              })
              .then(data => {
                  updateScore([selectedWord]);
                  const newWordDiv = document.createElement('div');
                  newWordDiv.textContent = `You just spelled: ${selectedWord}`;
                  newWordDiv.classList.add('word');
                  wordsFound.prepend(newWordDiv);
                  foundWords.push(lowerCaseWord);
                  
                  // Update longest word
                  if (selectedWord.length > longestWord.length) {
                      longestWord = selectedWord;
                  }
              })
              .catch(error => {
                  const newWordDiv = document.createElement('div');
                  newWordDiv.textContent = `Invalid word!`;
                  newWordDiv.classList.add('word');
                  wordsFound.prepend(newWordDiv);
              })
              .finally(() => {
                  resetSelected();
              });
      } else {
          const newWordDiv = document.createElement('div');
          newWordDiv.textContent = `Word already spelled!`;
          newWordDiv.classList.add('word');
          wordsFound.prepend(newWordDiv);
          resetSelected();
      }
  } else {
      const newWordDiv = document.createElement('div');
      newWordDiv.textContent = `Word must be at least 3 letters long!`;
      newWordDiv.classList.add('word');
      wordsFound.prepend(newWordDiv);
      resetSelected();
  }
  };

  const resetButtonHandler = () => {
    resetSelected();
  };

  const updateScore = (newWords) => {
    const scoreTable = {
      3: 1,
      4: 1,
      5: 2,
      6: 3,
      7: 5,
      8: 11
    };

    let totalScore = 0;

    newWords.forEach(word => {
      if (word.length >= 3 && word.length <= 8) {
        totalScore += scoreTable[word.length];
      }
    });

    setScore(prevScore => prevScore + totalScore);
  };

  const storeGameData = async () => {
    const userName = loggedInUsername;
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
  };

  function updateScores(newScore) {
    let scores = [];
    const scoresText = localStorage.getItem('gameData');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (newScore > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    localStorage.setItem('gameData', JSON.stringify(scores));
  }

  const configureWebSocket = () => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socketRef.current = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socketRef.current.onopen = (event) => {
      displayMsg('Welcome', 'Welcome To', 'Boggle');
    };
    socketRef.current.onclose = (event) => {
      displayMsg('See', 'See You', 'Next Time');
    };
    socketRef.current.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        displayMsg('player', msg.from, `scored ${msg.value}`);
      } else if (msg.type === LongestWordEvent) {
        displayMsg('player', msg.from, `had a longest word of ${msg.value}`);
      } else if (msg.type === GameStartEvent) {
        displayMsg('player', msg.from, `started a new game`);
      }
    };
  };

  function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('.Game-Notifications');

    chatText.innerHTML =
      `<div className="player-name"><span className="player-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }

  const shuffleGameBoard = () => {
    clearInterval(timerInterval);
    timerSeconds = 180;
    timerText.textContent = "3:00";
    resetSelected();
    score = 0;
    scoreContainer.textContent = "Score: 00";
    foundWords = [];
    longestWord = "";

    const gridBoxes = gameBoard.querySelectorAll('.gridbox');
    const shuffledSets = shuffleArray(characterSets);

    gridBoxes.forEach(function (box) {
      const randomSet = shuffledSets[Math.floor(Math.random() * shuffledSets.length)];
      const randomCharacter = randomSet[Math.floor(Math.random() * randomSet.length)];
      box.textContent = randomCharacter;
    });

    startTimer();
    gameInProgress = true;
  };

  const startTimer = () => {
    timerInterval = setInterval(function () {
      const minutes = Math.floor(timerSeconds / 60);
      const seconds = timerSeconds % 60;
      timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timerSeconds--;

      if (timerSeconds < 0) {
        clearInterval(timerInterval);
        timerText.textContent = "0:00";
        gameInProgress = false;
        gameBoard.removeEventListener("click", handleBoxClick);
        submitButton.disabled = true;
        resetButton.disabled = true;

        // Game over, store data
        broadcastEvent(loggedInUsername, GameEndEvent, score);
        broadcastEvent(loggedInUsername, LongestWordEvent, longestWord);
        storeGameData(score);
      }
    }, 1000);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const isAdjacentOrDiagonal = (box1, box2) => {
    const id1 = parseInt(box1.id);
        const id2 = parseInt(box2.id);
        const row1 = Math.floor((id1 - 1) / 4);
        const col1 = (id1 - 1) % 4;
        const row2 = Math.floor((id2 - 1) / 4);
        const col2 = (id2 - 1) % 4;
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        return rowDiff <= 1 && colDiff <= 1;
  };
  const handleBoxClick = (event) => {
    if (!gameInProgress) return;
        const clickedBox = event.target;

        if (
            selectedBoxes.size === 0 ||
            (lastSelectedBox && isAdjacentOrDiagonal(clickedBox, lastSelectedBox))
        ) {
            if (!selectedBoxes.has(clickedBox)) {
                clickedBox.style.backgroundColor = '#1ac2ce';
                selectedBoxes.add(clickedBox);
                selectedWord += clickedBox.textContent;
                lastSelectedBox = clickedBox;
            }
        }
  };

  const fetchWordData = (word) => {
    // Add logic here to fetch word data
    console.log('Fetching word data for:', word);
  };

  const displayWordMessage = (message) => {
    // Add logic here to display word message
    console.log('Displaying word message:', message);
  };

  const resetSelected = () => {
    selectedBoxes.forEach(box => {
      box.style.backgroundColor = '';
    });
    selectedBoxes.clear();
    selectedWord = "";
    lastSelectedBox = null;
  };

  const handleGameOver = () => {
    // Add logic here to handle game over
    console.log('Handling game over...');
  };

  return (
    <main id="main-content">
      <section id="websocket">
        <div className="Game-Notifications"></div>
      </section>
      <section id="game-container">
        <div id="timer">
          <div id="score-container">Score: {score}</div>
          <div id="timer-word">Time Left:</div>
          <div id="timer-text">3:00</div>
          <button id="start-button" onClick={startButtonHandler}>Start</button>
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
          <button id="reset-word" onClick={resetButtonHandler}>Reset Word</button>
          <button id="submit-word" onClick={submitButtonHandler}>Submit Word</button>
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

export default Home;
