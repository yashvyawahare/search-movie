// MovieSearch.js

import React, { useState, useEffect } from 'react';
import "./App.css";
const API_KEY = '133c8c0fe3b4160ec0a86dc8875ba07d'; // Replace with your actual API key
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setMovies([]);
      return;
    }

    fetch(API_URL + query)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input className="inp"
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search for a movie by title..."
      />

      <div className="search-results">
        {movies.map(movie => (
          <div key={movie.id}>
            <h3 className="h3">{movie.title}</h3>
            <p>Release Year: {movie.release_date}</p>
            <p>Overview: {movie.overview}</p>
            <img className="search" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
