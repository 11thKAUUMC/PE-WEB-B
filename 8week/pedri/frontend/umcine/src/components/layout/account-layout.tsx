import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export function AccountLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
