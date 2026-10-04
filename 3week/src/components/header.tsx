import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { cn } from "../utils/cn";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const searchStr = useRouterState({ select: (state) => state.location.searchStr });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(new URLSearchParams(searchStr).get("query") ?? "");
  }, [searchStr]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchText.trim();
    void navigate({ to: "/search", search: query ? { query } : {} });
  }

  return (
    <header className="sticky top-0 z-10 flex h-[68px] items-center gap-10 border-b border-[#303030] bg-[#151515] px-[5.5vw]">
      <Link className="inline-flex items-center text-[17px] font-bold" to="/" aria-label="AKi 홈">
        <span className="grid h-7 min-w-[38px] place-items-center bg-[#b96550] px-[7px] font-extrabold text-[#151515]">AKi</span>
      </Link>
      <nav className="flex h-full items-center gap-6 text-[13px] text-[#929292]" aria-label="주요 메뉴">
        <Link
          className={cn("relative grid h-full place-items-center hover:text-[#f0f0f0]", pathname === "/" && "text-[#f0f0f0] after:absolute after:bottom-0 after:h-0.5 after:w-[18px] after:bg-[#b96550] after:content-['']")}
          to="/"
          activeOptions={{ exact: true }}
        >영화</Link>
        <Link
          className={cn("relative grid h-full place-items-center hover:text-[#f0f0f0]", pathname === "/search" && "text-[#f0f0f0] after:absolute after:bottom-0 after:h-0.5 after:w-[18px] after:bg-[#b96550] after:content-['']")}
          to="/search"
          search={{}}
        >검색</Link>
      </nav>
      <form className="ml-auto flex w-[210px] items-center gap-[9px] border-b border-[#484848] py-[7px] text-[#858585] focus-within:border-[#c47c68] focus-within:text-[#c47c68] max-[650px]:w-[30px] max-[650px]:border-0" onSubmit={handleSubmit}>
        <button className="grid shrink-0 place-items-center" type="submit" aria-label="영화 검색">
          <Search size={18} aria-hidden="true" />
        </button>
        <input
          className="w-full bg-transparent text-xs text-[#ededed] outline-none placeholder:text-[#858585] max-[650px]:hidden"
          aria-label="영화 검색"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="영화를 검색해보세요"
        />
      </form>
    </header>
  );
}
