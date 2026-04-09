# Tag Component Spec -- DS_2

## Summary

DS_2 디자인 시스템의 Tag / Tag Group 컴포넌트를 Next.js + Tailwind CSS 웹 컴포넌트로 구현한다. 총 2개의 하위 컴포넌트로 구성된다:

1. **Tag** -- 읽기 전용 라벨로, 상품이나 콘텐츠의 특성을 강조하여 식별할 때 사용한다
2. **TagGroup** -- 여러 Tag를 나열하고 선택적으로 Divider(구분자)를 포함하는 컨테이너

Tag는 Chip과 달리 **읽기 전용(non-interactive)**이다. 사용자가 선택/해제할 수 없으며, 상태 표시, 카테고리 분류, 속성 강조 등 정보 전달 목적으로만 사용한다.

모든 컴포넌트는 DS_2 시맨틱 토큰 기반으로 색상을 적용하며, 접근성(WCAG 2.1 AA)을 준수한다.

---

## Figma Reference

- **파일**: [DS_2](https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/)
- **Tag/Tag Group 페이지**: Node ID `698:69184`
- **하위 섹션**:
  - Master Component: Section `38266:18285`
  - Design Components (UI component): Section `38266:18223`
  - Tag item Usage Guide: Frame `38266:18630`
  - Tag Group Usage Guide: Frame `39195:92928`
  - Principle: Section `38266:19117`

### Figma에서 확인한 컴포넌트 구조

**Tag item 구조** (3개 요소):
1. **Container** -- Tag 컴포넌트의 기본 구조 요소. 선택/활성 상태를 가지지 않는다.
2. **Leading Icon** (Optional) -- 레이블 앞에 위치하는 선택적 요소. 노출 여부 선택 가능 (True/False).
3. **Label** (Required) -- Tag의 의미를 전달하는 핵심 요소. 필수 구성요소이다.

**Tag item 타입 (Container 기준)**:
| 타입 | 설명 |
|------|------|
| Fill-Light | 배경 하양(white) + 텍스트 진한(accent color). 밝은 배경 위에서 사용 |
| Fill-Dark | 배경 진한(accent color) + 텍스트 밝은(white). 강한 강조가 필요할 때 사용 |
| Fill | 배경이 채워진 카드 형태(gray-100). 수평 또는 상하를 묶어 목적 별 사용한다 |
| Outlined | 구분선 필요하거나 강조는 약하게 하고 싶은 경우 사용한다 |
| Text | 최소한의 장식 표기 또는 공간 제약이 큰 경우 사용한다 |

**Tag Group 타입**:
| 타입 | 설명 |
|------|------|
| Fill | Tag Group에서 Fill 스타일 Tag 사용 |
| Outlined | Tag Group에서 Outlined 스타일 Tag 사용 |
| Basic | Tag Group에서 Text 스타일 Tag 사용 |

**Tag Group Divider**:
- Divider: True / False -- Tag 사이에 구분자 표시 여부
- Divider 스타일: Dot ( · ) 또는 Slash ( / )

---

## Component API

### 1. Tag

읽기 전용 라벨. 상품 속성, 카테고리, 상태 표시에 사용.

```tsx
interface TagProps {
  /** 컨테이너 스타일 */
  type?: 'fill-light' | 'fill-dark' | 'fill' | 'outlined' | 'text';
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Bold 여부 (폰트 가중치 변경) */
  bold?: boolean;
  /** 아이콘 색상 / 강조 색상 */
  color?: 'indigo' | 'blue' | 'red' | 'orange' | 'green' | 'lightblue'
    | 'purple' | 'magenta' | 'cyan' | 'lime' | 'redorange' | 'gray';
  /** 왼쪽 리딩 아이콘 (ReactNode) */
  leadingIcon?: React.ReactNode;
  /** 리딩 아이콘 표시 여부 */
  showLeadingIcon?: boolean;
  /** 라벨 텍스트 (필수) */
  label: string;
  /** 추가 className */
  className?: string;
}
```

**Size 매핑** (Figma Container 테이블 기준):

| Size | Figma 명칭 | Height | Padding (H x V) | Font (Regular) | Font (Bold) | Icon Size | Corner Radius |
|------|-----------|--------|------------------|----------------|-------------|-----------|---------------|
| xs | X-Small | 20px | 2px | Caption4 (10px/16px, Regular 400) | Caption3 (10px/16px, SemiBold 600) | 12px | 9999px (pill) |
| sm | Small | 24px | 2px | Caption2 (12px/18px, Medium 500) | Caption1 (12px/18px, SemiBold 600) | 12px | 9999px (pill) |
| md | Medium | 28px | 2px | Body4 (13px/20px, Regular 400) | Title4 (13px/20px, SemiBold 600) | 14px | 9999px (pill) |
| lg | Large | 32px | 2px | Body3 (14px/22px, Regular 400) | Title3 (14px/22px, SemiBold 600) | 16px | 9999px (pill) |

> 참고: 아이콘과 레이블 사이 간격(gutter)은 4px. 아이콘 비활성 시 간격 0px.

**좌측 패딩 (아이콘 유무에 따라 다름)**:

| Size | 아이콘 있을 때 (pl) | 텍스트만 있을 때 (pl) | 우측 패딩 (pr) |
|------|-------------------|---------------------|--------------|
| xs | 6px | 8px | 8px |
| sm | 8px | 10px | 10px |
| md | 10px | 12px | 12px |
| lg | 12px | 14px | 14px |

> 아이콘이 있을 때 좌측 패딩이 사이즈별로 2px 더 좁아짐. 아이콘 자체가 시각적 여백을 만들기 때문.

**Leading Icon**:
- 기본 아이콘 사이즈는 12x12 (Small/Medium), Large일 경우 14px 아이콘 사용 권장
- 아이콘 크기는 컨테이너 높이를 초과하지 않도록 한다
- 아이콘의 형태 변경이 필요한 경우, 아이콘그래피 디자인 시스템 규칙에 따라 수정한다
- `showLeadingIcon` (기본: true) -- false로 설정하면 leadingIcon이 있어도 숨김

**Label**:
- 레이블은 짧고 명확하게 작성하며 최소 1~4자 / 최대 6자 내외 사용을 권장한다
- 텍스트 타입은 Caption4 ~ Body4에서 사용한다
- Bold 적용 여부는 Optional이며(True/False), 필요 시 강조 목적으로 사용할 수 있다
- 태그는 레이블을 두 줄 처리할 수 없다 (single line only)
- 말 줄임은 적용하지 않는다

**Color 매핑** (accent 색상):

| Color | Icon/Accent Color | Fill Background | Outlined Border | Outlined Background | Text Background |
|-------|-------------------|-----------------|-----------------|---------------------|-----------------|
| indigo (기본) | `--indigo-600` (#3554F8) | `--gray-100` (#F2F3F8) | `--divider-regular` (#E5E8EF) | white | transparent |
| blue | `--blue-600` (#0069FF) | `--gray-100` | `--divider-regular` | white | transparent |
| red | `--red-500` (#FF3A5B) | `--gray-100` | `--divider-regular` | white | transparent |
| orange | `--orange-500` (#FF8800) | `--gray-100` | `--divider-regular` | white | transparent |
| green | `--green-500` (#04CA81) | `--gray-100` | `--divider-regular` | white | transparent |
| lightblue | `--lightblue-500` (#00AEFF) | `--gray-100` | `--divider-regular` | white | transparent |
| purple | `--purple-500` (#956BFF) | `--gray-100` | `--divider-regular` | white | transparent |
| magenta | `--magenta-500` (#FF4397) | `--gray-100` | `--divider-regular` | white | transparent |
| cyan | `--cyan-500` (#01C9D7) | `--gray-100` | `--divider-regular` | white | transparent |
| lime | `--lime-500` (#8AD510) | `--gray-100` | `--divider-regular` | white | transparent |
| redorange | `--redorange-500` (#FF7017) | `--gray-100` | `--divider-regular` | white | transparent |
| gray | `--gray-500` (#99A1B1) | `--gray-100` | `--divider-regular` | white | transparent |

**Type x Color 상세 스타일 매핑**:

| Type | Background | Text Color | Border | Icon Color |
|------|-----------|------------|--------|------------|
| fill-light | white (#FFFFFF) | accent color | none | accent color |
| fill-dark | accent color | white (#FFFFFF) | none | white (#FFFFFF) |
| fill | `--gray-100` (#F2F3F8) | accent color | none | accent color |
| outlined | white (#FFFFFF) | `--text-primary` (#354153) | 1px solid `--divider-regular` (#E5E8EF) | accent color |
| text | transparent | `--text-primary` (#354153) | none | accent color |

> 참고:
> - Fill-Light: 배경 하양 + 텍스트/아이콘 accent color (진한 텍스트)
> - Fill-Dark: 배경 accent color + 텍스트/아이콘 흰색 (밝은 텍스트)
> - Fill: 기존 DS_2 패턴, gray-100 배경
> - Outlined/Text: 텍스트는 `--text-primary`, 아이콘만 accent color

**State** (읽기 전용 -- interactive state 없음):

| State | 설명 |
|-------|------|
| Default | 기본 스타일. 선택/pressed 상태 없음 |

> Tag는 읽기 전용이므로 Chip과 달리 pressed, selected, disabled 상태가 없다. 클릭 이벤트를 바인딩하지 않으며, cursor는 기본값(default)을 유지한다.

---

### 2. TagGroup

여러 Tag를 나열하는 컨테이너. 선택적으로 Tag 사이에 Divider를 표시한다.

```tsx
interface TagGroupProps {
  /** Tag Group 타입 (자식 Tag의 type 결정) */
  type?: 'fill' | 'outlined' | 'basic';
  /** Tag 사이 구분자 표시 여부 */
  showDivider?: boolean;
  /** 구분자 스타일 */
  dividerStyle?: 'dot' | 'slash';
  /** Tag 간 간격 (기본 8px) */
  gap?: number;
  /** 자식 Tag 요소들 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}
```

**TagGroup 규칙**:
- Tag를 노출할 때 한 번에 최소 1개 ~ 최대 3개까지 노출을 권장한다
- Tag의 수가 3개보다 많을 경우 줄바꿈 처리한다 (4개 이상 시 서비스 화면도에 따른 동적)
- 태그는 레이블을 두 줄 처리할 수 없다
- 말 줄임을 위해 말 줄임 처리도 할 수 없다

**Divider 스타일**:
| Style | 표시 | 색상 |
|-------|------|------|
| dot | ` · ` | `--gray-500` (#99A1B1) |
| slash | ` / ` | `--gray-500` (#99A1B1) |

**TagGroup type에 따른 자식 Tag 매핑**:
| TagGroup type | 자식 Tag type |
|---------------|--------------|
| fill-light | fill-light |
| fill-dark | fill-dark |
| fill | fill |
| outlined | outlined |
| basic | text |

---

## Acceptance Criteria

### 기능 요구사항
- [ ] Tag의 모든 type (fill, outlined, text)이 올바른 스타일로 렌더링된다
- [ ] 4개 size (xs, sm, md, lg)가 각각 올바른 높이/폰트/패딩으로 렌더링된다
- [ ] bold prop에 따라 font-weight가 Regular(400)/Medium(500) 또는 SemiBold(600)로 전환된다
- [ ] 12가지 color prop이 올바른 accent 색상으로 아이콘/텍스트를 렌더링한다
- [ ] leadingIcon 전달 시 올바른 위치/크기에 아이콘이 렌더링된다
- [ ] showLeadingIcon=false 시 아이콘이 숨겨지고 gutter 간격이 0이 된다
- [ ] Tag는 읽기 전용이므로 클릭/선택 동작이 없다 (onClick 핸들러 없음)
- [ ] TagGroup에서 showDivider=true 시 Tag 사이에 구분자가 올바르게 표시된다
- [ ] TagGroup dividerStyle이 dot/slash에 따라 올바른 구분자 문자가 렌더링된다
- [ ] TagGroup type에 따라 자식 Tag에 올바른 type이 적용된다
- [ ] label은 single line으로만 렌더링되며, 줄바꿈/말줄임이 발생하지 않는다

### 스타일 요구사항
- [ ] 모든 색상은 DS_2 시맨틱 토큰 (CSS 변수 / Tailwind 유틸리티)으로 적용된다 -- 하드코딩 금지
- [ ] Tailwind v4 방식 준수 (tailwind.config.ts 미사용, @theme inline 활용)
- [ ] 다크모드 대응 가능한 구조 (시맨틱 토큰 기반이므로 토큰 값만 변경하면 대응됨)
- [ ] Corner Radius 6px 적용 (`rounded-[6px]` 또는 커스텀 토큰)
- [ ] Fill 타입 배경색 `--gray-100`, Outlined 타입 배경색 white, Text 타입 배경 transparent

### 접근성 요구사항
- [ ] Tag는 `<span>` 요소로 렌더링한다 (읽기 전용이므로 `<button>` 불필요)
- [ ] 스크린리더가 Tag 내용을 읽을 수 있도록 텍스트가 노출된다
- [ ] 아이콘은 장식적 요소이므로 `aria-hidden="true"` 적용
- [ ] 색상 대비가 WCAG AA 기준을 충족한다
- [ ] TagGroup은 의미적으로 관련 태그를 그룹화하기 위해 적절한 역할을 부여한다

### 테스트 요구사항
- [ ] 컴포넌트 프리뷰 페이지에서 모든 type/size/color/bold 조합 확인 가능

---

## Affected Files

### 신규 생성
| 파일 | 설명 |
|------|------|
| `src/components/Tag/Tag.tsx` | Tag 개별 아이템 컴포넌트 |
| `src/components/Tag/TagGroup.tsx` | TagGroup 컨테이너 컴포넌트 |
| `src/components/Tag/index.ts` | barrel export |
| `src/components/Tag/tag.types.ts` | 공통 타입 정의 (TagProps, TagGroupProps) |
| `src/components/Tag/tag.variants.ts` | type x size x color 조합별 Tailwind 클래스 맵 |
| `src/app/tag/page.tsx` | Tag 컴포넌트 프리뷰/문서 페이지 |

### 수정
| 파일 | 설명 |
|------|------|
| `src/app/globals.css` | 필요 시 accent 색상 Tailwind 매핑 추가 (`--color-indigo-600`, `--color-accent-*` 등) |
| `.claude/doc/design-system.md` | Core Widgets Inventory에 Tag, TagGroup 컴포넌트 등록 |

---

## Implementation Steps

### Step 1: 디자인 토큰 보강
`globals.css`의 `@theme inline` 블록에 Tag 컴포넌트에 필요한 추가 토큰을 등록한다:
```css
@theme inline {
  /* 기존 토큰... */

  /* Tag 추가 토큰 */
  --color-indigo-600: var(--indigo-600);
  --color-accent-indigo: var(--accent-indigo);
  --color-accent-red: var(--accent-red);
  --color-accent-orange: var(--accent-orange);
  --color-accent-green: var(--accent-green);
  --color-accent-light-blue: var(--accent-light-blue);
  --color-accent-purple: var(--accent-purple);
  --color-accent-magenta: var(--accent-magenta);
  --color-accent-cyan: var(--accent-cyan);
  --color-accent-lime: var(--accent-lime);
  --color-accent-red-orange: var(--accent-red-orange);
  --color-white: #FFFFFF;  /* 이미 존재하면 skip */
  --color-gray-500: var(--gray-500);  /* Divider 텍스트 색상 */
}
```

### Step 2: 공통 타입 및 variant 정의
- `tag.types.ts` -- TagProps, TagGroupProps 타입 정의
- `tag.variants.ts` -- type x size x color x bold 조합별 Tailwind 클래스 맵 객체 생성
  - fill: `bg-gray-100 text-{accent-color}` (배경 gray-100, 텍스트/아이콘 accent)
  - outlined: `bg-white border border-divider text-text-primary` (아이콘만 accent)
  - text: `bg-transparent text-text-primary` (아이콘만 accent)
  - size별 height/padding/font 클래스 분리
  - bold별 font-weight 분기

### Step 3: Tag 컴포넌트 구현
- `<span>` 요소로 렌더링 (읽기 전용, non-interactive)
- Props 인터페이스 적용
- type에 따른 배경/테두리/텍스트 색상 Tailwind 클래스 매핑
- size에 따른 height/padding/font 매핑
- bold에 따른 font-weight 분기
- color에 따른 accent 색상 매핑 (아이콘 색상, fill 시 텍스트 색상)
- leadingIcon 슬롯 렌더링 + showLeadingIcon 제어
- 아이콘에 `aria-hidden="true"` 적용
- `whitespace-nowrap` 으로 single line 강제
- forwardRef 적용

### Step 4: TagGroup 컴포넌트 구현
- `<div>` 요소에 `role="group"` 적용
- `flex flex-wrap items-center` 레이아웃
- gap prop 적용 (기본 8px)
- showDivider=true 시 children 사이에 Divider 문자 삽입
  - dividerStyle에 따라 `·` 또는 `/` 문자
  - Divider 색상: `--gray-500`
  - Divider 양옆 여백은 gap에서 자동 처리
- type prop에 따라 Context 또는 className으로 자식 Tag의 type 전달

### Step 5: barrel export
- `index.ts`에서 Tag, TagGroup + 타입 export

### Step 6: 프리뷰 페이지
- `/tag` 라우트에 모든 Tag type/size/color/bold 조합을 시각적으로 확인할 수 있는 프리뷰 페이지 작성
- TagGroup의 divider 유/무, dot/slash 스타일도 포함
- Leading Icon 유/무 예시 포함

### Step 7: 문서 업데이트
- `design-system.md`의 Core Widgets Inventory 테이블에 Tag, TagGroup 컴포넌트 등록

---

## Reusable Components

### 이 작업에서 새로 만드는 재사용 컴포넌트

| 컴포넌트 | Import Path | 용도 | Key Props |
|----------|-------------|------|-----------|
| Tag | `@/components/Tag` | 읽기 전용 라벨 (상태 표시, 카테고리, 속성 강조) | type, size, bold, color, label, leadingIcon, showLeadingIcon |
| TagGroup | `@/components/Tag` | Tag 그룹 컨테이너 (Divider 포함) | type, showDivider, dividerStyle, gap |

### 기존 재사용 컴포넌트 (의존)
- 없음 (Button, Chip 컴포넌트와 독립적으로 구현)

---

## Accessibility

| 항목 | 구현 방법 |
|------|-----------|
| **시맨틱 HTML** | `<span>` 요소 사용 (읽기 전용 라벨이므로 button/link 불필요) |
| **키보드 지원** | 읽기 전용이므로 포커스/키보드 인터랙션 불필요. tabindex 미설정 |
| **아이콘 접근성** | Leading Icon에 `aria-hidden="true"` 적용 (장식적 요소) |
| **색상 대비** | Fill 타입: indigo-600 on gray-100 = 4.52:1 (AA 충족). Outlined/Text: gray-800 on white = 9.73:1 (AAA 충족) |
| **스크린리더** | label 텍스트가 자연스럽게 읽힘 (`<span>` 내 텍스트) |
| **TagGroup 그룹화** | `role="group"` + `aria-label` 로 태그 그룹 의미 전달 |
| **Divider 숨김** | Divider 문자에 `aria-hidden="true"` 적용 (시각적 구분 목적) |

---

## Dependencies

### 필수 (이미 프로젝트에 포함)
- **Next.js** (App Router) -- 프레임워크
- **Tailwind CSS v4** -- 스타일링
- **TypeScript** -- 타입 안전성

### 추가 설치 필요
- **clsx** (`npm install clsx`) -- 조건부 className 조합 유틸리티. Button/Chip 구현 시 이미 설치되어 있다면 추가 설치 불필요

### 불필요 (사용하지 않음)
- tailwind.config.ts -- Tailwind v4는 CSS 기반 설정
- styled-components / emotion -- Tailwind 사용
- 별도 아이콘 라이브러리 -- icon은 ReactNode로 주입받음 (소비자가 선택)
