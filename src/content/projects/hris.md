---
title: "DSRV HRIS"
titleEn: "DSRV HRIS"
order: 9
module: "SYSTEMS"
period: "2026.10 – 개발 중"
periodEn: "Oct 2026 – in development"
status: wip
stack: ["React", "TypeScript", "Node.js", "SQLite"]
replaced: "기능별로 따로 운영하던 인사 시스템"
replacedEn: "separate HR systems, one per function"
summary: "회사 규정대로 움직이는 사내 인사 시스템(HRIS)을 만들고 있습니다. 구성원·조직도·근무·휴가·평가·채용을 한 곳에서 다루고, PC에서는 웹으로, 휴대폰에서는 설치형 웹앱으로 씁니다. 지금은 가짜 데이터로 돌아가는 시제품 단계입니다."
summaryEn: "I am building an in-house HR system (HRIS) that runs on the company's own rules. People, org chart, attendance, leave, reviews and recruiting in one place, used in a browser on PC and as an installable web app on phones. It is a prototype running on fake data."
added: "2026-11-17"
---
## 지금 단계

개발 중인 사내 인사 시스템입니다. 아직 실제 직원 데이터는 넣지 않았고, 가짜 회사 데이터로 모든 흐름이 처음부터 끝까지 돌아가는지 보여 주는 시제품 단계입니다. 실제 도입 여부와 시점은 아직 정해지지 않았습니다.

## 무엇을 만드는가

- **구성원·조직도**: 구성원 정보, 입사·퇴사·휴직, 인사 발령, 조직 개편.
- **근무**: 출퇴근 기록, 외근·원격 근무·출장 등록, 주간 근무시간, 기록 수정 요청.
- **휴가**: 휴가 신청과 승인, 연차 현황, 연차 촉진, 보상휴가.
- **평가·채용**: 평가 운영, 채용 공고와 면접 평가.
- **승인 정책·권한**: 요청 종류별 결재선, 권한 그룹.

PC에서는 웹으로 모든 기능을 쓰고, 휴대폰에서는 설치형 웹앱(PWA)으로 출퇴근, 신청, 승인처럼 자주 하는 일만 합니다.

## 원칙

- **회사 규정이 곧 설정값입니다.** 연차 발생, 근무 유형, 휴가 종류 같은 규칙을 출처와 함께 한 파일에 모아, 외부 서비스의 기본값이 아니라 우리 회사 방식대로 동작하게 합니다.
- **권한은 서버 한 곳에서 판단합니다.** 화면에서 버튼을 숨기는 건 편의일 뿐, 실제 허용 여부는 서버가 정합니다.
- **실제 데이터가 들어가기 전까지는 전부 가짜입니다.** 이름, 이메일, 숫자 모두 시연용으로 만든 값입니다.
