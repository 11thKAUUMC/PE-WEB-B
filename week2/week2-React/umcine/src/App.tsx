function MovieTitle() {
    return <h2>오디세이</h2>;
}

function MovieCard() {
    return (
        <article>
            <MovieTitle />
            <p>2026.08.05</p>
        </article>
    );
}

function MovieList(){
    return(
        <h1>
            <MovieCard/>
            <MovieCard/>
        </h1>
    );
}

function Header(){
    return <h3>헤더</h3>
}

export default function App() {
    return (
        <main>
            <Header />
            <h1>영화 목록</h1>
            <MovieList />
        </main>
    );
}