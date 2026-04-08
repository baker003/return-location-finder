---
name: pipeline
description: 사용자의 컴포넌트/기능 요청을 받아 에이전트 팀(PM → Designer → Frontend → Reviewer)을 순서대로 조율하는 Pipeline Orchestrator
trigger: 새로운 컴포넌트 개발, 기능 요청, "OO 컴포넌트 만들어줘", "OO 추가해줘" 등의 요청 시
---

# Pipeline Orchestrator

사용자의 컴포넌트/기능 요청을 받아 에이전트 팀을 순서대로 조율합니다.

## 참조 문서
- `.claude/doc/project-brief.md` -- 서비스 정의
- `.claude/doc/tech-spec.md` -- 기술 스택
- `.claude/doc/design-system.md` -- 디자인 시스템

## 파이프라인 플로우

### [1] Project Manager
Agent 도구로 `project-manager` 에이전트를 호출하세요.
- 사용자의 요청을 전달하세요
- PM이 컴포넌트/기능 명세를 작성하여 반환합니다
- 완료 후 보고: `"[1/6] PM 완료 -- {명세 요약}"`

### [2] PM 승인 게이트
PM의 명세를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [3]으로 진행
- **수정 요청** → PM 에이전트 재호출

### [3] Designer
Agent 도구로 `designer` 에이전트를 호출하세요.
- PM의 승인된 명세를 전달하세요
- Designer가 컴포넌트 설계를 작성하여 반환합니다
- 완료 후 보고: `"[3/6] Designer 완료 -- {설계 요약}"`

### [4] Designer 승인 게이트
설계를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [5]로 진행
- **수정 요청** → Designer 에이전트 재호출

### [5] Frontend
Agent 도구로 `frontend-dev` 에이전트를 호출하세요.
- Designer의 승인된 설계를 전달하세요
- Frontend-dev가 코드를 구현합니다
- 완료 후 보고: `"[5/6] Frontend 완료 -- {구현 요약}"`

### [6] Reviewer
Agent 도구로 `reviewer` 에이전트를 호출하세요.
- Frontend-dev가 구현한 코드를 리뷰합니다
- **APPROVED** → [7]로 진행
- **CHANGES_REQUESTED** → frontend-dev에게 수정 요청 후 재리뷰 (최대 3라운드)
- 완료 후 보고: `"[6/8] Reviewer 완료 -- {리뷰 결과}"`

### [7] Figma 반영
Agent 도구로 `figma-sync` 에이전트를 호출하세요.
- 코드를 분석하여 Figma 반영 계획을 작성합니다
- figma-sync가 반환한 계획과 코드를 바탕으로 Figma MCP를 실행합니다
- **기존 컴포넌트**: 해당 페이지의 기존 Component Set에 variant 추가
- **새로운 컴포넌트**: 새 페이지 생성 → Component Set 생성 (수동 좌표, 패딩 24, gap 24)
- 컬러 Variable + Text Style 바인딩
- 완료 후 보고: `"[7/8] Figma 반영 완료 -- {반영 내용}"`

### [8] Figma 승인 게이트
Figma 반영 결과를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → 파이프라인 완료
- **수정 요청** → Figma 수정 후 재승인

## 완료 보고
모든 단계 완료 후 사용자에게 최종 요약:
- 구현된 컴포넌트/기능 요약
- 생성/변경된 파일 목록
- Figma 반영 내용
- `npm run dev`로 확인 가능함을 안내
