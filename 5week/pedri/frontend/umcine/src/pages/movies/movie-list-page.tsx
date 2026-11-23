import MovieGrid from '../../components/movies/movie-grid';

import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
    const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;
        async function loadMovies() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const response = await getMovies({ page: 1 });
                if (!ignore) setMovies(response.results);
            } catch {
                if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }

        loadMovies();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 pt-7 pb-14 md:w-[calc(100%-64px)]" id="movie-list">
            <h1 className="mb-4 text-[28px] font-bold leading-[1.3] tracking-[-1.4px] md:text-4xl">영화 목록</h1>
            {isLoading ? (
                <p role="status">영화 목록을 불러오는 중이에요.</p>
            ) : errorMessage ? (
                <p role="alert">{errorMessage}</p>
            ) : movies.length === 0 ? (
                <p>조건에 맞는 영화가 없어요.</p>
            ) : (
                <MovieGrid movies={movies} />
            )}
        </main>
    );

}
