import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        // Make API call to search tasks
        try {
            const response = await axios.get('http://localhost:8000/api/search', { params: { q: query } });
            setResults(response.data);  // Store the search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="content">
                <h2>Search Tasks</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search tasks"
                        required
                    />
                    <button type="submit" className="nav-button">Search</button>
                </form>
                <ul>
                    {results.length > 0 ? (
                        results.map((result) => (
                            <li key={result._id}>{result.name}</li>
                        ))
                    ) : (
                        <p>No tasks found</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Search;
