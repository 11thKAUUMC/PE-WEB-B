import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
    movieId: number;
    iconOnly?: boolean;
    className?: string;
}

export function BookmarkButton({ movieId, iconOnly = false, className }: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId),
    );
    const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

    return (
        <button
            type="button"
            className={cn(
                "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                iconOnly
                    ? "grid h-[36px] w-[34px] place-items-center rounded-[6px] border p-[5px] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.4)]"
                    : "flex items-center gap-2 rounded px-3 py-2 text-sm font-bold text-white",
                iconOnly
                    ? isBookmarked ? "border-[#2563eb] bg-[#2563eb]" : "border-white/85 bg-[#191b20]/72"
                    : isBookmarked ? "bg-[#191b20]" : "bg-[#2563eb]",
                className,
            )}
            aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
            aria-pressed={isBookmarked}
            title={isBookmarked ? "북마크 해제" : "북마크 추가"}
            onClick={() => toggleBookmark(movieId)}
        >
            <img
                className={cn("invert", iconOnly ? "size-[22px]" : "size-4")}
                src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                alt=""
            />
            {!iconOnly && (isBookmarked ? "북마크 해제" : "북마크 추가")}
        </button>
    );
}
