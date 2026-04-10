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

## 참조
- 디자인 토큰 규칙: `.claude/shared/design-tokens.md`
- 디자인 시스템 상세: `.claude/doc/design-system.md`
- Figma 워크플로우: `.claude/rules/figma-workflow.md`
- 폰트 정책: `.claude/rules/font-policy.md`
