# Juyoung You — HR × AX 포트폴리오

HR 콘솔 콘셉트의 정적 포트폴리오 사이트. Astro 7 · GitHub Pages.

## 구조

| 경로 | 역할 |
|---|---|
| `src/i18n.ts` | **모든 UI 문구와 이력 사실**(한/영). 숫자·날짜를 고칠 때 여기부터. `HIRE_DATE`가 상단 재직일수 카운터를 움직인다 |
| `src/content/projects/*.md` | 프로젝트 8건 국문 본문. **직접 수정하지 말 것** — `career-ops/dsrv-projects/`가 원본이고 아래 스크립트가 덮어쓴다 |
| `src/content/projects-en/*.md` | 같은 8건의 영문 본문(본문만, frontmatter 없음). 스크립트가 건드리지 않으므로 여기서 직접 고친다. 파일이 없으면 `/en/` 페이지는 국문 본문으로 대체된다 |
| `scripts/make-og.mjs` | 링크 미리보기 이미지(`public/og-ko.png`, `og-en.png`, 1200×630) 생성. `npm run og`. 이름·한 줄 소개를 바꾸면 다시 돌리고 PNG를 커밋 |
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

- 영문 상세 페이지(`/en/work/…`) 본문은 `src/content/projects-en/`의 번역본. 국문 원본이 바뀌면 영문도 손으로 맞춰야 한다(자동 동기화 없음).
