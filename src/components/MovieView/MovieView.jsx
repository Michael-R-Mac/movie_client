import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

export const MovieView = () => {
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.token);
  const { movieId } = useParams();
  const SeeMovie = movies.find((m) => m.id === movieId);

  const HandleAddFavoriteMovies = (event) => {
    event.preventDefault();

    fetch(
      "https://cf-movie-api.herokuapp.com/users/${user.Username}/movies/${SeeMovie.id}",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Successfully added to favorites");
      } else {
        alert("Failed to add to favorites");
      }
    });
  };

  const HandleRemoveFavoriteMovies = (event) => {
    event.preventDefault();

    fetch(
      "https://cf-movie-api.herokuapp.com/users/${user.Username}/movies/${SeeMovie.id}",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Successfully removed from favorites");
      } else {
        alert("Failed to remove from favorites");
      }
    });
  };

  return (
    <div>
      <div>
        <img src={SeeMovie.Image} style={{ width: "100%" }} />
      </div>
      <div>
        <span>Title: </span>
        <span>{SeeMovie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{SeeMovie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{SeeMovie.Genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{SeeMovie.Director}</span>
      </div>
      <Button className="back-button" onClick={HandleAddFavoriteMovies}>
        Add to Favorite Movies
      </Button>
      <Button className="back-button" onClick={HandleRemoveFavoriteMovies}>
        Delete from Favorite Movies
      </Button>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
