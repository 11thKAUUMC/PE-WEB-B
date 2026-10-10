import { useState } from "react";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.trim().toLowerCase();
    return query.length === 0 || movie.title.toLowerCase().includes(query) || movie.originalTitle.toLowerCase().includes(query);
  });
  const bookmarkedCount = movies.filter((movie) => movie.isBookmarked).length;

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) => currentMovies.map((movie) => (
      movie.id === movieId ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
    )));
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  return (
    <div className="app-shell">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main id="movies" className="page-content">
        <section className="catalog-section" aria-labelledby="catalog-heading">
          <div className="section-heading">
            <div>
              <h1 id="catalog-heading">영화 목록</h1>
              <p className="catalog-subtitle">마음에 드는 영화를 저장해두세요.</p>
            </div>
            <div className="catalog-summary">
              <span>{filteredMovies.length}편</span>
              <span id="bookmark">북마크 {bookmarkedCount}편</span>
            </div>
          </div>
          <MovieGrid movies={filteredMovies} onToggleBookmark={handleToggleBookmark} />
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
        </section>
      </main>
      <footer className="site-footer">AKi <span>좋은 영화는 오래 남으니까</span></footer>
    </div>
  );
}
