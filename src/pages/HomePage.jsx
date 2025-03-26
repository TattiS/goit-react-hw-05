import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../fetchService.js";
import MovieList from "../components/MovieList/MovieList";
import css from "./PagesStyles.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrendingMovies();
  }, []);
  return (
    <>
      <h1 className={css.homeTitle}>Trending movies</h1>
      {isLoading && <b>Loading trending movies...</b>}
      {error && (
        <b>Whoops there was an error, try to reload the page, please ...</b>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default HomePage;
