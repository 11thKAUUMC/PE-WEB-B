import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="border-b border-[#eef0f3] bg-white">
      <div className="mx-auto flex min-h-[88px] w-[calc(100%-32px)] max-w-[1280px] flex-wrap items-center gap-4 py-4 md:h-[88px] md:w-[calc(100%-64px)] md:flex-nowrap md:gap-11 md:py-0">
        <Link className="flex items-center gap-2.5 text-xl font-extrabold" to="/" aria-label="UMCine 영화 목록">
          <span className="grid size-8 place-items-center rounded-lg border-2 border-[#191b20]"><img className="size-6" src="/icons/movie.svg" alt="" /></span>
          <span>UMCine</span>
        </Link>
        <nav className="order-1 flex basis-full items-center gap-8 text-sm md:order-none md:basis-auto" aria-label="주 메뉴">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'font-bold underline underline-offset-4' }}>영화</Link>
          <Link to="/search" activeProps={{ className: 'font-bold underline underline-offset-4' }}>검색</Link>
          <button className="text-[#4b5563]" type="button" disabled title="내 정보 준비 중">내 정보</button>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link className="grid size-10 place-items-center rounded-[6px] border border-[#e1e4e9] bg-white" to="/search" aria-label="영화 검색">
            <img className="size-5 opacity-65" src="/icons/search.svg" alt="" />
          </Link>
          <button className="h-10 rounded-[6px] bg-[#2563eb] px-[18px] text-[13px] font-bold text-white" type="button" disabled title="로그인 준비 중">로그인</button>
        </div>
      </div>
    </header>
  );
}
