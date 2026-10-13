import { Link } from '@tanstack/react-router';
import type { Movie } from '../../types/movie';
import { BookmarkButton } from '../bookmark-button';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <article className="min-w-0">
            <div className="relative">
                <img
                    className="w-full aspect-[7/8] rounded-[10px] object-cover"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                />

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
                dateTime={movie.releaseDate.replaceAll('.', '-')}
            >
                {movie.releaseDate}
            </time>
        </article>
    );
}