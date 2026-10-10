import { Bookmark, BookmarkCheck, CalendarDays, Clock3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "../utils/cn";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark?: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#252525]">
        <Link className="absolute inset-0 z-[1] block" to="/movies/$movieId" params={{ movieId: String(movie.id) }} aria-label={`${movie.title} 상세 보기`}>
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <span className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3 bg-[#292929] text-[#c9c9c9]" aria-hidden="true">
            <span className="text-[56px] font-semibold leading-none">{movie.title.slice(0, 1)}</span>
            <span className="max-w-[80%] text-center text-[10px]">{movie.originalTitle}</span>
          </span>
        </Link>
        {onToggleBookmark && (
          <button
            className={cn("absolute right-[9px] top-[9px] z-[2] grid h-[33px] w-[33px] place-items-center border border-white/30 bg-black/75 text-white transition-colors hover:border-[#a95543] hover:bg-[#a95543]", movie.isBookmarked && "border-[#a95543] bg-[#a95543]")}
            type="button"
            aria-label={`${movie.title} ${movie.isBookmarked ? "북마크 해제" : "북마크 추가"}`}
            aria-pressed={movie.isBookmarked}
            onClick={() => onToggleBookmark(movie.id)}
          >
            {movie.isBookmarked ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
          </button>
        )}
      </div>
      <div className="pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
            <Link className="hover:text-[#e2a18e]" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link>
          </h2>
          <span className="text-[10px] text-[#858585]">{String(movie.id).padStart(2, "0")}</span>
        </div>
        <p className="my-[7px] mb-[11px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#929292]">{movie.tagline}</p>
        <div className="flex gap-[13px] text-[10px] text-[#a5a5a5]">
          <span className="inline-flex items-center gap-[5px]"><CalendarDays size={14} />{movie.releaseDate}</span>
          <span className="inline-flex items-center gap-[5px]"><Clock3 size={14} />{movie.runtime}</span>
        </div>
        <div className="mt-[10px] flex flex-wrap gap-[5px]">
          {movie.genres.map((genre) => <span className="border border-[#3a3a3a] px-[6px] py-[3px] text-[9px] text-[#a5a5a5]" key={genre}>{genre}</span>)}
        </div>
      </div>
    </article>
  );
}
