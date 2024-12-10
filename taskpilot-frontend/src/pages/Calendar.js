import React, { useState, useEffect } from 'react';
import './Calendar.css';
import userProfilePic from '../assets/profile.png';
import settingsIcon from '../assets/settings.245x256.png';

function Calendar() {
    const [tasks, setTasks] = useState(Array(7).fill().map(() => []));
    const [taskInput, setTaskInput] = useState('');
    const [selectedDay, setSelectedDay] = useState(null);
    const [editIndex, setEditIndex] = useState({ day: null, index: null });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalTasks = tasks.reduce((total, dayTasks) => total + dayTasks.length, 0);
        const completedTasks = tasks.reduce((total, dayTasks) => 
            total + dayTasks.filter(task => task.completed).length, 0);
        
        if (totalTasks === 0) {
            setProgress(0);
        } else {
            setProgress((completedTasks / totalTasks) * 100);
        }
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '' && selectedDay !== null) {
            const newTasks = [...tasks];
            if (editIndex.day !== null && editIndex.index !== null) {
                newTasks[editIndex.day][editIndex.index] = { text: taskInput, completed: false };
                setEditIndex({ day: null, index: null });
            } else {
                newTasks[selectedDay].push({ text: taskInput, completed: false });
            }
            setTasks(newTasks);
            setTaskInput('');
            setSelectedDay(null);
        }
    };

    const handleDeleteTask = (day, taskIndex) => {
        const newTasks = [...tasks];
        newTasks[day].splice(taskIndex, 1);
        setTasks(newTasks);
    };

    const handleEditTask = (day, taskIndex) => {
        setTaskInput(tasks[day][taskIndex].text);
        setSelectedDay(day);
        setEditIndex({ day, index: taskIndex });
    };

    const handleToggleComplete = (day, taskIndex) => {
        const newTasks = [...tasks];
        newTasks[day][taskIndex].completed = !newTasks[day][taskIndex].completed;
        setTasks(newTasks);
    };

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="page-container">
            <div className="content">
                <h2>Your Calendar</h2>
                <form onSubmit={handleAddTask} className="task-input-form">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter your task"
                        required
                    />
                    <button type="submit" className="nav-button">Add Task</button>
                </form>

                <div className="taskboard">
                    <div className="day-header">
                        {days.map((day, dayIndex) => (
                            <div 
                                key={dayIndex} 
                                className="day-slot"
                                onClick={() => setSelectedDay(dayIndex)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="task-list">
                        {tasks.map((taskList, dayIndex) => (
                            <div key={dayIndex} className="day-tasks">
                                {taskList.map((task, taskIndex) => (
                                    <div key={taskIndex} className="task-item">
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed} 
                                            onChange={() => handleToggleComplete(dayIndex, taskIndex)} 
                                        />
                                        <div className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                            {task.text}
                                        </div>
                                        <div className="task-buttons">
                                            <button onClick={() => handleEditTask(dayIndex, taskIndex)} className="edit-button">Edit</button>
                                            <button onClick={() => handleDeleteTask(dayIndex, taskIndex)} className="delete-button">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="user-profile-section">
                    <img src={settingsIcon} alt="Settings" className="settings-icon" />
                    <img src={userProfilePic} alt="User Profile" className="user-profile-pic" />
                </div>
            </div>
            <div className="progress-section">
                <h3>Progress: {progress.toFixed(0)}%</h3>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
}

export default Calendar;
