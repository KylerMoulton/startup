import React from 'react';

import './rules.css';

export function Rules() {
  return (
    <main>
        <div className="background-image">
            <div className="rules-container">
                <ul>
                    <li>Words must be at least three letters in length.</li>
                    <li>Each letter after the first must be a horizontal, vertical, or diagonal neighbor of the one before it.</li>
                    <li>No individual letter cube may be used more than once in a word.</li>
                    <li>No capitalized or hyphenated words are allowed.</li>
                    <li>Multiple forms of the same word are allowed, such as singular and plural forms and other derivations.</li>
                </ul>
                <p>One cube is printed with "Qu". This is because Q is nearly always followed by U in English words (see exceptions), 
                    and if there were a Q in Boggle, it would be challenging to use if a U did not, by chance, appear next to it. For 
                    the purposes of scoring, Qu counts as two letters; for example, squid would score two points (for a five-letter word) 
                    despite being formed from a chain of only four cubes. Early versions of the game had a "Q" without the accompanying "u".
                </p>
            </div>
        </div>
    </main>
  );
}