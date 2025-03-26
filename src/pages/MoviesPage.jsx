import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { fetchMovies } from "../fetchService.js";
import css from "./PagesStyles.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setIsFirstSearch(false);
        const data = await fetchMovies(query);
        setMovies(data ?? []);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFirstSearch(false);
    try {
      setIsLoading(true);
      setError(false);
      const form = event.target;
      const searchStr = form.elements.search.value.trim();
      if (!searchStr) {
        setError(true);
        return;
      }
      const data = await fetchMovies(searchStr);
      setMovies(data ?? []);
      setSearchParams({ query: searchStr });
      form.reset();
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.moviesPageContainer}>
      <form className={css.moviesSearchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter a movie title"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <b className="loadingTxt">Loading movies...</b>}
      {error && (
        <b className="errorTxt">
          Whoops there was an error, try to reload the page, please...
        </b>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!isFirstSearch && !isLoading && !error && movies.length === 0 && (
        <b className="noResultsTxt">
          Sorry, nothing has been found, try another title, please...
        </b>
      )}
    </div>
  );
}

export default MoviesPage;
