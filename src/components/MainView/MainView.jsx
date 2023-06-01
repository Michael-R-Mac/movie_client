import { useState, useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignUpView/SignUpView";
import { ProfileView } from "../ProfileView/ProfileView";
import { MoviesList } from "../MoviesList/MoviesList";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();

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
        dispatch(setMovies(MoviesFromApi));
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="m-3" md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
            }
          />
          <Route
            path="/users/:UserUsername"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col className="m-3" md={5}>
                    <ProfileView movies={movies} user={user} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
