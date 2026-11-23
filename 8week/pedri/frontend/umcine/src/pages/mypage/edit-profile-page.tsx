import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { MemberInfo } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useMeQuery } from "../../hooks/use-me-query";

export function EditProfilePage() {
  const meQuery = useMeQuery();

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">내 정보 수정</h1>
      {meQuery.isPending ? (
        <p role="status">내 정보를 불러오는 중이에요.</p>
      ) : meQuery.isError || !meQuery.data ? (
        <p role="alert">내 정보를 불러오지 못했어요.</p>
      ) : (
        <EditProfileForm key={meQuery.data.email} member={meQuery.data} />
      )}
    </main>
  );
}

function EditProfileForm({ member }: { member: MemberInfo }) {
  const [nickname, setNicknameInput] = useState(member.nickname);
  const updateMeMutation = useUpdateMeMutation();
  const navigate = useNavigate();

  const trimmedNickname = nickname.trim();
  const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isNicknameValid || updateMeMutation.isPending) return;

    updateMeMutation.mutate(
      { nickname: trimmedNickname },
      { onSuccess: () => void navigate({ to: "/mypage" }) },
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="profile-email">이메일</label>
        <input
          className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
          id="profile-email"
          type="email"
          value={member.email}
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
          disabled={updateMeMutation.isPending}
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
        <button className="rounded-md bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-50" type="submit" disabled={!isNicknameValid || updateMeMutation.isPending}>
          {updateMeMutation.isPending ? "저장 중" : "저장하기"}
        </button>
      </div>
    </form>
  );
}
