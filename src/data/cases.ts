// Plain-language copy for the home page's case files (HR-01 … HR-06).
// Kept out of src/content/projects because scripts/import-projects.mjs overwrites those files.
// Array order = file number on the home page. `id` must match a file name in src/content/projects.
// Facts here may only restate what the full write-ups already publish (KO confirmed 2026-10-07;
// EN follows the wording of src/content/projects-en, added 2026-10-08).

interface Copy {
  short: string;    // ← EDIT: 2–3 word name shown as the giant headline in the home tour
  title: string;    // ← EDIT: folder headline (plain words)
  line: string;     // one-line summary (always visible)
  flow: [string, string, string]; // what came in / what it does / what comes out
  problem: string;
  solution: string;
  result: string;
}
export interface Case extends Copy {
  id: string;
  name: string;     // short project name shown on the sheet header (KO; EN uses titleEn)
  cat: string;      // category label
  catEn: string;
  en: Copy;
}

export const CASES: Case[] = [
  {
    id: 'hris',
    short: '사내 HRIS',
    title: '회사 규정대로 움직이는 인사 시스템',
    name: '사내 HRIS',
    cat: '사내 시스템 · PO',
    catEn: 'Internal platform · PO',
    line: '사내 인사 시스템(HRIS)을 PO로 맡아 진행하고 있습니다. 개발팀, 보안팀, 인프라팀에 협업을 요청해 와이어프레임부터 개발까지 이끌고 있고 2026년 말 전사 테스트가 목표입니다.',
    flow: ['기능별로 따로 운영하던 인사 시스템', 'PO로서 개발·보안·인프라팀과 협업', '2026년 말 전사 테스트'],
    problem: '인사 업무가 기능마다 다른 시스템에서 따로 돌았고 회사 규정은 외부 서비스의 기본 동작에 맞춰 사람이 보정해야 했습니다. 사내에서 직접 만들려면 인사 담당자 혼자서는 정할 수 없는 일이 많았습니다. 데이터베이스, 출입기록 연동, 보안 설정이 그렇습니다.',
    solution: '제가 PO를 맡아 화면 설계(와이어프레임)부터 개발까지 직접 진행합니다. 데이터베이스 설정, 출입기록과 근태 연동, 보안 설정처럼 다른 팀의 판단이 필요한 부분은 관련 법 조문과 판례를 먼저 찾아 정리한 뒤, 그 내용을 들고 개발팀, 보안팀, 인프라팀에 협업을 요청해 자문을 받고 결정합니다. 연차 발생, 근무 유형, 휴가 종류 같은 회사 규정은 출처와 함께 한 파일에 모아 그 값대로 동작하게 했습니다.',
    result: '개발 중입니다. 지금은 가짜 데이터로 구성원, 근무, 휴가, 평가, 채용 흐름을 시연할 수 있는 단계이고 2026년 말까지 전사 테스트를 해 보는 것이 목표입니다.',
    en: {
      short: "In-house HRIS",
      title: "An HR system that runs on the company's own rules",
      line: "I am the product owner of our in-house HR system (HRIS). I asked the development, security and infrastructure teams to work with me, and I am leading it from wireframes to build, aiming for a company-wide test by the end of 2026.",
      flow: ["Separate HR systems, one per function", "PO working with development, security and infrastructure", "Company-wide test by end of 2026"],
      problem: "HR work ran in a different system for each function, and company rules had to be patched by hand around an outside service's default behaviour. Building our own meant many calls an HR person cannot make alone: the database, the door-access link to attendance, security settings.",
      solution: "As product owner I run it from wireframes to build. Where another team's judgement is needed, such as database setup, linking door-access records to attendance, or security settings, I first look up the relevant statutes and case law and write them up, then take that to the development, security and infrastructure teams, ask for their advice and decide with them. Company rules such as leave grants, work types and leave types sit in one file with their sources, and the system runs on those values.",
      result: "In development. It can demo the people, attendance, leave, review and recruiting flows on fake data, and the goal is a company-wide test by the end of 2026.",
    },
  },
  {
    id: 'hrga-hub',
    short: 'HR/GA Hub',
    title: '흩어진 사내 도구를 하나로',
    name: 'HR/GA Hub',
    cat: '사내 시스템',
    catEn: 'Internal platform',
    line: '회의실, 사내 이벤트, 자기계발비처럼 여기저기 흩어져 있던 도구와 시트를 회사 계정 하나로 들어가는 웹앱으로 합쳤습니다.',
    flow: ['캘린더 · 별도 웹앱 · 구글시트 · 엑셀', '회사 계정 로그인 웹앱 하나로 통합', '6개 기능'],
    problem: '인사총무 업무가 캘린더, 별도 웹앱, 구글시트, 엑셀 네 곳에 흩어져 있었습니다. 매달 같은 일을 손으로 다시 했고 숫자가 틀려도 아무도 알아채지 못했습니다.',
    solution: '회사 Google 계정으로 로그인하는 웹앱 하나로 합쳤습니다. 회의실 현황, 사내 이벤트 조 편성, 구성원 디렉토리, 제휴식당, 자기계발비, 근속 알림까지 6개 기능이 들어 있습니다.',
    result: '2026년 3월부터 멈춤 없이 운영 중입니다. 사내 앱은 2개에서 1개로 줄었고 자동 테스트 978개가 모두 통과합니다.',
    en: {
      short: "HR/GA Hub",
      title: "Scattered internal tools, now one",
      line: "Meeting rooms, company events, the training allowance: tools and spreadsheets that lived in different places are now one web app you sign into with your company account.",
      flow: ["Calendar · a separate web app · Google Sheets · Excel", "One web app behind the company account", "6 features"],
      problem: "HR and general-affairs work was spread across four places: a calendar, a separate web app, Google Sheets and Excel. The same work was redone by hand every month, and when a number was wrong, nobody noticed.",
      solution: "I merged them into one web app that you sign into with your company Google account. It has six features: meeting-room status, team draws for company events, a member directory, partner restaurants, the training allowance and work-anniversary alerts.",
      result: "Running since March 2026 with no unplanned downtime. Two internal apps became one, and all 978 automated tests pass.",
    },
  },
  {
    id: 'meal-allowance',
    short: '식대 검증',
    title: '식대 확인, 이틀에서 몇 분으로',
    name: '식대 검증 자동화',
    cat: '규정 → 코드',
    catEn: 'Policy as code',
    line: '식권 사용 내역과 근태 기록을 사람이 눈으로 맞추던 일을, 규정을 옮긴 규칙이 자동으로 대조하게 했습니다.',
    flow: ['식권 사용 내역 + 근태 기록', '규정 조항별 자동 대조', '차감 사유 문장 · 별도 확인 목록'],
    problem: '식대는 먼저 지급하고 나중에 자격을 확인합니다. 식권 사용 내역과 근태 기록을 사람마다, 날짜마다 눈으로 맞추느라 매달 하루에서 이틀이 걸렸고 한 건을 놓쳐도 드러나지 않았습니다.',
    solution: '복리후생·지출 규정의 지원 요건을 조항 단위로 규칙으로 옮기고 두 데이터를 자동으로 대조합니다. 판정할 수 없는 건은 그냥 통과시키지 않고 별도 확인 목록으로 모읍니다.',
    result: '2026년 3월부터 한 달도 빠짐없이 실행하고 있습니다. 확인은 몇 분, 예외 확인까지 30분 안팎이면 끝납니다. 결과는 실제 급여 차감에 쓰이고 당사자에게 보여줄 차감 사유 문장까지 만들어집니다.',
    en: {
      short: "Meal checks",
      title: "Meal-allowance checks: from two days to minutes",
      line: "Matching meal-card usage against attendance records used to be done by eye. Now rules taken from the regulation do the matching automatically.",
      flow: ["Meal-card usage + attendance records", "Automatic check, clause by clause", "Deduction reasons · manual-review list"],
      problem: "The meal allowance is paid first and eligibility is checked afterwards. Matching meal-card usage against attendance, person by person and date by date, took one to two days every month, and a single miss never surfaced.",
      solution: "I turned the eligibility requirements in the benefits and expense regulations into rules, clause by clause, and the two data sets are now compared automatically. Cases the rules cannot decide go to a separate review list.",
      result: "Run every month since March 2026, without a miss. The check takes minutes, and about 30 minutes including the exceptions. The results feed actual payroll deductions, and each one comes with a sentence explaining the deduction to the person concerned.",
    },
  },
  {
    id: 'interview-reminder',
    short: '면접 안내메일',
    title: '면접 전날 안내메일, 빠뜨리지 않게',
    name: '면접 D-1 안내메일 자동화',
    cat: '채용',
    catEn: 'Recruiting',
    line: '다음 날 면접을 캘린더에서 찾아 유형별 안내메일 초안을 만들어 둡니다. 보내기 버튼은 일부러 사람이 누르게 남겼습니다.',
    flow: ['공유 캘린더의 내일 면접', '유형 판별 · 양식 선택', 'Gmail 초안 (발송은 사람이)'],
    problem: '면접 전날 후보자에게 장소, 시간, 준비물을 안내하는 메일을 보냅니다. 면접 유형마다 양식이 다르고 바쁜 날일수록 빠뜨리기 쉬웠습니다. 빠뜨리면 후보자 경험이 바로 나빠집니다.',
    solution: '매일 아침 공유 캘린더에서 다음 날 면접을 찾아 유형에 맞는 양식으로 Gmail 초안을 만듭니다. 발송은 자동화하지 않았습니다. 한 번 보낸 메일은 되돌릴 수 없기 때문입니다.',
    result: '담당자에게 남은 일은 초안을 확인하고 보내기를 누르는 것뿐입니다. 읽지 못한 일정은 경고로 요약 메일에 올리고 같은 초안이 두 번 만들어지지 않게 막았습니다.',
    en: {
      short: "Interview emails",
      title: "Interview reminders that never get missed",
      line: "It finds tomorrow's interviews in the calendar and prepares a reminder draft for each interview type. A person still presses send.",
      flow: ["Tomorrow's interviews in the shared calendar", "Identify the type · pick the template", "Gmail draft (a person sends it)"],
      problem: "The day before an interview, the candidate gets an email with the location, the time and what to bring. Each interview type has its own template, and on busy days it was easy to miss one. A missed email hurts the candidate experience right away.",
      solution: "Every morning it finds the next day's interviews in the shared calendar and creates a Gmail draft from the right template. Sending is not automated, because an email cannot be taken back once it is sent.",
      result: "All that is left for the coordinator is to check the draft and press send. Events it cannot read are flagged as warnings in a summary email, and the same draft is never created twice.",
    },
  },
  {
    id: 'guide-redesign',
    short: '안내서 이관',
    title: '노션 사내 안내서, 46개 페이지 삭제를 미리 막다',
    name: '노션 사내 안내서 리디자인',
    cat: '정보 구조',
    catEn: 'Information architecture',
    line: '전 직원이 매일 여는 노션(Notion) 사내 안내서를 구조부터 다시 설계했습니다. 그대로 옮겼다면 하위 페이지 46개가 지워질 문제를 미리 찾아 원본을 건드리지 않는 이관 방법을 만들었습니다.',
    flow: ['8개 섹션 · 하위 페이지 46개', '새 레이아웃만 가져오고 페이지는 원본 그대로', '적용 완료 · 운영 중'],
    problem: '사내 안내서는 신규 입사자가 처음 여는 문서이자 모든 구성원이 규정과 사무실 이용법을 찾는 입구입니다. 그런데 8개 섹션 아래 46개 페이지가 평평하게 나열돼 있어 필요한 것을 찾으려면 전부 훑어야 했습니다. 사내 곳곳에서 링크된 문서라, 새로 만들다 주소가 바뀌면 그 링크가 모두 깨집니다.',
    solution: '인터뷰로 요구사항을 좁히고 성격이 다른 시안 4개를 나란히 놓고 하나를 골랐습니다. 옮기기 전에 원본과 시안을 하나씩 대조하다가 원본의 46개 항목이 링크가 아니라 페이지 그 자체라는 것을 발견했습니다. 시안을 그대로 붙였다면 46개 페이지가 한 번에 지워졌을 겁니다. 그래서 새 레이아웃만 가져오고 페이지는 원본 그대로 두는 방법으로 바꿨습니다.',
    result: '리허설까지 원본은 한 번도 건드리지 않았습니다. 페이지가 하나라도 지워지는 작업은 실행 자체가 거부되게 설정했고 가짜 페이지로 만든 작은 리허설에서 이 방법이 통하는 것을 확인했습니다. 승인을 받아 2026년 8월 11일 전사 공지와 함께 적용했고 지금 운영 중입니다. 주소와 사이드바 구조는 그대로 유지됩니다.',
    en: {
      short: "Handbook move",
      title: "Catching a Notion handbook migration that would have deleted 46 pages",
      line: "I redesigned the company handbook in Notion that every employee opens daily, starting from its structure. I caught in advance that moving it as drafted would delete 46 child pages, and built a migration that never touches the original.",
      flow: ["8 sections · 46 child pages", "Take only the new layout · keep the original pages", "Applied · live"],
      problem: "The company handbook is the first document a new hire opens and where everyone looks up rules and office information. But its 46 pages were listed flat under 8 sections, so finding anything meant scanning all of it. It is linked from all over the company, so changing its addresses during a rebuild would break every one of those links.",
      solution: "I narrowed the requirements through interviews, then compared four different mock-ups side by side and picked one. Checking the original against the mock-up item by item before moving anything, I found that the 46 entries in the original were not links but the pages themselves. Pasting the mock-up in as drafted would have deleted all 46 pages at once, so I switched to taking only the new layout and keeping the original pages in place.",
      result: "The original was never touched during the rehearsal. Any operation that would delete even one page is set to be refused outright, and a small rehearsal with dummy pages confirmed the approach works. After approval it went live with a company-wide announcement on 11 August 2026. Page addresses and the sidebar stay as they are.",
    },
  },
  {
    id: 'asset-regulation',
    short: '자산관리 규정',
    title: '2년 묵은 자산관리 규정 다시 쓰기',
    name: '자산관리 규정 개정',
    cat: '규정',
    catEn: 'Policy',
    line: '규정을 법·세무, 정보보안, 실무 세 관점에서 다시 쓰고 대표이사 승인을 받았습니다. 새로 만든 노후화 기준으로 교체할 장비를 골라냈습니다.',
    flow: ['2023년 규정 + 자산대장', '세 관점 검토 · 15건 개정 · 노후화 기준 신설', '승인된 규정 · 교체 대상 17명 추천'],
    problem: '자산관리 규정은 2023년 11월 이후 그대로였습니다. 퇴사자 장비 반납 절차가 단계로 정리돼 있지 않았고, 분실·파손 변상 기준은 모호했습니다. "노후 장비"의 기준도 없어 교체 요청이 올 때마다 그때그때 판단했습니다.',
    solution: '규정을 법·세무, 정보보안, 실무 세 관점으로 따로 읽어 고칠 곳을 찾고 가장 중요한 15건을 반영했습니다. 노후화를 "구매 후 4년"으로 정의하고 변상금은 급여에서 일방적으로 빼지 않고 별도 합의로만 청구하도록 명시했습니다. 규정 문서는 손으로 편집하지 않고 코드로 만들어 개정본과 개정 이력이 서로 어긋나지 않게 했습니다.',
    result: '대표이사 승인을 받았습니다. 새 노후화 기준과 경영진이 정한 조건을 자산대장에 적용해 노트북 교체 대상 17명을 우선순위별로 추천했고 그 과정에서 자산대장과 실제가 맞지 않는 건도 찾아 함께 보고했습니다.',
    en: {
      short: "Asset policy",
      title: "Rewriting a two-year-old asset regulation",
      line: "I rewrote the regulation from three angles (legal and tax, information security, day-to-day practice) and got CEO approval. The new obsolescence standard then picked the equipment due for replacement.",
      flow: ["2023 regulation + asset register", "Three-angle review · 15 changes · obsolescence standard", "Approved regulation · 17 replacement picks"],
      problem: "The asset management regulation had not changed since November 2023. The leaver equipment return procedure was not laid out in steps, and the rules for compensating loss or damage were vague. There was no definition of \"obsolete equipment\" either, so every replacement request was judged case by case.",
      solution: "I read the regulation separately from three angles (legal and tax, information security, practice), found what needed fixing and applied the 15 most important items. Obsolescence is now defined as \"four years after purchase\", and compensation is never deducted from pay unilaterally; it can only be claimed by separate agreement. The regulation documents are generated from code rather than edited by hand, so the revised text and the revision history cannot drift apart.",
      result: "Approved by the CEO. Applying the new obsolescence standard and leadership's criteria to the asset register, I recommended 17 people for laptop replacement in priority order, and reported entries where the register did not match reality along the way.",
    },
  },
];

// "HR-01" … "HR-06": file number by position in CASES. Used on the home page and the detail pages.
export const fileNo = (id: string) => {
  const i = CASES.findIndex((c) => c.id === id);
  if (i < 0) throw new Error(`src/data/cases.ts has no entry for project "${id}" — add one so it gets a file number.`);
  return `HR-${String(i + 1).padStart(2, '0')}`;
};
