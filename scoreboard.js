document.addEventListener("DOMContentLoaded", function() {
    // Function to update personal scores
    function updatePersonalScores(username, score, longestWord) {
        const personalScores = document.querySelector("#personal .high-score-data");
        const nameElement = personalScores.querySelector(".name");
        const scoreElement = personalScores.querySelector(".score");
        const longestWordElement = personalScores.querySelector(".longest-word");

        nameElement.textContent = username;
        scoreElement.textContent = score;
        longestWordElement.textContent = longestWord;
    }

    // Function to update global scores
    function updateGlobalScores(username, score, longestWord) {
        const globalScores = document.querySelector("#global .high-score-data");
        const nameElement = globalScores.querySelector(".name");
        const scoreElement = globalScores.querySelector(".score");
        const longestWordElement = globalScores.querySelector(".longest-word");

        nameElement.textContent = username;
        scoreElement.textContent = score;
        longestWordElement.textContent = longestWord;
    }

    // Retrieve game data from localStorage
    const gameData = JSON.parse(localStorage.getItem('gameData')) || [];
    
    // Update personal scores
    if (gameData.length > 0) {
        const personalData = gameData[0];
        updatePersonalScores(personalData.name, personalData.score, personalData.longestWord);
    }

    // Update global scores
    if (gameData.length > 1) {
        const globalData = gameData[1];
        updateGlobalScores(globalData.name, globalData.score, globalData.longestWord);
    }

    // Display all possible scores
    const personalScoresContainer = document.querySelector("#personal .high-score-data");
    const globalScoresContainer = document.querySelector("#global .high-score-data");

    gameData.forEach(data => {
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = data.name;

        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = data.score;

        const longestWordElement = document.createElement('div');
        longestWordElement.classList.add('longest-word');
        longestWordElement.textContent = data.longestWord;

        if (data === gameData[0]) {
            personalScoresContainer.appendChild(nameElement);
            personalScoresContainer.appendChild(scoreElement);
            personalScoresContainer.appendChild(longestWordElement);
        } else {
            globalScoresContainer.appendChild(nameElement);
            globalScoresContainer.appendChild(scoreElement);
            globalScoresContainer.appendChild(longestWordElement);
        }
    });
});
