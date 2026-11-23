import MovieGrid from '../../components/movies/movie-grid';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieQueryOptions } from "../../api/movies/movie-query-options";

export function MovieListPage() {
    const [page, setPage] = useState(1);

    const moviesQuery = useQuery(movieQueryOptions.list(page));

    const movies = moviesQuery.data?.results ?? [];
    const totalPages = moviesQuery.data?.total_pages ?? 0;

    return (
        <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 pt-7 pb-14 md:w-[calc(100%-64px)]" id="movie-list">
            <h1 className="mb-4 text-[28px] font-bold leading-[1.3] tracking-[-1.4px] md:text-4xl">영화 목록</h1>
            {moviesQuery.isPending ? (
                <p role="status">영화 목록을 불러오는 중이에요.</p>
            ) : moviesQuery.isError ? (
                <p role="alert">영화 목록을 불러오지 못했어요.</p>
            ) : movies.length === 0 ? (
                <p>조건에 맞는 영화가 없어요.</p>
            ) : (
                <>
                    <MovieGrid movies={movies} />
                    <nav className="mt-6 flex items-center justify-center gap-4" aria-label="영화 목록 페이지">
                        <button
                            className="rounded border px-3 py-2 disabled:opacity-40"
                            type="button"
                            disabled={page <= 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            이전
                        </button>
                        <span aria-live="polite">{page}페이지</span>
                        <button
                            className="rounded border px-3 py-2 disabled:opacity-40"
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            다음
                        </button>
                    </nav>
                </>
            )}
        </main>
    );

}
