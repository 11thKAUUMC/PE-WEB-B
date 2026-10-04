import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter((movie) => (
      movie.title.toLowerCase().includes(normalizedQuery)
      || movie.originalTitle.toLowerCase().includes(normalizedQuery)
    ))
    : [];

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    void navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-68px)] w-[89vw] py-10 xl:w-[min(1180px,89vw)]">
      <section aria-labelledby="search-heading">
        <div className="mb-7 border-b border-[#303030] pb-5">
          <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#c47c68]">AKi / DISCOVER</p>
          <h1 className="m-0 text-[25px] font-semibold" id="search-heading">영화 검색</h1>
        </div>
        <form className="mb-8 flex max-w-2xl items-center gap-3 border-b border-[#484848] py-3 focus-within:border-[#c47c68]" onSubmit={handleSubmit}>
          <Search size={18} className="shrink-0 text-[#c47c68]" aria-hidden="true" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-[#ededed] outline-none placeholder:text-[#858585]"
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="제목 또는 원제를 입력하세요"
          />
          <button className="border border-[#a95543] px-4 py-2 text-xs text-[#f0c1b2] transition-colors hover:bg-[#a95543] hover:text-white" type="submit">검색</button>
        </form>
        {!normalizedQuery ? (
          <p className="border-y border-[#303030] py-10 text-sm text-[#929292]">검색어를 입력해 주세요.</p>
        ) : (
          <>
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="text-lg font-medium">‘{query}’ 검색 결과</h2>
              <p className="text-xs text-[#a5a5a5]">영화 {searchResults.length}편</p>
            </div>
            {searchResults.length === 0 ? (
              <p className="border-y border-[#303030] py-10 text-sm text-[#929292]">검색 결과가 없어요.</p>
            ) : (
              <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
                {searchResults.map((movie) => (
                  <li className="flex min-w-0 gap-4 border-t border-[#303030] pt-4" key={movie.id}>
                    <Link className="block aspect-[2/3] w-[104px] shrink-0 overflow-hidden bg-[#252525] sm:w-[126px]" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
                      <img className="h-full w-full object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
                    </Link>
                    <div className="min-w-0 py-1">
                      <h3 className="truncate text-base font-semibold">
                        <Link className="hover:text-[#e2a18e]" to="/movies/$movieId" params={{ movieId: String(movie.id) }}>{movie.title}</Link>
                      </h3>
                      <p className="mt-1 truncate text-xs text-[#929292]">{movie.originalTitle}</p>
                      <p className="mt-3 text-xs text-[#a5a5a5]">{movie.releaseDate}</p>
                      <p className="mt-3 line-clamp-3 text-xs leading-5 text-[#b5b5b5]">{movie.overview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}