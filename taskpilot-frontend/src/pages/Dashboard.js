import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="page-container">
            <div className="content">
                <h2>Dashboard</h2>
                <p>Welcome to your task manager dashboard!</p>
                <Link to="/create-task" className="nav-button">Create New Task</Link>
                <div>
                    <h3>Upcoming Tasks</h3>
                    {}
                    <p>No tasks yet. Start by adding one!</p>
                </div>
                <div>
                    <h3>Completed Tasks</h3>
                    {}
                    <p>Complete a task to see it here!</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
