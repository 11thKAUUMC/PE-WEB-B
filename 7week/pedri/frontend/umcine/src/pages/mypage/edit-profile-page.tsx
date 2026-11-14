import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileStore } from "../../stores/profile-store";

export function EditProfilePage() {
  const email = useProfileStore((state) => state.email);
  const currentNickname = useProfileStore((state) => state.nickname);
  const setNickname = useProfileStore((state) => state.setNickname);
  const [nickname, setNicknameInput] = useState(currentNickname);
  const navigate = useNavigate();

  const trimmedNickname = nickname.trim();
  const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isNicknameValid) return;

    setNickname(trimmedNickname);
    void navigate({ to: "/mypage" });
  }

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">내 정보 수정</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="profile-email">이메일</label>
          <input
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
            id="profile-email"
            type="email"
            value={email}
            readOnly
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="profile-nickname">닉네임</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            id="profile-nickname"
            autoComplete="nickname"
            value={nickname}
            onChange={(event) => setNicknameInput(event.target.value)}
            aria-invalid={!isNicknameValid}
            aria-describedby="profile-nickname-hint"
          />
          <p className={`mt-1 text-sm ${isNicknameValid ? "text-gray-600" : "text-red-600"}`} id="profile-nickname-hint">
            닉네임은 2~12자로 입력해 주세요.
          </p>
        </div>
        <div className="flex gap-3">
          <Link className="rounded-md border border-gray-300 px-4 py-3 font-semibold" to="/mypage">취소</Link>
          <button className="rounded-md bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-50" type="submit" disabled={!isNicknameValid}>
            저장하기
          </button>
        </div>
      </form>
    </main>
  );
}
