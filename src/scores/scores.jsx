import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);
  const personalTableBody = [];
  const globalTableBody = [];
  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/scores')
  .then((response) =>  response.json())
  .then((scores) => {
    setScores(scores);
    localStorage.setItem('gameData', JSON.stringify(scores));
  })
  .catch(() => {
    console.log("Test");
    const scoresText = localStorage.getItem('gameData');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  });
  }, []);

  

    if (scores.length) {
        scores.forEach((score, i) => {
            const positionTd = <td>{i + 1}</td>;
            const nameTd = <td>{score.name}</td>;
            const scoreTd = <td>{score.score}</td>;
            const longestWordTd = <td>{score.longestWord}</td>;

            const row = (
                <tr key={i}>
                    {positionTd}
                    {nameTd}
                    {scoreTd}
                    {longestWordTd}
                </tr>
            );

            if (score.name === localStorage.getItem('loggedInUsername')) {
                personalTableBody.push(row); // Add the row to personal table
                globalTableBody.push(row); // Add the row to global table
            } else {
                globalTableBody.push(row); // Add the row to global table
            }
        });
    } else {
        personalTableBody.push(
            <tr key='0'>
                <td colSpan='4'>Login to view/save scores</td>
            </tr>
        );
        globalTableBody.push(
            <tr key='0'>
                <td colSpan='4'>Login to view/save scores</td>
            </tr>
        );
    }

  return (
    <main>
        <section id="personal">
            <h2>Personal</h2>
            <table className="table table-warning table-striped-columns">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Longest Word</th>
                  </tr>
                </thead>
                <tbody id="personal-scores">{personalTableBody}</tbody>
              </table>
        </section>
        <section id="global">
            <h2>Global</h2>
            <table className="table table-warning table-striped-columns">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Longest Word</th>
                  </tr>
                </thead>
                <tbody id="global-scores">{globalTableBody}</tbody>
              </table>
        </section>
    </main>
  );
}