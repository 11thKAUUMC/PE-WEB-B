import { Link } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";

export function MyPage() {
  const email = useProfileStore((state) => state.email);
  const nickname = useProfileStore((state) => state.nickname);

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">내 정보</h1>
      <dl className="space-y-5 rounded-lg border border-gray-200 p-5">
        <div>
          <dt className="mb-1 text-sm font-semibold text-gray-600">이메일</dt>
          <dd className="break-all">{email}</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm font-semibold text-gray-600">닉네임</dt>
          <dd>{nickname}</dd>
        </div>
      </dl>
      <Link className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-3 font-bold text-white" to="/mypage/edit">
        내 정보 수정
      </Link>
    </main>
  );
}
