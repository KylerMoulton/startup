document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const timerText = document.getElementById("timer-text");
    const resetWordButton = document.getElementById("reset-word");
    const submitWordButton = document.getElementById("submit-word");

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
    let gameStarted = false; // Variable to track if the game has started

    // Function to shuffle the game board
    function shuffleGameBoard() {
        // Reset the timer
        clearInterval(timerInterval);
        timerSeconds = 180;
        timerText.textContent = "3:00";

        // Reset selected boxes and word
        resetSelected();

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

        // Enable box click event listener
        gameBoard.addEventListener("click", handleBoxClick);
        gameStarted = true;
    }

    // Function to reset selected boxes and word
    function resetSelected() {
        selectedBoxes.forEach(box => {
            box.style.backgroundColor = ''; // Reset background color
        });
        selectedBoxes.clear(); // Clear selected boxes
        selectedWord = ""; // Clear selected word
        lastSelectedBox = null; // Reset last selected box
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
                gameBoard.removeEventListener("click", handleBoxClick); // Disable box click event listener
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
        if (!gameStarted) {
            shuffleGameBoard();
        }
    });

    // Event listener for reset word button click
    resetWordButton.addEventListener("click", function() {
        resetSelected();
    });

    // Event listener for submit word button click
    submitWordButton.addEventListener("click", function() {
        // Your code to handle submitting the word
    });

    // Function to handle box clicks
    function handleBoxClick(event) {
        const clickedBox = event.target;

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
});
