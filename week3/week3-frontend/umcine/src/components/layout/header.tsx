import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="site-header">
      <div className="page-container header-content">
        <Link className="brand" to="/" aria-label="UMCine 영화 목록">
          <span className="brand-icon"><img src="/icons/movie.svg" alt="" /></span>
          <span>UMCine</span>
        </Link>
        <nav className="header-nav" aria-label="주 메뉴">
          <Link to="/" activeOptions={{ exact: true }}>영화</Link>
          <Link to="/search">검색</Link>
          <button type="button" disabled title="내 정보 준비 중">내 정보</button>
        </nav>
        <div className="header-actions">
          <Link className="search-button" to="/search" aria-label="영화 검색">
            <img src="/icons/search.svg" alt="" />
          </Link>
          <button className="login-button" type="button" disabled title="로그인 준비 중">로그인</button>
        </div>
      </div>
    </header>
  );
}
