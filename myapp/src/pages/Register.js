import React, {useState, useEffect} from 'react';
import '../css/Register.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import {Link} from 'react-router-dom';

// main register function, containing core code for the user registration functionality
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    // function to handle the submission of the registration form
    const handleSubmit = (event) => {
        if (status === ' '){
            setStatus('customer');
            console.log('set user status to customer');
        }
        const data = {email, password, status};

        // Send data to server to insert into database
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        // Clear form fields
        setEmail('');
        setPassword('');
        setStatus('');
        window.location.href = '/login';
    }

    // front end code for registration
    return (
        <div className="Register">
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
                <div className="label-wrapper">
                    <label className="status-label">Status:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}
                           placeholder="customers leave blank"/>
                </div>
            </div>
            <div className="form-group">
                <button className="submit-button" onClick={handleSubmit}>
                    Register
                </button>
            </div>

        </div>
    )
}

export default Register