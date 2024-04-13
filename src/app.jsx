import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
//import { Home } from './home/home.jsx';
import { GamePage } from './home/GamePage.jsx';
import { Scores } from './scores/scores.jsx';
import { Rules } from './rules/rules.jsx';
// import './home/game.html';
import './app.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    const toggleDialogVisibility = () => {
        if (loggedIn) {
            logout();
        } else {
            setDialogVisible(!dialogVisible);
        }
    };

    const loginUser = async () => {
        await loginOrCreate('/api/auth/login');
    };

    const createUser = async () => {
        await loginOrCreate('/api/auth/create');
    };

    const loginOrCreate = async (endpoint) => {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ userName: username, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            localStorage.setItem('loggedInUsername', username);
            setLoggedIn(true);
            setDialogVisible(false);
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    };

    const logout = async () => {
        try {
            await fetch(`/api/auth/logout`, {
                method: 'delete',
            });
            setLoggedIn(false);
            localStorage.removeItem("loggedInUsername");
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <BrowserRouter>
    <div className='body'>
        <header>
            <nav id="navbar">
                <ul>
                    <li>
                        <h1 id="title">Boggle4DaGoats</h1>
                    </li>
                    <li><NavLink id="home" to="/">Home</NavLink></li>
                    <li><NavLink id="scores" to="/scores.html">Scores</NavLink></li>
                    <li><NavLink id="rules" to="/rules.html">Rules</NavLink></li>
                    <li>
                        <dialog id="Login-RegisterButton" style={{ display: loggedIn ? 'none' : dialogVisible ? 'block' : 'none' }}>
                            <div className="button-container">
                                <button id="login-button" onClick={loginUser}>Login</button>
                                <button id="register-button" onClick={createUser}>Register</button>
                            </div>
                            <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <br />
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </dialog>
                    </li>
                </ul>
                <li><button id="show-dialog" onClick={toggleDialogVisibility}>{loggedIn ? `Logout of ${username}` : 'Login/Register'}</button></li>
            </nav>
        </header>
        <Routes>
            <Route path='/' element={<GamePage />} exact />
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
