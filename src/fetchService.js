import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWY4YTE2ZjkzMjZjMTYxMzM2NjRiYWU5M2IwMGQ2NiIsIm5iZiI6MTc0MjY4NDA1OS42MTYsInN1YiI6IjY3ZGYzZjliZjZhMGZjYmQwMDRkODBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lCh1Y13xTA4PiJQKdnaMTgODwAhF3gqbA13KstMJJOA",
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", { params: { query } });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMovieDetails = async (movie_id) => {
  try {
    const response = await api.get(`/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMovieCredits = async (movie_id) => {
  try {
    const response = await api.get(`/movie/${movie_id}/credits`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMovieReviews = async (movie_id) => {
  try {
    const response = await api.get(`/movie/${movie_id}/reviews`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
