import React from 'react';
import './app.css';

export default function App() {
  return (
    <div className='body'>
    <header>
        <nav id="navbar">
            <ul>
                <li>
                    <h1 id="title">Boggle4DaGoats</h1>
                </li>
                <li><a id="home" href="index.html">Home</a></li>
                <li><a id="scores" href="scores.html">Scores</a></li>
                <li><a id="rules" href="rules.html">Rules</a></li>
                <li>
                    <dialog open id="Login-RegisterButton">
                        <div className="button-container">
                            <button id="login-button">Login</button>
                            <button id="register-button">Register</button>
                        </div>
                        <input type="text" id="username" placeholder="Enter your username" />
                        <br />
                        <input type="password" id="password" placeholder="Enter your password" />
                    </dialog>

                </li>
            </ul>
            <li><button id="show-diolog">Login/Register</button></li>
        </nav>
    </header>
    <main id="main-content">
        App Components go here
    </main>
    <footer>
        <div id="footer">
            <span className="text-reset">Kyler Moulton</span>
            <br />
            <a href="https://github.com/KylerMoulton/startup">GitHub</a>
        </div>
    </footer>
</div>
);
}