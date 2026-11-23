import { mutationOptions } from "@tanstack/react-query";
import { authApi } from "../auth-api";

interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

interface FavoriteStatus {
  isFavorite: boolean;
}

export async function getFavorites() {
  const response = await authApi.get("favorites").json<{ result: Favorite[] }>();
  return response.result;
}

export async function getFavorite(movieId: number) {
  const response = await authApi.get(`favorites/${movieId}`).json<{ result: FavoriteStatus }>();
  return response.result.isFavorite;
}

export async function changeFavorite(movieId: number, favorited: boolean) {
  const request = favorited
    ? authApi.post("favorites", { json: { movieId } })
    : authApi.delete(`favorites/${movieId}`);

  await request;
  return favorited;
}

export function favoriteMutationOptions(memberId: number | undefined, movieId: number) {
  return mutationOptions({
    mutationKey: ["favorites", memberId, movieId],
    mutationFn: (favorited: boolean) => changeFavorite(movieId, favorited),
  });
}
