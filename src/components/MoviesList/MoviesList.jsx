import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../MovieCard/MovieCard";
import { MoviesFilter } from "../MoviesFilter/MoviesFilter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );
  return (
    <>
      <Row className="m-3" sm={3}>
        <MoviesFilter />
      </Row>
      <Row className="m-3" sm={3}>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-2" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
