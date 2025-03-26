import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import css from "./App.module.css";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../pages/NotFoundPage";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReview = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense
        fallback={
          <p>
            <b>Loading page...</b>
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movie_id" element={<MovieDetailsPage />}>
            <Route path="credits" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReview />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
