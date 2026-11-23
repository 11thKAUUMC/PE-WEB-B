import { authApi } from "../auth-api";
import type { MeResponse } from "./me";

interface UpdateMeRequest {
  nickname: string;
}

export function updateMe(body: UpdateMeRequest) {
  return authApi.patch("members/me", { json: body }).json<MeResponse>();
}
