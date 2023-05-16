import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../MovieCard/MovieCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { setFavorite } from "../../redux/reducers/FavoriteMovies";

export const FavoriteMoviesView = (user) => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const Favorite = useSelector((state) => state.Favorite.list);
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredMovies = movies.filter((movies) =>
      user.FavoriteMovies?.includes(movies.id)
    );
    dispatch(setFavorite(filteredMovies));
  }, []);
  return (
    <>
      <Row className="m-3" md={5}>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          Favorite.map((movie) => (
            <Col className="mb-3" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
