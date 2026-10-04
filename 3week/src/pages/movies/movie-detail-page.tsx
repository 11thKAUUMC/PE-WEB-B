import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock3 } from "lucide-react";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return <main className="mx-auto min-h-[55vh] w-[89vw] py-20 text-center text-[#c9c9c9]">영화를 찾을 수 없어요.</main>;
  }

  return (
    <main className="min-h-[calc(100vh-68px)]">
      <section className="relative isolate min-h-[480px] overflow-hidden border-b border-[#303030] sm:min-h-[560px]">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-35" src={movie.backdropPath} alt="" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#151515] via-[#151515]/90 to-[#151515]/35" />
        <div className="mx-auto flex min-h-[480px] w-[89vw] items-center py-12 sm:min-h-[560px] xl:w-[min(1180px,89vw)]">
          <div className="grid w-full items-center gap-8 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="max-w-2xl">
              <Link className="mb-8 inline-flex items-center gap-2 text-xs text-[#d4aaa0] hover:text-white" to="/">
                <ArrowLeft size={15} /> 영화 목록
              </Link>
              <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#c47c68]">{movie.genres.join(" / ")}</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{movie.title}</h1>
              <p className="mt-2 text-sm text-[#b5b5b5]">{movie.originalTitle}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#c0c0c0]">
                <span>{movie.releaseDate}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{movie.runtime}</span>
              </div>
              <h2 className="mt-9 text-lg font-medium text-[#e2a18e]">{movie.tagline}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#d0d0d0]">{movie.overview}</p>
            </div>
            <img className="w-[min(48vw,190px)] shadow-2xl shadow-black/50 sm:w-full" src={movie.posterPath} alt={`${movie.title} 포스터`} />
          </div>
        </div>
      </section>
    </main>
  );
}