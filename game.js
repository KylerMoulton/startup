document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");

    // Array of strings representing character sets for each grid box
    const characterSets = [
        "ABCDEF",
        "GHIJKL",
        "MNOPQR",
        "STUVWX",
        "YZ1234",
        "567890",
        "!,@#$%",
        "^&*()-",
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "0123456789",
        "!@#$%^&*()",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        "0123456789!@#$%^",
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "0123456789!@#$%^&*()"
    ];

    // Function to shuffle the game board
    function shuffleGameBoard() {
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
