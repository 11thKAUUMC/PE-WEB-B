import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster-wrapper">
        <img className="movie-poster" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        <button
          className={`bookmark-button${movie.isBookmarked ? ' is-bookmarked' : ''}`}
          type="button"
          aria-label={`${movie.title} 북마크`}
          aria-pressed={movie.isBookmarked}
          title={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img src={movie.isBookmarked ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'} alt="" />
        </button>
      </div>
      <h2>{movie.title}</h2>
      <time dateTime={movie.releaseDate.replaceAll('.', '-')}>{movie.releaseDate}</time>
    </article>
  );
}
