# UMCine 2주차 필수·선택미션

## 실행하기

이 프로젝트 폴더에서 실행한다.

```bash
pnpm dev
```

터미널에 표시된 주소를 브라우저에서 연다. 종료할 때는 `Control + C`를 누른다.

## 구현 범위

- 제공된 영화 데이터와 포스터, 아이콘으로 데스크톱 영화 목록을 구현했다.
- 영화 10편을 5열, 2행으로 표시했다.
- 북마크 버튼을 누르면 해당 영화의 북마크 상태와 아이콘, 배경색이 바뀐다.
- 영화 데이터와 타입은 기존 `src/data/movie.ts`, `src/types/movie.ts`를 사용한다.
- 캡처와 더미 데이터에서 마지막 두 영화의 순서가 달라 더미 데이터 순서를 유지했다.
- `pagination.tsx`는 1~5 페이지 버튼 중 선택한 번호만 활성화한다. 이전·다음 버튼은 양 끝에서 비활성화한다. 영화 10편은 그대로 표시한다.
- 검색, 로그인, 내 정보 메뉴는 화면 구성만 구현하고 비활성화했다.
- 선택미션으로 반응형 그리드와 `useState`를 이용한 1~5 페이지 선택을 추가했다.

## 선택미션 핵심

- `src/App.css`: 1024px 이하 3열, 768px 이하 2열, 480px 이하 1열로 변경한다. 그보다 넓으면 기존 5열을 유지한다.
- 모바일에서는 헤더 메뉴를 다음 줄에 배치하고 좌우 여백과 페이지 버튼 간격을 줄인다.
- `src/components/pagination.tsx`: `const [currentPage, setCurrentPage] = useState(1)`로 선택한 번호를 관리한다.
- 번호 클릭 시 `setCurrentPage(page)`로 상태를 바꾸고, `currentPage === page`인 버튼에만 `current-page` 클래스와 `aria-current="page"`를 적용한다.
- 이번 선택미션은 페이지 번호의 활성 스타일 변경까지다. 영화 데이터 분할이나 API 요청은 하지 않는다.

## 컴포넌트 구조

```text
App — 영화 배열 상태와 북마크 변경 함수
├── Header — 로고, 메뉴, 검색·로그인 버튼
├── MovieGrid — map으로 목록 렌더링
│   └── MovieCard × 10 — 포스터, 제목, 개봉일, 북마크 버튼
└── Pagination — 페이지 표시
```

컴포넌트는 `src/components`에 케밥 케이스 파일명으로 분리했다.

## 핵심 코드

### 1. 부모에서 상태 관리하기 — `src/App.tsx`

```tsx
const [movieList, setMovieList] = useState<Movie[]>(movies);

function handleToggleBookmark(movieId: number) {
  setMovieList((currentMovies) =>
    currentMovies.map((movie) =>
      movie.id === movieId
        ? { ...movie, isBookmarked: !movie.isBookmarked }
        : movie,
    ),
  );
}
```

`movies`는 초기 데이터이고 `movieList`는 현재 화면에 사용할 상태다. 이전 상태로 다음 상태를 계산하므로 업데이터 함수를 사용한다. `map`은 새 배열을 만들고, ID가 일치한 영화만 전개 구문으로 복사한 뒤 북마크 값을 반전한다. 원본 배열이나 영화 객체를 직접 수정하지 않는다.

### 2. props와 목록 렌더링 — `src/components/movie-grid.tsx`

```tsx
{movies.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
    onToggleBookmark={onToggleBookmark}
  />
))}
```

`MovieGrid`는 부모에게 받은 영화 배열을 카드로 만든다. `key`에는 영화마다 고유한 ID를 사용한다. 영화 데이터뿐 아니라 부모의 상태 변경 함수도 props로 전달한다.

### 3. 클릭과 조건부 렌더링 — `src/components/movie-card.tsx`

```tsx
interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}
```

버튼의 `onClick={() => onToggleBookmark(movie.id)}`는 클릭한 영화의 ID를 부모에게 전달한다. `onClick={onToggleBookmark(movie.id)}`로 작성하면 렌더링 중 함수를 실행하므로, 클릭할 때 실행할 함수를 전달해야 한다.

`movie.isBookmarked`가 참이면 `/icons/bookmark.svg`, 거짓이면 `/icons/bookmark-outline.svg`를 표시한다. `aria-pressed`에도 같은 값을 연결해 보조 기술이 버튼의 선택 상태를 알 수 있게 했다.

흐름은 **카드 클릭 → 부모의 함수 호출 → 새 상태 저장 → 새 props로 렌더링 → 아이콘 변경**이다. 다른 카드도 렌더링될 수 있지만, 다른 영화의 데이터와 표시 상태는 바뀌지 않는다.

## 최종 확인 결과

- `pnpm build`: 성공. TypeScript 검사 및 배포용 빌드 완료.
- `pnpm lint`: 성공.
- 브라우저: 영화 10편의 포스터가 모두 정상 로드됨.
- 데스크톱 1440px 너비: 240px 너비의 카드 5열, 가로 넘침 없음.
- 초기 북마크: 오디세이와 토이 스토리 5만 활성화됨.
- 스파이더맨: 브랜드 뉴 데이 북마크 추가·해제: 해당 버튼만 상태가 바뀌고 다른 영화는 유지됨.
- 브라우저 콘솔: 확인 시점 경고·오류 없음.

북마크는 메모리 상태이므로 새로고침하면 더미 데이터의 초기 상태로 돌아간다. 저장 기능은 이번 필수미션 범위에 포함하지 않았다.

## 직접 확인하며 설명해 보기

1. `App.tsx`에서 북마크 변경 코드를 읽고, `map`과 전개 구문이 각각 무엇을 새로 만드는지 설명한다.
2. `MovieGrid`를 거쳐 `MovieCard`까지 데이터와 함수가 전달되는 경로를 찾는다.
3. 서로 다른 영화의 북마크를 눌러 독립적으로 변경되는지 확인한다.
4. 이 기록을 참고해 직접 이해한 내용과 화면 캡처를 워크북의 필수미션 기록에 남긴다.
