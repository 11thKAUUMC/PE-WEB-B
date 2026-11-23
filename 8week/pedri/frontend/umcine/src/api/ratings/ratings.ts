import { apiClient } from "../api-client";
import { authApi } from "../auth-api";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
}

interface RatingInput {
  score: number;
  comment: string;
}

export async function getMyMovieRating(memberId: number, movieId: number, signal: AbortSignal) {
  const size = 100;

  for (let page = 0; ; page += 1) {
    const ratings = await apiClient.get(`members/${memberId}/ratings`, {
      searchParams: { page, size },
      signal,
    }).json<Rating[]>();

    const rating = ratings.find((item) => item.movieId === movieId);
    if (rating || ratings.length < size) return rating ?? null;
  }
}

export function saveRating(movieId: number, input: RatingInput, ratingId?: number) {
  return ratingId === undefined
    ? authApi.post("ratings", { json: { movieId, ...input } })
    : authApi.patch(`ratings/${ratingId}`, { json: input });
}

export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`);
}
