import React from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movie';

const API_URL = 'http://www.omdbapi.com?apikey=d074b1ca';

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  } 

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }

  React.useEffect(() => {
    searchMovies('Batman');
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input type="text" placeholder='Search for Movies' value={searchTerm} onKeyDown={handleKeyDown} onChange={(event) => setSearchTerm(event.target.value)}/>
          <img src={SearchIcon} alt="search" onClick= {() => searchMovies(searchTerm)} />
        </div>
        {movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                <MovieCard movie={movie} />
              </Link>
            ))}
            <Routes>
              <Route path='/movie/:id' element={<Movie />} />
            </Routes>
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
