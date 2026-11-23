import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import { deleteRating, getMyMovieRating, saveRating, type Rating } from "../../api/ratings/ratings";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

export function MovieRating({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const memberId = meQuery.data?.memberId;

  return (
    <aside className="border-t border-[#e1e4e9] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
      <h2 className="text-lg font-bold">내 평점</h2>
      {!accessToken ? (
        <Link className="mt-2 inline-block text-sm font-semibold text-blue-700" to="/login">로그인하고 평점 남기기</Link>
      ) : memberId ? (
        <MemberRating key={`${memberId}-${movieId}`} memberId={memberId} movieId={movieId} />
      ) : meQuery.isPending ? (
        <p role="status" className="mt-2 text-sm">회원 정보를 확인하는 중이에요.</p>
      ) : (
        <p role="alert" className="mt-2 text-sm">회원 정보를 확인하지 못했어요.</p>
      )}
    </aside>
  );
}

function MemberRating({ memberId, movieId }: { memberId: number; movieId: number }) {
  const queryClient = useQueryClient();
  const queryKey = ["ratings", memberId, movieId] as const;
  const ratingQuery = useQuery({
    queryKey,
    queryFn: ({ signal }) => getMyMovieRating(memberId, movieId, signal),
  });
  const mutation = useMutation({
    mutationFn: (action: { score: number; comment: string } | { deleteId: number }) =>
      "deleteId" in action
        ? deleteRating(action.deleteId)
        : saveRating(movieId, action, ratingQuery.data?.ratingId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  if (ratingQuery.isPending) return <p role="status" className="mt-2 text-sm">평점을 불러오는 중이에요.</p>;
  if (ratingQuery.isError) {
    return (
      <div className="mt-2 text-sm">
        <p role="alert">평점을 불러오지 못했어요.</p>
        <button type="button" className="text-blue-700 underline" onClick={() => void ratingQuery.refetch()}>다시 조회</button>
      </div>
    );
  }

  const rating = ratingQuery.data;

  return (
    <RatingForm
      key={JSON.stringify([rating?.ratingId, rating?.score, rating?.comment])}
      rating={rating}
      busy={mutation.isPending}
      failed={mutation.isError}
      onSave={(score, comment) => mutation.mutate({ score, comment })}
      onDelete={(deleteId) => mutation.mutate({ deleteId })}
    />
  );
}

interface RatingFormProps {
  rating: Rating | null;
  busy: boolean;
  failed: boolean;
  onSave: (score: number, comment: string) => void;
  onDelete: (ratingId: number) => void;
}

function RatingForm({ rating, busy, failed, onSave, onDelete }: RatingFormProps) {
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (score && !busy) onSave(score, comment.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="my-3 flex gap-2" disabled={busy}>
        <legend className="mb-2 text-sm">별점</legend>
        {[1, 2, 3, 4, 5].map((star) => (
          <label className="cursor-pointer" key={star}>
            <input className="peer sr-only" type="radio" name="movie-score" value={star} checked={score === star} onChange={() => setScore(star)} />
            <span className={`grid size-9 place-items-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 ${star <= score ? "border-amber-400 bg-amber-100" : "border-gray-200"}`}>
              <img className="size-5" src="/icons/star.svg" alt="" />
            </span>
            <span className="sr-only">{star}점</span>
          </label>
        ))}
      </fieldset>
      <textarea className="h-24 w-full resize-none rounded border border-[#e1e4e9] p-3 text-sm" aria-label="영화 한줄평" placeholder="한줄평을 남겨 주세요." value={comment} maxLength={500} disabled={busy} onChange={(event) => setComment(event.target.value)} />
      <div className="mt-2 flex gap-2">
        <button className="flex-1 rounded bg-[#191b20] px-3 py-2 text-sm font-bold text-white disabled:opacity-50" type="submit" disabled={!score || busy}>
          {busy ? "처리 중" : rating ? "평점 수정" : "평점 등록"}
        </button>
        {rating && <button className="rounded border border-gray-300 px-3 py-2 text-sm text-red-700 disabled:opacity-50" type="button" disabled={busy} onClick={() => onDelete(rating.ratingId)}>평점 삭제</button>}
      </div>
      {failed && <p className="mt-2 text-sm text-red-700" role="alert">평점을 처리하지 못했어요. 다시 시도해 주세요.</p>}
    </form>
  );
}
