import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

export const meQueryKey = ["members", "me"] as const;

export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
