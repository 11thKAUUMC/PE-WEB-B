export default function Footer() {
  return (
    <footer className="border-t border-[#eef0f3] bg-white">
      <div className="mx-auto flex min-h-14 w-[calc(100%-32px)] max-w-[1280px] items-center justify-end gap-2 py-4 text-[10px] text-[#6b7280] md:w-[calc(100%-64px)] md:py-0 md:text-xs">
        <img className="h-auto w-6 shrink-0" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{' '}
          <a className="underline" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>.
        </p>
      </div>
    </footer>
  );
}
