# DS_2

## Project Overview
DS_2 디자인 시스템을 Next.js + Tailwind CSS 기반 웹 컴포넌트로 구현한 디자인 시스템 라이브러리.
디자인 시스템이 필요한 누구나 사용할 수 있다.

## Default Workflow
새로운 컴포넌트/기능에 대한 요청을 받으면 항상 `pipeline` 스킬을 실행하여 작업을 진행합니다.
PM -> (승인) -> Designer -> (승인) -> Frontend -> Reviewer

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS (v4)
- Language: TypeScript
- Design System: DS_2 기반
- Font: Inter (Pretendard Variable fallback)

## Architecture

### Next.js App Router 구조
- `src/app/` -- 라우트 및 페이지 (컴포넌트 문서/프리뷰)
- `src/components/` -- 디자인 시스템 컴포넌트
- `src/lib/` -- 유틸리티
- `src/types/` -- TypeScript 타입 정의

### Layer Rules
- Server Component 기본, 'use client' 최소화
- Presentation -> Logic -> Data 방향으로만 의존

## Development Commands
- `npm run dev` -- 개발 서버
- `npm run build` -- 프로덕션 빌드
- `npm run lint` -- ESLint 실행

## Coding Conventions

### Next.js
- App Router 파일 컨벤션 준수 (layout.tsx, page.tsx, loading.tsx, error.tsx)
- Server Component에서 데이터 fetching, Client Component는 인터랙션만

### Tailwind CSS (v4)
- DS_2 시맨틱 토큰만 사용
- 색상 하드코딩 금지 (bg-[#xxx] 등 금지)
- tailwind.config.ts 생성 금지 -- Tailwind v4는 globals.css의 @theme inline으로 설정

### Component Design
- TypeScript strict 모드, Props 인터페이스 명시적 정의
- variant/size/state는 props로 제어
- 접근성(a11y) 필수: aria 속성, 키보드 네비게이션

### File Size Limits
- 파일당 ~300줄 권장, 초과 시 컴포넌트 추출
- 메서드 ~50줄 초과 시 분리 검토

## Design System Rules
- 색상/타이포 하드코딩 금지
- Core Widgets 우선 사용
- Tailwind v4: globals.css의 @theme inline으로 설정 (tailwind.config.ts 사용 금지)
- **동기화 규칙**: 토큰이나 위젯을 변경하면 `.claude/doc/design-system.md`와 `src/app/globals.css`를 반드시 함께 업데이트
- 상세: .claude/doc/design-system.md

## Figma Workflow
- Figma MCP로 바로 작업하지 않는다
- **순서**: HTML 프리뷰 페이지 작성 → 브라우저에서 확인 → 사용자 승인 → Figma MCP로 옮기기
- Figma MCP 호출을 최소화하여 rate limit을 절약한다

## Figma Reference
- DS_2: https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/
- 디자인 시스템 프리뷰: https://www.figma.com/design/NBWB7adDg8Bz38tcZLpHok/

## Font Policy
- 기본 폰트: Inter
- Pretendard Variable 사용 불가 시 대체 폰트를 찾아 사용자에게 먼저 확인받을 것

## Agent Configuration
- 에이전트: PM, Designer, Frontend-dev, Reviewer
- 파이프라인: pipeline 스킬이 조율 (메인 컨텍스트에서 실행되어 에이전트 호출 가능)
