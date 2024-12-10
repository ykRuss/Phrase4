import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            navigate('/calendar'); 
        } catch (error) {
            if (error.response) {
                setMessage('Error logging in: ' + error.response.data.message);
            } else {
                setMessage('Error logging in: ' + error.message);
            }
        }
    };

    return (
        <div className="page-container">
            <div className="content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit" className="nav-button">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Login;
