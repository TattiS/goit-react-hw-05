import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.movieLst}>
      {movies.map((movie) => {
        return (
          <li key={movie.id} className={css.movieLstItem}>
            <img
              className={css.movieLstItemImg}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              width="150"
              height="225"
            />
            <h4 className={css.movieLstItemTitle}>{movie.title}</h4>
            <p>Release date: {movie.release_date}</p>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.link}
            >
              Details ...
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
