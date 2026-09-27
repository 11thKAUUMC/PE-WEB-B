import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지 이동">
      <button type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft size={18} />
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button key={page} type="button" className={currentPage === page ? "active" : ""} aria-current={currentPage === page ? "page" : undefined} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button type="button" aria-label="다음 페이지" disabled={currentPage === 5} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
