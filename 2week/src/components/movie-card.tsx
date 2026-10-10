import { Bookmark, BookmarkCheck, CalendarDays, Clock3 } from "lucide-react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img
          className="poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <div className="poster-fallback" aria-hidden="true">
          <span>{movie.title.slice(0, 1)}</span>
          <small>{movie.originalTitle}</small>
        </div>
        <button
          className={`bookmark-button ${movie.isBookmarked ? "saved" : ""}`}
          type="button"
          aria-label={`${movie.title} ${movie.isBookmarked ? "북마크 해제" : "북마크 추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          {movie.isBookmarked ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
        </button>
      </div>
      <div className="movie-info">
        <div className="movie-title-row">
          <h2>{movie.title}</h2>
          <span className="movie-index">{String(movie.id).padStart(2, "0")}</span>
        </div>
        <p className="movie-tagline">{movie.tagline}</p>
        <div className="movie-meta">
          <span><CalendarDays size={14} />{movie.releaseDate}</span>
          <span><Clock3 size={14} />{movie.runtime}</span>
        </div>
        <div className="genre-list">
          {movie.genres.map((genre) => <span key={genre}>{genre}</span>)}
        </div>
      </div>
    </article>
  );
}
