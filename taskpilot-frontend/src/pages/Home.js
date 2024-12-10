import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to TaskPilot</h1>
                <p>Manage your daily tasks efficiently!</p>
                <div className="button-group">
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/register" className="nav-button">Register</Link>
                    <Link to="/search" className="nav-button">Search</Link>
                    <Link to="/profile/1" className="nav-button">Profile</Link> 
                </div>
            </div>
        </div>
    );
}

export default Home;
