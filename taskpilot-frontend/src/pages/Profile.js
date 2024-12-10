// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {
            console.log(response.data);
            setUser(response.data);
        });
    }, [id]);

    return (
        <div className="page-container">
            <div className="content">
                <h2>User Profile</h2>
                {user ? (
                    <div>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;

