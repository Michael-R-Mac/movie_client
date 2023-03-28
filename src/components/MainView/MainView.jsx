import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignUpView/SignUpView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch("https://cf-movie-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <><button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /></>
    );
  }

  if (movies.length === 0) {
    return (
    <><button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    <div>The list is empty!</div></>);
  }

  return (
    <><button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          } } />
      ))}
    </div></>
  );
};
