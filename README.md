# Juyoung You — HR × AX 포트폴리오

HR 콘솔 콘셉트의 정적 포트폴리오 사이트. Astro 7 · GitHub Pages.

## 구조

| 경로 | 역할 |
|---|---|
| `src/i18n.ts` | **모든 UI 문구와 이력 사실**(한/영). 숫자·날짜를 고칠 때 여기부터. `HIRE_DATE`가 상단 재직일수 카운터를 움직인다 |
| `src/content/projects/*.md` | 프로젝트 8건 본문. **직접 수정하지 말 것** — `career-ops/dsrv-projects/`가 원본이고 아래 스크립트가 덮어쓴다 |
| `scripts/import-projects.mjs` | 원본 md → 콘텐츠 컬렉션 변환. 제목·기간·상태·스택 메타데이터도 이 파일 안에 있다 |
| `src/components/Home.astro` | 홈(기록·모듈·원칙·이력·연락) |
| `src/components/Work.astro` | 프로젝트 상세 |
| `src/components/Palette.astro` | ⌘K 검색 |
| `src/styles/tokens.css` | 색·글꼴·간격 토큰 |

## 명령

```bash
npm install                       # 처음 한 번
node scripts/import-projects.mjs  # career-ops 원본이 바뀌었을 때
npm run dev                       # http://localhost:4321
npm run build                     # dist/ 생성 (배포 전 반드시 성공해야 함)
```

## 배포

`master`에 push → GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해서 GitHub Pages에 올린다. 주소: https://im-ju.github.io/

## 전제(assumption)

- 영문 상세 페이지(`/en/work/…`)는 영문 요약 + 국문 본문. 본문 영역 번역은 미착수.
