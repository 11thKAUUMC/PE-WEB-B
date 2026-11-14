import { useState } from 'react';
import { cn } from '../../utils/cn';

// 선택미션에서는 영화 목록 대신 선택한 페이지 번호의 스타일만 바꿔요.
export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const buttonClass = 'grid size-9 place-items-center rounded-lg text-[13px] disabled:opacity-20';

  return (
    <nav className="mt-9 flex items-center justify-center gap-1.5 sm:gap-3" aria-label="영화 목록 페이지">
      <button
        className={buttonClass}
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
        aria-label="이전 페이지"
      >
        <img className="size-5" src="/icons/chevron-left.svg" alt="" />
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          type="button"
          className={cn(buttonClass, currentPage === page ? 'bg-[#191b20] text-white' : 'bg-transparent')}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`${page}페이지`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={buttonClass}
        type="button"
        disabled={currentPage === 5}
        onClick={() => setCurrentPage((page) => page + 1)}
        aria-label="다음 페이지"
      >
        <img className="size-5" src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
