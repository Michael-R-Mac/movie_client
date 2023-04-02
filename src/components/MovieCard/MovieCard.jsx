import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Button
          className="back-button"
          onClick={() => onMovieClick(movie)}
          variant="link"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
