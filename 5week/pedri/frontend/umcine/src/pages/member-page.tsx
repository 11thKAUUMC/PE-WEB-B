import { useState, type ReactNode, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { checkNickname, checkEmail, getMemberRatings, type CheckResponse, type RatingResponse } from "../api/members";

interface RequestFormProps<T> {
    title: string;
    label: string;
    defaultValue: string;
    request: (value: string, formData: FormData) => Promise<T>;
    children?: ReactNode;
    renderResult: (data: T) => ReactNode;
}

function RequestForm<T>({ title, label, defaultValue, request, renderResult, children }: RequestFormProps<T>) {
    const [result, setResult] = useState<{ data: T; value: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading) return;
        const formData = new FormData(event.currentTarget);
        const value = String(formData.get("value") ?? "").trim();
        setResult(null);
        setError(null);
        if (!value) {
            setError("값을 입력해 주세요.");
            return;
        }
        setIsLoading(true);
        try {
            const data = await request(value, formData);
            setResult({ data, value });
        } catch (error) {
            setError(error instanceof Error ? error.message : "요청에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">{title}</h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
                <label className="flex flex-1 flex-col gap-2 text-sm">
                    {label}
                    <input name="value" defaultValue={defaultValue} required disabled={isLoading} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2" />
                </label>
                {children}
                <button type="submit" disabled={isLoading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">{isLoading ? "조회 중…" : "조회"}</button>
            </form>
            <div className="mt-4" aria-live="polite">
                {isLoading && <p>결과를 불러오는 중입니다.</p>}
                {error && <p role="alert" className="text-red-600">{error}</p>}
                {result && <>
                    <p className="mb-3 text-sm text-gray-500">조회한 값: {result.value}</p>
                    {renderResult(result.data)}
                </>}
            </div>
        </section>
    );
}

function renderAvailability(data: CheckResponse) {
    return <p className={data.available ? "font-bold text-green-700" : "font-bold text-red-600"}>
        {data.available ? "사용 가능합니다." : "이미 사용 중입니다."}
    </p>;
}

function renderRatings(ratings: RatingResponse[]) {
    if (ratings.length === 0) return <p>등록된 평점이 없습니다.</p>;
    return <ul className="divide-y divide-gray-200">
        {ratings.map((rating) => <li key={rating.ratingId} className="py-4">
            <Link to="/movies/$movieId" params={{ movieId: String(rating.movieId) }} className="font-bold text-blue-600 underline">영화 {rating.movieId} 상세 보기</Link>
            <p className="mt-2">평점: {rating.score} / 5</p>
            <p>{rating.comment || "코멘트 없음"}</p>
            <p className="mt-2 text-xs text-gray-500">평점 번호: {rating.ratingId} · 작성: {rating.createdAt} · 수정: {rating.updatedAt}</p>
        </li>)}
    </ul>;
}

export function MemberPage() {
    return <main className="mx-auto w-[calc(100%-32px)] max-w-[1280px] flex-1 space-y-6 py-8 md:w-[calc(100%-64px)]">
        <h1 className="text-3xl font-bold">회원 정보 확인</h1>
        <p className="text-sm text-gray-600">닉네임과 이메일의 사용 가능 여부 및 회원별 영화 평점을 확인할 수 있습니다.</p>
        <RequestForm title="닉네임 중복 확인" label="닉네임" defaultValue="수현" request={checkNickname} renderResult={renderAvailability} />
        <RequestForm title="이메일 중복 확인" label="이메일" defaultValue="noco@umc.com" request={checkEmail} renderResult={renderAvailability} />
        <RequestForm title="회원별 평점 조회" label="회원 번호" defaultValue="1" request={(value, formData) => {
            const memberId = Number(value);
            if (!Number.isSafeInteger(memberId) || memberId <= 0) return Promise.reject(new Error("회원 번호는 양의 정수여야 합니다."));
            return getMemberRatings(memberId, Number(formData.get("page")), Number(formData.get("size")));
        }} renderResult={renderRatings}>
            <label className="flex flex-col gap-2 text-sm">페이지 (0부터)
                <input name="page" type="number" min="0" defaultValue="0" required className="w-28 rounded-lg border border-gray-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-2 text-sm">페이지 크기
                <input name="size" type="number" min="1" max="100" defaultValue="1" required className="w-28 rounded-lg border border-gray-300 px-3 py-2" />
            </label>
        </RequestForm>
    </main>;
}
