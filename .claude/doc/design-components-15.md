# DS_2 신규 컴포넌트 15종 설계 문서

작성일: 2026-05-13
기반: globals.css @theme inline 토큰 체계 + 기존 Button/Chip/Input 패턴 참조

---

## globals.css 추가 필요 토큰

`@theme inline` 블록에 추가:

```css
/* 신규 추가 토큰 */
--color-divider-weak: var(--divider-weak);
--color-status-info-light: var(--status-info-light);
--color-status-negative-weak: var(--status-negative-weak);
--color-status-caution-regular: var(--status-caution-regular);
```

`@theme inline` Animations 섹션에 추가:

```css
--animate-shimmer: shimmer 1.5s ease-in-out infinite;
--animate-bottom-sheet-in: bottom-sheet-in 300ms ease-out;
--animate-bottom-sheet-out: bottom-sheet-out 300ms ease-out;
--animate-fade-in: fade-in 150ms ease-out;
--animate-fade-out: fade-out 150ms ease-in;
--animate-scale-in: scale-in 150ms ease-out;
```

`:root` 바깥 `@keyframes` 블록에 추가:

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes bottom-sheet-in {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes bottom-sheet-out {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

`@utility` 블록에 추가:

```css
@utility animate-shimmer { animation: var(--animate-shimmer); }
@utility skeleton-base {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
}
```

---

## Priority 1

---

### 1. Divider

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `variant` | `'full' \| 'inset' \| 'middle'` | `'full'` | 여백 방식 |
| `strength` | `'regular' \| 'weak'` | `'regular'` | 선 굵기/색상 강도 |
| `inset` | `number` | `16` | inset/middle variant 여백(px) |
| `children` | `React.ReactNode` | `undefined` | 텍스트 divider 콘텐츠 |
| `decorative` | `boolean` | `false` | true 시 aria-hidden="true" |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[horizontal, no children]
<hr role="separator" aria-orientation="horizontal">
  ── strength=regular: border-t border-divider
  ── strength=weak:    border-t border-divider-weak
  ── variant=full:     w-full  mx-0
  ── variant=inset:    ml-[{inset}px]  w-auto
  ── variant=middle:   mx-[{inset}px]  w-auto

[horizontal, children]
<div role="separator" class="flex items-center gap-4">
  <span class="flex-1 border-t border-divider" />
  <span class="typo-caption1 text-text-tertiary">{children}</span>
  <span class="flex-1 border-t border-divider" />
</div>

[vertical]
<div role="separator" aria-orientation="vertical"
     class="inline-block self-stretch border-l {strength-class}">
  ── strength=regular: border-divider
  ── strength=weak:    border-divider-weak
```

#### States 리스트

- `regular` — `border-divider` (`--divider-regular` = `--gray-200` = `#E5E8EF`)
- `weak` — `border-divider-weak` (`--divider-weak` = `--gray-100` = `#F2F3F8`)
- `decorative` — `aria-hidden="true"` 추가, role 생략

#### 파일 구조

```
src/components/Divider/
  types.ts
  Divider.tsx     ← Server Component (상태 없음)
  index.ts
```

---

### 2. Skeleton

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | 형태 |
| `width` | `number \| string` | `undefined` | CSS 너비 |
| `height` | `number \| string` | `undefined` | CSS 높이 |
| `lines` | `number` | `1` | text variant 다중 줄 수 |
| `lastLineWidthRatio` | `number` | `0.7` | 마지막 줄 너비 비율 (0~1) |
| `animate` | `boolean` | `true` | shimmer 애니메이션 여부 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[단일 라인 또는 non-text variant]
<div
  role="status"
  aria-busy="true"
  aria-label="로딩 중"
  class="skeleton-base {shape} {animate?'animate-shimmer':''} {width} {height}"
>
  ── variant=text:        rounded-sm  h-[1em]
  ── variant=circular:    rounded-full  (width=height 필수)
  ── variant=rectangular: rounded-none
  ── variant=rounded:     rounded-lg

[lines > 1, text variant]
<div role="status" aria-busy="true" aria-label="로딩 중" class="flex flex-col gap-2">
  {Array(lines).fill(0).map((_, i) => (
    <div
      key={i}
      class="skeleton-base rounded-sm animate-shimmer"
      style={{ width: i === lines-1 ? `${lastLineWidthRatio*100}%` : '100%', height: '1em' }}
    />
  ))}
</div>
```

#### States 리스트

- `animate=true` — `skeleton-base animate-shimmer` (shimmer sweep)
- `animate=false` — `skeleton-base` 단색 (`--gray-200`)
- `circular` — `rounded-full`, width=height 동일 값 필수
- `rounded` — `rounded-lg` (8px)
- `rectangular` — `rounded-none`

#### 디자인 토큰 매핑

| 요소 | 토큰 | CSS 변수 |
|------|------|---------|
| base bg | `--gray-200` | `#E5E8EF` |
| shimmer highlight | `--gray-100` | `#F2F3F8` |

#### 파일 구조

```
src/components/Skeleton/
  types.ts
  Skeleton.tsx     ← Server Component
  index.ts
```

---

### 3. Badge

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'count' \| 'dot' \| 'label'` | `'count'` | 배지 형태 |
| `count` | `number` | `undefined` | 숫자 (count variant) |
| `max` | `number` | `99` | 최대 표시 숫자 |
| `label` | `string` | `undefined` | 텍스트 (label variant) |
| `hidden` | `boolean` | `false` | 배지 숨김 |
| `color` | `'error' \| 'primary' \| 'caution'` | `'error'` | 배지 색상 |
| `anchorOrigin` | `{ vertical: 'top'\|'bottom'; horizontal: 'left'\|'right' }` | `{ vertical:'top', horizontal:'right' }` | 앵커 위치 |
| `children` | `React.ReactNode` | `undefined` | 감싸는 자식 요소 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[children 있음]
<span class="relative inline-flex">
  {children}
  <span
    class="absolute {anchorClass} {colorClass} {sizeClass} {hiddenClass}"
    aria-label="{count}개 알림"
  >
    {content}
  </span>
</span>

[children 없음]
<span class="{colorClass} {sizeClass}" aria-label="{count}개 알림">
  {content}
</span>

앵커 위치 클래스 매핑:
  top+right:    top-0 right-0 -translate-y-1/2 translate-x-1/2
  top+left:     top-0 left-0 -translate-y-1/2 -translate-x-1/2
  bottom+right: bottom-0 right-0 translate-y-1/2 translate-x-1/2
  bottom+left:  bottom-0 left-0 translate-y-1/2 -translate-x-1/2

크기 클래스:
  dot:   w-2 h-2 rounded-full
  count: min-w-[16px] h-4 px-1 rounded-full typo-caption2 font-semibold inline-flex items-center justify-center
  label: h-4 px-1.5 rounded-full typo-caption2 font-medium inline-flex items-center

색상 클래스:
  error:   bg-status-negative text-on-primary
  primary: bg-primary-regular text-on-primary
  caution: bg-status-caution text-on-primary
```

#### States 리스트

- `hidden=true` — `hidden` (display:none)
- `count === 0` — 자동 숨김 (`hidden`)
- `count > max` — `{max}+` 문자열로 포맷
- `decorative dot` — `aria-hidden="true"`

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 시맨틱 변수 |
|------|------------|------------|
| error bg | `bg-status-negative` | `--status-negative-regular` → `--red-600` |
| primary bg | `bg-primary-regular` | `--primary-regular` → `--blue-600` |
| caution bg | `bg-status-caution` | `--status-caution-regular` → `--orange-800` |
| 텍스트 | `text-on-primary` | `#FFFFFF` |

#### 파일 구조

```
src/components/Badge/
  types.ts
  Badge.tsx     ← Server Component
  index.ts
```

---

### 4. Bottom Sheet

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | 열림 여부 |
| `onClose` | `() => void` | (required) | 닫기 콜백 |
| `state` | `'closed' \| 'peek' \| 'full'` | `'full'` | 시트 상태 |
| `showHandle` | `boolean` | `true` | 드래그 핸들 표시 |
| `peekHeight` | `number` | `280` | peek 높이(px) |
| `maxHeightVh` | `number` | `90` | full 최대 높이(vh) |
| `closeOnBackdropClick` | `boolean` | `true` | 딤드 클릭 닫기 |
| `scrollable` | `boolean` | `true` | 내부 스크롤 |
| `title` | `string` | `undefined` | 헤더 타이틀 |
| `subtitle` | `string` | `undefined` | 헤더 서브타이틀 |
| `showCloseButton` | `boolean` | `false` | 닫기 버튼 표시 |
| `children` | `React.ReactNode` | (required) | 시트 콘텐츠 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[Portal → document.body]
<div class="fixed inset-0 z-50" aria-hidden="true (배경)">

  {/* Backdrop */}
  <div
    class="absolute inset-0 bg-black/[0.44] {open ? 'animate-fade-in' : 'animate-fade-out'}"
    onClick={closeOnBackdropClick ? onClose : undefined}
    style={{ backgroundColor: 'var(--dimmed-regular)' }}
  />

  {/* Sheet */}
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="bottom-sheet-title"
    class="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl
           flex flex-col touch-none z-[60]
           transition-transform duration-300 ease-out"
    style={{ transform: translateYValue, maxHeight: `{maxHeightVh}vh` }}
  >

    {/* Handle */}
    {showHandle && (
      <div class="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div class="w-9 h-1 rounded-full bg-border" />
      </div>
    )}

    {/* Header (title 있을 때) */}
    {title && (
      <div class="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <div>
          <h2 id="bottom-sheet-title" class="typo-headline1 font-semibold text-text-strong">
            {title}
          </h2>
          {subtitle && (
            <p class="typo-label1 text-text-secondary">{subtitle}</p>
          )}
        </div>
        {showCloseButton && <IconButton icon={<CloseIcon/>} aria-label="닫기" onClick={onClose} />}
      </div>
    )}

    {/* Content */}
    <div class="{scrollable ? 'overflow-y-auto' : 'overflow-hidden'} flex-1 px-4 pb-safe">
      {children}
    </div>

  </div>
</div>
```

#### States 리스트

- `closed` — `translateY(100%)`, backdrop hidden
- `peek` — `translateY(calc(100% - {peekHeight}px))`
- `full` — `translateY(0)`, backdrop visible
- 드래그 중 — `transition: none` (즉각 반응), 손 뗄 때 snap
- Escape 키 — `onClose()` 호출

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 시트 배경 | `bg-surface` | `#FFFFFF` |
| 딤드 배경 | inline style `var(--dimmed-regular)` | `rgba(0,0,0,0.44)` |
| 드래그 핸들 | `bg-border` | `--border-regular` = `--gray-200` |
| 타이틀 | `text-text-strong` | `--gray-1000` |
| 서브타이틀 | `text-text-secondary` | `--gray-600` |
| z-index | `z-50` (backdrop), `z-[60]` (sheet) | — |

#### 파일 구조

```
src/components/BottomSheet/
  types.ts
  BottomSheet.tsx    ← 'use client' 필수
  index.ts
```

---

### 5. Search Bar

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | controlled 값 |
| `defaultValue` | `string` | `undefined` | uncontrolled 기본값 |
| `onChange` | `(value: string) => void` | `undefined` | 변경 콜백 |
| `onSearch` | `(value: string) => void` | `undefined` | Enter/검색 콜백 |
| `onCancel` | `() => void` | `undefined` | 취소 콜백 |
| `placeholder` | `string` | `'검색'` | 플레이스홀더 |
| `cancelLabel` | `string` | `'취소'` | 취소 버튼 레이블 |
| `showCancel` | `'focus' \| 'always' \| 'never'` | `'focus'` | 취소 버튼 표시 조건 |
| `disabled` | `boolean` | `false` | 비활성 |
| `autoFocus` | `boolean` | `false` | 자동 포커스 |
| `fullWidth` | `boolean` | `true` | 전체 너비 |
| `className` | `string` | `undefined` | 추가 클래스 |
| `aria-label` | `string` | `'검색'` | 접근성 레이블 |

#### Component Tree

```
<div role="search" class="{fullWidth ? 'w-full' : 'w-auto'} flex items-center gap-2">

  {/* Input Wrapper */}
  <div class="flex-1 relative flex items-center
              h-10 rounded-xl bg-background px-3 gap-2
              border border-transparent
              transition-colors duration-150
              {focused ? 'border-primary-regular' : ''}
              {disabled ? 'opacity-40 pointer-events-none' : ''}">

    {/* Search Icon */}
    <SearchIcon class="w-4 h-4 flex-shrink-0
                       {focused || value ? 'text-primary-regular' : 'text-text-tertiary'}
                       transition-colors duration-150" />

    {/* Input */}
    <input
      type="search"
      class="flex-1 bg-transparent typo-body1 text-text-primary
             placeholder:text-text-tertiary outline-none min-w-0"
      aria-label={aria-label}
    />

    {/* Clear Button (값 있을 때) */}
    {value && (
      <IconButton
        icon={<CloseIcon />}
        aria-label="검색어 지우기"
        size="xs"
        type="ghost"
        onClick={handleClear}
      />
    )}
  </div>

  {/* Cancel Button */}
  {showCancelButton && (
    <button
      type="button"
      class="typo-label1 font-medium text-text-secondary
             flex-shrink-0 transition-all duration-200
             {appearing ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}"
      aria-label="검색 취소"
      onClick={handleCancel}
    >
      {cancelLabel}
    </button>
  )}

</div>
```

#### States 리스트

- `default` — 검색 아이콘 `text-text-tertiary`, border 없음
- `focused` — `border-primary-regular 2px`, 아이콘 `text-primary-regular`
- `active (값 있음)` — Clear(×) 버튼 노출
- `disabled` — `opacity-40 pointer-events-none`
- 취소 버튼 — `showCancel='focus'` 시 focused일 때만, slide-in 200ms

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 시맨틱 변수 |
|------|------------|------------|
| 입력 배경 | `bg-background` | `--background-regular` = `--gray-100` |
| 포커스 테두리 | `border-primary-regular` | `--primary-regular` = `--blue-600` |
| 검색 아이콘(비포커스) | `text-text-tertiary` | `--text-tertiary` = `--gray-550` |
| 검색 아이콘(포커스) | `text-primary-regular` | `--primary-regular` |
| 취소 버튼 | `text-text-secondary` | `--text-secondary` = `--gray-600` |

#### 파일 구조

```
src/components/SearchBar/
  types.ts
  SearchBar.tsx    ← 'use client' 필수
  index.ts
```

---

### 6. FAB (Floating Action Button)

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `variant` | `'primary' \| 'surface' \| 'secondary'` | `'primary'` | 색상 변형 |
| `icon` | `React.ReactNode` | (required) | 아이콘 |
| `label` | `string` | `undefined` | 레이블 (있으면 Extended FAB) |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center' \| 'custom'` | `'bottom-right'` | 고정 위치 |
| `positionClassName` | `string` | `undefined` | position=custom 시 위치 클래스 |
| `disabled` | `boolean` | `false` | 비활성 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 |
| `aria-label` | `string` | `undefined` | 접근성 레이블 (label 없을 때 필수) |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
<button
  type="button"
  class="fixed z-40 flex items-center justify-center
         rounded-full shadow-lg
         transition-transform duration-150 active:scale-[0.97] hover:scale-105
         {sizeClass} {variantClass} {positionClass}
         {disabled ? 'opacity-40 pointer-events-none' : ''}
         {label ? 'gap-2 px-4' : ''}"
  aria-label={label ? undefined : aria-label}
>
  {icon}
  {label && <span class="typo-label1 font-semibold">{label}</span>}
</button>

크기 클래스:
  small:  w-10 h-10          (40px)
  medium: w-14 h-14          (56px)
  large:  w-24 h-24          (96px)

  Extended(label 있음): h-14 w-auto min-w-[56px]

variant 클래스:
  primary:   bg-primary-strong text-on-primary
  surface:   bg-surface text-primary-regular shadow-lg
  secondary: bg-gray-100 text-text-primary

position 클래스:
  bottom-right:  bottom-6 right-4
  bottom-left:   bottom-6 left-4
  bottom-center: bottom-6 left-1/2 -translate-x-1/2
  custom:        positionClassName 적용
```

#### States 리스트

- `default` — 기본 shadow-lg
- `hover` — `scale(1.05)` (CSS transform)
- `active/press` — `scale(0.97)`
- `disabled` — `opacity-40 pointer-events-none`
- `extended` — label prop 있을 때, pill 형태

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| primary 배경 | `bg-primary-strong` | `--primary-strong` = `--blue-700` |
| surface 배경 | `bg-surface` | `#FFFFFF` |
| secondary 배경 | `bg-gray-100` | `--gray-100` |
| primary 텍스트 | `text-on-primary` | `#FFFFFF` |
| shadow | `shadow-lg` | Tailwind 기본 |

#### 파일 구조

```
src/components/FAB/
  types.ts
  FAB.tsx    ← 'use client' 필수 (hover/press 인터랙션)
  index.ts
```

---

## Priority 2

---

### 7. Tabs

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | (required) | 탭 목록 |
| `activeKey` | `string` | `undefined` | controlled 활성 탭 |
| `defaultActiveKey` | `string` | `undefined` | uncontrolled 기본 탭 |
| `onChange` | `(key: string) => void` | `undefined` | 탭 변경 콜백 |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | 스타일 변형 |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | 탭 크기 |
| `fullWidth` | `boolean` | `false` | 탭 균등 분할 |
| `scrollable` | `boolean` | `false` | 탭 가로 스크롤 |
| `className` | `string` | `undefined` | 추가 클래스 |

**TabItem:**

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | 고유 키 |
| `label` | `string` | 레이블 |
| `disabled` | `boolean` | 비활성 |
| `badge` | `number` | 배지 카운트 |

#### Component Tree

```
<div class="w-full">

  {/* Tab List */}
  <div
    role="tablist"
    class="{scrollable ? 'overflow-x-auto [scrollbar-width:none]' : ''}
           {variant==='primary' ? 'border-b border-border flex' : 'bg-background rounded-xl p-1 flex gap-1'}
           {fullWidth ? '' : 'w-fit'}"
    aria-label="탭 목록"
  >
    {items.map(item => (
      <button
        key={item.key}
        role="tab"
        id={`tab-{item.key}`}
        aria-selected={activeKey === item.key}
        aria-controls={`panel-{item.key}`}
        tabIndex={activeKey === item.key ? 0 : -1}
        disabled={item.disabled}
        class="relative flex items-center gap-1.5 whitespace-nowrap
               transition-colors duration-150
               {sizeClass}
               {fullWidth ? 'flex-1 justify-center' : ''}
               {active ? activeClass : inactiveClass}
               {disabled ? 'text-text-disabled pointer-events-none' : ''}"
        onClick={() => onChange(item.key)}
      >
        {item.label}
        {item.badge && <Badge variant="count" count={item.badge} color="error" />}

        {/* primary variant 인디케이터 */}
        {variant === 'primary' && activeKey === item.key && (
          <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-regular" />
        )}
      </button>
    ))}
  </div>

  {/* Tab Panels */}
  {children}

</div>

크기 클래스:
  lg: h-14 px-4 typo-body1
  md: h-12 px-4 typo-label1
  sm: h-10 px-3 typo-label2

primary variant:
  active:   text-primary-regular font-semibold
  inactive: text-text-secondary font-medium

secondary variant:
  active:   bg-surface text-text-strong font-semibold rounded-lg shadow-sm
  inactive: text-text-secondary font-medium bg-transparent
```

#### States 리스트

- `active (primary)` — `text-primary-regular font-semibold` + 하단 2px 인디케이터
- `active (secondary)` — `bg-surface shadow-sm text-text-strong`
- `inactive` — `text-text-secondary font-medium`
- `disabled` — `text-text-disabled pointer-events-none`
- `hover` — frontend-dev 위임 (표준 hover opacity)

#### 파일 구조

```
src/components/Tabs/
  types.ts
  Tabs.tsx        ← 'use client' (activeKey 상태)
  TabPanel.tsx    ← Server Component 가능
  index.ts
```

---

### 8. Segmented Control

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SegmentItem[]` | (required) | 세그먼트 목록 (2~5개) |
| `value` | `string` | `undefined` | controlled 선택 값 |
| `defaultValue` | `string` | `undefined` | uncontrolled 기본값 |
| `onChange` | `(key: string) => void` | `undefined` | 변경 콜백 |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | 크기 |
| `fullWidth` | `boolean` | `false` | 전체 너비 |
| `disabled` | `boolean` | `false` | 전체 비활성 |
| `className` | `string` | `undefined` | 추가 클래스 |

**SegmentItem:**

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | 고유 키 |
| `label` | `string` | 레이블 |
| `icon` | `React.ReactNode` | 선행 아이콘 |
| `disabled` | `boolean` | 개별 비활성 |

#### Component Tree

```
<div
  role="group"
  aria-label="세그먼트 선택"
  class="relative flex bg-background rounded-xl p-1 gap-1
         {fullWidth ? 'w-full' : 'w-fit'}
         {disabled ? 'opacity-40 pointer-events-none' : ''}"
>
  {/* Sliding Indicator (absolute) */}
  <div
    class="absolute top-1 bottom-1 bg-surface rounded-lg shadow-sm
           transition-all duration-150 ease-out pointer-events-none"
    style={{ left: indicatorLeft, width: indicatorWidth }}
    aria-hidden="true"
  />

  {items.map(item => (
    <button
      key={item.key}
      role="button"
      aria-pressed={value === item.key}
      disabled={item.disabled}
      ref={refs[i]}
      class="relative z-10 flex items-center justify-center gap-1.5
             rounded-lg transition-colors duration-150
             {sizeClass}
             {fullWidth ? 'flex-1' : ''}
             {selected ? 'text-text-strong font-semibold' : 'text-text-secondary font-medium'}
             {item.disabled ? 'opacity-40 pointer-events-none' : ''}"
      onClick={() => onChange(item.key)}
    >
      {item.icon}
      {item.label}
    </button>
  ))}
</div>

크기 클래스:
  lg: h-10 px-4 typo-body1  (컨테이너 내부)
  md: h-8  px-3 typo-label1
  sm: h-7  px-2 typo-label2
```

#### States 리스트

- `selected` — sliding indicator 이동, `text-text-strong font-semibold`
- `unselected` — `text-text-secondary font-medium`, transparent bg
- `disabled (item)` — `opacity-40 pointer-events-none`
- `disabled (전체)` — 컨테이너 `opacity-40 pointer-events-none`

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 컨테이너 배경 | `bg-background` | `--background-regular` |
| 선택 배경 | `bg-surface` | `#FFFFFF` |
| 선택 텍스트 | `text-text-strong` | `--text-strong` |
| 미선택 텍스트 | `text-text-secondary` | `--text-secondary` |

#### 파일 구조

```
src/components/SegmentedControl/
  types.ts
  SegmentedControl.tsx    ← 'use client' 필수 (인디케이터 위치 계산)
  index.ts
```

---

### 9. Slider

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'range'` | `'single'` | 단일/범위 모드 |
| `min` | `number` | `0` | 최솟값 |
| `max` | `number` | `100` | 최댓값 |
| `step` | `number` | `1` | 스텝 |
| `value` | `number` | `undefined` | single controlled 값 |
| `rangeValue` | `[number, number]` | `undefined` | range controlled 값 |
| `defaultValue` | `number` | `50` | single uncontrolled 기본값 |
| `defaultRangeValue` | `[number, number]` | `[20, 80]` | range uncontrolled 기본값 |
| `onChange` | `(value: number) => void` | `undefined` | single 변경 콜백 |
| `onRangeChange` | `(value: [number, number]) => void` | `undefined` | range 변경 콜백 |
| `disabled` | `boolean` | `false` | 비활성 |
| `showTooltip` | `boolean` | `true` | 드래그 중 툴팁 |
| `showMarks` | `boolean` | `false` | 눈금 표시 |
| `marks` | `{ value: number; label?: string }[]` | `undefined` | 커스텀 눈금 |
| `aria-label` | `string` | `undefined` | 접근성 레이블 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
<div class="relative w-full {disabled ? 'opacity-40 pointer-events-none' : ''}">

  {/* Track */}
  <div
    ref={trackRef}
    class="relative h-1.5 w-full rounded-full bg-border"
  >
    {/* Active Range Fill */}
    <div
      class="absolute h-full rounded-full bg-primary-regular"
      style={{ left: fillLeft, width: fillWidth }}
    />

    {/* Thumb(s) */}
    {thumbValues.map((thumbVal, i) => (
      <div
        key={i}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={thumbVal}
        aria-valuetext={`${thumbVal}`}
        aria-label={range mode ? (i===0 ? '최솟값' : '최댓값') : aria-label}
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
               w-5 h-5 rounded-full bg-surface border-2 border-primary-regular
               shadow cursor-grab active:cursor-grabbing
               focus-visible:ring-2 focus-visible:ring-primary-regular focus-visible:ring-offset-2"
        style={{ left: `${percent}%` }}
        onPointerDown={handlePointerDown(i)}
        onKeyDown={handleKeyDown(i)}
      >
        {/* Tooltip */}
        {showTooltip && dragging && (
          <div class="absolute -top-8 left-1/2 -translate-x-1/2
                      bg-gray-900 text-on-primary typo-caption1
                      px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
            {thumbVal}
          </div>
        )}
      </div>
    ))}

    {/* Marks */}
    {showMarks && marks.map(mark => (
      <div key={mark.value} style={{ left: `${(mark.value-min)/(max-min)*100}%` }}>
        <div class="absolute w-1 h-1 rounded-full bg-border -translate-x-1/2 top-1/4" />
        {mark.label && (
          <span class="absolute top-4 -translate-x-1/2 typo-caption2 text-text-tertiary whitespace-nowrap">
            {mark.label}
          </span>
        )}
      </div>
    ))}
  </div>

</div>
```

#### States 리스트

- `single` — 썸 1개, fill = min ~ value
- `range` — 썸 2개, fill = value[0] ~ value[1]
- `dragging` — `cursor-grabbing`, showTooltip 표시
- `disabled` — `opacity-40 pointer-events-none`
- `focus` — `ring-2 ring-primary-regular ring-offset-2`

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 트랙 배경 | `bg-border` | `--border-regular` = `--gray-200` |
| 활성 트랙 | `bg-primary-regular` | `--primary-regular` = `--blue-600` |
| 썸 배경 | `bg-surface` | `#FFFFFF` |
| 썸 테두리 | `border-primary-regular` | `--primary-regular` |
| 툴팁 배경 | `bg-gray-900` | `--gray-900` |
| 툴팁 텍스트 | `text-on-primary` | `#FFFFFF` |

#### 파일 구조

```
src/components/Slider/
  types.ts
  Slider.tsx    ← 'use client' 필수
  index.ts
```

---

### 10. Tooltip

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | (required) | 툴팁 텍스트 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 툴팁 위치 |
| `trigger` | `'hover' \| 'focus' \| 'click' \| ('hover'\|'focus'\|'click')[]` | `['hover','focus']` | 트리거 방식 |
| `delay` | `number` | `200` | 표시 딜레이(ms) |
| `hideDelay` | `number` | `100` | 숨김 딜레이(ms) |
| `disabled` | `boolean` | `false` | 툴팁 비활성 |
| `maxWidth` | `number` | `200` | 최대 너비(px) |
| `children` | `React.ReactElement` | (required) | 앵커 요소 |
| `className` | `string` | `undefined` | 툴팁 추가 클래스 |

#### Component Tree

```
{/* Wrapper — 앵커 요소를 클론하여 이벤트 주입 */}
<>
  {cloneElement(children, {
    ref: anchorRef,
    onMouseEnter, onMouseLeave, onFocus, onBlur, onClick,
    'aria-describedby': tooltipId
  })}

  {visible && (
    <div
      id={tooltipId}
      role="tooltip"
      class="fixed z-50 pointer-events-none
             bg-gray-900 text-on-primary
             typo-caption1 font-medium
             px-3 py-2 rounded-lg
             animate-scale-in"
      style={{ top, left, maxWidth }}
    >
      {content}

      {/* Arrow */}
      <div
        class="absolute w-2 h-2 bg-gray-900 rotate-45 {arrowPositionClass}"
        aria-hidden="true"
      />
    </div>
  )}
</>

화살표 위치 클래스:
  top:    bottom-[-4px] left-1/2 -translate-x-1/2
  bottom: top-[-4px]    left-1/2 -translate-x-1/2
  left:   right-[-4px]  top-1/2  -translate-y-1/2
  right:  left-[-4px]   top-1/2  -translate-y-1/2
```

#### States 리스트

- `visible` — `animate-scale-in`, `z-50`, fixed 위치
- `hidden` — 언마운트 (조건부 렌더링)
- `flip` — 뷰포트 넘침 감지 시 반대 placement로 자동 전환
- `disabled` — 이벤트 핸들러 미주입

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 배경 | `bg-gray-900` | `--gray-900` = `#262F3C` |
| 텍스트 | `text-on-primary` | `#FFFFFF` |
| border-radius | `rounded-lg` | 8px |
| z-index | `z-50` | — |

#### 파일 구조

```
src/components/Tooltip/
  types.ts
  Tooltip.tsx    ← 'use client' 필수
  index.ts
```

---

### 11. Date Picker

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'range'` | `'single'` | 선택 모드 |
| `value` | `Date \| null` | `undefined` | single controlled 값 |
| `rangeValue` | `{ start: Date\|null; end: Date\|null }` | `undefined` | range controlled 값 |
| `onChange` | `(date: Date\|null) => void` | `undefined` | single 변경 콜백 |
| `onRangeChange` | `(range: {start,end}) => void` | `undefined` | range 변경 콜백 |
| `minDate` | `Date` | `undefined` | 최소 선택 날짜 |
| `maxDate` | `Date` | `undefined` | 최대 선택 날짜 |
| `disabledDates` | `Date[]` | `[]` | 비활성 날짜 목록 |
| `placeholder` | `string` | `'날짜를 선택하세요'` | 플레이스홀더 |
| `disabled` | `boolean` | `false` | 비활성 |
| `inline` | `boolean` | `false` | 인라인 항상 표시 |
| `locale` | `string` | `'ko-KR'` | 로케일 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[inline=false (기본)]
<div class="relative w-full">

  {/* Trigger Input */}
  <button
    type="button"
    class="w-full flex items-center gap-2 h-12 px-4 rounded-xl
           bg-surface border border-border
           typo-body1 text-text-primary
           {disabled ? 'opacity-40 pointer-events-none' : ''}
           {open ? 'border-primary-regular' : 'border-border'}"
    onClick={() => setOpen(!open)}
    aria-label="날짜 선택"
    aria-expanded={open}
    aria-haspopup="dialog"
  >
    <CalendarIcon class="w-5 h-5 text-text-tertiary" />
    <span class="{value ? 'text-text-primary' : 'text-text-tertiary'}">
      {formattedValue || placeholder}
    </span>
  </button>

  {/* Calendar Dropdown (Portal) */}
  {open && (
    <div
      role="dialog"
      aria-label="날짜 선택 달력"
      aria-modal="true"
      class="absolute top-full left-0 mt-2 z-50
             bg-surface rounded-2xl shadow-lg border border-border
             w-[320px] p-4"
    >
      <Calendar ... />
    </div>
  )}
</div>

[Calendar 내부]
<div>
  {/* Header: 월 이동 */}
  <div class="flex items-center justify-between mb-4">
    <button aria-label="이전 달"><ChevronLeftIcon /></button>
    <button class="typo-headline2 font-semibold text-text-strong">
      {year}년 {month}월
    </button>
    <button aria-label="다음 달"><ChevronRightIcon /></button>
  </div>

  {/* 요일 헤더 */}
  <div role="row" class="grid grid-cols-7 mb-2">
    {['일','월','화','수','목','금','토'].map(day => (
      <div role="columnheader" class="text-center typo-caption1 text-text-tertiary py-1">{day}</div>
    ))}
  </div>

  {/* 날짜 그리드 */}
  <div role="grid" class="grid grid-cols-7 gap-y-1">
    {calendarDates.map(date => (
      <button
        role="gridcell"
        aria-selected={isSelected(date)}
        aria-disabled={isDisabled(date)}
        class="relative flex items-center justify-center h-9 w-full rounded-full
               {selected ? 'bg-primary-regular text-on-primary' : ''}
               {inRange ? 'bg-status-info-light' : ''}
               {isToday ? 'font-bold' : ''}
               {isDisabled ? 'text-text-disabled line-through pointer-events-none' : ''}
               {outsideMonth ? 'text-text-disabled opacity-40' : 'text-text-primary'}
               typo-label1"
        onClick={() => handleDateClick(date)}
      >
        {date.getDate()}
        {isToday && (
          <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-regular" />
        )}
      </button>
    ))}
  </div>
</div>
```

#### States 리스트 (날짜 셀)

- `default` — `text-text-primary`
- `today` — `font-bold` + dot indicator
- `selected` — `bg-primary-regular text-on-primary`
- `range-start / range-end` — `bg-primary-regular text-on-primary`
- `in-range` — `bg-status-info-light` (`--blue-50`)
- `disabled` — `text-text-disabled line-through pointer-events-none`
- `outside-month` — `opacity-40`

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 드롭다운 배경 | `bg-surface` | `#FFFFFF` |
| 트리거 테두리(기본) | `border-border` | `--border-regular` |
| 트리거 테두리(오픈) | `border-primary-regular` | `--primary-regular` |
| 선택 배경 | `bg-primary-regular` | `--blue-600` |
| 범위 내 배경 | `bg-status-info-light` | `--blue-50` |
| 비활성 텍스트 | `text-text-disabled` | `--gray-500` |

#### 파일 구조

```
src/components/DatePicker/
  types.ts
  DatePicker.tsx     ← 'use client' 필수
  Calendar.tsx       ← 'use client' (내부 상태)
  utils.ts           ← Server 유틸 (순수 함수)
  index.ts
```

---

## Priority 3

---

### 12. Stepper

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepItem[]` | (required) | 스텝 목록 |
| `activeStep` | `number` | `0` | 현재 활성 인덱스 (0-based) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `clickable` | `boolean` | `false` | 완료 스텝 클릭 허용 |
| `onStepClick` | `(index: number) => void` | `undefined` | 스텝 클릭 콜백 |
| `className` | `string` | `undefined` | 추가 클래스 |

**StepItem:**

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | 스텝 레이블 |
| `description` | `string` | 서브레이블 |
| `status` | `'completed'\|'current'\|'upcoming'\|'error'` | 강제 상태 (없으면 자동) |
| `icon` | `React.ReactNode` | 커스텀 아이콘 |

#### Component Tree

```
<ol
  role="list"
  class="{orientation==='horizontal' ? 'flex items-center' : 'flex flex-col'}"
>
  {steps.map((step, index) => {
    const status = step.status ?? deriveStatus(index, activeStep);
    return (
      <li role="listitem" key={index}
          class="{horizontal ? 'flex-1 flex items-center' : 'flex gap-3'}">

        {/* Step Indicator */}
        <button
          aria-label={`스텝 ${index+1}: ${step.label} - ${status}`}
          aria-current={status==='current' ? 'step' : undefined}
          disabled={!clickable || status !== 'completed'}
          onClick={() => clickable && status==='completed' && onStepClick(index)}
          class="w-8 h-8 rounded-full flex items-center justify-center
                 flex-shrink-0 typo-label1 font-semibold
                 transition-colors duration-200
                 {statusClass[status]}"
        >
          {step.icon ?? (
            status === 'completed' ? <CheckIcon class="w-4 h-4" /> :
            status === 'error'     ? <ErrorIcon class="w-4 h-4" /> :
                                     index + 1
          )}
        </button>

        {/* Label (horizontal: below, vertical: right) */}
        <div class="{horizontal ? 'mt-2 text-center' : 'py-1'}">
          <p class="typo-label1 font-medium
                    {status==='upcoming' ? 'text-text-disabled' : 'text-text-primary'}">
            {step.label}
          </p>
          {step.description && (
            <p class="typo-caption1 text-text-tertiary">{step.description}</p>
          )}
        </div>

        {/* Connector (마지막 스텝 제외) */}
        {index < steps.length - 1 && (
          <div class="{horizontal ? 'flex-1 h-px mx-2' : 'w-px ml-4 h-6 my-1'}
                      {status==='completed' ? 'bg-primary-regular' : 'bg-border'}" />
        )}
      </li>
    );
  })}
</ol>

statusClass 매핑:
  completed: bg-primary-regular text-on-primary
  current:   bg-surface border-2 border-primary-regular text-primary-regular
  upcoming:  bg-surface border-2 border-border text-text-disabled
  error:     bg-status-negative text-on-primary
```

#### States 리스트

- `completed` — `bg-primary-regular text-on-primary` + CheckIcon
- `current` — `bg-surface border-2 border-primary-regular text-primary-regular`
- `upcoming` — `bg-surface border-2 border-border text-text-disabled`
- `error` — `bg-status-negative text-on-primary` + ErrorIcon
- 연결선(completed) — `bg-primary-regular`
- 연결선(미완료) — `bg-border`

#### 파일 구조

```
src/components/Stepper/
  types.ts
  Stepper.tsx      ← Server Component 가능 (clickable=true면 'use client')
  StepItem.tsx     ← 개별 스텝 (분리 권장)
  index.ts
```

---

### 13. Page Control

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | (required) | 전체 페이지 수 |
| `current` | `number` | (required) | 현재 페이지 (0-based) |
| `onChange` | `(index: number) => void` | `undefined` | 변경 콜백 |
| `variant` | `'dot' \| 'bar' \| 'number'` | `'dot'` | 표시 형태 |
| `clickable` | `boolean` | `false` | 클릭 가능 여부 |
| `maxVisible` | `number` | `7` | 최대 표시 dot 수 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
[variant=dot]
<div
  role="group"
  aria-label="페이지 인디케이터"
  class="flex items-center gap-2"
>
  {visibleDots.map((dotIndex, i) => (
    <button
      key={dotIndex}
      aria-label={`페이지 ${dotIndex+1}`}
      aria-current={dotIndex === current ? 'true' : undefined}
      disabled={!clickable}
      onClick={() => clickable && onChange(dotIndex)}
      class="rounded-full transition-all duration-200
             {dotIndex === current
               ? 'w-2.5 h-2.5 bg-primary-regular'
               : isAdjacent ? 'w-1.5 h-1.5 bg-border opacity-60'
                            : 'w-1 h-1 bg-border opacity-30'}"
    />
  ))}
</div>

[variant=bar]
<div class="flex items-center gap-1.5">
  {Array(total).fill(0).map((_, i) => (
    <div
      key={i}
      class="h-2 rounded-full transition-all duration-300
             {i === current
               ? 'w-6 bg-primary-regular'
               : 'w-2 bg-border'}"
    />
  ))}
</div>

[variant=number]
<span class="typo-label1 text-text-secondary">
  <span class="text-text-strong font-semibold">{current+1}</span>
  &nbsp;/&nbsp;{total}
</span>
```

#### States 리스트

- `dot active` — `w-2.5 h-2.5 bg-primary-regular`
- `dot inactive` — `w-2 h-2 bg-border`
- `dot adjacent (maxVisible 초과 시)` — `w-1.5 h-1.5 opacity-60`
- `dot far (maxVisible 초과 시)` — `w-1 h-1 opacity-30`
- `bar active` — `w-6 bg-primary-regular`
- `bar inactive` — `w-2 bg-border`

#### 파일 구조

```
src/components/PageControl/
  types.ts
  PageControl.tsx     ← Server Component (clickable=true면 'use client')
  index.ts
```

---

### 14. Action Sheet

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | 열림 여부 |
| `onClose` | `() => void` | (required) | 닫기 콜백 |
| `title` | `string` | `undefined` | 시트 제목 |
| `description` | `string` | `undefined` | 시트 설명 |
| `items` | `ActionSheetItem[]` | (required) | 액션 아이템 목록 |
| `cancelLabel` | `string` | `'취소'` | 취소 버튼 레이블 |
| `hideCancel` | `boolean` | `false` | 취소 버튼 숨김 |
| `closeOnBackdropClick` | `boolean` | `true` | 딤드 클릭 닫기 |

**ActionSheetItem:**

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | 아이템 레이블 |
| `variant` | `'default'\|'destructive'\|'disabled'` | 색상 변형 |
| `icon` | `React.ReactNode` | 선행 아이콘 |
| `onClick` | `() => void` | 클릭 콜백 |

#### Component Tree

```
[Portal → document.body]
<div class="fixed inset-0 z-50">

  {/* Backdrop */}
  <div
    class="absolute inset-0"
    style={{ backgroundColor: 'var(--dimmed-regular)' }}
    onClick={closeOnBackdropClick ? onClose : undefined}
  />

  {/* Sheet Container */}
  <div
    class="absolute bottom-0 left-0 right-0 p-4 pb-safe flex flex-col gap-3
           transition-transform duration-300 ease-out
           {open ? 'translate-y-0' : 'translate-y-full'}"
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? 'action-sheet-title' : undefined}
    aria-label={!title ? '액션 선택' : undefined}
  >

    {/* Main Card */}
    <div class="bg-surface rounded-2xl overflow-hidden">

      {/* Title/Description (있을 때) */}
      {(title || description) && (
        <div class="px-4 pt-4 pb-2 text-center">
          {title && <h2 id="action-sheet-title" class="typo-label1 font-semibold text-text-secondary">{title}</h2>}
          {description && <p class="typo-caption1 text-text-tertiary mt-1">{description}</p>}
        </div>
      )}

      {/* Items */}
      {items.map((item, i) => (
        <>
          {i > 0 && <Divider strength="weak" />}
          <button
            key={item.label}
            disabled={item.variant === 'disabled'}
            onClick={() => { item.onClick?.(); onClose(); }}
            class="w-full h-14 px-4 flex items-center justify-center gap-3
                   typo-body1
                   {item.variant === 'destructive' ? 'text-status-negative font-medium'
                    : item.variant === 'disabled'  ? 'text-text-disabled pointer-events-none'
                    :                                'text-text-primary font-medium'}"
          >
            {item.icon}
            {item.label}
          </button>
        </>
      ))}
    </div>

    {/* Cancel Card */}
    {!hideCancel && (
      <div class="bg-surface rounded-2xl overflow-hidden">
        <button
          class="w-full h-14 typo-body1 font-semibold text-primary-regular
                 flex items-center justify-center"
          onClick={onClose}
        >
          {cancelLabel}
        </button>
      </div>
    )}

  </div>
</div>
```

#### States 리스트

- `open=true` — `translate-y-0`, backdrop visible
- `open=false` — `translate-y-full`
- `destructive item` — `text-status-negative font-medium`
- `disabled item` — `text-text-disabled pointer-events-none`
- Escape 키 — `onClose()` 호출

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 카드 배경 | `bg-surface` | `#FFFFFF` |
| 딤드 | inline style `var(--dimmed-regular)` | `rgba(0,0,0,0.44)` |
| 기본 아이템 | `text-text-primary` | `--gray-800` |
| 파괴적 아이템 | `text-status-negative` | `--red-600` |
| 비활성 아이템 | `text-text-disabled` | `--gray-500` |
| 취소 버튼 | `text-primary-regular font-semibold` | `--blue-600` |
| 아이템 구분선 | `<Divider strength="weak">` | `--gray-100` |

#### 파일 구조

```
src/components/ActionSheet/
  types.ts
  ActionSheet.tsx    ← 'use client' 필수
  index.ts
```

---

### 15. Accordion

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | (required) | 아이템 목록 |
| `mode` | `'single' \| 'multiple'` | `'single'` | 열기 모드 |
| `value` | `string \| null` | `undefined` | controlled (single) |
| `values` | `string[]` | `undefined` | controlled (multiple) |
| `defaultValue` | `string` | `undefined` | uncontrolled (single) |
| `defaultValues` | `string[]` | `undefined` | uncontrolled (multiple) |
| `onChange` | `(key: string\|null) => void` | `undefined` | single 변경 콜백 |
| `onMultiChange` | `(keys: string[]) => void` | `undefined` | multiple 변경 콜백 |
| `showDivider` | `boolean` | `true` | 아이템 간 구분선 |
| `bordered` | `boolean` | `false` | 테두리 스타일 |
| `className` | `string` | `undefined` | 추가 클래스 |

**AccordionItem:**

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | 고유 키 |
| `label` | `string` | 헤더 레이블 |
| `sublabel` | `string` | 헤더 서브레이블 |
| `leadingIcon` | `React.ReactNode` | 선행 아이콘 |
| `content` | `React.ReactNode` | 펼침 콘텐츠 |
| `disabled` | `boolean` | 비활성 |

#### Component Tree

```
<div
  role="list"
  class="{bordered ? 'border border-border rounded-xl overflow-hidden' : ''}
         {className}"
>
  {items.map((item, i) => {
    const isExpanded = openKeys.includes(item.key);
    const headerId = `accordion-header-{item.key}`;
    const panelId  = `accordion-panel-{item.key}`;

    return (
      <div key={item.key} role="listitem">
        {i > 0 && showDivider && <Divider strength="weak" />}

        {/* Header Button */}
        <button
          id={headerId}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          disabled={item.disabled}
          onClick={() => handleToggle(item.key)}
          class="w-full flex items-center gap-3 px-4 py-4
                 bg-surface text-left
                 {item.disabled ? 'opacity-40 pointer-events-none' : ''}
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-regular"
        >
          {item.leadingIcon && (
            <span class="flex-shrink-0 text-text-secondary">{item.leadingIcon}</span>
          )}
          <div class="flex-1 min-w-0">
            <p class="typo-body1 font-medium text-text-primary">{item.label}</p>
            {item.sublabel && (
              <p class="typo-caption1 text-text-tertiary">{item.sublabel}</p>
            )}
          </div>
          {/* Chevron Icon */}
          <ChevronDownIcon
            class="w-5 h-5 text-text-tertiary flex-shrink-0
                   transition-transform duration-250
                   {isExpanded ? 'rotate-180' : 'rotate-0'}"
          />
        </button>

        {/* Content Panel — CSS Grid trick */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          class="grid transition-all duration-250 ease-out overflow-hidden
                 {isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}"
        >
          <div class="overflow-hidden">
            <div class="px-4 pb-4 typo-body1 text-text-primary">
              {item.content}
            </div>
          </div>
        </div>

      </div>
    );
  })}
</div>
```

#### States 리스트

- `collapsed` — `grid-rows-[0fr]`, ChevronDown 0도
- `expanded` — `grid-rows-[1fr]`, ChevronDown 180도 (`rotate-180`)
- `disabled` — `opacity-40 pointer-events-none`
- `bordered` — `border border-border rounded-xl`
- `single mode` — 다른 아이템 열면 이전 것 자동 닫힘
- `multiple mode` — 여러 아이템 동시 열림 가능

#### 디자인 토큰 매핑

| 요소 | 토큰 클래스 | 값 |
|------|------------|-----|
| 헤더 배경 | `bg-surface` | `#FFFFFF` |
| 헤더 텍스트 | `text-text-primary` | `--gray-800` |
| 서브레이블 | `text-text-tertiary` | `--gray-550` |
| 화살표 아이콘 | `text-text-tertiary` | `--gray-550` |
| 구분선 | `<Divider strength="weak">` | `--gray-100` |
| 테두리(bordered) | `border-border` | `--border-regular` |
| 콘텐츠 텍스트 | `text-text-primary` | `--gray-800` |

#### 파일 구조

```
src/components/Accordion/
  types.ts
  Accordion.tsx       ← 'use client' 필수
  AccordionItem.tsx   ← 분리 (300줄 제한)
  index.ts
```

---

## 컴포넌트 의존성 그래프

```
Divider ──┬──► ActionSheet
          └──► Accordion
               Tabs

Badge ──► Tabs (선택적)

Tooltip ──► Slider (showTooltip)

Divider (P1) ──► ActionSheet (P3)
Divider (P1) ──► Accordion (P3)
Tooltip (P2) ──► Slider (P2)
```

## 구현 순서 (의존성 기준)

| 순서 | 컴포넌트 | Priority | 선행 필요 |
|------|---------|---------|---------|
| 1 | Divider | P1 | 없음 |
| 2 | Skeleton | P1 | 없음 |
| 3 | Badge | P1 | 없음 |
| 4 | BottomSheet | P1 | 없음 |
| 5 | SearchBar | P1 | Icons |
| 6 | FAB | P1 | Icons |
| 7 | Tooltip | P2 | 없음 |
| 8 | Tabs | P2 | Badge |
| 9 | SegmentedControl | P2 | 없음 |
| 10 | Slider | P2 | Tooltip |
| 11 | DatePicker | P2 | InputField, Icons |
| 12 | Stepper | P3 | Icons |
| 13 | PageControl | P3 | 없음 |
| 14 | ActionSheet | P3 | Divider, BottomSheet 패턴 |
| 15 | Accordion | P3 | Divider, Icons |

## globals.css 신규 토큰 요약

| 추가 위치 | 토큰 | 값 |
|---------|------|-----|
| `:root` | (기존 `--divider-weak` 이미 있음) | 확인됨 |
| `@theme inline` | `--color-divider-weak` | `var(--divider-weak)` |
| `@theme inline` | `--color-status-info-light` | `var(--status-info-light)` |
| `@theme inline` Animations | `--animate-shimmer` | `shimmer 1.5s ease-in-out infinite` |
| `@theme inline` Animations | `--animate-bottom-sheet-in` | `bottom-sheet-in 300ms ease-out` |
| `@theme inline` Animations | `--animate-fade-in` | `fade-in 150ms ease-out` |
| `@theme inline` Animations | `--animate-scale-in` | `scale-in 150ms ease-out` |
| `@keyframes` | `shimmer` | bg-position sweep |
| `@keyframes` | `bottom-sheet-in/out` | translateY 0~100% |
| `@keyframes` | `fade-in/out` | opacity 0~1 |
| `@keyframes` | `scale-in` | opacity+scale 0.95~1 |
| `@utility` | `skeleton-base` | gradient bg for shimmer |
| `@utility` | `animate-shimmer` | animation var 적용 |

