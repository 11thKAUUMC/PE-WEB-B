import { createFileRoute, redirect } from "@tanstack/react-router";
import { AccountLayout } from "../../../components/layout/account-layout";
import { useAuthStore } from "../../../stores/auth-store";

export const Route = createFileRoute("/(authenticated)/_account")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AccountLayout,
});
