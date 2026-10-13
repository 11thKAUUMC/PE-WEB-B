import { useState } from 'react';

// 선택미션에서는 영화 목록 대신 선택한 페이지 번호의 스타일만 바꿔요.
export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
        aria-label="이전 페이지"
      >
        <img src="/icons/chevron-left.svg" alt="" />
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          type="button"
          className={currentPage === page ? 'current-page' : ''}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`${page}페이지`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === 5}
        onClick={() => setCurrentPage((page) => page + 1)}
        aria-label="다음 페이지"
      >
        <img src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
