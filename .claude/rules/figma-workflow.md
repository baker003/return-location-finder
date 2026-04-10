---
paths: ["src/components/**", ".claude/agents/figma-sync.md"]
---

# Figma Workflow

- Figma MCP로 바로 작업하지 않는다
- **순서**: HTML 프리뷰 페이지 작성 → 브라우저에서 확인 → 사용자 승인 → Figma MCP로 옮기기
- Figma MCP 호출을 최소화하여 rate limit을 절약한다
- Figma 반영 시 반드시 figma-sync 에이전트를 거쳐야 함

## Figma Reference
- DS_2: https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/
- 디자인 시스템 프리뷰: https://www.figma.com/design/NBWB7adDg8Bz38tcZLpHok/
- 컴포넌트 프리뷰: https://www.figma.com/design/GXzbUcg1AtdzLi7XytKp1l/
