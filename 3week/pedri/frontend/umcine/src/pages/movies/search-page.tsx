import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { type SubmitEvent } from "react";
import { movies } from "../../data/movie";
import { cn } from "../../utils/cn";

export function SearchPage() {
    const { query } = useSearch({ from: "/search" });
    const navigate = useNavigate({ from: "/search" });

    const normalizedQuery = query?.trim().toLowerCase() ?? "";
    const searchResults = normalizedQuery
        ? movies.filter(
            (movie) =>
                movie.title.toLowerCase().includes(normalizedQuery) ||
                movie.originalTitle.toLowerCase().includes(normalizedQuery),
        )
        : [];

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextQuery = String(new FormData(event.currentTarget).get("query") ?? "").trim();
        navigate({
            search: nextQuery ? { query: nextQuery } : {},
        });
    }

    return (
        <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 pt-7 pb-14 md:w-[calc(100%-64px)]">
            <h1 className={cn("font-bold leading-[1.3] tracking-tight", normalizedQuery ? "mb-5 text-[28px] md:text-4xl" : "mt-20 mb-8 text-center text-[28px] md:mt-36 md:text-[40px]")}>
                {normalizedQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
            </h1>
            <form className={cn("flex items-center gap-3 rounded-lg border bg-white p-3", normalizedQuery ? "mb-6 border-[#e1e4e9]" : "mx-auto max-w-[800px] border-[#191b20] shadow-lg")} onSubmit={handleSubmit}>
                <img className="size-5 shrink-0 opacity-60" src="/icons/search.svg" alt="" />
                <input
                    className="min-w-0 flex-1 rounded px-1 py-2 text-sm outline-offset-2"
                    aria-label="검색어"
                    placeholder="예: 스파이더맨"
                    name="query"
                    key={query ?? ""}
                    defaultValue={query ?? ""}
                />
                <button className="shrink-0 rounded-[6px] bg-[#191b20] px-4 py-2.5 text-sm font-bold text-white" type="submit">검색</button>
            </form>

            {!normalizedQuery ? (
                <p className="mt-5 text-center text-sm text-[#6b7280]">검색어를 입력해 주세요.</p>
            ) : (
                <>
                    <h2 className="text-lg font-bold break-words">‘{query}’ 검색 결과</h2>
                    <p className="mt-2 mb-5 text-sm text-[#6b7280]" aria-live="polite">영화 {searchResults.length}편</p>
                    {searchResults.length === 0 ? (
                        <p className="border-t border-[#e1e4e9] py-16 text-center text-[#6b7280]">검색 결과가 없어요.</p>
                    ) : (
                        <ul className="grid gap-x-10 md:grid-cols-2">
                            {searchResults.map((movie) => (
                                <li className="flex min-w-0 items-start gap-4 border-t border-[#e1e4e9] py-6" key={movie.id}>
                                    <img className="aspect-[2/3] w-24 shrink-0 rounded-lg object-cover sm:w-32" src={movie.posterPath} alt={`${movie.title} 포스터`} />
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold">{movie.title}</h3>
                                        <p className="mt-2 text-xs text-[#858b96]">{movie.originalTitle}</p>
                                        <p className="mt-1 text-xs text-[#858b96]">{movie.releaseDate}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">{movie.overview}</p>
                                        <Link
                                            className="mt-4 inline-block text-sm font-bold text-[#2563eb] hover:underline"
                                            to="/movies/$movieId"
                                            params={{ movieId: String(movie.id) }}
                                        >
                                            상세 보기 →
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </main>
    );
}
