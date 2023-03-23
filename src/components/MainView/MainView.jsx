import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://cf-movie-api.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const MoviesFromApi = data.map((doc) => {
          return {
            Title: doc.Title,
            Description: doc.Description,
            Genre: doc.Genre.Name,
            Director: doc.Director.Name,
            Image: doc.ImagePath,
            id: doc._id
          };
        });
        setMovies(MoviesFromApi);
      });
  }, []);



  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
