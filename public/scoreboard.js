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


function displayScores(scores) {
    const personalTableBodyEl = document.querySelector('#personal-scores');
    const globalTableBodyEl = document.querySelector('#global-scores');

    // Clear existing table rows
    // personalTableBodyEl.innerHTML = '';
    // globalTableBodyEl.innerHTML = '';

    if (scores.length) {
        // Update the DOM with the scores
        for (const [i, score] of scores.entries()) {
            const positionTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');
            const longestWordTdEl = document.createElement('td');

            positionTdEl.textContent = i + 1;
            nameTdEl.textContent = score.name;
            scoreTdEl.textContent = score.score;
            longestWordTdEl.textContent = score.longestWord;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(positionTdEl);
            rowEl.appendChild(nameTdEl);
            rowEl.appendChild(scoreTdEl);
            rowEl.appendChild(longestWordTdEl);

            if (score.name === localStorage.getItem('loggedInUsername')) {
                personalTableBodyEl.appendChild(rowEl.cloneNode(true)); // Add the row to personal table
                globalTableBodyEl.appendChild(rowEl); // Add the row to global table
            } else {
                globalTableBodyEl.appendChild(rowEl); // Add the row to global table
            }
        }
    } else {
        personalTableBodyEl.innerHTML = '<tr><td colspan="4">Be the first to score</td></tr>';
        globalTableBodyEl.innerHTML = '<tr><td colspan="4">Be the first to score</td></tr>';
    }
}


loadScores();
