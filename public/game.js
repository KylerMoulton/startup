document.addEventListener("DOMContentLoaded", function() {
    // Access the global variable loggedInUsername from login.js
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
    let timerSeconds = 180;
    let selectedBoxes = new Set();
    let selectedWord = "";
    let lastSelectedBox = null;
    let score = 0;
    let gameInProgress = false;
    let foundWords = [];
    let longestWord = "";

    configureWebSocket();
    function shuffleGameBoard() {
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

        gridBoxes.forEach(function(box) {
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
        selectedBoxes.clear();
        selectedWord = "";
        lastSelectedBox = null;
    }

    function startTimer() {
        timerInterval = setInterval(function() {
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
                broadcastEvent(loggedInUsername,GameEndEvent,score);
                broadcastEvent(loggedInUsername, LongestWordEvent, longestWord);
                storeGameData(score);
            }
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
    }

    startButton.addEventListener("click", function() {
        shuffleGameBoard();
        gameBoard.addEventListener("click", handleBoxClick);
        submitButton.disabled = false;
        resetButton.disabled = false;
        broadcastEvent(loggedInUsername,GameStartEvent, {});
    });

    gameBoard.addEventListener("click", function(event) {
        handleBoxClick(event);
    });

    submitButton.addEventListener("click", function() {
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
    });

    resetButton.addEventListener("click", function() {
        resetSelected();
    });

    function updateScore(newWords) {
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

        score += totalScore;
        scoreContainer.textContent = `Score: ${score.toString().padStart(2, '0')}`;
    }
    
    // async function storeGameData(score) {
    //     const userName = loggedInUsername;
    //     let scores = [];
    //     const scoresText = localStorage.getItem('gameData');
    //     if (scoresText) {
    //       scores = JSON.parse(scoresText);
    //     }
    //     scores = updateScores(userName, score, scores);
    //     try {
    //         const response = await fetch('/api/score', {
    //             method: 'POST',
    //             headers: {'content-type': 'application/json'},
    //             body: JSON.stringify(scores),
    //           });
    //         const newScores = await response.json();
    //         localStorage.setItem('gameData', JSON.stringify(newScores));
    //     } catch {
    //         this.updateScores(scoresText);
    //     }
    //   }
      async function storeGameData(score) {
        const userName = loggedInUsername;
        const newScore = { name: userName, score: score, longestWord: longestWord };
        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newScore),
              });
            const newScores = await response.json();
            localStorage.setItem('gameData', JSON.stringify(newScores));
        } catch {
            updateScores(score);
        }
      }
    
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
    
    
    

    // // Simulate chat messages that will come over WebSocket
    // setInterval(() => {
    //     const score = Math.floor(Math.random() * 3000);
    //     const chatText = document.querySelector('.Game-Notifications');
    //     chatText.innerHTML =
    //     `<div class="player-name"><span class="player-event">Eich</span> scored ${score}</div>` +
    //     chatText.innerHTML;
    // }, 5000);

    function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
          displayMsg('Welcome', 'To', 'Boggle');
        };
        this.socket.onclose = (event) => {
          displayMsg('See', 'You', 'Next Time');
        };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          if (msg.type === GameEndEvent) {
            displayMsg('player', msg.from, `scored ${msg.value.score}`);
            displayMsg('player', msg.from, 'had a longest word of', longestWord);
          } else if (msg.type === GameStartEvent) {
            displayMsg('player', msg.from, `started a new game`);
          }
        };
      }
    
      function displayMsg(cls, from, msg) {
        const chatText = document.querySelector('.Game-Notifications');
        // `<div class="player-name"><span class="player-event">Eich</span> scored ${score}</div>` + chatText.innerHTML;

        chatText.innerHTML =
        `<div class="player-name"><span class="player-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
      }
    
      function broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
});
