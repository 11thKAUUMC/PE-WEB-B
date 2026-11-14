import { Link } from '@tanstack/react-router';
import type { TmdbMovieListItem } from '../../api/movies/models';
import { getTmdbPosterUrl } from '../../utils/movies/tmdb-image';
import { BookmarkButton } from '../bookmark-button';

interface MovieCardProps {
    movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = getTmdbPosterUrl(movie.poster_path);
    return (
        <article className="min-w-0">
            <div className="relative">
                {posterUrl ? <img
                    className="w-full aspect-[7/8] rounded-[10px] object-cover"
                    src={posterUrl}
                    alt={`${movie.title} 포스터`}
                /> : (
                    <div className="flex w-full aspect-[7/8] items-center justify-center rounded-[10px] bg-gray-200 text-sm text-gray-600">이미지 없음</div>
                )}

                <BookmarkButton
                    movieId={movie.id}
                    iconOnly
                    className="absolute top-[10px] right-[10px]"
                />
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
                dateTime={movie.release_date}
            >
                {movie.release_date}
            </time>
        </article>
    );
}
