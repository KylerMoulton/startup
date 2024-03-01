document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const timerText = document.getElementById("timer-text");

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

    // Function to shuffle the game board
    function shuffleGameBoard() {
        // Reset the timer
        clearInterval(timerInterval);
        timerSeconds = 180;
        timerText.textContent = "3:00";

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

            // Add click event listener to each grid box
            box.addEventListener('click', function() {
                // Change background color to red
                box.style.backgroundColor = 'red';
            });
        });

        // Start the countdown timer
        startTimer();
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

    // Event listener for the start button click
    startButton.addEventListener("click", function() {
        shuffleGameBoard();
    });
});
