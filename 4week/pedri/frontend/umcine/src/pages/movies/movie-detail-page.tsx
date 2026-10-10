import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movie";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const movie = movies.find((item) => item.id === Number(movieId));

    if (!movie) {
        return <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 py-14 md:w-[calc(100%-64px)]">영화를 찾을 수 없어요.</main>;
    }

    return (
        <main className="flex-1">
            <section className="relative isolate min-h-[360px] overflow-hidden text-white">
                <img className="absolute inset-0 -z-20 size-full object-cover" src={movie.backdropPath} alt="" aria-hidden="true" />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/35 to-black/10" />
                <div className="mx-auto flex min-h-[360px] w-[calc(100%-32px)] max-w-[1280px] flex-col py-6 md:w-[calc(100%-64px)]">
                    <Link className="flex w-fit items-center gap-2 text-sm" to="/">
                        <img className="size-4 invert" src="/icons/chevron-left.svg" alt="" />영화 목록
                    </Link>
                    <div className="mt-auto pt-20">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-[40px]">{movie.title}</h1>
                        <p className="mt-2 text-sm">{movie.originalTitle}</p>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                            <p>{movie.releaseDate}</p>
                            <p>{movie.genres.join(" · ")}</p>
                            <p>{movie.runtime}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto grid w-[calc(100%-32px)] max-w-[1280px] gap-8 py-6 pb-14 md:w-[calc(100%-64px)] lg:grid-cols-[1fr_328px]">
                <div className="flex min-w-0 flex-col gap-6 sm:flex-row">
                    <img className="aspect-[2/3] w-[200px] shrink-0 self-start rounded-lg object-cover shadow-lg" src={movie.posterPath} alt={`${movie.title} 포스터`} />
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold">{movie.tagline}</h2>
                        <p className="mt-4 text-sm leading-7 text-[#6b7280]">{movie.overview}</p>
                        <BookmarkButton movieId={movie.id} className="mt-5" />
                    </div>
                </div>
                <aside className="border-t border-[#e1e4e9] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                    <h2 className="text-lg font-bold">내 평점</h2>
                    <p className="mt-2 text-xs text-[#858b96]">평점은 로그인 후 남길 수 있어요.</p>
                    <div className="my-3 flex gap-2" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span className="grid size-9 place-items-center rounded border border-[#e1e4e9] bg-white" key={star}>
                                <img className="size-5 opacity-50" src="/icons/star.svg" alt="" />
                            </span>
                        ))}
                    </div>
                    <textarea className="h-24 w-full resize-none rounded border border-[#e1e4e9] bg-white p-3 text-sm" aria-label="영화 한줄평" placeholder="로그인 후 한줄평을 남겨주세요." disabled />
                    <button className="mt-2 w-full rounded bg-[#191b20] py-2 text-sm font-bold text-white" type="button" disabled>평점 저장</button>
                </aside>
            </section>
        </main>
    );
}
