import React, {useState, useEffect} from 'react';
import '../css/Login.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import {Link} from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
            .then((response) => {
                if (response.ok) {
                    setMessage('Login successful');
                    return response.json();
                } else if (response.status === 401) {
                    setMessage('Incorrect email or password');
                } else {
                    throw new Error('An error occurred while authenticating');
                }
            })
            .then(data => {
                console.log(data);
                if (data.message === "waiter") {
                    window.location.href = '/waiter';
                }
                if (data.message === "kitchen") {
                    window.location.href = '/kitchen';
                }
                if (data.message === "customer") {
                    window.location.href = '/menuL';
                }
            })
            .catch((error) => {
                console.error(error);
                setMessage('An error occurred while authenticating');
            });
    };

    return (
        <div className="login-form">
            <div className="Login">
                <header className="App-header">
                    <Link to="/">
                        <img src={logo} alt="the logo" className="header-image"/>
                    </Link>
                </header>
                <div className="form-group">
                    <div className="label-wrapper">
                        <label className="email-label">Email:</label>
                    </div>
                    <div className="input-wrapper">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="label-wrapper">
                        <label className="password-label">Password:</label>
                    </div>
                    <div className="input-wrapper">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="buttons-lgrg">
                        <button className="login-Button" onClick={handleSubmit}>
                            Login
                        </button>
                        <Link to="../register">
                            <button className="register-button"> REGISTER</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login