# Tag / TagGroup Components Design Spec

## 사전 조건: @theme inline 추가 토큰

`globals.css`의 `:root` 블록에 아래 팔레트 토큰 추가 필요:

```css
:root {
  /* Tag에서 사용하는 -600 팔레트 (fill-light/fill-dark accent) */
  --indigo-600: #3554F8;
  --blue-600: #0069FF;  /* 이미 존재하면 skip */
}
```

`globals.css`의 `:root` 시맨틱 토큰 블록에 추가:

```css
:root {
  /* Tag Accent (강조 색상 -- fill-light 텍스트, fill-dark 배경) */
  --accent-blue: var(--blue-600);
  /* 기존 accent-indigo는 --indigo-500 참조 중. Tag 스펙에서는 --indigo-600 사용 */
}
```

`globals.css`의 `@theme inline` 블록에 추가:

```css
@theme inline {
  /* Accent -- Tag fill-dark 배경, fill-light 텍스트에 사용 */
  --color-accent-blue: var(--blue-600);
  --color-accent-red-orange: var(--accent-red-orange);

  /* Gray palette (divider 텍스트) */
  --color-gray-500: var(--gray-500);

  /* Tag accent 600 계열 (fill-light / fill-dark 전용) */
  --color-indigo-600: var(--indigo-600);
  --color-blue-600: var(--blue-600);
  --color-red-500: var(--red-500);
  --color-orange-500: var(--orange-500);
  --color-green-500: var(--green-500);
  --color-lightblue-500: var(--lightblue-500);
  --color-purple-500: var(--purple-500);
  --color-magenta-500: var(--magenta-500);
  --color-cyan-500: var(--cyan-500);
  --color-lime-500: var(--lime-500);
  --color-redorange-500: var(--redorange-500);
  --color-gray-500-text: var(--gray-500);
}
```

> 이미 등록된 토큰은 중복 추가하지 않는다. 실제 구현 시 기존 `@theme inline` 블록을 확인 후 누락분만 추가할 것.

---

## 1. Tag

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'fill-light' \| 'fill-dark' \| 'fill' \| 'outlined' \| 'text'` | `'fill'` | 컨테이너 스타일 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 크기 (높이 20/24/28px) |
| `bold` | `boolean` | `false` | `true` 시 SemiBold(600), `false` 시 size별 기본 weight |
| `color` | `'indigo' \| 'blue' \| 'red' \| 'orange' \| 'green' \| 'lightblue' \| 'purple' \| 'magenta' \| 'cyan' \| 'lime' \| 'redorange' \| 'gray'` | `'indigo'` | 강조 색상 (아이콘/텍스트/배경에 type별로 적용) |
| `label` | `string` | (required) | 라벨 텍스트 |
| `leadingIcon` | `React.ReactNode` | `undefined` | 왼쪽 아이콘 |
| `showLeadingIcon` | `boolean` | `true` | 왼쪽 아이콘 표시 여부. `false` 시 leadingIcon이 있어도 숨김 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Color-to-Token 매핑

| color prop | Accent Token (CSS 변수) | Tailwind 유틸리티 접두사 |
|------------|------------------------|------------------------|
| `indigo` | `--indigo-600` (#3554F8) | `text-[var(--indigo-600)]` / `bg-[var(--indigo-600)]` |
| `blue` | `--blue-600` (#0069FF) | `text-[var(--blue-600)]` / `bg-[var(--blue-600)]` |
| `red` | `--red-500` (#FF3A5B) | `text-accent-red` / `bg-accent-red` |
| `orange` | `--orange-500` (#FF8800) | `text-accent-orange` / `bg-accent-orange` |
| `green` | `--green-500` (#04CA81) | `text-accent-green` / `bg-accent-green` |
| `lightblue` | `--lightblue-500` (#00AEFF) | `text-accent-light-blue` / `bg-accent-light-blue` |
| `purple` | `--purple-500` (#956BFF) | `text-accent-purple` / `bg-accent-purple` |
| `magenta` | `--magenta-500` (#FF4397) | `text-accent-magenta` / `bg-accent-magenta` |
| `cyan` | `--cyan-500` (#01C9D7) | `text-accent-cyan` / `bg-accent-cyan` |
| `lime` | `--lime-500` (#8AD510) | `text-accent-lime` / `bg-accent-lime` |
| `redorange` | `--redorange-500` (#FF7017) | `text-accent-red-orange` / `bg-accent-red-orange` |
| `gray` | `--gray-500` (#99A1B1) | `text-text-tertiary` / `bg-text-tertiary` |

> `indigo`와 `blue`는 `-600` 계열을 사용하므로 시맨틱 accent 토큰이 아닌 팔레트 변수를 직접 참조한다.
> `gray`는 `--gray-500`으로 `--text-tertiary`와 동일하므로 시맨틱 토큰 `text-tertiary`를 활용한다.

### Size 매핑

| Size | Height | Vertical Padding | Font (Regular / bold=false) | Font (Bold / bold=true) | Icon Size | Tailwind Height |
|------|--------|------------------|-----------------------------|-------------------------|-----------|-----------------|
| `sm` | 20px | 2px | Caption4: 10px/16px, Regular(400) | Caption3: 10px/16px, SemiBold(600) | 12px | `h-5` |
| `md` | 24px | 2px | Caption2: 12px/18px, Medium(500) | Caption1: 12px/18px, SemiBold(600) | 12px | `h-6` |
| `lg` | 28px | 2px | Body4: 13px/20px, Regular(400) | Title4: 13px/20px, SemiBold(600) | 14px | `h-7` |

### Padding 매핑 (아이콘 유무에 따라 좌측 패딩 변동)

| Size | 아이콘 있을 때 (pl) | 텍스트만 있을 때 (pl) | 우측 패딩 (pr) | Tailwind (아이콘 O) | Tailwind (아이콘 X) |
|------|---------------------|---------------------|----------------|---------------------|---------------------|
| `sm` | 6px | 8px | 8px | `pl-[6px] pr-2` | `pl-2 pr-2` |
| `md` | 8px | 10px | 10px | `pl-2 pr-[10px]` | `pl-[10px] pr-[10px]` |
| `lg` | 10px | 12px | 12px | `pl-[10px] pr-3` | `pl-3 pr-3` |

### Type x Style 매핑

| Type | Background | Text Color | Border | Icon Color |
|------|-----------|------------|--------|------------|
| `fill-light` | `bg-white` | accent color (`text-{accent}`) | none | accent color |
| `fill-dark` | accent color (`bg-{accent}`) | `text-white` | none | `text-white` |
| `fill` | `bg-gray-100` | accent color (`text-{accent}`) | none | accent color |
| `outlined` | `bg-white` | `text-text-primary` | `border border-divider` | accent color |
| `text` | `bg-transparent` | `text-text-primary` | none | accent color |

### Component Tree

```
<span>                                   <- 루트. 읽기 전용 라벨
│                                           base: inline-flex items-center
│                                                 rounded-full whitespace-nowrap
│                                                 cursor-default select-none
│
│  -- SIZE 클래스 --
│     sm: h-5  py-[2px] text-[10px] leading-[16px]
│     md: h-6  py-[2px] text-[12px] leading-[18px]
│     lg: h-7  py-[2px] text-[13px] leading-[20px]
│
│  -- FONT WEIGHT 클래스 --
│     sm + bold=false: font-normal    (Regular 400)
│     sm + bold=true:  font-semibold  (SemiBold 600)
│     md + bold=false: font-medium    (Medium 500)
│     md + bold=true:  font-semibold  (SemiBold 600)
│     lg + bold=false: font-normal    (Regular 400)
│     lg + bold=true:  font-semibold  (SemiBold 600)
│
│  -- PADDING 클래스 (동적: showIcon = leadingIcon && showLeadingIcon) --
│     sm + showIcon:  pl-[6px] pr-2
│     sm + !showIcon: pl-2 pr-2
│     md + showIcon:  pl-2 pr-[10px]
│     md + !showIcon: pl-[10px] pr-[10px]
│     lg + showIcon:  pl-[10px] pr-3
│     lg + !showIcon: pl-3 pr-3
│
│  -- TYPE x COLOR 클래스 --
│     fill-light: bg-white text-{accent}
│     fill-dark:  bg-{accent} text-white
│     fill:       bg-gray-100 text-{accent}
│     outlined:   bg-white border border-divider text-text-primary
│     text:       bg-transparent text-text-primary
│
├─ {leadingIcon && showLeadingIcon &&
│   <span>}                              <- 아이콘 래퍼
│     │                                     flex-shrink-0 mr-1
│     │                                     aria-hidden="true"
│     │  -- SIZE별 아이콘 크기 --
│     │     sm: [&>svg]:w-3 [&>svg]:h-3       (12px)
│     │     md: [&>svg]:w-3 [&>svg]:h-3       (12px)
│     │     lg: [&>svg]:w-3.5 [&>svg]:h-3.5   (14px)
│     │  -- 아이콘 색상 --
│     │     fill-light: text-{accent}  (부모 상속)
│     │     fill-dark:  text-white     (부모 상속)
│     │     fill:       text-{accent}  (부모 상속)
│     │     outlined:   text-{accent}  (명시 지정 -- 부모는 text-primary)
│     │     text:       text-{accent}  (명시 지정 -- 부모는 text-primary)
│     └─ {leadingIcon}
│
├─ <span>                                <- 라벨 텍스트
│     {label}
│
</span>
```

> `mr-1` (4px) = 아이콘과 라벨 사이 gutter. 아이콘 미표시 시 래퍼 자체가 렌더링되지 않으므로 gutter 0px 자동 처리.
> `outlined`/`text` 타입에서 아이콘 색상은 부모 `text-text-primary`와 다르므로, 아이콘 래퍼에 accent color 클래스를 명시 지정해야 한다.

### States 리스트

- **Default**: 유일한 상태. 읽기 전용이므로 hover/pressed/selected/disabled 없음
- `cursor-default` -- 클릭 불가 시각적 표시
- `select-none` -- 텍스트 선택 방지 (선택적)
- 포커스 링 없음 -- tabindex 미설정, 키보드 탐색 대상 아님

---

## 2. TagGroup

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'fill-light' \| 'fill-dark' \| 'fill' \| 'outlined' \| 'basic'` | `'fill'` | 자식 Tag의 type 결정 |
| `showDivider` | `boolean` | `false` | Tag 사이 구분자 표시 여부 |
| `dividerStyle` | `'dot' \| 'slash'` | `'dot'` | 구분자 스타일 (`showDivider=true` 시 적용) |
| `gap` | `number` | `8` | Tag 간 간격 (px) |
| `children` | `React.ReactNode` | (required) | 자식 Tag 요소들 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### TagGroup type -> 자식 Tag type 매핑

| TagGroup `type` | 자식 Tag `type` |
|-----------------|-----------------|
| `fill-light` | `fill-light` |
| `fill-dark` | `fill-dark` |
| `fill` | `fill` |
| `outlined` | `outlined` |
| `basic` | `text` |

### Divider 스타일

| `dividerStyle` | 렌더링 문자 | 색상 | Tailwind |
|----------------|------------|------|----------|
| `dot` | ` · ` (middle dot, U+00B7) | `--gray-500` | `text-text-tertiary` |
| `slash` | ` / ` | `--gray-500` | `text-text-tertiary` |

### Component Tree

```
<div>                                    <- 루트 컨테이너
│                                           base: inline-flex flex-wrap items-center
│                                           role="group"
│
│  -- GAP --
│     gap-2 (기본 8px)
│     또는 style={{ gap: `${gap}px` }} (gap !== 8 시)
│
│  -- children 렌더링 로직 --
│     showDivider=false:
│       {children} 그대로 렌더링
│
│     showDivider=true:
│       children를 React.Children.toArray()로 순회하며
│       각 child 사이에 Divider 삽입
│
├─ {child[0]}                            <- Tag
│
├─ {showDivider &&
│   <span>}                              <- Divider
│     │                                     text-text-tertiary
│     │                                     text-[12px] leading-[18px]
│     │                                     aria-hidden="true"
│     │                                     select-none
│     └─ {"·"} 또는 {"/"}
│
├─ {child[1]}                            <- Tag
│
├─ {showDivider && <span>}               <- Divider (반복)
│
├─ {child[2]}                            <- Tag
│
</div>
```

> TagGroup은 `type` prop을 React Context 또는 `React.Children.map` + `cloneElement`로 자식 Tag에 전달한다.
> Context 방식 권장: `TagGroupContext`를 생성하고 Tag 내부에서 `useContext`로 group type을 읽어 자체 type을 오버라이드.

### States 리스트

- **Default**: 유일한 상태. 정적 레이아웃 컨테이너
- `flex-wrap` -- 4개 이상 Tag 시 자동 줄바꿈
- Divider는 시각적 구분 목적이므로 `aria-hidden="true"` 적용

---

## 접근성 체크리스트

| 항목 | 구현 방법 |
|------|-----------|
| 시맨틱 HTML | Tag: `<span>` (읽기 전용, 인터랙션 없음) |
| 키보드 | 포커스/키보드 인터랙션 불필요. `tabindex` 미설정 |
| 아이콘 | Leading Icon 래퍼에 `aria-hidden="true"` |
| Divider | `aria-hidden="true"` -- 시각적 구분 목적 |
| TagGroup | `role="group"` + `aria-label` 속성 부여 |
| 색상 대비 | fill-light: indigo-600 on white = 4.63:1 (AA). outlined/text: gray-800 on white = 9.73:1 (AAA) |
| 스크린리더 | `<span>` 내 label 텍스트 자연스럽게 읽힘 |
