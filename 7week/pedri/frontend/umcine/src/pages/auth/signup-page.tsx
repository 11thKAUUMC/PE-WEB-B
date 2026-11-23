import { useNavigate } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type FormKey = keyof typeof DEFAULT_FORM;
type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const email = form.email.trim();
  const nickname = form.nickname.trim();
  const isEmailValid = EMAIL_REGEX.test(email) && email.length <= 254;
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;
  const canSubmit =
    isFormValid && duplicateCheck.email.isAvailable && duplicateCheck.nickname.isAvailable;

  function handleChangeField(key: FormKey, value: string) {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCheckDuplicate(key: DuplicateCheckKey) {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    let isAvailable = false;
    try {
      const response = key === "email"
        ? await checkEmailDuplicate(email)
        : await checkNicknameDuplicate(nickname);
      isAvailable = response.available;
      alert(isAvailable ? `사용할 수 있는 ${label}이에요.` : `이미 사용 중인 ${label}이에요.`);
    } catch {
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { isChecking: false, isAvailable },
      }));
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({ email, nickname, password: form.password });
      alert(response.message);
      void navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fields = [
    { key: "email", label: "이메일", type: "email", autoComplete: "email", isValid: isEmailValid, error: "올바른 이메일을 254자 이하로 입력해 주세요." },
    { key: "nickname", label: "닉네임", type: "text", autoComplete: "nickname", isValid: isNicknameValid, error: "닉네임을 2~12자로 입력해 주세요." },
    { key: "password", label: "비밀번호", type: "password", autoComplete: "new-password", isValid: isPasswordValid, error: "영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상 입력해 주세요." },
    { key: "passwordConfirm", label: "비밀번호 확인", type: "password", autoComplete: "new-password", isValid: isPasswordConfirmValid, error: "비밀번호가 일치하지 않아요." },
  ] as const;

  return (
    <main className="mx-auto w-[calc(100%-32px)] max-w-md flex-1 py-14">
      <h1 className="mb-8 text-3xl font-bold">회원가입</h1>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {fields.map(({ key, label, type, autoComplete, isValid, error }) => {
          const check = key === "email" || key === "nickname" ? duplicateCheck[key] : null;
          const showError = form[key].length > 0 && !isValid;
          return (
            <div key={key}>
              <label className="mb-2 block text-sm font-semibold" htmlFor={key}>{label}</label>
              <div className="flex gap-2">
                <input
                  className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                  id={key}
                  name={key}
                  type={type}
                  autoComplete={autoComplete}
                  value={form[key]}
                  onChange={(event) => handleChangeField(key, event.target.value)}
                  disabled={isSubmitting || check?.isChecking}
                  aria-invalid={showError}
                  aria-describedby={showError ? `${key}-error` : undefined}
                />
                {(key === "email" || key === "nickname") && (
                  <button
                    className="rounded-md border border-blue-600 px-3 text-sm font-semibold text-blue-700 disabled:opacity-50"
                    type="button"
                    disabled={!isValid || isSubmitting || duplicateCheck[key].isChecking}
                    onClick={() => handleCheckDuplicate(key)}
                  >
                    {duplicateCheck[key].isChecking ? "확인 중" : "중복 확인"}
                  </button>
                )}
              </div>
              {showError && <p id={`${key}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
              {check?.isAvailable && <p className="mt-1 text-sm text-green-700">사용 가능해요.</p>}
            </div>
          );
        })}
        <button
          className="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-50"
          type="submit"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>
      </form>
    </main>
  );
}
