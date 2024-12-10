import React, { useState } from 'react';
import axios from 'axios';

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/tasks', {
            title,
            description,
            dueDate,
        });
        console.log(response.data);
    };

    return (
        <div className="page-container">
            <div className="content">
                <h2>Create New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                        required
                    ></textarea>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <button type="submit" className="nav-button">Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;
