import MovieGrid from '../../components/movies/movie-grid';
import Pagination from '../../components/movies/pagination';
import { movies } from '../../data/movie';

export function MovieListPage() {
    return (
        <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 pt-7 pb-14 md:w-[calc(100%-64px)]" id="movie-list">
            <h1 className="mb-4 text-[28px] font-bold leading-[1.3] tracking-[-1.4px] md:text-4xl">영화 목록</h1>
            <MovieGrid movies={movies} />
            <Pagination />
        </main>
    );
}
