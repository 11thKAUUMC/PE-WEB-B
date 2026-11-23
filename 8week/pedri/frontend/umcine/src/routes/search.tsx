import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "../pages/movies/search-page";

export const Route = createFileRoute("/search")({
    validateSearch: (search): { query?: string } => ({  // validateSearch로 URL에서 읽은 search 값 확인 및 루트가 사용할 모양으로 정리
        query: typeof search.query === "string" ? search.query : undefined,
    }),
    component: SearchPage,
});