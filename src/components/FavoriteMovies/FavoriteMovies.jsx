import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../MovieCard/MovieCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { setFavorite } from "../../redux/reducers/FavoriteMovies";

export const FavoriteMoviesView = () => {
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies.list);
  const Favorite = useSelector((state) => state.Favorite.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredMovies = movies.filter((movies) =>
      user.FavoriteMovies?.includes(movies.id)
    );
    dispatch(setFavorite(filteredMovies));
  }, []);
  return (
    <>
      <Row className="justify-content-md-center">
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          Favorite.map((movie) => (
            <Col key={movie.id} className="m-3" sm={5}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
