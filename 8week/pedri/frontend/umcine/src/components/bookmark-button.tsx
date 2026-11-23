import { Link } from "@tanstack/react-router";
import { useMovieFavorite } from "../hooks/use-favorites";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
    movieId: number;
    iconOnly?: boolean;
    className?: string;
}

export function BookmarkButton({ movieId, iconOnly = false, className }: BookmarkButtonProps) {
    const { accessToken, favorited, mutation } = useMovieFavorite(movieId, iconOnly);
    const isBookmarked = favorited === true;

    if (!accessToken && !iconOnly) {
        return <Link className={cn("inline-flex rounded bg-blue-600 px-3 py-2 text-sm font-bold text-white", className)} to="/login">로그인하고 즐겨찾기 추가</Link>;
    }

    return (
        <button
            type="button"
            className={cn(
                "cursor-pointer disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                iconOnly
                    ? "grid h-[36px] w-[34px] place-items-center rounded-[6px] border p-[5px] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.4)]"
                    : "flex items-center gap-2 rounded px-3 py-2 text-sm font-bold text-white",
                iconOnly
                    ? isBookmarked ? "border-[#2563eb] bg-[#2563eb]" : "border-white/85 bg-[#191b20]/72"
                    : isBookmarked ? "bg-[#191b20]" : "bg-[#2563eb]",
                className,
            )}
            aria-label={isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            aria-pressed={isBookmarked}
            title={isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            disabled={favorited === undefined || mutation.isPending}
            onClick={() => mutation.mutate(!isBookmarked, {
                onError: () => alert("즐겨찾기를 변경하지 못했어요. 다시 시도해 주세요."),
            })}
        >
            <img
                className={cn("invert", iconOnly ? "size-[22px]" : "size-4")}
                src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                alt=""
            />
            {!iconOnly && (isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가")}
        </button>
    );
}
