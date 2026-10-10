import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    ),
    notFoundComponent: () => (
        <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 py-14 md:w-[calc(100%-64px)]">
            페이지를 찾을 수 없어요.
        </main>
    ),
});
