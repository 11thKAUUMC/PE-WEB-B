export default function Header() {
  return (
    <header className="site-header">
      <div className="page-container header-content">
        <a className="brand" href="#movie-list" aria-label="UMCine 영화 목록">
          <span className="brand-icon"><img src="/icons/movie.svg" alt="" /></span>
          <span>UMCine</span>
        </a>
        <nav className="header-nav" aria-label="주 메뉴">
          <a href="#movie-list" aria-current="page">영화</a>
          <button type="button" disabled title="검색 준비 중">검색</button>
          <button type="button" disabled title="내 정보 준비 중">내 정보</button>
        </nav>
        <div className="header-actions">
          <button className="search-button" type="button" aria-label="영화 검색 (준비 중)" disabled>
            <img src="/icons/search.svg" alt="" />
          </button>
          <button className="login-button" type="button" disabled title="로그인 준비 중">로그인</button>
        </div>
      </div>
    </header>
  );
}
