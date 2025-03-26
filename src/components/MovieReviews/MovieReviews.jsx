import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieReviews } from "../../fetchService.js";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movie_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movie_id);
        setReviews(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movie_id]);

  return (
    <>
      <div className={css.reviewContainer}>
        <h3 className={css.reviewHeader}>Movie Reviews</h3>
        {isLoading && <b className="loadingTxt">Loading the reviews...</b>}
        {error && <b className="errorTxt">Error...</b>}
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div key={review.id} className={css.reviewItem}>
              <h4 className={css.reviewAuthor}>{review.author}</h4>
              <p className={css.reviewContent}>Character: {review.content}</p>
            </div>
          ))}
        {reviews.length === 0 && !error && !isLoading && (
          <b className="noResultsTxt">Sorry, nothing has been found.</b>
        )}
      </div>
    </>
  );
}

export default MovieReviews;
