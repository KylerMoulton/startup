// scoreboard.js
async function loadScores() {
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        const scores = await response.json();
    
        // Save the scores in case we go offline in the future
        localStorage.setItem('gameData', JSON.stringify(scores));
        
        gameData = scores; // Update gameData with the fetched scores
    } catch {
        const gameDataText = localStorage.getItem('gameData');
        if (gameDataText) {
            gameData = JSON.parse(gameDataText);
        }
    }
    displayScores(gameData);
}


function displayScores(gameData) {
    const personalTableBodyEl = document.querySelector('#personal-scores');
    const globalTableBodyEl = document.querySelector('#global-scores');

    // Retrieve the logged-in username from local storage
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    // Clear existing table rows
    personalTableBodyEl.innerHTML = '';
    globalTableBodyEl.innerHTML = '';

    if (gameData.length) {
        for (const [i, score] of gameData.entries()) {
            const rowEl = createScoreRow(score, i + 1);
            if (score.at(i).name === loggedInUsername) {
                personalTableBodyEl.appendChild(rowEl.cloneNode(true)); // Clone the row and add to personal table
                globalTableBodyEl.appendChild(rowEl); // Add the original row to global table
            } else {
                globalTableBodyEl.appendChild(rowEl); // Add the original row to global table
            }
        }
    } else {
        personalTableBodyEl.innerHTML = '<tr><td colspan="4">Be the first to score</td></tr>';
        globalTableBodyEl.innerHTML = '<tr><td colspan="4">Be the first to score</td></tr>';
    }
}

// Function to create a table row for a score
function createScoreRow(score, position) {
    const positionTdEl = document.createElement('td');
    const nameTdEl = document.createElement('td');
    const scoreTdEl = document.createElement('td');
    const longestWordTdEl = document.createElement('td');

    positionTdEl.textContent = position;
    nameTdEl.textContent = score.at(position-1).name;
    scoreTdEl.textContent = score.at(position-1).score;
    longestWordTdEl.textContent = score.at(position-1).longestWord;

    const rowEl = document.createElement('tr');
    rowEl.appendChild(positionTdEl);
    rowEl.appendChild(nameTdEl);
    rowEl.appendChild(scoreTdEl);
    rowEl.appendChild(longestWordTdEl);

    return rowEl;
}

loadScores();
