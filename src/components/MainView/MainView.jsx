import { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      Title: "Silence of the Lambs",
      Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      Genre: {
      Name: "Thriller",
      Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."},
      Director: {
      Name: "Jonathan Demme",
      Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017"},
      ImagePath: "https://upload.wikimedia.org/wikipedia/commons/f/ff/The_Silence_of_the_Lambs.png",
      Featured: true
    },
    {
      id: 2,
      Title: "Tenet",
      Description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage.",
      Genre: {
      Name: "Thriller",
      Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."},
      Director: {
      Name: "Christopher Nolan",
      Bio: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
      Birth: "1970"},
      ImagePath: "https://upload.wikimedia.org/wikipedia/commons/9/94/Logo_del_film_Tenet.jpg",
      Featured: false
    },
    {
      id: 3,
      Title: "The Shawshank Redemption",
      Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
      Name: "Drama",
      Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."},
      Director: {
      Name: "Frank Darabont",
      Bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Darabont is one of only six filmmakers in history with the unique distinction of having his first two feature films receive nominations for the Best Picture Academy Award.",
      Birth: "1959"},
      ImagePath: "https://upload.wikimedia.org/wikipedia/commons/1/15/The_Shawshank_Redemption_movie_logo.png",
      Featured: true
    },
  ]);

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
