import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/members/update-me";
import { meQueryKey } from "./use-me-query";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: async (response) => {
      await queryClient.cancelQueries({ queryKey: meQueryKey });
      queryClient.setQueryData(meQueryKey, response.result);
      alert("내 정보 수정에 성공했어요.");
    },
    onError: () => {
      alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
