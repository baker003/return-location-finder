# Top Appbar Components Design Spec

## 사전 조건: @theme inline 추가 토큰

`globals.css`의 `@theme inline` 블록에 아래 토큰 추가 필요:

```css
--color-gray-300: var(--gray-300);
--color-gray-900: var(--gray-900);
--color-gray-1000: var(--gray-1000);
```

---

## 1. TopAppbar

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'white' \| 'transparent' \| 'dark'` | `'white'` | 배경색 테마 |
| `loading` | `boolean` | `false` | 로딩 상태 -- true일 때 하단 ProgressBar 표시 |
| `progress` | `number` | `undefined` | 프로그래스 바 진행률 (0~100). 미지정 시 indeterminate |
| `leading` | `React.ReactNode` | `undefined` | 좌측 Leading 영역 (LeadingButton) |
| `instant` | `React.ReactNode` | `undefined` | 중앙 Instant 영역 (TopAppbarInstant) |
| `trailing` | `React.ReactNode` | `undefined` | 우측 Trailing 영역 (TrailingButton) |
| `sticky` | `boolean` | `false` | 상단 고정 여부 (position: sticky) |
| `children` | `React.ReactNode` | `undefined` | instant 대신 children으로 중앙 영역 전달 가능 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Theme 색상 매핑

| Theme | Background | Text Color | Icon Color |
|-------|-----------|------------|------------|
| white | `bg-white` | `text-text-strong` | `text-text-strong` |
| transparent | `bg-transparent` | `text-text-strong` | `text-text-strong` |
| dark | `bg-gray-900` | `text-white` | `text-gray-300` |

### Component Tree

```
<header>                              ← 루트 컨테이너
│                                        base: relative w-full h-[52px]
│                                              flex items-center
│                                              px-[10px] py-[6px] gap-[6px]
│                                        sticky: sticky top-0 z-50
│                                        aria: aria-busy={loading}
│
│  ── THEME 클래스 ──
│     white:       bg-white text-text-strong
│     transparent: bg-transparent text-text-strong
│     dark:        bg-gray-900 text-white
│
├─ {leading &&
│   <nav>}                            ← Leading 영역
│     aria-label="네비게이션"
│     flex-shrink-0
│     dark 테마 시: text-gray-300
│     └─ {leading}                    ← LeadingButton
│
├─ <div>                              ← Instant 영역 (중앙)
│     flex-1 min-w-0                     남은 공간 차지, 텍스트 truncate 허용
│     max-h-[40px]
│     └─ {instant || children}        ← TopAppbarInstant 또는 children
│
├─ {trailing &&
│   <div>}                            ← Trailing 영역
│     flex-shrink-0
│     dark 테마 시: text-gray-300
│     └─ {trailing}                   ← TrailingButton
│
└─ {loading &&
    <ProgressBar />}                  ← 하단 프로그래스 바
      progress={progress}
      absolute bottom-0 left-0 right-0
```

### States 리스트

- **Default**: theme별 배경/텍스트 색상 적용
- **Loading**: `aria-busy="true"`, 하단에 ProgressBar 렌더링
- **Sticky**: `sticky top-0 z-50` 적용
- **Leading 없음**: Leading `<nav>` 영역 미렌더링, Instant 영역이 좌측까지 확장
- **Trailing 없음**: Trailing 영역 미렌더링, Instant 영역이 우측까지 확장

---

## 2. LeadingButton

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'back' \| 'close' \| 'home'` | (required) | 버튼 타입 |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | `undefined` | 클릭 핸들러 |
| `aria-label` | `string` | variant별 자동 설정 | 접근성 라벨 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Variant 아이콘 매핑

| Variant | 아이콘 | 기본 aria-label |
|---------|--------|----------------|
| back | chevron-left (`<`) | "뒤로 가기" |
| close | close (`X`) | "닫기" |
| home | house | "홈으로" |

### Component Tree

```
<IconButton>                          ← 기존 IconButton 재사용
│                                        size="sm" (w-9 h-9 = 36px)
│                                        type="ghost"
│                                        shape="square"
│                                        icon={variantIcon}
│                                        aria-label={aria-label || defaultLabel}
│                                        onClick={onClick}
│                                        className={className}
│
│  ── 내부 아이콘 SVG ──
│     w-6 h-6 (24px)
│     stroke: currentColor (부모 text 색상 상속)
│     stroke-width: 2
│     fill: none
│
│  ── VARIANT별 SVG path ──
│     back:  <path d="M15 19l-7-7 7-7" /> (chevron-left)
│     close: <path d="M18 6L6 18M6 6l12 12" /> (X)
│     home:  <path d="M3 12l9-9 9 9M5 10v10a1..." /> (house)
│
└─ 색상은 부모 TopAppbar theme에서 상속 (currentColor)
```

### States 리스트

- **Enabled**: `text-text-strong` (white/transparent 테마) 또는 부모 `text-gray-300` 상속 (dark 테마)
- **Hover**: `hover:bg-pressed-dark-weak` (IconButton ghost 기본 동작)
- **Pressed**: `active:scale-[0.96]`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`

---

## 3. TrailingButton

### Props 테이블 (iconButtons variant)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'iconButtons'` | (required) | 아이콘 버튼 그룹 모드 |
| `buttons` | `Array<{ icon: ReactNode; onClick?: Function; 'aria-label': string }>` | (required) | 아이콘 버튼 목록 (최대 3개 권장) |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Props 테이블 (textButton variant)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'textButton'` | (required) | 텍스트 버튼 모드 |
| `label` | `string` | (required) | 버튼 텍스트 |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | `undefined` | 클릭 핸들러 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
── variant="iconButtons" ──

<div>                                 ← 아이콘 버튼 그룹 컨테이너
│                                        flex items-center gap-[6px]
│
├─ {buttons.map(btn =>
│   <IconButton>                      ← 기존 IconButton 재사용
│     size="sm" (w-9 h-9 = 36px)
│     type="ghost"
│     shape="square"
│     icon={btn.icon}                    [&>svg]:w-6 [&>svg]:h-6 (24px)
│     aria-label={btn['aria-label']}
│     onClick={btn.onClick}
│   )}
│
└─ 색상은 부모 TopAppbar theme에서 상속 (currentColor)


── variant="textButton" ──

<TextButton>                          ← 기존 TextButton 재사용
│                                        variant="primary"
│                                        size="xl"
│                                        onClick={onClick}
│                                        className={className}
│
│  ── 스타일 ──
│     text-primary-strong (blue-600)
│     text-[18px] leading-[26px] font-semibold
│     h-[40px]
│
│  ── dark 테마 오버라이드 ──
│     dark 테마에서도 text-primary-strong 유지 (액션 강조)
│
└─ {label}
```

### States 리스트

- **Enabled (iconButtons)**: 아이콘 색상 부모 상속 -- `text-text-strong` (white/transparent) 또는 `text-gray-300` (dark)
- **Enabled (textButton)**: `text-primary-strong` (모든 테마 동일)
- **Hover**: IconButton -- `hover:bg-pressed-dark-weak` / TextButton -- `hover:bg-pressed-dark-weak`
- **Pressed**: `active:scale-[0.96]`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`

---

## 4. TopAppbarInstant

### Props 테이블 (variant별 discriminated union)

#### heading

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'heading'` | (required) | 헤딩 모드 |
| `title` | `string` | (required) | 헤딩 텍스트 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

#### label

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'label'` | (required) | 레이블 모드 |
| `title` | `string` | (required) | 레이블 텍스트 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

#### textButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'textButton'` | (required) | 텍스트 버튼 모드 |
| `label` | `string` | (required) | 버튼 텍스트 |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | `undefined` | 클릭 핸들러 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

#### input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'input'` | (required) | 인풋 모드 |
| `placeholder` | `string` | `undefined` | 플레이스홀더 텍스트 |
| `value` | `string` | `undefined` | 입력 값 |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | 변경 핸들러 |
| `onClick` | `(e: React.MouseEvent<HTMLInputElement>) => void` | `undefined` | 클릭 핸들러 (검색 페이지 이동 등) |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

#### image

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'image'` | (required) | 이미지 모드 |
| `src` | `string` | (required) | 이미지 소스 |
| `alt` | `string` | (required) | 이미지 alt 텍스트 |
| `width` | `number` | `undefined` | 이미지 너비 |
| `height` | `number` | `undefined` | 이미지 높이 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
── variant="heading" ──

<div>                                 ← 래퍼
│   flex items-center h-full
│
└─ <h1>                               ← 헤딩 텍스트
      text-[18px] leading-[26px] font-semibold
      text-current (부모 theme 색상 상속)
      truncate


── variant="label" ──

<div>                                 ← 래퍼
│   flex items-center h-full
│
└─ <span>                             ← 레이블 텍스트
      text-[18px] leading-[26px] font-semibold
      text-current (부모 theme 색상 상속)
      truncate


── variant="textButton" ──

<button>                              ← 클릭 가능한 텍스트 버튼
│   flex items-center gap-1 h-full
│   focus-visible:outline-none focus-visible:ring-2
│   focus-visible:ring-primary-strong focus-visible:ring-offset-2
│
├─ <span>                             ← 버튼 텍스트
│     text-[18px] leading-[26px] font-semibold
│     text-current (부모 theme 색상 상속)
│
└─ <svg>                              ← chevron-down 아이콘
      w-5 h-5
      text-current


── variant="input" ──

<div>                                 ← 인풋 컨테이너
│   flex items-center w-full h-[40px]
│   bg-gray-100 rounded-[10px]
│   px-3 gap-2
│
├─ <svg>                              ← 검색 아이콘 (돋보기)
│     w-5 h-5 text-text-secondary flex-shrink-0
│
└─ <input>                            ← 인풋 필드
      flex-1 bg-transparent
      text-[14px] leading-[22px] font-normal
      text-text-strong (입력 텍스트)
      placeholder:text-text-disabled
      outline-none
      dark 테마 시: bg-gray-100 유지, text-text-strong → text-white


── variant="image" ──

<div>                                 ← 래퍼
│   flex items-center h-full
│
└─ <img>                              ← 이미지
      max-h-[40px] object-contain
      width={width} height={height}
      alt={alt}
```

### States 리스트

- **heading**: 정적 텍스트 표시. 인터랙션 없음
- **label**: 정적 텍스트 표시. 인터랙션 없음
- **textButton Enabled**: `text-current`, chevron-down 표시
- **textButton Hover**: `hover:bg-pressed-dark-weak rounded-lg`
- **textButton Pressed**: `active:scale-[0.96]`
- **textButton Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`
- **input Default**: `bg-gray-100`, placeholder 표시
- **input Focus**: `ring-2 ring-primary-strong` (포커스 링)
- **input Dark theme**: `bg-gray-100` 배경 유지 (dark 테마에서도 입력 영역 구분)
- **image**: 정적 이미지 표시. 인터랙션 없음

---

## 5. ProgressBar

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | `undefined` | 진행률 (0~100). 미지정 시 indeterminate 애니메이션 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<div>                                 ← Track (배경)
│                                        absolute bottom-0 left-0 right-0
│                                        h-[2px] w-full
│                                        bg-gray-100
│                                        overflow-hidden
│                                        role="progressbar"
│                                        aria-valuemin={0}
│                                        aria-valuemax={100}
│                                        aria-valuenow={progress} (determinate 시)
│
└─ <div>                              ← Fill (채움)
      h-full bg-primary-regular
      transition-[width] duration-200 ease-linear

      ── DETERMINATE (progress 지정) ──
         style={{ width: `${progress}%` }}

      ── INDETERMINATE (progress 미지정) ──
         animate-progress-indeterminate
         w-[40%]
```

### Indeterminate 애니메이션 (globals.css 추가)

```css
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
```

### States 리스트

- **Determinate**: `width` 스타일로 진행률 표시 (0~100%). `aria-valuenow` 설정
- **Indeterminate**: 좌에서 우로 반복 슬라이드 애니메이션. `aria-valuenow` 미설정
- **Hidden**: TopAppbar `loading=false`일 때 미렌더링 (ProgressBar 자체에는 hidden 상태 없음)

---

## 접근성 체크리스트

| 항목 | 구현 방법 |
|------|-----------|
| 시맨틱 HTML | 컨테이너 `<header>` 태그 사용 (banner 랜드마크) |
| 네비게이션 | Leading 영역 `<nav aria-label="네비게이션">` 래핑 |
| 키보드 순서 | Tab: Leading > Instant(interactive) > Trailing 순서 |
| 키보드 활성화 | Enter/Space로 버튼 활성화 (네이티브 `<button>`) |
| 포커스 표시 | `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2` |
| LeadingButton 라벨 | variant별 기본 `aria-label` 자동 설정 (back/close/home) |
| TrailingButton 라벨 | 아이콘 버튼 `aria-label` TypeScript 필수 prop |
| ProgressBar | `role="progressbar"` + `aria-valuenow` + `aria-valuemin={0}` + `aria-valuemax={100}` |
| 로딩 상태 | `loading=true`일 때 `<header>`에 `aria-busy="true"` |
| 색상 대비 | white 테마: gray-1000 on white = 17.4:1 (AAA). dark 테마: white on gray-900 = 12.6:1 (AAA) |
| 터치 타겟 | Leading/Trailing 버튼 36px -- WCAG 2.5.8 권장 24px 이상 충족 |
