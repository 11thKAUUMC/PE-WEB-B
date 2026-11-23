import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteMutationOptions, getFavorite, getFavorites } from "../api/favorites/favorites";
import { useMeQuery } from "./use-me-query";
import { useAuthStore } from "../stores/auth-store";

function favoriteListKey(memberId: number | undefined) {
  return ["favorites", memberId, "list"] as const;
}

export function useFavorites() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = useMeQuery().data?.memberId;

  return useQuery({
    queryKey: favoriteListKey(memberId),
    queryFn: getFavorites,
    enabled: Boolean(accessToken && memberId),
    retry: false,
  });
}

export function useMovieFavorite(movieId: number, fromList: boolean) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = useMeQuery().data?.memberId;
  const queryClient = useQueryClient();
  const listKey = favoriteListKey(memberId);
  const detailKey = ["favorites", memberId, "detail", movieId] as const;
  const list = useQuery({
    queryKey: listKey,
    queryFn: getFavorites,
    enabled: Boolean(accessToken && memberId && fromList),
    retry: false,
  });
  const detail = useQuery({
    queryKey: detailKey,
    queryFn: () => getFavorite(movieId),
    enabled: Boolean(accessToken && memberId && !fromList),
    retry: false,
  });

  const mutation = useMutation({
    ...favoriteMutationOptions(memberId, movieId),
    onSuccess: async (favorited) => {
      await queryClient.cancelQueries({ queryKey: detailKey });
      queryClient.setQueryData(detailKey, favorited);
      await queryClient.invalidateQueries({ queryKey: listKey });
    },
  });

  return {
    accessToken,
    favorited: fromList ? list.data?.some((favorite) => favorite.movieId === movieId) : detail.data,
    mutation,
  };
}
