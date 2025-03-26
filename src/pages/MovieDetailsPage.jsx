import { Suspense } from "react";
import { useEffect, useState, useMemo } from "react";
import { useParams, Outlet, NavLink } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../fetchService.js";
import css from "./PagesStyles.module.css";

function MoviesDetailsPage() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movie_id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const backPath = useMemo(() => location.state?.from ?? "/movies", [location]);

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movie_id);
        setMovieInfo(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [movie_id]);

  const handleGoBackBtn = () => {
    navigate(backPath);
  };

  return (
    <>
      <button className={css.goBackBtn} onClick={handleGoBackBtn}>
        Go back
      </button>
      {isLoading && <b>Loading the details...</b>}
      {error && <b>Error...</b>}
      {movieInfo && (
        <div className={css.detailsContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
            alt={`${movieInfo.title} poster`}
            width="300"
            height="450"
          />
          <div>
            <h1 className={css.movieTitle}>{movieInfo.title}</h1>
            <p>User score: {Math.round(movieInfo.vote_average * 10)}%</p>
            <h4>Overview</h4>
            <p>{movieInfo.overview}</p>
            <h5>Genres</h5>
            <p>
              {movieInfo?.genres?.map((genre) => genre.name).join(" ") ??
                "No genres available"}
            </p>
          </div>
        </div>
      )}
      <ul className={css.detailsNavList}>
        <li>
          <NavLink to="credits">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading cast or reviews...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default MoviesDetailsPage;
