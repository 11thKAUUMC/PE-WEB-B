import { useState } from 'react';
import MovieGrid from '../../components/movies/movie-grid';
import Pagination from '../../components/movies/pagination';
import { movies } from '../../data/movie';
import type { Movie } from '../../types/movie';

export function MovieListPage() {
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
            <main className="movie-page page-container" id="movie-list">
                <h1>영화 목록</h1>
                {/*<div className="rounded-lg bg-blue-600 p-4 text-white">*/}
                {/*    Tailwind 연결 확인*/}
                {/*</div>*/}
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
