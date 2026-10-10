import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <nav className="mt-[46px] flex justify-center gap-[5px]" aria-label="영화 목록 페이지 이동">
      <button className="grid h-[33px] w-[33px] place-items-center text-[#929292] hover:bg-[#a95543] hover:text-white disabled:cursor-not-allowed disabled:opacity-30" type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft size={18} />
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button key={page} type="button" className={cn("grid h-[33px] w-[33px] place-items-center text-[11px] text-[#929292] hover:bg-[#a95543] hover:text-white", currentPage === page && "bg-[#a95543] text-white")} aria-current={currentPage === page ? "page" : undefined} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button className="grid h-[33px] w-[33px] place-items-center text-[#929292] hover:bg-[#a95543] hover:text-white disabled:cursor-not-allowed disabled:opacity-30" type="button" aria-label="다음 페이지" disabled={currentPage === 5} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
