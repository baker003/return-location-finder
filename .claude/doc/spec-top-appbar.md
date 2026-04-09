# Top Appbar Component Spec -- DS_2

## Summary

DS_2 디자인 시스템의 Top Appbar 컴포넌트를 Next.js + Tailwind CSS 웹 컴포넌트로 구현한다. Top Appbar는 화면 최상단에 위치하여 네비게이션, 타이틀, 액션 버튼을 제공하는 핵심 내비게이션 컴포넌트다. 총 5개의 하위 컴포넌트로 구성된다:

1. **TopAppbar** -- 전체 컨테이너 (Leading + Instant + Trailing 영역 배치, 배경색/로딩 상태 관리)
2. **LeadingButton** -- 좌측 네비게이션 버튼 (Back, Close, Home)
3. **TrailingButton** -- 우측 액션 영역 (아이콘 버튼 그룹 또는 텍스트 버튼)
4. **TopAppbarInstant** -- 중앙 콘텐츠 슬롯 (Heading, Label, TextButton, Input, Image 5가지 variant)
5. **ProgressBar** -- 하단 로딩 프로그래스 바

모든 컴포넌트는 DS_2 시맨틱 토큰 기반으로 색상을 적용하며, 다크/라이트 테마를 지원하고, 접근성(WCAG 2.1 AA)을 준수한다.

---

## Figma Reference

- **파일**: [DS_2](https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/)
- **Top Appbar 페이지**: Node ID `690:6564`
- **Master 섹션**: Node ID `9625:8833` > `30038:57640`
- **하위 컴포넌트 Node ID**:
  - Top appbar (COMPONENT_SET): `37006:98110` -- Loading=false (`37006:98113`), Loading=True (`37033:39462`)
  - instance (COMPONENT_SET): `37006:98429` -- Title, Loading, Text Button, Input, Images
  - Leading Button (COMPONENT_SET): `37006:98526` -- Back, Close, Home
  - Trailing Button (COMPONENT_SET): `37006:99436` -- Icon Buttons, Text Button
  - Header (COMPONENT): `29428:88994`
  - Progress Bar/Basic: `27585:52302`
- **Design Components 섹션**: Node ID `6411:19213` (With/Without Status bar 예시)
- **Guide 섹션**: Node ID `29664:24974` (구성요소 설명, 사용 가이드)

---

## Component API

### Figma에서 확인한 Top Appbar 구조

Figma 가이드 섹션에서 확인한 5대 구성요소:

| 영역 | 설명 |
|------|------|
| 1. Container | 탑앱바를 구성하는 기본 요소. 높이 52px 고정. 너비는 디바이스에 따라 유연하게 확장. 좌우 gutter 10px. 상하 6px 패딩. 내부 컨텐츠 높이 최대 40px. BG컬러는 Basic(White) / Transparency / Custom |
| 2. Leading (Optional) | 방향을 제시하는 리딩 아이콘 버튼. 버튼 사이즈 36x36 (아이콘 24x24). 고정 사이즈 |
| 3. Instant | 헤딩/레이블/텍스트버튼/이미지/인풋 등으로 다양하게 커스텀 노출 가능 |
| 4. Trailing area (Optional) | 트레일링 아이콘 버튼은 아이콘 버튼 Medium 사이즈 36x36 (아이콘 24x24) 사용. Optional 요소로 노출/미노출 선택 가능. 최소 0 ~ 최대 3개까지 노출 권장 (프로필은 별도) |
| 5. Progress bar | 프로그래스가 필요한 상황에 노출. 탑앱바 하단에 전체 너비로 붙는 형태 |

---

### 1. TopAppbar

전체 컨테이너. Leading, Instant(중앙), Trailing 3영역을 배치하고 배경색 및 로딩 상태를 관리한다.

```tsx
interface TopAppbarProps {
  /** 배경색 테마 */
  theme?: 'white' | 'transparent' | 'dark';
  /** 로딩 상태 -- true일 때 하단에 ProgressBar 표시 */
  loading?: boolean;
  /** 프로그래스 바 진행률 (0~100). loading=true일 때 사용. 미지정 시 indeterminate 애니메이션 */
  progress?: number;
  /** 좌측 Leading 영역 (LeadingButton 또는 커스텀 ReactNode) */
  leading?: React.ReactNode;
  /** 중앙 Instant 영역 (TopAppbarInstant 또는 커스텀 ReactNode) */
  instant?: React.ReactNode;
  /** 우측 Trailing 영역 (TrailingButton 또는 커스텀 ReactNode) */
  trailing?: React.ReactNode;
  /** 상단 고정 여부 (position: sticky) */
  sticky?: boolean;
  /** 추가 className */
  className?: string;
  /** 자식 요소 (instant 대신 children으로 전달 가능) */
  children?: React.ReactNode;
}
```

**Container 스펙** (Figma 기준):

| 속성 | 값 |
|------|-----|
| Height | 52px (고정) |
| Width | 100% (디바이스 너비) |
| Padding (좌우) | 10px (gutter) |
| Padding (상하) | 6px |
| Inner content max height | 40px |
| Gap (내부 요소 간) | 6px |

**Theme 배경색 매핑**:

| Theme | Background | Text Color | Icon Color |
|-------|-----------|------------|------------|
| white | `white` (#FFFFFF) | `--text-strong` (gray-1000) | `--text-strong` (gray-1000) |
| transparent | `transparent` | `--text-strong` (gray-1000) | `--text-strong` (gray-1000) |
| dark | `--gray-900` (#262F3C) | `white` (#FFFFFF) | `--gray-300` (#CBD1DC) |

> 참고: dark 테마는 운행화면 등 다크 배경에서 사용. gray-900 배경에 white 텍스트.

---

### 2. LeadingButton

좌측 네비게이션 버튼. 뒤로가기, 닫기, 홈 3가지 variant를 지원한다.

```tsx
interface LeadingButtonProps {
  /** 버튼 타입 */
  variant: 'back' | 'close' | 'home';
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 접근성 라벨 (기본값: variant에 따라 자동 설정) */
  'aria-label'?: string;
  /** 추가 className */
  className?: string;
}
```

**Variant 아이콘 매핑**:

| Variant | 아이콘 | 기본 aria-label |
|---------|--------|----------------|
| back | `<` (chevron-left) | "뒤로 가기" |
| close | `X` (close) | "닫기" |
| home | 홈 아이콘 (house) | "홈으로" |

**Size 스펙**:

| 속성 | 값 |
|------|-----|
| Button size | 36 x 36px |
| Icon size | 24 x 24px |
| Border Radius | 0 (사각형, 투명 배경) |

> 참고: 기존 `IconButton` 컴포넌트(`@/components/Button`)를 내부적으로 활용하되, Top Appbar 전용 프리셋으로 래핑한다. IconButton의 `size="sm"`, `type="ghost"` 조합과 동일.

---

### 3. TrailingButton

우측 액션 영역. 아이콘 버튼 그룹 또는 텍스트 버튼을 지원한다.

```tsx
interface TrailingIconButtonsProps {
  /** 아이콘 버튼 배열 (최대 3개 권장) */
  variant: 'iconButtons';
  /** 아이콘 버튼 목록 */
  buttons: Array<{
    icon: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    'aria-label': string;
  }>;
  /** 추가 className */
  className?: string;
}

interface TrailingTextButtonProps {
  /** 텍스트 버튼 */
  variant: 'textButton';
  /** 버튼 텍스트 */
  label: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 추가 className */
  className?: string;
}

type TrailingButtonProps = TrailingIconButtonsProps | TrailingTextButtonProps;
```

**Icon Buttons 스펙**:

| 속성 | 값 |
|------|-----|
| 각 버튼 사이즈 | 36 x 36px |
| 아이콘 사이즈 | 24 x 24px |
| 버튼 간 gap | 6px |
| 최소 버튼 수 | 0 |
| 최대 버튼 수 | 3 (권장), 프로필은 별도 |

**Text Button 스펙**:

| 속성 | 값 |
|------|-----|
| Font | Title/Title1 (Pretendard Variable, SemiBold 600, 18px/26px) -- 아닌 경우 Large 사이즈 텍스트 버튼 |
| Color | `--primary-strong` (blue-600) |
| Height | 40px |
| Padding | 기존 TextButton Large 사이즈 가이드 참고 |

> 참고: Trailing의 아이콘 버튼은 기존 `IconButton` 컴포넌트를 재사용하고, 텍스트 버튼은 기존 `TextButton` 컴포넌트를 재사용한다.

---

### 4. TopAppbarInstant

중앙 콘텐츠 영역. 5가지 variant를 지원한다.

```tsx
interface InstantHeadingProps {
  /** 헤딩 variant */
  variant: 'heading';
  /** 헤딩 텍스트 */
  title: string;
}

interface InstantLabelProps {
  /** 레이블 variant -- 좌측에 Leading 아이콘이 함께 노출 */
  variant: 'label';
  /** 레이블 텍스트 */
  title: string;
}

interface InstantTextButtonProps {
  /** 텍스트 버튼 variant -- 버튼명 + 드롭다운 chevron */
  variant: 'textButton';
  /** 버튼 텍스트 */
  label: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface InstantInputProps {
  /** 인풋 variant */
  variant: 'input';
  /** 플레이스홀더 */
  placeholder?: string;
  /** 입력 값 */
  value?: string;
  /** 변경 핸들러 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 클릭 핸들러 (검색 등에서 페이지 이동 시 사용) */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

interface InstantImageProps {
  /** 이미지 variant -- 로고 등 이미지 노출 */
  variant: 'image';
  /** 이미지 소스 */
  src: string;
  /** 이미지 alt 텍스트 */
  alt: string;
  /** 이미지 너비 */
  width?: number;
  /** 이미지 높이 */
  height?: number;
}

type TopAppbarInstantProps = (
  | InstantHeadingProps
  | InstantLabelProps
  | InstantTextButtonProps
  | InstantInputProps
  | InstantImageProps
) & {
  /** 추가 className */
  className?: string;
};
```

**Instant Variant 스펙**:

| Variant | 설명 | 타이포그래피 | 비고 |
|---------|------|-------------|------|
| heading | 헤딩 텍스트 단독 노출. 주로 화면에 노출될 때 사용하며 리딩 아이콘을 사용하지 않음 | Title/Title1 (SemiBold 600, 18px/26px) | 좌측 정렬, `--text-strong` |
| label | Leading 아이콘과 함께 레이블 텍스트 노출 | Title/Title1 (SemiBold 600, 18px/26px) | 좌측 정렬, `--text-strong` |
| textButton | 버튼명 + 드롭다운 chevron (v) | Title/Title1 (SemiBold 600, 18px/26px) | 좌측 정렬, 클릭 가능 |
| input | 검색 인풋 필드 | Body/3 (Regular 400, 14px/22px) | 회색 배경 `--gray-100`, rounded, placeholder `--text-disabled` |
| image | 로고/이미지 (png, Lottie, Mp4 등) | -- | 좌측 정렬, 이미지 높이 맞춤 |

---

### 5. ProgressBar

Top Appbar 하단에 전체 너비로 표시되는 프로그래스 바.

```tsx
interface ProgressBarProps {
  /** 진행률 (0~100). 미지정 시 indeterminate 애니메이션 */
  progress?: number;
  /** 추가 className */
  className?: string;
}
```

**ProgressBar 스펙**:

| 속성 | 값 |
|------|-----|
| Height | 2px |
| Width | 100% (Top Appbar 너비) |
| Track color | `--gray-100` (#F2F3F8) |
| Fill color | `--primary-regular` (blue-500, #0078FF) |
| Position | Top Appbar 하단에 absolute로 부착 |
| Animation (indeterminate) | 좌에서 우로 반복 슬라이드 애니메이션 |

**사용 가이드** (Figma 가이드 기준):
- 서버 통신으로 화면의 주요 콘텐츠 로딩이 있을 때
- 업로드/다운로드 등 사용자가 시작한 작업의 상태 표시
- 화면 전환 시, 새 페이지가 준비되는 동안
- 100ms 이하의 매우 짧은 작업에는 사용하지 않습니다
- 로딩 완료 시 로딩바 숨김 처리

---

## Acceptance Criteria

### 기능 요구사항
- [ ] TopAppbar 컨테이너가 높이 52px, 전체 너비, 좌우 padding 10px로 렌더링된다
- [ ] theme prop에 따라 white/transparent/dark 배경이 올바르게 적용된다
- [ ] dark 테마에서 텍스트가 white, 아이콘이 gray-300으로 렌더링된다
- [ ] Leading, Instant, Trailing 3영역이 올바른 위치에 배치된다 (좌 - 중앙/좌측 - 우)
- [ ] LeadingButton의 3가지 variant (back, close, home)가 올바른 아이콘으로 렌더링된다
- [ ] TrailingButton의 아이콘 버튼이 최대 3개까지 가로 배치된다
- [ ] TrailingButton의 텍스트 버튼이 primary-strong 색상으로 렌더링된다
- [ ] TopAppbarInstant의 5가지 variant (heading, label, textButton, input, image)가 모두 올바르게 렌더링된다
- [ ] loading=true일 때 ProgressBar가 하단에 표시된다
- [ ] loading=false일 때 ProgressBar가 숨겨진다
- [ ] progress prop으로 determinate 프로그래스가 표시된다
- [ ] progress 미지정 시 indeterminate 애니메이션이 동작한다
- [ ] sticky prop 적용 시 스크롤해도 상단에 고정된다
- [ ] Leading/Trailing 영역은 Optional이며, 미전달 시 영역이 차지하는 공간이 사라진다

### 스타일 요구사항
- [ ] 모든 색상은 DS_2 시맨틱 토큰 (CSS 변수 / Tailwind 유틸리티)으로 적용된다 -- 하드코딩 금지
- [ ] Tailwind v4 방식 준수 (tailwind.config.ts 미사용, @theme inline 활용)
- [ ] 다크모드 대응 가능한 구조 (theme prop + 시맨틱 토큰 기반)
- [ ] 헤딩/레이블 텍스트는 Title/Title1 (Pretendard Variable, SemiBold 600, 18px/26px) 적용

### 접근성 요구사항
- [ ] TopAppbar에 `role="banner"` 또는 시맨틱 `<header>` 태그 사용
- [ ] 내부 네비게이션 요소에 `<nav>` 태그 또는 `role="navigation"` 적용
- [ ] LeadingButton에 적절한 `aria-label` 자동 설정 (variant별 기본값)
- [ ] TrailingButton의 각 아이콘 버튼에 `aria-label` 필수 적용
- [ ] 키보드 포커스 링 (focus-visible) 스타일 적용
- [ ] Tab 키로 Leading > Instant > Trailing 순서로 포커스 이동
- [ ] ProgressBar에 `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` 적용
- [ ] loading 상태에서 `aria-busy="true"` 적용 (컨테이너)

### 테스트 요구사항
- [ ] 컴포넌트 프리뷰 페이지에서 모든 theme/variant/loading 조합 확인 가능

---

## Affected Files

### 신규 생성
| 파일 | 설명 |
|------|------|
| `src/components/TopAppbar/TopAppbar.tsx` | TopAppbar 메인 컨테이너 컴포넌트 |
| `src/components/TopAppbar/LeadingButton.tsx` | 좌측 네비게이션 버튼 컴포넌트 |
| `src/components/TopAppbar/TrailingButton.tsx` | 우측 액션 영역 컴포넌트 |
| `src/components/TopAppbar/TopAppbarInstant.tsx` | 중앙 콘텐츠 슬롯 컴포넌트 |
| `src/components/TopAppbar/ProgressBar.tsx` | 프로그래스 바 컴포넌트 |
| `src/components/TopAppbar/index.ts` | barrel export |
| `src/components/TopAppbar/topappbar.types.ts` | 공통 타입 정의 |
| `src/app/top-appbar/page.tsx` | Top Appbar 컴포넌트 프리뷰/문서 페이지 |

### 수정
| 파일 | 설명 |
|------|------|
| `src/app/globals.css` | 필요 시 추가 시맨틱 토큰 등록 (gray-900, gray-300 등 Tailwind 매핑 추가) |
| `.claude/doc/design-system.md` | Core Widgets Inventory에 TopAppbar 컴포넌트 등록 |

---

## Implementation Steps

### Step 1: 디자인 토큰 보강
`globals.css`의 `@theme inline` 블록에 Top Appbar 컴포넌트에 필요한 추가 토큰을 등록한다:
```css
@theme inline {
  /* 기존 토큰... */

  /* Top Appbar 추가 토큰 */
  --color-gray-300: var(--gray-300);    /* Leading/Trailing 아이콘 (dark 테마) */
  --color-gray-900: var(--gray-900);    /* dark 테마 배경 */
  --color-gray-1000: var(--gray-1000);  /* text-strong (이미 있으면 skip) */
  --color-text-strong: var(--text-strong);  /* 이미 있으면 skip */
}
```

### Step 2: 공통 타입 정의
- `topappbar.types.ts` -- TopAppbarProps, LeadingButtonProps, TrailingButtonProps, TopAppbarInstantProps, ProgressBarProps 타입 정의
- theme별 색상 매핑 타입 포함

### Step 3: ProgressBar 구현
- 가장 독립적인 컴포넌트를 먼저 구현
- 높이 2px, 전체 너비
- `progress` prop에 따른 determinate/indeterminate 분기
- indeterminate: CSS `@keyframes` 애니메이션 (좌에서 우로 슬라이드)
- `role="progressbar"` + ARIA 속성 적용
- Track: `--gray-100`, Fill: `--primary-regular` (blue-500)

### Step 4: LeadingButton 구현
- 기존 `IconButton` 컴포넌트(`@/components/Button`)를 내부적으로 활용
- variant에 따른 아이콘 분기 (back: chevron-left, close: X, home: house)
- 아이콘은 SVG 인라인 또는 ReactNode로 제공
- 36x36 사이즈, ghost 타입
- variant별 기본 aria-label 제공

### Step 5: TrailingButton 구현
- discriminated union 패턴으로 variant 분기
- `iconButtons`: 기존 `IconButton` 컴포넌트를 반복 렌더링 (최대 3개)
- `textButton`: 기존 `TextButton` 컴포넌트 활용 (primary variant)
- gap 6px로 버튼 간 간격

### Step 6: TopAppbarInstant 구현
- 5가지 variant에 따른 렌더링 분기
- heading: `<h1>` 또는 `<span>` + Title1 타이포그래피
- label: leading 아이콘 + 텍스트
- textButton: 텍스트 + chevron-down 아이콘, 클릭 가능
- input: `<input>` 요소, gray-100 배경, rounded, placeholder
- image: `<img>` 또는 Next.js `<Image>` 컴포넌트
- flex-1로 남은 공간 차지

### Step 7: TopAppbar 컨테이너 구현
- `'use client'` 선언
- 시맨틱 `<header>` 태그 사용
- flexbox 레이아웃: Leading(고정) + Instant(flex-1) + Trailing(고정)
- theme에 따른 배경색/텍스트색 Context 전달 (React Context 또는 props drilling)
- `position: relative`로 ProgressBar absolute 배치
- loading 상태에서 ProgressBar 조건부 렌더링
- sticky prop: `position: sticky; top: 0; z-index: 50`

### Step 8: barrel export
- `index.ts`에서 5개 컴포넌트 + 타입 export

### Step 9: 프리뷰 페이지
- `/top-appbar` 라우트에 모든 theme/variant/loading 조합을 시각적으로 확인할 수 있는 프리뷰 페이지 작성
- 섹션별 구분:
  - Theme 비교 (white / transparent / dark)
  - Instant variant 비교 (heading / label / textButton / input / image)
  - Leading variant 비교 (back / close / home / none)
  - Trailing variant 비교 (iconButtons / textButton / none)
  - Loading 상태 (determinate / indeterminate)

### Step 10: 문서 업데이트
- `design-system.md`의 Core Widgets Inventory 테이블에 Top Appbar 관련 컴포넌트 등록

---

## Reusable Components

### 이 작업에서 새로 만드는 재사용 컴포넌트

| 컴포넌트 | Import Path | 용도 | Key Props |
|----------|-------------|------|-----------|
| TopAppbar | `@/components/TopAppbar` | 상단 앱바 컨테이너 (네비게이션 + 타이틀 + 액션) | theme, loading, progress, leading, instant, trailing, sticky |
| LeadingButton | `@/components/TopAppbar` | 좌측 네비게이션 버튼 (뒤로가기, 닫기, 홈) | variant, onClick, aria-label |
| TrailingButton | `@/components/TopAppbar` | 우측 액션 영역 (아이콘 버튼 그룹 / 텍스트 버튼) | variant, buttons, label, onClick |
| TopAppbarInstant | `@/components/TopAppbar` | 중앙 콘텐츠 슬롯 (Heading, Label, TextButton, Input, Image) | variant, title, label, placeholder, src |
| ProgressBar | `@/components/TopAppbar` | 프로그래스 바 (determinate / indeterminate) | progress |

### 기존 재사용 컴포넌트 (의존)

| 컴포넌트 | Import Path | 활용 방식 |
|----------|-------------|-----------|
| IconButton | `@/components/Button` | LeadingButton 내부에서 ghost/sm 사이즈로 활용. TrailingButton의 아이콘 버튼으로 활용 |
| TextButton | `@/components/Button` | TrailingButton의 텍스트 버튼 variant에서 활용 |

---

## Accessibility

| 항목 | 구현 방법 |
|------|-----------|
| **시맨틱 HTML** | 컨테이너에 `<header>` 태그 사용. 내비게이션 버튼 그룹은 `<nav>` 래핑 |
| **키보드 지원** | Tab으로 Leading > Instant(interactive) > Trailing 순서 포커스 이동. Enter/Space로 버튼 활성화 |
| **포커스 표시** | `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2` |
| **네비게이션 라벨** | LeadingButton에 variant별 기본 `aria-label` 자동 설정 (back: "뒤로 가기", close: "닫기", home: "홈으로") |
| **아이콘 버튼 라벨** | TrailingButton의 각 아이콘 버튼에 `aria-label` 필수 (TypeScript 레벨 강제) |
| **프로그래스 바** | `role="progressbar"` + `aria-valuenow={progress}` + `aria-valuemin={0}` + `aria-valuemax={100}` |
| **로딩 상태** | loading=true일 때 컨테이너에 `aria-busy="true"` 설정 |
| **색상 대비** | white 테마: gray-1000 on white = 17.4:1 (AAA). dark 테마: white on gray-900 = 12.6:1 (AAA) |
| **터치 타겟** | Leading/Trailing 버튼 최소 36px -- WCAG 2.5.8 권장 24px 이상 충족 |
| **랜드마크** | `<header>` 태그로 페이지 banner 랜드마크 역할 수행 |

---

## Dependencies

### 필수 (이미 프로젝트에 포함)
- **Next.js** (App Router) -- 프레임워크
- **Tailwind CSS v4** -- 스타일링
- **TypeScript** -- 타입 안전성
- **clsx** -- 조건부 className 조합 (Button 구현 시 이미 설치)

### 기존 컴포넌트 의존
- **IconButton** (`@/components/Button`) -- Leading/Trailing 아이콘 버튼 재사용
- **TextButton** (`@/components/Button`) -- Trailing 텍스트 버튼 재사용

### 추가 설치 필요
- 없음

### 불필요 (사용하지 않음)
- tailwind.config.ts -- Tailwind v4는 CSS 기반 설정
- styled-components / emotion -- Tailwind 사용
- 별도 아이콘 라이브러리 -- 아이콘은 SVG 인라인 또는 ReactNode로 주입 (LeadingButton은 내장 SVG 제공)
