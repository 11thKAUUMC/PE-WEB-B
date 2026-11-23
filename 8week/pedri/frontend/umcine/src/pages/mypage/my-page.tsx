import { Link } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { FavoriteMovies } from "./favorite-movies";

export function MyPage() {
  const meQuery = useMeQuery();

  const member = meQuery.data;

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">내 정보</h1>
      {meQuery.isPending ? (
        <p role="status">내 정보를 불러오는 중이에요.</p>
      ) : meQuery.isError || !member ? (
        <p role="alert">내 정보를 불러오지 못했어요.</p>
      ) : (
        <>
          <dl className="space-y-5 rounded-lg border border-gray-200 p-5">
            <div>
              <dt className="mb-1 text-sm font-semibold text-gray-600">이메일</dt>
              <dd className="break-all">{member.email}</dd>
            </div>
            <div>
              <dt className="mb-1 text-sm font-semibold text-gray-600">닉네임</dt>
              <dd>{member.nickname}</dd>
            </div>
          </dl>
          <Link className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-3 font-bold text-white" to="/mypage/edit">
            내 정보 수정
          </Link>
          <FavoriteMovies />
        </>
      )}
    </main>
  );
}
