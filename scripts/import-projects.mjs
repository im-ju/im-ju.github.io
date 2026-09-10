// Imports project write-ups from career-ops into the content collection.
// Strips: H1 title, the "이력서에 그대로 붙일 짧은 버전" section, trailing italic source notes.
// Re-run: node scripts/import-projects.mjs   (overwrites src/content/projects/*.md)
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = '/Users/juyoung/Projects/career-ops/dsrv-projects'; // ← source folder
const OUT = new URL('../src/content/projects/', import.meta.url).pathname;

// order / metadata live here (edit here, not in the md files)
const projects = [
  { slug: 'hrga-hub', file: 'dsrv-hrga-hub/project-brief.md', order: 1, module: 'SYSTEMS',
    title: 'DSRV HR/GA Hub', titleEn: 'DSRV HR/GA Hub',
    period: '2026.03 – 운영 중', periodEn: 'Mar 2026 – live', status: 'live',
    stack: ['Next.js', 'TypeScript', 'Postgres', 'Vercel'],
    replaced: '사내 도구 2개 + 엑셀·구글시트', replacedEn: '2 internal apps + spreadsheets',
    summary: '흩어져 있던 사내 도구와 시트를 회사 Google SSO 하나로 들어가는 단일 웹앱으로 통합. 회의실·이벤트·디렉토리·제휴식당·자기계발비·근속알림 6개 모듈이 라이브.',
    summaryEn: 'Consolidated two internal apps and spreadsheet processes into one web service behind company SSO. Six modules live; fifth month in production with no unplanned downtime.' },
  { slug: 'meal-allowance', file: 'portfolio/meal-allowance-verification.md', order: 2, module: 'POLICY→CODE',
    title: '식대 검증 자동화', titleEn: 'Meal-allowance verification',
    period: '2026.03 – 운영 중', periodEn: 'Mar 2026 – live', status: 'live',
    stack: ['Python', 'pandas'],
    replaced: '하루~이틀 걸리던 수기 대조', replacedEn: 'a 1–2 day manual review each month',
    summary: '복리후생·지출 규정의 지원 요건을 조문 단위로 코드화하고 식대 사용 내역과 근태기록을 자동 대조. 결과가 실제 급여 차감으로 집행되며, 당사자에게 설명 가능한 차감사유 문장까지 생성.',
    summaryEn: 'Encoded the benefits and expense regulations as verification rules and reconciled meal-card usage against attendance. Output feeds actual payroll deductions with a per-employee justification.' },
  { slug: 'skill-intelligence', file: 'portfolio/skill-intelligence.md', order: 3, module: 'ANALYSIS',
    title: 'Skill Intelligence — 스킬·이탈 리스크 분석', titleEn: 'Skill Intelligence — skills & attrition-risk PoC',
    period: '2026.04 – 07', periodEn: 'Apr – Jul 2026', status: 'poc',
    stack: ['TypeScript', 'PostgreSQL', 'LLM CLI'],
    replaced: '스킬 데이터의 부재', replacedEn: 'the absence of any skills data',
    summary: '기존 사내 문서만으로 전 직원의 스킬을 추출·매칭하고, "이 사람이 나가면 무엇이 멈추는가"를 추적. 자체 감사로 초기 보고서의 재현 불가 수치를 발견해 정정. 수치는 전량 가상 데이터 기준.',
    summaryEn: 'Extracted a skills graph from existing documents to map coverage and dependency chains without a new survey. Re-audited my own report, found non-reproducible figures, and reissued a corrected version. All figures synthetic.' },
  { slug: 'asset-regulation', file: 'portfolio/asset-management.md', order: 4, module: 'POLICY',
    title: '자산관리 규정 개정 + 교체 대상 선정', titleEn: 'Asset-management regulation rewrite',
    period: '2026.03', periodEn: 'Mar 2026', status: 'approved',
    stack: ['Python', 'python-docx'],
    replaced: '2년 묵은 규정 + 재량 판단', replacedEn: 'a 2-year-old regulation and case-by-case judgement',
    summary: '규정을 법률·세무 / 정보보안 / 구조·실무 세 관점으로 분석해 전면 개정(대표이사 승인). 개정본과 개정이력을 같은 소스에서 생성하고, 신설한 노후화 기준을 자산대장에 적용해 교체 대상을 Tier로 선정.',
    summaryEn: 'Analysed the regulation through legal/tax, security and structure lenses and led a full rewrite to CEO approval. Applied the new obsolescence standard to the asset register to tier replacement candidates.' },
  { slug: 'guide-redesign', file: 'portfolio/internal-guide-redesign.md', order: 5, module: 'INFO ARCH',
    title: '사내 안내서 리디자인', titleEn: 'Internal handbook redesign',
    period: '2026.08', periodEn: 'Aug 2026', status: 'pending',
    stack: ['Notion', 'Notion API'],
    replaced: '46개 페이지가 평평하게 나열된 구조', replacedEn: 'a flat list of 46 pages',
    summary: '전 구성원이 매일 여는 안내서를 정보구조부터 재설계. 그대로 적용했다면 하위 페이지 46개가 삭제됐을 파괴적 변경을 사전 발견하고, 원본 무손상 이관 전략과 안전한 리허설을 설계.',
    summaryEn: 'Redesigned the company handbook from its information architecture up. Caught a migration step that would have deleted 46 child pages, and designed a non-destructive migration and rehearsal.' },
  { slug: 'benefits-audit', file: 'portfolio/self-development-audit.md', order: 6, module: 'AUDIT',
    title: '자기계발비 정합성 감사 도구', titleEn: 'Training-allowance data audit',
    period: '2026.06', periodEn: 'Jun 2026', status: 'done',
    stack: ['Google Apps Script'],
    replaced: '검증되지 않던 시트', replacedEn: 'an unverified spreadsheet',
    summary: '구글시트 운영에서 숫자가 서로 맞지 않는 상태를 찾아내는 읽기 전용 감사 도구. 규정 기준 검사 8종으로 동명이인·팀명 불일치·한도 초과를 심각도와 함께 산출. 결과가 웹앱 이관의 근거가 됨.',
    summaryEn: 'A read-only tool applying eight regulation-derived checks to spreadsheet-managed benefits data. Its findings proved the structural limits of the sheet and became the basis for migrating into the Hub.' },
  { slug: 'interview-reminder', file: 'portfolio/interview-reminder.md', order: 7, module: 'RECRUITING',
    title: '면접 D-1 안내메일 자동화', titleEn: 'Interview D-1 reminder drafts',
    period: '2026.04 – 운영 중', periodEn: 'Apr 2026 – live', status: 'live',
    stack: ['Google Apps Script', 'Gmail', 'Calendar'],
    replaced: '매일 수기 작성', replacedEn: 'daily hand-written emails',
    summary: '공유 캘린더에서 익일 면접을 감지해 유형별 템플릿으로 Gmail 초안까지 생성. 발송은 의도적으로 자동화하지 않았다. 입력은 사람이 채우는 필드이고 출력은 회수 불가능하기 때문.',
    summaryEn: 'Detects next-day interviews from a shared calendar and prepares templated Gmail drafts. Sending is deliberately not automated: the inputs are human-maintained and the output is irreversible.' },
  { slug: 'access-log', file: 'portfolio/access-log-anomaly.md', order: 8, module: 'ANALYSIS',
    title: '출입기록 이상패턴 분석', titleEn: 'Access-log anomaly analysis',
    period: '2026.03', periodEn: 'Mar 2026', status: 'done',
    stack: ['Python', 'pandas'],
    replaced: '확인 불가능하던 영역', replacedEn: 'a blind spot in attendance data',
    summary: '근태 시스템이 기록하지 않는 근무 중 이동을 출입 통제 로그로 재구성. 결과물이 개인을 지목하는 자료임을 전제로, 설계의 대부분을 오탐 제거에 썼다.',
    summaryEn: 'Reconstructed mid-day movement from access-control logs. Because the output names individuals, most of the design went into removing false positives.' },
];

const yamlList = (a) => '[' + a.map((s) => JSON.stringify(s)).join(', ') + ']';

for (const p of projects) {
  let md = readFileSync(`${SRC}/${p.file}`, 'utf8');
  md = md.replace(/^# .*\n/, '');                                  // H1
  md = md.replace(/\n## \d+\. 이력서에 그대로 붙일 짧은 버전[\s\S]*$/, '\n'); // resume section + footer
  md = md.replace(/\n---\n\n\*문서 근거[\s\S]*$/, '\n');             // footer if no resume section
  // internal roster count → approximate (public site)
  md = md.replace(/구성원 로스터 88명 · 27개 팀 \(2026-03 기준\)/, '구성원 약 90명 (2026-03 기준)');
  md = md.replace(/위 88명은/, '위 인원 수는');
  // CommonMark quirk: **“quoted”** followed by a Korean particle fails to close; move quotes outside the bold
  md = md.replace(/\*\*([“"”])([^*\n]+?)([”"])\*\*/g, '$1**$2**$3');
  if (/이력서에 그대로|문서 근거/.test(md)) throw new Error(`strip failed: ${p.file}`);
  const fm = `---
title: ${JSON.stringify(p.title)}
titleEn: ${JSON.stringify(p.titleEn)}
order: ${p.order}
module: ${JSON.stringify(p.module)}
period: ${JSON.stringify(p.period)}
periodEn: ${JSON.stringify(p.periodEn)}
status: ${p.status}
stack: ${yamlList(p.stack)}
replaced: ${JSON.stringify(p.replaced)}
replacedEn: ${JSON.stringify(p.replacedEn)}
summary: ${JSON.stringify(p.summary)}
summaryEn: ${JSON.stringify(p.summaryEn)}
---
`;
  writeFileSync(`${OUT}${p.slug}.md`, fm + md.trimStart());
  console.log('wrote', p.slug, md.length, 'chars');
}
