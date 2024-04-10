import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home.jsx';
import { Scores } from './scores/scores.jsx';
import { Rules } from './rules/rules.jsx';
import './app.css';

function App() {
    return (
        <BrowserRouter>
            <div className='body'>
                <header>
                    <nav id="navbar">
                        <ul>
                            <li>
                                <h1 id="title">Boggle4DaGoats</h1>
                            </li>
                            <li><NavLink id="home" to="index.html">Home</NavLink></li>
                            <li><NavLink id="scores" to="scores.html">Scores</NavLink></li>
                            <li><NavLink id="rules" to="rules.html">Rules</NavLink></li>
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
                <Routes>
                    <Route path='/index.html' element={<Home />} exact />
                    <Route path='/scores.html' element={<Scores />} />
                    <Route path='/rules.html' element={<Rules />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer>
                    <div id="footer">
                        <span className="text-reset">Kyler Moulton</span>
                        <br />
                        <a href="https://github.com/KylerMoulton/startup">GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  
  export default App;