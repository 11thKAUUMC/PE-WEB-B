import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <footer className="mx-auto w-[89vw] border-t border-[#303030] py-[22px] pb-8 text-[11px] text-[#a5a5a5] xl:w-[min(1180px,89vw)]">
        AKi <span className="ml-3 text-[#777]">좋은 영화는 오래 남으니까</span>
      </footer>
    </>
  ),
  notFoundComponent: () => <main className="mx-auto min-h-[55vh] w-[89vw] py-20 text-center text-[#c9c9c9]">페이지를 찾을 수 없어요.</main>,
});