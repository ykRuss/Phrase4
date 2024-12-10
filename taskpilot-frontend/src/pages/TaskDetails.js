import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
      
        axios.get(`http://localhost:8000/api/tasks/${id}`).then((response) => {
            console.log(response.data);
            setTask(response.data);
        });
    }, [id]);

    return (
        <div className="page-container">
            <div className="content">
                <h2>Task Details</h2>
                {task ? (
                    <div>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Due Date:</strong> {task.dueDate}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                    </div>
                ) : (
                    <p>Loading task details...</p>
                )}
            </div>
        </div>
    );
}

export default TaskDetails;
