export default function App() {
  const movieTitle = "오디세이";
  const genre = "모험";
  const releaseDate = "2026.08.05";

  return (
      <main className="movie-page">
        <h1>{movieTitle}</h1>
        <p>개봉일: {releaseDate}</p>
        <p>장르: {genre}</p>
      </main>
  );
}