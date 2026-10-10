import { Link } from '@tanstack/react-router';
import type { Movie } from '../../types/movie';
import { cn } from '../../utils/cn';

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
                                      movie,
                                      onToggleBookmark,
                                  }: MovieCardProps) {
    return (
        <article className="min-w-0">
            <div className="relative">
                <img
                    className="w-full aspect-[7/8] rounded-[10px] object-cover"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                />

                <button
                    className={cn(
                        'absolute top-[10px] right-[10px] grid place-items-center',
                        'h-[36px] w-[34px] rounded-[6px] border p-[5px] cursor-pointer',
                        'hover:shadow-[0_0_0_3px_rgba(255,255,255,0.4)]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                        movie.isBookmarked
                            ? 'bg-[#2563eb] border-[#2563eb]'
                            : 'bg-[#191b20]/72 border-white/85',
                    )}
                    type="button"
                    aria-label={`${movie.title} 북마크`}
                    aria-pressed={movie.isBookmarked}
                    title={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
                    onClick={() => onToggleBookmark(movie.id)}
                >
                    <img
                        className="h-[22px] w-[22px] invert"
                        src={
                            movie.isBookmarked
                                ? '/icons/bookmark.svg'
                                : '/icons/bookmark-outline.svg'
                        }
                        alt=""
                    />
                </button>
            </div>

            <h2 className="mt-[10px] text-[14px] font-bold leading-[1.4]">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                    {movie.title}
                </Link>
            </h2>

            <time
                className="mt-[3px] block text-[12px] leading-[1.4] text-[#858b96]"
                dateTime={movie.releaseDate.replaceAll('.', '-')}
            >
                {movie.releaseDate}
            </time>
        </article>
    );
}