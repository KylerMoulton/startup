document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const timerText = document.getElementById("timer-text");

    let timerInterval;
    let timerSeconds = 180;

    let previousBox = null; // Variable to store the previously clicked box

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

    function shuffleGameBoard() {
        clearInterval(timerInterval);
        timerSeconds = 180;
        timerText.textContent = "3:00";

        const gridBoxes = gameBoard.querySelectorAll('.gridbox');
        gridBoxes.forEach(function(box) {
            box.style.backgroundColor = '';
        });

        const shuffledSets = shuffleArray(characterSets);
        gridBoxes.forEach(function(box) {
            const randomSet = shuffledSets[Math.floor(Math.random() * shuffledSets.length)];
            const randomCharacter = randomSet[Math.floor(Math.random() * randomSet.length)];
            box.textContent = randomCharacter;

            box.addEventListener('click', function() {
                if (!box.style.backgroundColor) { // Check if the box has not been clicked before
                    if (!previousBox || isAdjacentOrDiagonal(previousBox, box)) { // Check if the box is adjacent or diagonal to the previous box
                        box.style.backgroundColor = '#1ac2ce'; // Change background color to #1ac2ce
                        previousBox = box; // Update the previousBox variable
                    }
                }
            });
        });

        startTimer();
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

    // Function to check if two boxes are adjacent or diagonal
    function isAdjacentOrDiagonal(box1, box2) {
        const id1 = parseInt(box1.id);
        const id2 = parseInt(box2.id);
        const row1 = Math.ceil(id1 / 4);
        const col1 = id1 % 4 === 0 ? 4 : id1 % 4;
        const row2 = Math.ceil(id2 / 4);
        const col2 = id2 % 4 === 0 ? 4 : id2 % 4;

        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);

        return (rowDiff <= 1 && colDiff <= 1); // Check if the boxes are adjacent or diagonal
    }

    startButton.addEventListener("click", function() {
        shuffleGameBoard();
        previousBox = null; // Reset the previousBox variable when start button is clicked
    });
});
