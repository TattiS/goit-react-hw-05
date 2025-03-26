import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieCredits } from "../../fetchService.js";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movie_id } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCredits(movie_id);
        setCast(data.cast);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movie_id]);

  return (
    <div className={css.castContainer}>
      <h3 className={css.castHeader}>Movie Cast</h3>
      {isLoading && <b className="loadingTxt">Loading the cast...</b>}
      {error && <b className="errorTxt">Error...</b>}
      <ul className={css.castList}>
        {cast.length > 0 &&
          cast.map((member) => (
            <li key={member.id} className={css.castMember}>
              <img
                className={css.castMemberImg}
                src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                alt={`${member.name} poster`}
                width="138"
                height="175"
              />
              <h3 className={css.castMemberName}>{member.name}</h3>
              <p className={css.castMemberCharacter}>
                Character: {member.character}
              </p>
            </li>
          ))}
      </ul>
      {cast.length === 0 && !error && !isLoading && (
        <b className="noResultsTxt">Sorry, nothing has been found.</b>
      )}
    </div>
  );
}

export default MovieCast;
