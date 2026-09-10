// All UI strings. Korean is the default locale; English lives under /en/.
// Facts here mirror career-ops/cv.md (2026-09-10). Change them there first, then here.

export type Locale = 'ko' | 'en';

export const HIRE_DATE = '2024-12-05'; // DSRV start date (drives the live tenure counter)
export const EMAIL = 'yjyijc97@gmail.com';
export const LINKEDIN = 'https://linkedin.com/in/juyoung-you-54aa921bb';

export const STATUS_LABEL: Record<Locale, Record<string, string>> = {
  ko: { live: '운영 중', poc: 'PoC 완료', approved: '승인 완료', pending: '적용 승인 대기', done: '완료' },
  en: { live: 'in production', poc: 'PoC complete', approved: 'approved', pending: 'awaiting rollout', done: 'complete' },
};

export const t = {
  ko: {
    htmlLang: 'ko',
    siteTitle: 'Juyoung You — HR × AX',
    description: 'HR 담당자 유주영의 포트폴리오. 제도를 만들고, 그 제도가 지켜지는지 코드로 확인합니다.',
    nav: { record: '기록', modules: '모듈', policy: '원칙', log: '이력', contact: '연락' },
    search: '검색',
    langSwitch: 'EN',
    langSwitchHref: '/en/',
    tenure: (d: number) => `재직 D+${d.toLocaleString('ko-KR')}`,
    hero: {
      eyebrow: '인사기록 카드 · HR × AX',
      name: '유주영',
      role: 'HR Operations · People Systems',
      statement: '제도가 없으면 만들고, 만든 제도가 지켜지는지 코드로 확인하는 HR 담당자입니다.',
      sub: '블록체인 인프라 기업 DSRV 인사총무팀. 조직이 50명 미만에서 90명으로 커지는 동안 HR 시스템 전환 2회, 20개 이상 포지션 채용 단독 운영, 사내 규정을 조문 단위로 코드화한 웹 서비스 운영.',
      fields: [
        ['소속', 'DSRV · 인사총무팀 매니저'],
        ['기간', '2024.12 – 재직 중'],
        ['근무지', '서울'],
        ['언어', '한국어 · 영어 (OPIc AL)'],
        ['학위', 'B.S. Business Management, Stony Brook University (SUNY)'],
      ],
      ctaPrimary: '이메일 보내기',
      ctaSecondary: 'LinkedIn',
    },
    modules: {
      title: '모듈',
      lede: '인사총무 담당자가 자기 팀의 반복 업무를 직접 도구로 만들어 운영한 기록. 구현은 AI 페어프로그래밍, 무엇을 만들고 무엇을 만들지 않을지와 그것을 어떻게 검증할지는 직접 판단했습니다.',
      replaced: '대체한 것',
      open: '상세 보기',
    },
    policy: {
      title: '이 사이트의 운영 규정',
      lede: '여덟 개 프로젝트는 도메인도 규모도 다르지만 같은 문제의식에서 나왔습니다. 그 문제의식을 조문으로 적었습니다.',
      articles: [
        ['제1조', '규정은 사람의 기억이 아니라 코드로 옮긴다', '식대 지원 요건, 자기계발비 한도, 자산 내용연수는 전부 문서에 적혀 있지만 매번 사람이 해석하던 것이었다. 해석을 코드로 고정하면 판정이 일관되고, 규정이 바뀌었을 때 고칠 자리가 한 곳이 된다.'],
        ['제2조', '조용한 실패를 찾아 시끄럽게 만든다', '이 일들의 진짜 위험은 에러가 아니었다. 틀렸는데 정상처럼 보이는 것이었다. 근태 누락은 차감 0원으로, 파싱 실패는 "3건 생성" 성공 메시지로 위장한다. 전부 별도 확인 대상으로 승격하거나 경보를 붙였다.'],
        ['제3조', '자동화의 경계를 먼저 정한다', '면접 안내메일은 작성만 자동, 발송은 사람. 감사 도구는 진단만, 수정 없음. 출입기록 분석은 확인 대상만 좁히고 판단하지 않는다. 무엇을 자동화하지 않을지를 매번 먼저 정했다.'],
        ['제4조', '되돌릴 수 없는 변경에는 절차를 만든다', '안내서 이관에서 적용했다면 하위 페이지 46개가 삭제됐을 함정을 사전에 발견했다. 검증하려는 행위 자체가 위험원일 때는 원본을 건드리지 않는 리허설을 따로 설계한다.'],
        ['제5조', '자기 결과를 자기가 검증한다', 'AI가 만든 분석과 코드는 그럴듯하게 틀린다. 그래서 자기 PoC 보고서를 재감사해 수치를 정정했고, 모든 배포는 구현과 분리된 세션의 독립 리뷰를 거친다.'],
      ],
      silentTitle: '부칙 · 조용한 실패 목록',
      silentHead: ['무엇이', '어떻게 위장했나', '조치'],
      silent: [
        ['식대 검증에서 근태기록 누락', '차감 0원 = 문제 없음처럼 보임', '별도확인대상으로 승격'],
        ['충전 사유 형식 변경', '검증 대상에서 빠짐 = 조용히 통과', '미매칭 건 경보'],
        ['자기계발비 팀명 불일치', '집계에서 사라짐 = 합계는 여전히 그럴듯함', '심각도 표기로 표면화'],
        ['안내메일 파싱 실패', '건너뛰기 = "3건 생성" 성공 메시지', '경고 카운트 동반 보고'],
        ['AI 스킬 분석 결과', '재현되지 않는 수치가 보고서에 실림', '재감사 후 정정본 발행'],
        ['알림 크론 사망', '실패 건수 0 = 정상처럼 보임', '마지막 커버 날짜 신선도 감시'],
      ],
    },
    log: {
      title: '이력 로그',
      lede: '2024년 12월 입사 이후의 주요 기록. 시간순.',
      entries: [
        ['2024.12', '입사', 'DSRV 경영관리팀 매니저로 입사. 2주 차부터 팀 리드 부재로 근태·연차·건강검진·병역지정업체 업무를 인수인계 없이 이관받아 운영.'],
        ['2025.02', 'HRIS 구축', 'HR ERP(5240)에서 flex로 전환. 벤더 구축 지원 없이 어드민에서 직접 세팅하고 데이터 이관, 출입통제 연동, 전자결재 설계까지 약 5주 만에 전사 오픈.'],
        ['2025', '사옥 이전', '8개 이상 카테고리 업체 비교견적, 5일 이전 일정 설계·운영, 4단계 검수 절차. 이후 법인 변경등기와 임대인 귀속 비용 분리까지.'],
        ['2025 –', '채용 오퍼레이션', '20개 이상 포지션 채용 전 구간 단독 운영. AI 이력서 스크리닝 도입, 4개 채널 단일 계정 통합, 채용 SLA 문서화, 면접관 교육.'],
        ['2025 –', '온보딩 제도 신설', '없던 온보딩을 처음부터 설계해 CFO 승인. 6단계에서 8단계로 재설계, 사번 100번대부터 152번까지 직접 진행.'],
        ['2026.01', 'ERP 전환', '더존 아마란스10 도입에서 조직도·결재선·양식·인사정보 세팅과 교육 담당. 전자결재 전환 완료, 회계·인사 모듈 진행 중.'],
        ['2026.03', '자산관리규정 개정', '법률·세무 / 정보보안 / 구조·실무 세 관점 분석, 우선순위 15건 반영. 변상 시 임금·퇴직금 일방 공제 금지 원칙 명문화. 대표이사 승인.'],
        ['2026.03', 'HR/GA Hub 배포', '사내 인사총무 통합 플랫폼 프로덕션 배포. 이후 5개월 무중단 운영.'],
        ['2026.04', '신규 입사자 피드백 프로그램', '1:1 커피챗 설계, 약 580개 의견 취합·분석, TOP 10 이슈와 약 40건 액션 아이템으로 경영진 보고. 2차 질문 가이드를 1차 결과로 재설계.'],
        ['2026', '외부 제출 무반려', '법인 변경등기 12건, 해외 파트너 KYB 실사 10건 영문 서류 최종 검토. 반려 0건.'],
      ],
    },
    contact: {
      title: '연락',
      lede: 'HR Ops · People Systems · 외국계 한국법인 HR 포지션에 관심이 있습니다. 이메일이 가장 빠릅니다.',
    },
    footer: {
      line: 'Juyoung You · HR × AX',
      note: '이 사이트의 모든 수치는 저장소 소스·커밋 이력·산출 리포트 실측 기준입니다. 임직원 실명과 사내 식별자는 제외했습니다.',
      built: '직접 만들었습니다 · Astro · Cloudflare Pages',
    },
    detail: { back: '← 모듈 목록', period: '기간', status: '상태', stack: '스택', replaced: '대체한 것', next: '다음 모듈' },
    palette: { placeholder: '모듈·섹션 검색…', empty: '결과 없음', hint: '↑↓ 이동 · ↵ 열기 · esc 닫기' },
  },
  en: {
    htmlLang: 'en',
    siteTitle: 'Juyoung You — HR × AX',
    description: 'Portfolio of Juyoung You, HR generalist who writes the policy when none exists, then builds the systems that make it hold.',
    nav: { record: 'Record', modules: 'Modules', policy: 'Policy', log: 'Log', contact: 'Contact' },
    search: 'Search',
    langSwitch: 'KO',
    langSwitchHref: '/',
    tenure: (d: number) => `Day ${d.toLocaleString('en-US')} at DSRV`,
    hero: {
      eyebrow: 'Employee record · HR × AX',
      name: 'Juyoung You',
      role: 'HR Operations · People Systems',
      statement: 'An HR generalist who writes the policy when none exists, then builds the systems that make it hold.',
      sub: 'Manager, HR & General Affairs at DSRV, a blockchain infrastructure company in Seoul. Through growth from under 50 to about 90 employees: two HR system transitions, recruiting operations for 20+ requisitions as sole owner, and an internal web service that encodes company regulation at the clause level.',
      fields: [
        ['Employer', 'DSRV · Manager, HR & General Affairs'],
        ['Tenure', 'Dec 2024 – present'],
        ['Location', 'Seoul, South Korea'],
        ['Languages', 'Korean (native) · English (professional)'],
        ['Degree', 'B.S. Business Management, Stony Brook University (SUNY)'],
      ],
      ctaPrimary: 'Email me',
      ctaSecondary: 'LinkedIn',
    },
    modules: {
      title: 'Modules',
      lede: 'Tools I built and operate for my own team\'s recurring work. Implementation was AI pair-programming; what to build, what not to build, and how to verify it were my calls.',
      replaced: 'Replaced',
      open: 'Open',
    },
    policy: {
      title: 'Operating rules of this site',
      lede: 'Eight projects, different domains and sizes, one set of concerns. Written as articles, the way I write policy.',
      articles: [
        ['Art. 1', 'Move rules out of memory and into code', 'Meal-allowance eligibility, training budgets and asset lifetimes were all written down, yet interpreted by a person every time. Fix the interpretation in code and judgements become consistent, with one place to change when the rule changes.'],
        ['Art. 2', 'Find silent failures and make them loud', 'The real risk was never an error. It was being wrong while looking normal. A missing attendance record shows up as a zero deduction; a parse failure hides behind a "3 drafts created" success message. Each was promoted to an explicit review item or an alert.'],
        ['Art. 3', 'Decide the boundary of automation first', 'Interview emails: drafting is automated, sending is human. The audit tool diagnoses and never edits. Access-log analysis narrows what to check and does not judge. Every project started by deciding what not to automate.'],
        ['Art. 4', 'Irreversible changes get a procedure', 'A handbook migration would have deleted 46 child pages if applied as planned. When the act of verifying is itself the hazard, design a rehearsal that never touches the original.'],
        ['Art. 5', 'Audit your own results', 'AI-generated analysis and code fail plausibly. So I re-audited my own PoC report and corrected the figures, and every deployment goes through an independent review in a session separate from the one that built it.'],
      ],
      silentTitle: 'Annex · Register of silent failures',
      silentHead: ['What', 'How it hid', 'Fix'],
      silent: [
        ['Missing attendance record in meal check', 'Zero deduction looked like "no issue"', 'Promoted to manual-review list'],
        ['Top-up reason format changed', 'Dropped out of scope, passed quietly', 'Alert on unmatched rows'],
        ['Team-name mismatch in benefits sheet', 'Vanished from totals that still looked right', 'Surfaced with severity'],
        ['Email parse failure', 'Skipped behind a "3 created" success', 'Warning count reported alongside'],
        ['AI skills analysis', 'Non-reproducible numbers reached the report', 'Re-audit, corrected reissue'],
        ['Dead notification cron', 'Zero failures looked healthy', 'Monitor last-covered-date freshness'],
      ],
    },
    log: {
      title: 'Log',
      lede: 'Key entries since December 2024, in order.',
      entries: [
        ['Dec 2024', 'Joined', 'Joined DSRV. Two weeks in, the team lead became unavailable; took over attendance, leave, health screening and statutory administration with no handover.'],
        ['Feb 2025', 'HRIS build', 'Replaced the incumbent HR ERP. Configured the admin console with effectively no vendor support, migrated data, integrated badge access, redesigned approvals. Company-wide launch in about five weeks.'],
        ['2025', 'Office relocation', 'Competitive bids across 8+ categories, a five-day execution schedule, a four-step inspection chain. Then the corporate filings and landlord cost separation.'],
        ['2025 –', 'Recruiting operations', 'Sole owner end to end for 20+ requisitions. AI-assisted screening, four channels consolidated into one team account, documented SLAs, interviewer training.'],
        ['2025 –', 'Onboarding from nothing', 'Designed the programme, cleared it with the CFO, redesigned it from six steps to eight, and ran it personally from employee number 100 through 152.'],
        ['Jan 2026', 'ERP transition', 'Douzone Amaranth10: org structure, approval routing, forms and HR master data plus training. E-approval live; finance and HR modules in progress.'],
        ['Mar 2026', 'Asset regulation rewrite', 'Three-lens analysis, 15 priority findings implemented, wage-deduction protection codified. CEO approved.'],
        ['Mar 2026', 'HR/GA Hub shipped', 'Internal HR & workplace platform in production. Five months without unplanned downtime.'],
        ['Apr 2026', 'New-hire feedback loop', 'Designed 1:1 coffee chats, analysed ~580 comments alone, briefed the executive team on a top-10 issue list and ~40 actions. Second round redesigned from first-round findings.'],
        ['2026', 'Zero-defect filings', '12 corporate registry filings and 10 partner KYB reviews as final reviewer of English submissions. No rejections.'],
      ],
    },
    contact: {
      title: 'Contact',
      lede: 'Open to HR Operations, People Systems and HR Generalist roles at foreign-owned companies in Korea. Email is fastest.',
    },
    footer: {
      line: 'Juyoung You · HR × AX',
      note: 'Every figure on this site is measured from repository sources, commit history and produced reports. Employee names and internal identifiers are excluded.',
      built: 'Built by hand · Astro · Cloudflare Pages',
    },
    detail: { back: '← All modules', period: 'Period', status: 'Status', stack: 'Stack', replaced: 'Replaced', next: 'Next module' },
    palette: { placeholder: 'Search modules and sections…', empty: 'No results', hint: '↑↓ move · ↵ open · esc close' },
  },
} as const;
