# Skill & Agent 품질 체크리스트

스킬이나 에이전트를 만들거나 수정한 뒤, 이 체크리스트로 검증한다.

공식 문서:
- [Skills](https://code.claude.com/docs/en/skills)
- [Sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Memory (CLAUDE.md)](https://code.claude.com/docs/en/memory)

---

## CLAUDE.md 체크리스트

### 크기
- [ ] 200줄 이하인가 (공식 권장: 파일당 200줄 미만, 초과 시 컨텍스트 소모 및 준수율 저하)
- [ ] 200줄 초과 시 `@path` import 또는 `.claude/rules/`로 분산했는가

### 내용 배치
- [ ] 매 세션 필요한 정보만 포함하고 있는가
- [ ] 특정 파일 작업 시에만 필요한 규칙은 `.claude/rules/`에 `paths` 옵션으로 분리했는가
- [ ] 특정 에이전트만 알면 되는 내용이 CLAUDE.md에 들어있지 않은가
- [ ] 특정 스킬 실행 시에만 필요한 내용이 CLAUDE.md에 들어있지 않은가
- [ ] 중복 정보 없이 한 곳에 원본, 나머지는 참조로 되어 있는가

### 품질
- [ ] 구체적이고 검증 가능한 지시사항인가 ("코드 잘 짜라" X, "2칸 들여쓰기" O)
- [ ] 서로 충돌하는 지시사항이 없는가
- [ ] 마크다운 헤더/불릿으로 구조화되어 있는가

---

## 파일 위치 체크리스트

공식 문서:
- [MCP](https://code.claude.com/docs/en/mcp)
- [Settings](https://code.claude.com/docs/en/settings)
- [Skills](https://code.claude.com/docs/en/skills)
- [Sub-agents](https://code.claude.com/docs/en/sub-agents)

### 프로젝트 전용 (해당 프로젝트에서만 적용)

| 파일/폴더 | 위치 |
|-----------|------|
| CLAUDE.md | 프로젝트 루트 `./CLAUDE.md` |
| 에이전트 | `.claude/agents/*.md` |
| 스킬 | `.claude/skills/{name}/SKILL.md` |
| 규칙 | `.claude/rules/*.md` |
| MCP 서버 | 프로젝트 루트 `.mcp.json` (팀 공유, git 추적) |
| 설정 (권한, 훅 등) | `.claude/settings.json` (팀 공유) / `.claude/settings.local.json` (개인용) |

### 글로벌 (모든 프로젝트에 적용)

| 파일/폴더 | 위치 |
|-----------|------|
| CLAUDE.md | `~/.claude/CLAUDE.md` |
| 에이전트 | `~/.claude/agents/*.md` |
| 스킬 | `~/.claude/skills/{name}/SKILL.md` |
| MCP 서버 | `~/.claude.json` |
| 설정 (권한, 훅 등) | `~/.claude/settings.json` |

---

## Skill 체크리스트

공식 문서: [Skills](https://code.claude.com/docs/en/skills)

### Frontmatter

| 필드 | 필수 | 체크 |
|------|------|------|
| `name` | 아니오 | 소문자+하이픈, 64자 이내, 디렉토리명과 일치하는가. 미설정 시 디렉토리명 사용 |
| `description` | 권장 | 250자 이내, 트리거 키워드가 앞쪽에 오는가. 미설정 시 본문 첫 문단 사용 |
| `argument-hint` | 아니오 | 자동완성에 표시할 인수 힌트 (예: `[issue-number]`) |
| `disable-model-invocation` | 아니오 | 수동 전용이면 `true`. 기본값: `false` |
| `user-invocable` | 아니오 | `/` 메뉴에서 숨기려면 `false`. 기본값: `true` |
| `allowed-tools` | 아니오 | 스킬 활성 시 승인 없이 쓸 도구. 스페이스 구분 문자열 또는 YAML 리스트 |
| `model` | 아니오 | 스킬 활성 시 사용할 모델 |
| `effort` | 아니오 | `low`, `medium`, `high`, `max` 중 선택. 세션 effort 오버라이드 |
| `context` | 아니오 | `fork`로 설정하면 격리된 서브에이전트에서 실행 |
| `agent` | 아니오 | `context: fork` 시 사용할 에이전트 타입 |
| `hooks` | 아니오 | 스킬 라이프사이클 훅 |
| `paths` | 아니오 | glob 패턴으로 특정 파일 작업 시에만 활성화 |
| `shell` | 아니오 | `bash` (기본) 또는 `powershell` |

### Description 품질
- [ ] 핵심 용도가 첫 문장에 나오는가
- [ ] 트리거할 사용자 발화 패턴이 포함되어 있는가 (예: "배포해줘", "글 올려줘")
- [ ] 트리거하지 말아야 할 상황도 명시했는가
- [ ] 다른 스킬과 트리거가 겹치지 않는가

### 내용
- [ ] SKILL.md가 500줄 이내인가
- [ ] 상세 참조는 references/ 등 별도 파일로 분리했는가
- [ ] 플로우가 번호 매긴 단계로 명확한가
- [ ] 에이전트를 호출하는 경우 Agent 도구 사용법이 명시되어 있는가
- [ ] `$ARGUMENTS`, `${CLAUDE_SKILL_DIR}` 등 치환 변수를 올바르게 사용하는가

### 스킬 디렉토리 구조
- [ ] SKILL.md가 스킬 디렉토리 루트에 있는가 (필수)
- [ ] 하위 폴더(references/, scripts/, examples/, assets/ 등)에서 SKILL.md가 참조하고 있는가
- [ ] 참조하는 파일 경로가 실제로 존재하는가

### Context Placement (이 프로젝트 규칙)
- [ ] CLAUDE.md에 있는 내용과 중복되지 않는가
- [ ] 다른 스킬/에이전트와 정보가 중복되지 않는가 (한 곳에 원본, 나머지는 참조)
- [ ] 매 세션 필요한 정보는 CLAUDE.md에, 스킬 실행 시에만 필요한 정보는 스킬 안에 있는가

---

## Agent (Sub-agent) 체크리스트

공식 문서: [Sub-agents](https://code.claude.com/docs/en/sub-agents)

### Frontmatter

| 필드 | 필수 | 체크 |
|------|------|------|
| `name` | 필수 | 소문자+하이픈, 파일명과 일치하는가 |
| `description` | 필수 | Claude가 언제 위임할지 판단할 수 있는 설명인가 |
| `tools` | 아니오 | Claude Code 내장 도구만 나열. 미설정 시 모든 도구 상속 |
| `disallowedTools` | 아니오 | 거부할 도구 목록. `tools`보다 먼저 적용됨 |
| `model` | 아니오 | `sonnet`, `opus`, `haiku`, 전체 모델 ID, 또는 `inherit` (기본값) |
| `permissionMode` | 아니오 | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan` |
| `maxTurns` | 아니오 | 최대 에이전틱 턴 수 (무한 루프 방지) |
| `skills` | 아니오 | 시작 시 프리로드할 스킬 목록. 부모 스킬 상속 안 됨 |
| `mcpServers` | 아니오 | MCP 서버 이름(문자열) 또는 인라인 정의. 플러그인 에이전트에서는 무시됨 |
| `hooks` | 아니오 | 라이프사이클 훅. 플러그인 에이전트에서는 무시됨 |
| `memory` | 아니오 | `user`, `project`, `local` 중 선택. 교차 세션 학습 활성화 |
| `background` | 아니오 | `true`면 항상 백그라운드 태스크로 실행. 기본값: `false` |
| `effort` | 아니오 | `low`, `medium`, `high`, `max` 중 선택. 세션 effort 오버라이드 |
| `isolation` | 아니오 | `worktree`면 임시 git worktree에서 격리 실행 |
| `color` | 아니오 | `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| `initialPrompt` | 아니오 | `--agent`로 메인 에이전트 실행 시 자동 제출되는 첫 프롬프트 |

### tools vs mcpServers 분리 (중요)
- [ ] `tools`에 `mcp__*` 형식의 도구가 없는가
- [ ] MCP 서버는 반드시 `mcpServers` 필드에 서버 이름 또는 인라인 정의로 지정했는가
- [ ] 인라인 MCP 정의 시 `.mcp.json`과 동일한 스키마(stdio, http, sse, ws)를 사용하는가
- [ ] 시스템 CLI 도구(cwebp, yt-dlp 등)는 `Bash`를 통해 실행하므로 별도 설정 불필요

### 내용
- [ ] 역할이 첫 문단에 명확히 정의되어 있는가
- [ ] 참조 문서 경로가 정확한가 (존재하는 파일인가)
- [ ] 결과 저장 경로/형식이 명시되어 있는가
- [ ] 금지 사항이 명시되어 있는가
- [ ] 다른 에이전트를 호출하려는 시도가 없는가 (서브에이전트는 서브에이전트를 호출 불가)

### Context Placement (이 프로젝트 규칙)
- [ ] 이 에이전트만 알면 되는 규칙이 에이전트 파일 안에 있는가
- [ ] 여러 에이전트가 공유하는 설정은 `.claude/shared/`에 있는가
- [ ] CLAUDE.md와 내용이 중복되지 않는가
