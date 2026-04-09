# Chip Component Spec -- DS_2

## Summary

DS_2 디자인 시스템의 Chip / Chip Group 컴포넌트를 Next.js + Tailwind CSS 웹 컴포넌트로 구현한다. 총 2개의 하위 컴포넌트로 구성된다:

1. **Chip** -- 선택/필터/입력 결과를 표현하는 개별 칩 아이템
2. **ChipGroup** -- 여러 Chip을 Carousel(가로 스크롤) 또는 Multiline(줄바꿈) 레이아웃으로 배치하는 컨테이너

Chip은 사용자의 선택 또는 입력 상태를 시각적으로 표현하는 UI 요소로, 주로 필터(filter), 선택 상태(selection), 입력 결과(input result) 등을 나타낸다. 공간을 적게 차지하면서도 의미 있는 정보를 전달한다.

모든 컴포넌트는 DS_2 시맨틱 토큰 기반으로 색상을 적용하며, 접근성(WCAG 2.1 AA)을 준수한다.

---

## Figma Reference

- **파일**: [DS_2](https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/)
- **Chip/Chip Group 페이지**: Node ID `698:69186`
- **하위 섹션**:
  - Master Component (Chip item): Section `34623:371614`
  - UI Component (디자이너용): Frame `32544:76428`
  - Principle: Section `32544:77277`
  - Usage Guide (Chip): Section `32544:76442`
  - Usage Guide (Chip Group): Section `34991:6242`

### Figma에서 확인한 컴포넌트 구조

**Chip item 구조**:
- Leading Icon (선택) + Label (필수) + Count Badge (선택, Selected 상태) + Trailing Icon (선택)
- pill 형태 (border-radius: 9999px)
- 아이콘 포함 시 내부 패딩 8px, 기본 상태 시 내부 패딩 W12px / H8px
- 텍스트와 아이콘 사이 gap: 6px

**Chip 유형 (사용 목적별)**:
| 유형 | 설명 | 사용 예시 |
|------|------|-----------|
| Informational Chip | 키워드, 태그 등을 보여주는 인터랙티브 칩 | #전기차 #SUV |
| Filter Chip | 선택 가능하며 필터 기능 수행 | 전체, 대형, 중형 |
| Action Chip | 동작 유도 | (예: 삭제)서울 X, 시간초과 X |
| Choice Chip | 단일 선택이 가능한 라디오 버튼 형태 | 남자, 여자 |
| Input Chip | 입력 후 생성된 항목 형태 | 강남, 용산, 신촌 |

**변경 가능 요소 (UI component 기준)**:
- Outlined 상태에서 Border 컬러
- Fill 상태에서 Background 컬러
- Typography 컬러
- Count 컬러
- Icon(Leading/Trailing) 컬러
- Icon 커스텀 가능

---

## Component API

### 1. Chip

개별 칩 아이템. 필터, 선택 상태, 태그 등에 사용.

```tsx
interface ChipProps {
  /** 칩 배경 스타일 */
  type?: 'outlined' | 'filled';
  /** 크기 */
  size?: 'lg' | 'md' | 'sm' | 'xs';
  /** 선택 상태 */
  selected?: boolean;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 칩 라벨 텍스트 */
  label: string;
  /** 텍스트 폰트 스타일 -- title(SemiBold) 또는 body(Regular) */
  fontStyle?: 'title' | 'body';
  /** 선택 시 카운트 뱃지 (Selected 상태에서 표시) */
  count?: number;
  /** 왼쪽 아이콘 (ReactNode) */
  leadingIcon?: React.ReactNode;
  /** 왼쪽 아이콘 표시 여부 */
  showLeadingIcon?: boolean;
  /** 오른쪽 아이콘 (ReactNode) -- 드롭다운 chevron, 삭제 X 등 */
  trailingIcon?: React.ReactNode;
  /** 오른쪽 아이콘 표시 여부 */
  showTrailingIcon?: boolean;
  /** NEW 뱃지 (빨간 점) 표시 여부 */
  showNewBadge?: boolean;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 추가 className */
  className?: string;
}
```

**Size 매핑**:

| Size | Figma 명칭 | Height | Padding (H x V) | Font Size | Line Height | Font Weight | Icon Size (Leading) | Icon Size (Trailing) | Border Radius |
|------|-----------|--------|------------------|-----------|-------------|-------------|--------------------|--------------------|---------------|
| lg | Large(Title2) / Body2 | 40px | 12px x 8px | 16px | 24px | Regular 400 (Unselected) / SemiBold 600 (Selected) | 20px | 16px | 9999px (pill) |
| md | Medium(Title3) / Body3 | 36px | 12px x 8px | 14px | 22px | Regular 400 (Unselected) / SemiBold 600 (Selected) | 18px | 14px | 9999px (pill) |
| sm | Small(Title4) / Body4 | 32px | 12px x 8px | 13px | 20px | Regular 400 (Unselected) / SemiBold 600 (Selected) | 16px | 12px | 9999px (pill) |
| xs | X-Small(Caption) | 28px | 12px x 8px | 12px | 18px | Regular 400 (Unselected) / SemiBold 600 (Selected) | 14px | 10px | 9999px (pill) |

> 참고: 아이콘 포함 시 내부 패딩은 8px로 변경됨. 기본(텍스트만)은 12px.

**아이콘 활성화/비활성화**:
- `showLeadingIcon` (기본: true) -- false로 설정하면 leadingIcon이 있어도 숨김
- `showTrailingIcon` (기본: true) -- false로 설정하면 trailingIcon이 있어도 숨김
- 아이콘 숨김 시 패딩이 텍스트 전용(12px)으로 자동 전환

**텍스트 폰트 스타일**:
- `fontStyle='title'` -- SemiBold (600), Title 계열 폰트 적용
- `fontStyle='body'` -- Regular (400), Body 계열 폰트 적용
- 기본값: Unselected 시 body, Selected 시 title. fontStyle prop으로 강제 지정 가능

**NEW 뱃지 (빨간 점)**:
- `showNewBadge` (기본: false) -- true일 때 텍스트 오른쪽 상단에 빨간 점(6px) 표시
- 색상: `--notification-red` (red-500, #FF3A5B)
- 위치: 텍스트 우측 상단, 텍스트와 2px 간격
- Disabled 상태에서는 빨간 점도 `--text-disabled` 색상으로 변경

**Type x State 색상 매핑**:

| Type | State | Background | Text | Border | Icon |
|------|-------|-----------|------|--------|------|
| outlined | Unselected | white | `--text-primary` (gray-800) | `--border-regular` (gray-200) | `--text-secondary` (gray-600) |
| outlined | Pressed | white | `--text-primary` (gray-800) | `--border-regular` (gray-200) | `--text-secondary` (gray-600) |
| outlined | Selected | white | `--primary-strong` (blue-600) | `--primary-strong` (blue-600) | `--primary-strong` (blue-600) |
| outlined | Disabled | white | `--text-disabled` (gray-400) | `--border-regular` (gray-200) | `--text-disabled` (gray-400) |
| filled | Unselected | `--background-regular` (gray-100) | `--text-primary` (gray-800) | none | `--text-secondary` (gray-600) |
| filled | Pressed | `--background-regular` (gray-100) | `--text-primary` (gray-800) | none | `--text-secondary` (gray-600) |
| filled | Selected | `--primary-strong` (blue-600) | white | none | white |
| filled | Disabled | `--background-regular` (gray-100) | `--text-disabled` (gray-400) | none | `--text-disabled` (gray-400) |

**State 스타일**:

| State | 처리 |
|-------|------|
| Unselected | 기본 스타일. Font weight: Regular (400) |
| Pressed | `transform: scale(0.92)` + `transition: transform 150ms ease-in-out` (Scale 92%). 배경색은 Unselected 상태 유지 |
| Selected | 선택된 스타일. Font weight: SemiBold (600). count 뱃지 표시 가능 |
| Disabled | 텍스트/아이콘 색상 `--text-disabled` (gray-400). 클릭 불가. `cursor: not-allowed` |

---

### 2. ChipGroup

여러 Chip을 배치하는 컨테이너. Carousel 또는 Multiline 레이아웃을 지원한다.

```tsx
interface ChipGroupProps {
  /** 레이아웃 모드 */
  layout?: 'carousel' | 'multiline';
  /** 칩 간 간격 (spacing token 기준, 기본 8px, 최대 12px) */
  gap?: number;
  /** 자식 Chip 요소들 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}
```

**Layout 모드**:

| Layout | 설명 | 특징 |
|--------|------|------|
| carousel | 가로 스크롤 (기본) | `overflow-x: auto`, 좌우 padding 16px, 스크롤바 숨김, 한 줄 배치 |
| multiline | 줄바꿈 (wrap) | `flex-wrap: wrap`, 좌우 padding 16px, 여러 줄 배치 |

**Chip Group 상세 규칙**:
- 칩의 수가 많아질 경우 Carousel 또는 Multiline 정렬을 선택할 수 있다
- 칩과 칩 사이 패딩은 기본 8, 최대 12를 권장하며 패딩은 일정하게 설정한다
- Carousel 모드: 좌우 여백 16px을 유지하며 chip 그룹을 배치한다
- 컨테이너의 min-width: 320px, max-width: 674px (Figma 기준)

---

## Acceptance Criteria

### 기능 요구사항
- [ ] Chip의 모든 type (outlined, filled) x state (unselected, pressed, selected, disabled) 조합이 올바른 스타일로 렌더링된다
- [ ] 4개 size (lg, md, sm, xs)가 각각 올바른 높이/폰트/패딩으로 렌더링된다
- [ ] selected prop에 따라 텍스트 font-weight가 Regular(400) / SemiBold(600)로 전환된다
- [ ] selected 상태에서 count prop이 있으면 라벨 옆에 카운트 뱃지가 표시된다
- [ ] disabled 상태에서 클릭 이벤트가 발생하지 않으며, 시각적으로 비활성 상태가 표현된다
- [ ] Pressed 상태가 active pseudo-class로 `scale(0.92)` 애니메이션으로 표현된다
- [ ] leadingIcon, trailingIcon 전달 시 올바른 위치/크기에 아이콘이 렌더링된다
- [ ] leadingIcon 포함 시 좌측 패딩이 8px로 변경된다
- [ ] trailingIcon 포함 시 우측 패딩이 8px로 변경된다
- [ ] ChipGroup carousel 모드에서 좌우 padding 16px 유지 + 가로 스크롤이 동작한다
- [ ] ChipGroup multiline 모드에서 칩이 자동 줄바꿈된다
- [ ] ChipGroup의 gap이 올바르게 적용된다 (기본 8px)
- [ ] min-width: 56px 이 Chip에 적용된다

### 스타일 요구사항
- [ ] 모든 색상은 DS_2 시맨틱 토큰 (CSS 변수 / Tailwind 유틸리티)으로 적용된다 -- 하드코딩 금지
- [ ] Tailwind v4 방식 준수 (tailwind.config.ts 미사용, @theme inline 활용)
- [ ] 다크모드 대응 가능한 구조 (시맨틱 토큰 기반이므로 토큰 값만 변경하면 대응됨)
- [ ] pill 형태 border-radius: 9999px 적용 (`rounded-full`)
- [ ] Carousel 모드에서 스크롤바 숨김 처리 (CSS `scrollbar-width: none`, `-webkit-scrollbar: display none`)

### 접근성 요구사항
- [ ] 모든 Chip에 적절한 `role="button"` (기본 `<button>` 사용 시 자동)
- [ ] selected 상태에서 `aria-pressed="true"` 적용
- [ ] disabled 상태에서 `aria-disabled="true"` 및 `disabled` 속성 적용
- [ ] 키보드 포커스 링 (focus-visible) 스타일 적용
- [ ] Enter / Space 키로 칩 선택/해제 가능 (기본 `<button>` 동작)
- [ ] ChipGroup carousel 모드에서 키보드 좌/우 방향키로 탐색 가능

### 테스트 요구사항
- [ ] 컴포넌트 프리뷰 페이지에서 모든 type/size/state 조합 확인 가능

---

## Affected Files

### 신규 생성
| 파일 | 설명 |
|------|------|
| `src/components/Chip/Chip.tsx` | Chip 개별 아이템 컴포넌트 |
| `src/components/Chip/ChipGroup.tsx` | ChipGroup 컨테이너 컴포넌트 |
| `src/components/Chip/index.ts` | barrel export |
| `src/components/Chip/chip.types.ts` | 공통 타입 정의 |
| `src/components/Chip/chip.variants.ts` | type x state x size 조합별 Tailwind 클래스 맵 |
| `src/app/chip/page.tsx` | Chip 컴포넌트 프리뷰/문서 페이지 |

### 수정
| 파일 | 설명 |
|------|------|
| `src/app/globals.css` | 필요 시 추가 시맨틱 토큰 등록 (white 색상 Tailwind 매핑 등) |
| `.claude/doc/design-system.md` | Core Widgets Inventory에 Chip, ChipGroup 컴포넌트 등록 |

---

## Implementation Steps

### Step 1: 디자인 토큰 보강
`globals.css`의 `@theme inline` 블록에 Chip 컴포넌트에 필요한 추가 토큰을 등록한다:
```css
@theme inline {
  /* 기존 토큰... */

  /* Chip 추가 토큰 (필요 시) */
  --color-white: #FFFFFF;
  --color-primary-strong: var(--primary-strong);  /* 이미 존재하면 skip */
}
```

### Step 2: 공통 타입 및 variant 정의
- `chip.types.ts` -- ChipProps, ChipGroupProps 타입 정의
- `chip.variants.ts` -- type x state x size 조합별 Tailwind 클래스 맵 객체 생성
  - outlined/unselected: `bg-white border border-border text-text-primary`
  - outlined/selected: `bg-white border border-primary-strong text-primary-strong`
  - filled/unselected: `bg-background text-text-primary`
  - filled/selected: `bg-primary-strong text-white`
  - disabled 처리: `text-text-disabled cursor-not-allowed`
  - pressed 처리: `active:scale-[0.92] transition-transform duration-150 ease-in-out`

### Step 3: Chip 컴포넌트 구현
- `'use client'` 선언 (onClick 핸들러 사용)
- Props 인터페이스 적용
- type x selected/disabled 조합에 따른 Tailwind 클래스 매핑
- size에 따른 height/padding/font/icon-size 매핑
- leadingIcon / trailingIcon 슬롯 렌더링
- count prop: selected 상태에서 label 옆에 숫자 표시
- pill 형태 `rounded-full`
- `min-w-[56px]` 최소 너비
- focus-visible 포커스 링 스타일
- forwardRef 적용
- aria-pressed 상태 관리

### Step 4: ChipGroup 컴포넌트 구현
- layout prop에 따른 flex 방향 / overflow 제어
  - carousel: `flex overflow-x-auto scrollbar-hide px-4`
  - multiline: `flex flex-wrap px-4`
- gap prop 적용 (기본 8px)
- py-2 (vertical padding 8px)
- min-w / max-w 제한
- carousel 모드 스크롤바 숨김 CSS 추가

### Step 5: barrel export
- `index.ts`에서 Chip, ChipGroup + 타입 export

### Step 6: 프리뷰 페이지
- `/chip` 라우트에 모든 Chip type/size/state 조합을 시각적으로 확인할 수 있는 프리뷰 페이지 작성
- ChipGroup의 carousel / multiline 레이아웃도 포함

### Step 7: 문서 업데이트
- `design-system.md`의 Core Widgets Inventory 테이블에 Chip, ChipGroup 컴포넌트 등록

---

## Reusable Components

### 이 작업에서 새로 만드는 재사용 컴포넌트

| 컴포넌트 | Import Path | 용도 | Key Props |
|----------|-------------|------|-----------|
| Chip | `@/components/Chip` | 개별 칩 아이템 (필터, 태그, 선택) | type, size, selected, disabled, label, count, leadingIcon, trailingIcon |
| ChipGroup | `@/components/Chip` | 칩 그룹 레이아웃 컨테이너 (Carousel/Multiline) | layout, gap |

### 기존 재사용 컴포넌트 (의존)
- 없음 (Button 컴포넌트와 독립적으로 구현)

---

## Accessibility

| 항목 | 구현 방법 |
|------|-----------|
| **시맨틱 HTML** | 네이티브 `<button>` 요소 사용 (role 자동 부여) |
| **키보드 지원** | Enter/Space로 선택/해제 (네이티브 지원), Tab으로 포커스 이동 |
| **포커스 표시** | `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2` |
| **선택 상태** | `aria-pressed="true/false"` 로 선택 여부 전달 |
| **비활성 상태** | `disabled` 속성 + `aria-disabled="true"` 동시 적용 |
| **색상 대비** | DS_2 시맨틱 토큰은 WCAG AA 대비율 충족 (blue-600 on white = 4.75:1, gray-800 on white = 9.73:1) |
| **터치 타겟** | 최소 크기 32px (xs) -- WCAG 2.5.8 권장 24px 이상 충족 |
| **Carousel 탐색** | ChipGroup carousel 모드에서 `role="tablist"` + 방향키 탐색 지원, 또는 자연스러운 Tab 순서 유지 |
| **스크린리더** | selected 상태의 count 값은 `aria-label`에 포함 (예: "Chip 3개 선택됨") |

---

## Dependencies

### 필수 (이미 프로젝트에 포함)
- **Next.js** (App Router) -- 프레임워크
- **Tailwind CSS v4** -- 스타일링
- **TypeScript** -- 타입 안전성

### 추가 설치 필요
- **clsx** (`npm install clsx`) -- 조건부 className 조합 유틸리티. 또는 직접 간단한 cn() 유틸 함수 구현으로 대체 가능 (Button 구현 시 이미 설치되어 있다면 추가 설치 불필요)

### 불필요 (사용하지 않음)
- tailwind.config.ts -- Tailwind v4는 CSS 기반 설정
- styled-components / emotion -- Tailwind 사용
- 별도 아이콘 라이브러리 -- icon은 ReactNode로 주입받음 (소비자가 선택)
- 별도 스크롤 라이브러리 -- Carousel은 네이티브 CSS overflow-x로 구현
