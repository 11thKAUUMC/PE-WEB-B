import { useState } from "react";
import MovieGrid from "../../components/movie-grid";
import Pagination from "../../components/pagination";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarkedCount = movies.filter((movie) => movie.isBookmarked).length;

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) => currentMovies.map((movie) => (
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
    )));
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-68px)] w-[89vw] xl:w-[min(1180px,89vw)]">
      <section className="py-[38px] pb-[76px]" aria-labelledby="catalog-heading">
        <div className="mb-6 flex items-end justify-between border-b border-[#303030] pb-[18px]">
          <div>
            <h1 className="m-0 text-[25px] font-semibold" id="catalog-heading">영화 목록</h1>
            <p className="mt-[7px] text-xs text-[#929292]">마음에 드는 영화를 저장해두세요.</p>
          </div>
          <div className="flex gap-[18px] text-xs text-[#a5a5a5]">
            <span>{movies.length}편</span>
            <span id="bookmark">북마크 {bookmarkedCount}편</span>
          </div>
        </div>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
      </section>
    </main>
  );
}