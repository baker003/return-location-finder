# 디자인 토큰 공통 참조

모든 에이전트가 공유하는 디자인 토큰 규칙입니다.

## 컬러 토큰
- 모든 색상은 시맨틱 토큰 사용 (하드코딩 금지)
- `bg-[#xxx]` 같은 arbitrary value 금지
- 상세: `.claude/doc/design-system.md`

## 타이포 토큰
- `typo-*` 유틸리티 클래스 사용 (size + lineHeight + letterSpacing)
- font-weight는 별도 Tailwind 클래스로 적용
- 상세: `.claude/doc/design-system.md` Typography 섹션

## 동기화 규칙
- 토큰이나 위젯을 변경하면 `.claude/doc/design-system.md`와 `src/app/globals.css`를 반드시 함께 업데이트
- 코드 수정 시 프리뷰 페이지(page.tsx)도 함께 업데이트

## 아이콘-텍스트 규칙
- 아이콘 기본 16px, lineHeight 기준으로 크기 결정
- ~20px 이하 → 16px, 20~26px → 20px, 26~32px → 24px, 32px+ → 32px
- center 정렬, 아이콘 색상 = 텍스트 색상
