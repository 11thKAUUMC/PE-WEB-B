import { useState } from 'react';
import Header from './components/layout/header.tsx';
import MovieGrid from './components/movies/movie-grid.tsx';
import Pagination from './components/movies/pagination.tsx';
import { movies } from './data/movie';
import type { Movie } from './types/movie';
import './App.css';

export default function App() {
  const [movieList, setMovieList] = useState<Movie[]>(movies);

  function handleToggleBookmark(movieId: number) {
    // 이전 배열을 수정하지 않고, 선택한 영화만 새 객체로 바꿔요.
    setMovieList((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <>
      <Header />
      <main className="movie-page page-container" id="movie-list">
        <h1>영화 목록</h1>
        <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
      </main>
      <footer className="site-footer">
        <div className="page-container footer-content">
          <img src="/images/logos/tmdb-logo.svg" alt="TMDB" />
          <p>
            This product uses the TMDB API but is not endorsed or certified by{' '}
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
