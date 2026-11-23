import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginMutationOptions } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";
import { meQueryKey } from "./use-me-query";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    ...loginMutationOptions,
    onSuccess: (response) => {
      queryClient.removeQueries({ queryKey: meQueryKey });
      setAccessToken(response.result.accessToken);
      alert("로그인에 성공했어요.");
      void queryClient.invalidateQueries({ queryKey: meQueryKey });
      void navigate({ to: "/" });
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
