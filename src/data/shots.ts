// 프로젝트별 데모 스크린샷. 실제 사내 화면이 아니라, 같은 화면을 가상 데이터로 다시 만든 데모를 찍은 것이다.
// 이미지 파일은 public/work/<프로젝트 id>/<file>.webp (1600×1000).
// 여기에 프로젝트를 추가하면 홈 카드와 상세 페이지에 자동으로 갤러리가 붙는다.

type Text = [title: string, body: string];
export interface Shot { file: string; ko: Text; en: Text; }
export interface ShotSet {
  /** 홈 카드에 보일 파일 (2장 권장) */
  card: string[];
  note: { ko: [string, string]; en: [string, string] };
  shots: Shot[];
}

export const PROJECT_SHOTS: Record<string, ShotSet> = {
  'hrga-hub': {
    card: ['hrga-02-rooms-today', 'hrga-04-events-draw'],
    note: {
      ko: ['데모 화면.', '같은 화면을 가상 데이터로 다시 띄워 찍었습니다. 이름·회의실·식당·금액·날짜는 모두 가짜입니다.'],
      en: ['Demo screens.', 'Re-run with made-up data: every name, room, restaurant, amount and date is fictional.'],
    },
    shots: [
      { file: 'hrga-01-home', ko: ['허브 홈', '흩어져 있던 도구를 한 화면에서 고릅니다. 왼쪽 메뉴는 아이콘만 남기고 접을 수 있습니다.'], en: ['Hub home', 'Every tool from one screen. The left menu folds down to icons.'] },
      { file: 'hrga-02-rooms-today', ko: ['회의실 · 오늘', '회의실마다 지금 사용 중인지, 곧 시작하는지, 비어 있는지와 하루 타임라인을 보여줍니다.'], en: ['Meeting rooms · today', 'Each room shows whether it is in use, starting soon or free, above a timeline of the day.'] },
      { file: 'hrga-03-rooms-booking', ko: ['회의실 · 빈 방 찾기', '인원과 시간을 넣으면 비어 있는 회의실을 추천하고, 그 자리에서 예약합니다.'], en: ['Meeting rooms · find a free room', 'Enter headcount and time, get free rooms suggested, and book one on the spot.'] },
      { file: 'hrga-04-events-draw', ko: ['이벤트 랜덤픽', '블라인드 런치 조 편성. 같은 팀과 최근에 만난 사람은 떨어뜨리고, 함께·따로 제약조건을 지킵니다.'], en: ['Event random pick', 'Blind-lunch groups that split teammates and recent pairs, and respect together/apart rules.'] },
      { file: 'hrga-05-org-chart', ko: ['조직도', '끌어서 옮기고 확대·축소하는 조직도. 본부와 팀을 펼치면 구성원이 보입니다.'], en: ['Org chart', 'A pan-and-zoom org chart; open a division or team to see its people.'] },
      { file: 'hrga-06-directory', ko: ['구성원 디렉토리', '이름·팀·이메일로 찾고, 맨 위 내 정보 카드에서 입사일과 근속을 확인합니다.'], en: ['Member directory', 'Search by name, team or email; your own card at the top shows join date and tenure.'] },
      { file: 'hrga-07-dining', ko: ['제휴식당', '카테고리와 구역으로 거르고, 사무실에서 가까운 순으로 정렬합니다.'], en: ['Partner restaurants', 'Filter by category and area, sorted by distance from the office.'] },
      { file: 'hrga-09-self-dev', ko: ['자기계발비 · 내 화면', '올해 한도와 사용액, 지금 쓸 수 있는 금액을 보여줍니다. 한도는 입사 다음 달부터 매달 쌓입니다.'], en: ['Training allowance · my view', "This year's limit, what you've spent and what you can use now. The limit builds up month by month from the month after joining."] },
      { file: 'hrga-10-self-dev-admin', ko: ['자기계발비 · 관리자 대시보드', '전사 집행률, 카테고리 비중, 월별·팀별 집행. 한도를 넘었거나 아직 쓰지 않은 사람도 따로 모아 보여줍니다.'], en: ['Training allowance · admin dashboard', 'Company-wide spend rate, category share, monthly and per-team spend, plus lists of people over the limit or not using it yet.'] },
      { file: 'hrga-08-anniversaries', ko: ['근속 · 생일', '이번 달 생일과 입사기념일, 근속 분포를 한 화면에 모았습니다.'], en: ['Tenure and birthdays', "This month's birthdays and work anniversaries, with the tenure spread."] },
    ],
  },
  'meal-allowance': {
    card: ['mc-01-summary', 'mc-03-dinner'],
    note: {
      ko: ['데모 화면 · 실제 결과 아님.', '원본 검증 스크립트에 가상의 식대 내역과 근태기록을 넣어 돌린 결과입니다. 이름·금액·규정 수치는 모두 가짜입니다.'],
      en: ['Demo screens, not real results.', 'The original checking script run on made-up meal and attendance records. Names, amounts and rule values are fictional.'],
    },
    shots: [
      { file: 'mc-01-summary', ko: ['차감 대상과 사유 문장', '사람별 차감액, 걸린 규칙, 스크립트가 만든 사유 문장. 행을 누르면 오른쪽에 그 사람의 판정 근거가 펼쳐집니다.'], en: ['Who is deducted, and why', 'Deduction per person, the rule that caught it and the reason sentence the script writes. Click a row to see the evidence on the right.'] },
      { file: 'mc-02-lunch', ko: ['중식 · 잔액 검증', '중식은 건별이 아니라 잔액으로 봅니다. 휴가·출장 같은 제외일만큼 잔액이 남아 있지 않으면 모자란 만큼 차감합니다.'], en: ['Lunch · balance check', 'Lunch is judged by balance, not per use: if the balance left is less than the excluded days are worth, the gap is deducted.'] },
      { file: 'mc-03-dinner', ko: ['석식 · 건별 판정', '석식은 그날 근태의 최종 종료시각으로 판정합니다. 기록이 없거나 예외 근무제인 건은 사람이 따로 확인하도록 돌립니다.'], en: ['Dinner · per-use ruling', "Dinner is judged against that day's final clock-out. Missing records and exception schedules go to a person to check."] },
    ],
  },
  'interview-reminder': {
    card: ['ir-01-calendar', 'ir-02-drafts'],
    note: {
      ko: ['데모 화면 · 실제 메일 아님.', '원본 스크립트의 판별·템플릿·알림 로직을 그대로 옮겨 가상 일정에 돌렸습니다. 회사명·이름·주소는 모두 가짜입니다.'],
      en: ['Demo screens, not real mail.', "The original script's detection, template and alert logic, run on made-up calendar events. Company, names and addresses are fictional."],
    },
    shots: [
      { file: 'ir-01-calendar', ko: ['내일 일정에서 면접만 골라내기', '매일 아침 공유 캘린더의 내일 일정을 읽어, 제목으로 면접 유형을 가리고 설명란에서 후보자 이름과 이메일을 찾습니다. 이메일이 없는 건은 초안을 만들지 않습니다.'], en: ["Picking interviews out of tomorrow's calendar", "Every morning it reads tomorrow's shared calendar, tells the interview type from the title and finds the candidate's name and email in the description. No email, no draft."] },
      { file: 'ir-02-drafts', ko: ['유형별 안내메일 초안', '폰 스크리닝·직무·컬쳐핏 템플릿에 이름·날짜·시간을 채워 임시보관함에 둡니다. 보내기는 사람이 직접 누릅니다.'], en: ['Drafts by interview type', 'Phone-screen, role and culture-fit templates filled with name, date and time, left in Drafts. A person presses Send.'] },
      { file: 'ir-03-notice', ko: ['담당자 요약 알림', '만든 초안 목록과, 처리하지 못한 일정과 그 사유를 실행한 담당자에게 보냅니다.'], en: ['Summary to the operator', 'A list of the drafts it made, plus any interviews it could not handle and why.'] },
    ],
  },
  'skill-intelligence': {
    card: ['si-01-overview', 'si-02-heatmap'],
    note: {
      ko: ['데모 화면 · 실제 분석 결과 아님.', '같은 대시보드 코드에 가상의 사람·팀·스킬을 넣어 다시 만들었습니다. 이름과 수치는 모두 가짜입니다.'],
      en: ['Demo screens, not the real analysis.', 'Rebuilt from the same dashboard code with made-up people, teams and skills. Every name and number is fictional.'],
    },
    shots: [
      { file: 'si-01-overview', ko: ['리스크 개요', '인원·스킬·관계 수와 Critical부터 Low까지 등급 분포, 팀별 요약. 아직 사람이 검증하지 않은 AI 추정치라는 경고를 맨 위에 둡니다.'], en: ['Risk overview', 'Headcount, skills and links, the Critical-to-Low spread and a per-team summary, under a banner saying the numbers are unverified AI estimates.'] },
      { file: 'si-02-heatmap', ko: ['팀 리스크 히트맵', '팀마다 누가 어느 등급인지 색으로 보여줍니다. 아래 카드는 단독 보유·희소 스킬·연쇄 영향 수입니다.'], en: ['Team risk heatmap', "Each team's people coloured by risk level; the cards below count sole-held skills, rare skills and knock-on effects."] },
      { file: 'si-03-report', ko: ['개인 상세 리포트', '이 사람이 떠나면 어떤 스킬이 끊기고 무엇이 연쇄로 멈추는지, 그리고 권장 조치를 정리합니다.'], en: ['Per-person report', 'Which skills break if this person leaves, what stops downstream, and what to do about it.'] },
    ],
  },
};
