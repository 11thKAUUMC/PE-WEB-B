import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="AKi 홈">
        <span className="brand-mark">AKi</span>
      </a>
      <nav className="main-nav" aria-label="주요 메뉴">
        <a className="active" href="#movies">영화</a>
        <a href="#bookmark">북마크</a>
      </nav>
      <label className="search-box">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">영화 검색</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="영화를 검색해보세요"
        />
      </label>
    </header>
  );
}
