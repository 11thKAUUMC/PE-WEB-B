const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:8080";

export interface CheckResponse {
    available: boolean;
}

export interface RatingResponse {
    ratingId: number;
    movieId: number;
    score: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
}

export async function requestMemberApi<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
        if (response.status === 400) throw new Error("입력 형식을 확인해 주세요. 닉네임은 2~12자, 이메일은 이메일 형식, page는 0 이상, size는 1~100이어야 합니다. (400)");
        if (response.status === 404) throw new Error("존재하지 않는 회원입니다. (404)");
        throw new Error(`요청에 실패했습니다. (${response.status})`);
    }
    return response.json();
}

export function checkNickname(nickname: string) {
    return requestMemberApi<CheckResponse>(`/members/nickname/${encodeURIComponent(nickname)}`);
}

export function checkEmail(email: string) {
    return requestMemberApi<CheckResponse>(`/members/email/${encodeURIComponent(email)}`);
}

export function getMemberRatings(memberId: number, page = 0, size = 10) {
    return requestMemberApi<RatingResponse[]>(`/members/${memberId}/ratings?page=${page}&size=${size}`);
}
