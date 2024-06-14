import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/posts/search', {
        params: { keyword: searchTerm }
      });
      setResults(response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {results.length > 0 ? (
          results.map(post => (
            <div key={post._id} className="post">
              <img src={post.imgUrl} alt={post.description} />
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
