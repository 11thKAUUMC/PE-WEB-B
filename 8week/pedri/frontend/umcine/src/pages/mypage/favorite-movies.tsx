import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { movieQueryOptions } from "../../api/movies/movie-query-options";
import { useFavorites } from "../../hooks/use-favorites";

export function FavoriteMovies() {
  const favorites = useFavorites();

  return (
    <section className="mt-10 border-t border-gray-200 pt-6">
      <h2 className="mb-4 text-xl font-bold">즐겨찾기 영화</h2>
      {favorites.isPending ? (
        <p role="status">즐겨찾기를 불러오는 중이에요.</p>
      ) : favorites.isError ? (
        <p role="alert">즐겨찾기를 불러오지 못했어요.</p>
      ) : favorites.data.length === 0 ? (
        <p>즐겨찾기에 추가한 영화가 없어요.</p>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {favorites.data.map(({ movieId }) => <FavoriteMovie key={movieId} movieId={movieId} />)}
        </ul>
      )}
    </section>
  );
}

function FavoriteMovie({ movieId }: { movieId: number }) {
  const movie = useQuery(movieQueryOptions.detail(movieId));

  return (
    <li>
      <Link className="block px-4 py-3 font-semibold hover:underline" to="/movies/$movieId" params={{ movieId: String(movieId) }}>
        {movie.data?.title ?? `영화 #${movieId}`}
      </Link>
    </li>
  );
}
