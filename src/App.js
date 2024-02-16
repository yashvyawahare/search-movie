// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import GoBackButton from "./GoBackButton";
import MovieSearch from "./MovieSearch";

const API_KEY = "133c8c0fe3b4160ec0a86dc8875ba07d"; // Replace with your actual API key
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <h1>Movie Streaming Service</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Release Year: {movie.release_date.substring(0, 4)}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="click_title">{selectedMovie.title}</h2>
            <p className="click_genre">{selectedMovie.overview}</p>
            <p className="click_genre">
              Genres: {selectedMovie.genre_ids.join(", ")}
            </p>
            <GoBackButton />
          </div>
        </div>
      )}
      <MovieSearch />
    </div>
  );
}

export default App;
