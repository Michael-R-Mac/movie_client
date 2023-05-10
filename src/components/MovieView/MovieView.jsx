import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const { movieId } = useParams();
  const movies = useSelector((state) => state.movies.list);

  const SeeMovie = movies.find((m) => m.id === movieId);
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
