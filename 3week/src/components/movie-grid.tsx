import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="border-y border-[#303030] py-[70px] text-center text-[#929292]">검색 결과가 없습니다. 다른 제목을 입력해보세요.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-[18px] gap-y-[30px] min-[400px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onToggleBookmark={onToggleBookmark} />
      ))}
    </div>
  );
}
