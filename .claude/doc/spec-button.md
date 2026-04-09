# Button Component Spec -- DS_2

## Summary

DS_2 디자인 시스템의 Button 컴포넌트 군을 Next.js + Tailwind CSS 웹 컴포넌트로 구현한다. 총 4개의 하위 컴포넌트로 구성된다:

1. **ActionButton** -- 주요 액션 버튼 (Fill / Outline / Ghost 타입)
2. **TextButton** -- 텍스트 전용 버튼
3. **IconButton** -- 아이콘 전용 버튼
4. **LinkTextButton** -- 링크 스타일 텍스트 버튼

모든 버튼은 DS_2 시맨틱 토큰 기반으로 색상을 적용하며, 접근성(WCAG 2.1 AA)을 준수한다.

---

## Figma Reference

- **파일**: [DS_2](https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/)
- **Button 페이지**: Node ID `698:35982`
- **하위 섹션**:
  - (New) Button/Action
  - (New) Button/Text
  - (New) IconButton
  - (New) Button/Link Text

---

## Component API

### 1. ActionButton

주요 CTA, 폼 제출, 다이얼로그 확인 등에 사용하는 핵심 버튼.

```tsx
interface ActionButtonProps {
  /** 버튼 타입 */
  type?: 'fill' | 'outline' | 'ghost';
  /** 색상 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 비활성 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 왼쪽 아이콘 (ReactNode) */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 (ReactNode) */
  rightIcon?: React.ReactNode;
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /** 추가 className */
  className?: string;
}
```

**Size 매핑**:

| Size | Height | Padding (horizontal) | Font Size | Border Radius | Icon Size |
|------|--------|---------------------|-----------|---------------|-----------|
| xs   | 32px   | 12px                | 12px (Caption/2) | 8px | 16px |
| sm   | 36px   | 14px                | 13px      | 8px           | 16px |
| md   | 40px   | 16px                | 14px (Body/3) | 10px      | 20px |
| lg   | 48px   | 20px                | 16px (Title/2) | 12px     | 20px |
| xl   | 56px   | 24px                | 18px (Title/1) | 12px     | 24px |

**Type x Variant 색상 매핑**:

| Type | Variant | Background (Enabled) | Text (Enabled) | Border (Enabled) |
|------|---------|---------------------|----------------|-----------------|
| fill | primary | `--primary-strong` (blue-600) | white | none |
| fill | secondary | `--gray-200` | `--text-primary` (gray-800) | none |
| fill | tertiary | `--gray-100` | `--text-secondary` (gray-600) | none |
| fill | destructive | `--status-negative-strong` (red-600) | white | none |
| outline | primary | transparent | `--primary-strong` (blue-600) | `--primary-strong` (blue-600) |
| outline | secondary | transparent | `--text-primary` (gray-800) | `--border-regular` (gray-200) |
| outline | tertiary | transparent | `--text-secondary` (gray-600) | `--border-regular` (gray-200) |
| outline | destructive | transparent | `--status-negative-strong` (red-600) | `--status-negative-strong` (red-600) |
| ghost | primary | transparent | `--primary-strong` (blue-600) | none |
| ghost | secondary | transparent | `--text-primary` (gray-800) | none |
| ghost | tertiary | transparent | `--text-secondary` (gray-600) | none |
| ghost | destructive | transparent | `--status-negative-strong` (red-600) | none |

**State 스타일**:

| State | 처리 |
|-------|------|
| Enabled | 기본 스타일 |
| Pressed | `transform: scale(0.96)` + `transition: transform 150ms ease-in-out` 로 버튼이 96% 크기로 축소. 배경색은 Enabled 상태 유지 |
| Loading | 텍스트/아이콘을 숨기고 스피너(Spinner) 표시. 클릭 비활성. 배경색/테두리는 Enabled 상태 유지. `aria-busy="true"` 설정 |
| Disabled | opacity: 0.4 또는 배경 gray-200 + 텍스트 gray-400 (text-disabled) |

---

### 2. TextButton

텍스트만 있는 가벼운 버튼. 보조 액션, 취소 등에 사용.

```tsx
interface TextButtonProps {
  /** 색상 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 비활성 상태 */
  disabled?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 추가 className */
  className?: string;
}
```

**Variant 색상 매핑**:

| Variant | Text Color (Enabled) | Text Color (Disabled) |
|---------|---------------------|-----------------------|
| primary | `--primary-strong` (blue-600) | `--text-disabled` (gray-400) |
| secondary | `--text-primary` (gray-800) | `--text-disabled` (gray-400) |
| tertiary | `--text-secondary` (gray-600) | `--text-disabled` (gray-400) |

- 배경: 항상 transparent
- Hover/Pressed: `--pressed-dark-weak` 배경 오버레이
- Size 매핑: ActionButton과 동일한 height/font-size 체계 사용 (padding은 8px로 최소화)

---

### 3. IconButton

아이콘만 있는 원형/사각형 버튼. 닫기, 메뉴, 좋아요 등에 사용.

```tsx
interface IconButtonProps {
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 버튼 모양 */
  shape?: 'square' | 'circle';
  /** 배경 스타일 */
  type?: 'fill' | 'outline' | 'ghost';
  /** 비활성 상태 */
  disabled?: boolean;
  /** 아이콘 (필수) */
  icon: React.ReactNode;
  /** 접근성 라벨 (필수) */
  'aria-label': string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 추가 className */
  className?: string;
}
```

**Size 매핑**:

| Size | Button Size (w x h) | Icon Size | Border Radius (square) |
|------|---------------------|-----------|----------------------|
| xs   | 32 x 32             | 16px      | 8px                  |
| sm   | 36 x 36             | 20px      | 8px                  |
| md   | 40 x 40             | 20px      | 10px                 |
| lg   | 48 x 48             | 24px      | 12px                 |
| xl   | 56 x 56             | 24px      | 12px                 |

- circle shape: `border-radius: 9999px`
- 기본 색상: `--text-primary` (gray-800)
- Pressed: `--pressed-dark-weak` 오버레이
- Disabled: `--text-disabled` (gray-400), 클릭 불가

---

### 4. LinkTextButton

밑줄이 있는 링크 스타일 텍스트 버튼. 인라인 링크 액션에 사용.

```tsx
interface LinkTextButtonProps {
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 비활성 상태 */
  disabled?: boolean;
  /** 버튼 텍스트 */
  children: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** href 제공 시 <a> 태그로 렌더링 */
  href?: string;
  /** 추가 className */
  className?: string;
}
```

- 텍스트 색상: `--primary-strong` (blue-600)
- 텍스트 장식: underline
- Disabled: `--text-disabled` (gray-400), underline 유지
- Hover: 색상 한 단계 진하게 (`--primary-heavy`, blue-700)

---

## Acceptance Criteria

### 기능 요구사항
- [ ] ActionButton의 모든 type (fill, outline, ghost) x variant (primary, secondary, tertiary, destructive) 조합이 올바른 스타일로 렌더링된다
- [ ] 5개 size (xs, sm, md, lg, xl)가 각각 올바른 높이/폰트/패딩으로 렌더링된다
- [ ] disabled 상태에서 클릭 이벤트가 발생하지 않으며, 시각적으로 비활성 상태가 표현된다
- [ ] Pressed 상태가 active pseudo-class로 올바르게 표현된다
- [ ] TextButton이 transparent 배경으로 텍스트만 렌더링된다
- [ ] IconButton이 정사각형으로 렌더링되며, aria-label이 필수이다
- [ ] LinkTextButton이 underline 텍스트로 렌더링되며, href 제공 시 `<a>` 태그로 렌더링된다
- [ ] leftIcon, rightIcon 전달 시 올바른 위치에 아이콘이 렌더링된다
- [ ] fullWidth prop 적용 시 버튼이 부모 너비 100%를 차지한다

### 스타일 요구사항
- [ ] 모든 색상은 DS_2 시맨틱 토큰 (CSS 변수 / Tailwind 유틸리티)으로 적용된다 -- 하드코딩 금지
- [ ] Tailwind v4 방식 준수 (tailwind.config.ts 미사용, @theme inline 활용)
- [ ] 다크모드 대응 가능한 구조 (시맨틱 토큰 기반이므로 토큰 값만 변경하면 대응됨)

### 접근성 요구사항
- [ ] 모든 버튼에 적절한 `role="button"` (기본 `<button>` 사용 시 자동)
- [ ] IconButton에 `aria-label` 필수 적용
- [ ] disabled 상태에서 `aria-disabled="true"` 및 `disabled` 속성 적용
- [ ] 키보드 포커스 링 (focus-visible) 스타일 적용
- [ ] Enter / Space 키로 버튼 활성화 가능 (기본 `<button>` 동작)

### 테스트 요구사항
- [ ] 컴포넌트 프리뷰 페이지에서 모든 variant/size/state 조합 확인 가능

---

## Affected Files

### 신규 생성
| 파일 | 설명 |
|------|------|
| `src/components/Button/ActionButton.tsx` | ActionButton 컴포넌트 |
| `src/components/Button/TextButton.tsx` | TextButton 컴포넌트 |
| `src/components/Button/IconButton.tsx` | IconButton 컴포넌트 |
| `src/components/Button/LinkTextButton.tsx` | LinkTextButton 컴포넌트 |
| `src/components/Button/index.ts` | barrel export |
| `src/components/Button/button.types.ts` | 공통 타입 정의 |
| `src/components/Button/button.variants.ts` | 공통 variant/size 스타일 맵 (Tailwind 클래스 매핑) |
| `src/app/button/page.tsx` | Button 컴포넌트 프리뷰/문서 페이지 |

### 수정
| 파일 | 설명 |
|------|------|
| `src/app/globals.css` | 필요 시 추가 시맨틱 토큰 등록 (pressed, status-negative 등 Tailwind 매핑 추가) |
| `.claude/doc/design-system.md` | Core Widgets Inventory에 Button 컴포넌트 등록 |

---

## Implementation Steps

### Step 1: 디자인 토큰 보강
`globals.css`의 `@theme inline` 블록에 Button 컴포넌트에 필요한 추가 토큰을 등록한다:
```css
@theme inline {
  /* 기존 토큰... */

  /* Button 추가 토큰 */
  --color-status-negative-strong: var(--status-negative-strong);
  --color-pressed-dark-weak: var(--pressed-dark-weak);
  --color-gray-100: var(--gray-100);
  --color-gray-200: var(--gray-200);
  --color-primary-heavy: var(--primary-heavy);  /* 이미 존재하면 skip */
}
```

### Step 2: 공통 타입 및 variant 정의
- `button.types.ts` -- 공통 Size, ButtonHTMLAttributes 확장 등 타입 정의
- `button.variants.ts` -- type x variant x size 조합별 Tailwind 클래스 맵 객체 생성. 조건부 클래스 조합을 위해 `clsx` 또는 간단한 유틸리티 함수 사용

### Step 3: ActionButton 구현
- `'use client'` 선언 (onClick 핸들러 사용)
- Props 인터페이스 적용
- type x variant 조합에 따른 Tailwind 클래스 매핑
- size에 따른 height/padding/font/radius 매핑
- disabled, pressed(active) 상태 스타일
- leftIcon / rightIcon 슬롯 렌더링
- focus-visible 포커스 링 스타일
- forwardRef 적용

### Step 4: TextButton 구현
- ActionButton과 유사하되 배경 없음, 패딩 최소화
- variant별 텍스트 색상만 변경

### Step 5: IconButton 구현
- 정사각형 버튼, 아이콘 중앙 정렬
- aria-label 필수 prop
- shape (square/circle) 분기

### Step 6: LinkTextButton 구현
- href 유무에 따라 `<a>` 또는 `<button>` 렌더링
- underline 텍스트 데코레이션
- 링크 색상 적용

### Step 7: barrel export
- `index.ts`에서 4개 컴포넌트 + 타입 export

### Step 8: 프리뷰 페이지
- `/button` 라우트에 모든 버튼 variant/size/state 조합을 시각적으로 확인할 수 있는 프리뷰 페이지 작성

### Step 9: 문서 업데이트
- `design-system.md`의 Core Widgets Inventory 테이블에 Button 컴포넌트 등록

---

## Reusable Components

### 이 작업에서 새로 만드는 재사용 컴포넌트

| 컴포넌트 | Import Path | 용도 | Key Props |
|----------|-------------|------|-----------|
| ActionButton | `@/components/Button` | 주요 액션 버튼 (CTA, 제출, 확인) | type, variant, size, disabled, leftIcon, rightIcon |
| TextButton | `@/components/Button` | 보조 텍스트 버튼 (취소, 보조 액션) | variant, size, disabled |
| IconButton | `@/components/Button` | 아이콘 전용 버튼 (닫기, 메뉴) | size, shape, icon, aria-label |
| LinkTextButton | `@/components/Button` | 인라인 링크 텍스트 버튼 | size, href, disabled |

### 기존 재사용 컴포넌트 (의존)
- 없음 (첫 번째 컴포넌트 구현)

---

## Accessibility

| 항목 | 구현 방법 |
|------|-----------|
| **시맨틱 HTML** | 네이티브 `<button>` 요소 사용 (role 자동 부여) |
| **키보드 지원** | Enter/Space로 활성화 (네이티브 지원), Tab으로 포커스 이동 |
| **포커스 표시** | `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2` |
| **비활성 상태** | `disabled` 속성 + `aria-disabled="true"` 동시 적용 |
| **아이콘 버튼 라벨** | `aria-label` 필수 prop으로 강제 (TypeScript 레벨) |
| **색상 대비** | DS_2 시맨틱 토큰은 WCAG AA 대비율 충족 (blue-600 on white = 4.75:1) |
| **터치 타겟** | 최소 크기 32px (xs) -- WCAG 2.5.8 권장 24px 이상 충족 |
| **링크 버튼** | href 제공 시 `<a>` 태그 사용하여 네이티브 링크 시맨틱 유지 |

---

## Dependencies

### 필수 (이미 프로젝트에 포함)
- **Next.js** (App Router) -- 프레임워크
- **Tailwind CSS v4** -- 스타일링
- **TypeScript** -- 타입 안전성

### 추가 설치 필요
- **clsx** (`npm install clsx`) -- 조건부 className 조합 유틸리티. 또는 직접 간단한 cn() 유틸 함수 구현으로 대체 가능

### 불필요 (사용하지 않음)
- tailwind.config.ts -- Tailwind v4는 CSS 기반 설정
- styled-components / emotion -- Tailwind 사용
- 별도 아이콘 라이브러리 -- icon은 ReactNode로 주입받음 (소비자가 선택)
