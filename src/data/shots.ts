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
      ko: ['데모 화면 · 사내 앱 화면 아님.', '같은 화면을 가상 데이터로 다시 띄워 찍었습니다. 이름·회의실·식당·금액·날짜는 모두 가짜입니다.'],
      en: ['Demo screens, not the internal app.', 'Re-run with made-up data: every name, room, restaurant, amount and date is fictional.'],
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
