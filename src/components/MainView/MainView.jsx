import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignUpView/SignUpView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch("https://cf-movie-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
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
            id: doc._id,
          };
        });
        setMovies(MoviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col className="m-3" md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <>
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          </>
        ) : movies.length === 0 ? (
          <>
            <div>The list is empty!</div>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
              className="back-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <>
              {movies.map((movie) => (
                <Col className="m-3" key={movie.id} md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
              className="back-button"
            >
              Logout
            </button>
          </>
        )}
      </Row>
    </BrowserRouter>
  );
};
