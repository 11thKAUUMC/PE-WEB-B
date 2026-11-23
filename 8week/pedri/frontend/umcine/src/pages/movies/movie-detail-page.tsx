import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { movieQueryOptions } from "../../api/movies/movie-query-options";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { MovieRating } from "../../components/movies/movie-rating";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const parsedMovieId = Number(movieId);
    const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
    const movieDetailQuery = useQuery(movieQueryOptions.detail(parsedMovieId));

    if (!isValidMovieId) {
        return <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 py-14 md:w-[calc(100%-64px)]">올바르지 않은 영화 번호예요.</main>;
    }

    if (movieDetailQuery.isPending) {
        return <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 py-14 md:w-[calc(100%-64px)]" role="status">영화 정보를 불러오는 중이에요.</main>;
    }

    if (movieDetailQuery.isError) {
        return <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 py-14 md:w-[calc(100%-64px)]" role="alert">{getMovieDetailErrorMessage(movieDetailQuery.error)}</main>;
    }

    const movie = movieDetailQuery.data;

    const posterUrl = getTmdbPosterUrl(movie.poster_path);
    const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
    const runtimeText = typeof movie.runtime === "number"
        ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
        : "상영 시간 정보가 없어요.";

    return (
        <main className="flex-1">
            <section className="relative isolate min-h-[360px] overflow-hidden text-white">
                {backdropUrl ? (
                    <img className="absolute inset-0 -z-20 size-full object-cover" src={backdropUrl} alt="" aria-hidden="true" />
                ) : (
                    <div className="absolute inset-0 -z-20 flex size-full items-center justify-center bg-gray-500">이미지 없음</div>
                )}
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/35 to-black/10" />
                <div className="mx-auto flex min-h-[360px] w-[calc(100%-32px)] max-w-[1280px] flex-col py-6 md:w-[calc(100%-64px)]">
                    <Link className="flex w-fit items-center gap-2 text-sm" to="/">
                        <img className="size-4 invert" src="/icons/chevron-left.svg" alt="" />영화 목록
                    </Link>
                    <div className="mt-auto pt-20">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-[40px]">{movie.title}</h1>
                        <p className="mt-2 text-sm">{movie.original_title}</p>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                            <p>{movie.release_date}</p>
                            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                            <p>{runtimeText}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto grid w-[calc(100%-32px)] max-w-[1280px] gap-8 py-6 pb-14 md:w-[calc(100%-64px)] lg:grid-cols-[1fr_328px]">
                <div className="flex min-w-0 flex-col gap-6 sm:flex-row">
                    {posterUrl ? (
                        <img className="aspect-[2/3] w-[200px] shrink-0 self-start rounded-lg object-cover shadow-lg" src={posterUrl} alt={`${movie.title} 포스터`} />
                    ) : (
                        <div className="flex aspect-[2/3] w-[200px] shrink-0 items-center justify-center self-start rounded-lg bg-gray-200 text-gray-600">이미지 없음</div>
                    )}
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold">{movie.tagline}</h2>
                        <p className="mt-4 text-sm leading-7 text-[#6b7280]">{movie.overview}</p>
                        <BookmarkButton movieId={movie.id} className="mt-5" />
                    </div>
                </div>
                <MovieRating movieId={movie.id} />
            </section>
        </main>
    );
}
