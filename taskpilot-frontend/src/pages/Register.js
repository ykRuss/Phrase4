import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', { email, password });
            setMessage(response.data.message);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setMessage('Error registering: ' + error.response.data.message);
            } else {
                setMessage('Error registering: ' + error.message);
            }
        }
    };

    return (
        <div className="page-container">
            <div className="content">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit" className="nav-button">Register</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Register;
