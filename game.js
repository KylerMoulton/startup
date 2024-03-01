document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const timerText = document.getElementById("timer-text");
    const scoreContainer = document.getElementById("score-container");

    // Array of strings representing character sets for each grid box
    const characterSets = [
        "RIFOBX",
        "IFEHEY",
        "DENOWS",
        "UTOKND",
        "HMSRAO",
        "LUPETS",
        "ACITOA",
        "YLGKUE",
        "QBMJOA",
        "EHISPN",
        "VETIGN",
        "BALIYT",
        "EZAVND",
        "RALESC",
        "UWILRG",
        "PACEMD"
    ];

    let timerInterval; // Variable to hold the interval for the countdown timer
    let timerSeconds = 180; // Total number of seconds for the timer (3 minutes)
    let selectedBoxes = new Set(); // Set to store clicked boxes
    let selectedWord = ""; // String to store the selected word
    let lastSelectedBox = null; // Variable to store the last selected box
    let validWords = []; // Array to store valid words
    let totalScore = 0; // Variable to store the total score

    // Function to update the user's words displayed in the UserWords section
    function updateUserWords(word) {
        const userWordsSection = document.querySelector('#UserWords .Words-found');
        const newWordDiv = document.createElement('div');
        newWordDiv.classList.add('word');
        newWordDiv.textContent = `You just spelled: ${word}`;
        userWordsSection.appendChild(newWordDiv);
    }

    // Function to update the total score displayed in the score container
    function updateTotalScore() {
        totalScore = validWords.reduce((acc, word) => acc + calculateScore(word), 0);
        scoreContainer.textContent = `Score: ${totalScore}`;
    }

    // Function to calculate the score of a word based on Boggle scoring rules
    function calculateScore(word) {
        const length = word.length;
        if (length <= 4) return 1;
        else if (length === 5) return 2;
        else if (length === 6) return 3;
        else if (length === 7) return 5;
        else return 11;
    }

    // Function to shuffle the game board
    function shuffleGameBoard() {
        // Reset the timer
        clearInterval(timerInterval);
        timerSeconds = 180;
        timerText.textContent = "3:00";

        // Reset selected boxes, word, and valid words
        resetSelected();
        validWords = [];
        updateTotalScore();

        // Get all grid boxes
        const gridBoxes = gameBoard.querySelectorAll('.gridbox');

        // Shuffle the character sets array
        const shuffledSets = shuffleArray(characterSets);

        // Assign characters from shuffled sets to grid boxes
        gridBoxes.forEach(function(box) {
            // Get a random character set from shuffled array
            const randomSet = shuffledSets[Math.floor(Math.random() * shuffledSets.length)];
            // Get a random character from the set and add an extra whitespace character
            const randomCharacter = randomSet[Math.floor(Math.random() * randomSet.length)];
            // Assign the character to the grid box
            box.textContent = randomCharacter;
        });

        // Start the countdown timer
        startTimer();
    }

    // Function to reset selected boxes, word, and user words displayed
    function resetSelected() {
        selectedBoxes.forEach(box => {
            box.style.backgroundColor = ''; // Reset background color
        });
        selectedBoxes.clear(); // Clear selected boxes
        selectedWord = ""; // Clear selected word
        lastSelectedBox = null; // Reset last selected box

        // Reset user words displayed
        resetUserWords();
    }

    // Function to reset the UserWords section
    function resetUserWords() {
        const userWordsSection = document.querySelector('#UserWords .Words-found');
        userWordsSection.innerHTML = ''; // Clear all child elements
    }

    // Function to start the countdown timer
    function startTimer() {
        timerInterval = setInterval(function() {
            // Update the timer text with the remaining time
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Decrement the timer
            timerSeconds--;

            // Check if the timer has reached zero
            if (timerSeconds < 0) {
                clearInterval(timerInterval); // Stop the timer
                timerText.textContent = "0:00"; // Display "0:00" when timer reaches zero
                gameBoard.removeEventListener("click", handleBoxClick); // Remove box click event listener
            }
        }, 1000); // Update the timer every second
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to check if two boxes are adjacent or diagonal to each other
    function isAdjacentOrDiagonal(box1, box2) {
        const id1 = parseInt(box1.id);
        const id2 = parseInt(box2.id);
        const row1 = Math.floor((id1 - 1) / 4); // Row index of box1
        const col1 = (id1 - 1) % 4; // Column index of box1
        const row2 = Math.floor((id2 - 1) / 4); // Row index of box2
        const col2 = (id2 - 1) % 4; // Column index of box2
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        return rowDiff <= 1 && colDiff <= 1; // Check if row and column differences are less than or equal to 1
    }

    // Event listener for the start button click
    startButton.addEventListener("click", function() {
        shuffleGameBoard();
        gameBoard.addEventListener("click", handleBoxClick); // Add box click event listener after starting the game
    });

    // Event listener for box clicks
    function handleBoxClick(event) {
        const clickedBox = event.target;

        // Check if the timer has not yet reached zero
        if (timerSeconds >= 0) {
            // Check if the clicked box is adjacent or diagonal to the last selected box
            if (
                selectedBoxes.size === 0 || // Allow selection if no boxes are currently selected
                (lastSelectedBox && isAdjacentOrDiagonal(clickedBox, lastSelectedBox))
            ) {
                // Only allow selection if the box is not already selected
                if (!selectedBoxes.has(clickedBox)) {
                    clickedBox.style.backgroundColor = '#1ac2ce';
                    selectedBoxes.add(clickedBox);
                    selectedWord += clickedBox.textContent;
                    lastSelectedBox = clickedBox;
                }
            }
        }
    }

    // Event listener for the submit button click
    document.getElementById("submit-word").addEventListener("click", function() {
        // Check if the selected word is 3 letters or longer
        if (selectedWord.length >= 3) {
            // Fetch API call to check if the word is valid
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    if (data && data.length > 0) {
                        console.log(`${selectedWord} is a valid word.`);
                        // Add the valid word to the list
                        validWords.push(selectedWord);
                        console.log('Valid words:', validWords);

                        // Update user words display
                        updateUserWords(selectedWord);

                        // Calculate score and update total score
                        updateTotalScore();

                        // Reset selected boxes and word
                        resetSelected();
                    } else {
                        console.log(`${selectedWord} is not a valid word.`);
                        resetSelected();
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    resetSelected();
                });
        } else {
            console.log('Word must be at least 3 letters long.');
            resetSelected();
        }
    });
});
