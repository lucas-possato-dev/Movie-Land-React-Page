import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Movie.module.css';

const API_URL = 'https://www.omdbapi.com?apikey=d074b1ca';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API_URL}&i=${id}`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  const imgRef = React.useRef(null);

  const updateImgPosition = () => {
    if (imgRef.current) {
      const windowHeight = window.innerHeight;
      const imgHeight = imgRef.current.offsetHeight;
      const top = Math.max((windowHeight - imgHeight) / 2, 0);
      imgRef.current.style.top = `${top}px`;
    }
  };


  React.useEffect(() => {
    updateImgPosition();
    window.addEventListener('scroll', updateImgPosition);
    return () => {
      window.removeEventListener('scroll', updateImgPosition);
    };
  }, []);

  updateImgPosition();

  if (!movie) {
    return <div>Loading...</div>;
  }

  updateImgPosition();


  return (
    <div ref={imgRef} className={`${styles.movieDetails} ${styles.fontRaleway}`}>
      <h2>{movie.Title}</h2>
      <div>
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <p>Plot: {movie.Plot}</p>
    </div>
  );
};

export default Movie;