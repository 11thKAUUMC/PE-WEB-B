import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmittedEmail(String(data.get("email")).trim());
  }

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">로그인</h1>
      <form className="space-y-5" onSubmit={handleSubmit} onChange={() => setSubmittedEmail("")}>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="login-email">이메일</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력해 주세요"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="login-password">비밀번호</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력해 주세요"
            required
          />
        </div>
        <button className="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white" type="submit">
          로그인
        </button>
        {submittedEmail && (
          <p role="status" className="break-all text-sm text-gray-600">
            입력한 이메일을 확인했어요. ({submittedEmail})
          </p>
        )}
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        계정이 없으신가요? <Link className="font-semibold text-blue-700" to="/signup">회원가입</Link>
      </p>
    </main>
  );
}
