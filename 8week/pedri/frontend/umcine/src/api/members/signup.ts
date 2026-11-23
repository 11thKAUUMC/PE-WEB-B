import { mutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  };
}

export function signup(body: SignupRequest) {
  return apiClient.post("members", { json: body }).json<SignupResponse>();
}

export const signupMutationOptions = mutationOptions({
  mutationKey: ["signup"],
  mutationFn: signup,
});
