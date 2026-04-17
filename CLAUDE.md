# DS_2

## Project Overview
DS_2 디자인 시스템을 Next.js + Tailwind CSS 기반 웹 컴포넌트로 구현한 디자인 시스템 라이브러리.

## Default Workflow
새로운 컴포넌트/기능에 대한 요청을 받으면 항상 `pipeline` 스킬을 실행하여 작업을 진행합니다.
PM -> (승인) -> Designer -> (승인) -> Frontend -> Reviewer -> Figma 반영

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS (v4)
- Language: TypeScript
- Font: Inter

## Architecture
- `src/app/` -- 라우트 및 페이지
- `src/components/` -- 디자인 시스템 컴포넌트
- `src/lib/` -- 유틸리티
- `src/types/` -- TypeScript 타입 정의
- Server Component 기본, 'use client' 최소화

## Development Commands
- `npm run dev` -- 개발 서버
- `npm run build` -- 프로덕션 빌드
- `npm run lint` -- ESLint 실행

## Coding Conventions
- 2칸 들여쓰기
- App Router 파일 컨벤션 준수 (layout.tsx, page.tsx, loading.tsx, error.tsx)
- TypeScript strict 모드, Props 인터페이스 명시적 정의
- 파일당 ~300줄 권장, 메서드 ~50줄 초과 시 분리
- 색상 하드코딩 금지 -- 시맨틱 토큰만 사용
- tailwind.config.ts 생성 금지 -- Tailwind v4는 globals.css의 @theme inline으로 설정

## 에이전트 사용 규칙
- 아이콘 그리기/수정 → 반드시 `icon-designer` 에이전트 사용 (`.claude/agents/icon-designer.md`)
- Figma 반영 → 반드시 `figma-sync` 에이전트 사용 (`.claude/agents/figma-sync.md`)
- general-purpose 에이전트로 아이콘을 직접 그리거나 Figma MCP를 직접 호출하지 않는다

## 작업 규칙

### 명령 판단 기준 (최우선)
- **명령**: 동사로 끝나는 지시 ("해", "만들어", "수정해", "삭제해", "실행해", "적용해" 등) → 실행
- **질문**: "~야?", "~인가?", "~거야?", "~어?", "~할 수 있어?" 등 → 답변만, 절대 실행하지 않는다
- 명령인지 질문인지 불명확하면 "~를 실행할까요?" 라고 확인 후 실행

### 금지 행동
- 명령받은 것만 수행한다. 명령 외 추가 작업(정렬, 리팩토링, 개선 등) 일체 금지
- "논리적 다음 단계", "자연스러운 후속 작업" 등 내 추론으로 실행하지 않는다
- 명령을 수행할 때 사이드 이팩트가 발생하는 경우, 실행 전에 반드시 먼저 보고하고 확인받는다
- 명령의 의미가 명확할 때 내 해석으로 다른 방향을 선택하지 않는다 — "A를 B로 변경해"는 A를 B로 대체하는 것이지 A의 값을 수정하는 것이 아니다

### 대화 재개 규칙 (컨텍스트 압축 후 재시작 시)
- 요약(summary)의 "Pending Tasks", "Optional Next Step", "Current Work" 등은 참고 정보일 뿐이다
- 재개 시 미완료 작업을 자동으로 이어서 실행하지 않는다
- 반드시 사용자의 새 명령을 기다린다
- 재개 직후 첫 응답은 작업 재개가 아니라 사용자 입력 대기 상태여야 한다

## 보고 규칙

**완료 보고 전 검증은 선택이 아니라 필수 단계다. 검증 쿼리 실행 없이 완료를 보고하는 것은 거짓말이다.**

### 완료 보고 순서 (반드시 이 순서를 지킨다)
1. 작업 실행
2. **검증 쿼리 실행** — 의도한 결과가 실제로 반영됐는지 별도 쿼리로 확인
3. 검증 결과를 보고 — 수치, 실패 항목, 미완료 사항 포함
4. 검증이 통과된 항목만 "완료"로 표현

### 금지 사항
- 실행 코드가 에러 없이 돌았다는 이유만으로 완료 보고 금지
- 스크린샷이 그럴싸해 보인다는 이유만으로 완료 보고 금지
- 검증 쿼리 실행 전 "완료", "성공", "적용됨" 표현 사용 금지
- 실패를 성공으로 포장하거나 숨기는 것 금지
- 부분 성공을 전체 성공으로 보고하는 것 금지 — 정확한 수치와 남은 문제 명시
- 파일을 저장했다는 이유만으로 완료 보고 금지 — 파일을 다시 읽어 의도한 결과와 일치하는지 확인 후 보고
- 사용자가 "다시"를 반복하는 동안에는 완료 보고 금지 — "다시"는 이전 시도가 실패했다는 신호다

## 참조
- 디자인 토큰 규칙: `.claude/shared/design-tokens.md`
- 디자인 시스템 상세: `.claude/doc/design-system.md`
- Figma 워크플로우: `.claude/rules/figma-workflow.md`
- 폰트 정책: `.claude/rules/font-policy.md`
