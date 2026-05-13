# DS_2 신규 컴포넌트 15종 명세

작성일: 2026-05-13  
대상 스택: Next.js (App Router) + Tailwind CSS v4 + TypeScript  
키컬러: #00B8FF (`--lightblue-500`)  
색상 규칙: 시맨틱 토큰만 사용, 하드코딩 금지  

---

## 우선순위 1 (Priority 1)

---

### 1. Bottom Sheet

#### 목적
화면 하단에서 올라오는 모달 시트. 부가 정보, 액션 선택, 폼 입력 등을 컨텍스트를 잃지 않고 표시한다.

#### Figma Reference
- **파일**: DS_2 (`9BojhdnvhQSi1wpWpLwPnH`)
- **페이지/노드**: Bottomsheet — Node ID `698:36070`

#### Component API

```typescript
// src/components/BottomSheet/types.ts

export type BottomSheetState = 'closed' | 'peek' | 'full';

export interface BottomSheetProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 시트 표시 상태 */
  state?: BottomSheetState;
  /** 드래그 핸들 표시 여부 (기본 true) */
  showHandle?: boolean;
  /** peek 상태에서 노출할 높이 (px, 기본 280) */
  peekHeight?: number;
  /** full 상태에서 최대 높이 (vh 단위, 기본 90) */
  maxHeightVh?: number;
  /** 딤드 배경 클릭 시 닫기 여부 (기본 true) */
  closeOnBackdropClick?: boolean;
  /** 스크롤 가능 여부 (기본 true) */
  scrollable?: boolean;
  /** 헤더 타이틀 */
  title?: string;
  /** 헤더 서브타이틀 */
  subtitle?: string;
  /** 닫기 버튼 표시 여부 (기본 false) */
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

#### Variants / States
| State | 설명 |
|-------|------|
| `closed` | 화면 밖(아래) — `translateY(100%)` |
| `peek` | 부분 노출 — `peekHeight`만큼 올라옴 |
| `full` | 전체 노출 — `maxHeightVh`까지 확장 |

#### 동작
- 열림/닫힘: CSS `transform: translateY` + `transition` 300ms ease-out
- 드래그 핸들을 위/아래로 드래그하여 `peek ↔ full` 전환 (`touch-action: none`, pointer events)
- `peek → 아래 드래그` 시 닫힘 (dismiss velocity threshold: 300px/s 또는 50% 이상)
- 딤드 배경(`--dimmed-regular`) 클릭 시 `closeOnBackdropClick`에 따라 닫힘
- 열릴 때 body scroll lock (`overflow: hidden`)
- `Escape` 키로 닫힘

#### 제약
- 색상: `bg-surface`, `--dimmed-regular` 시맨틱 토큰 사용
- 드래그 핸들 색상: `bg-border` (`--border-regular`)
- z-index: `z-50` (Overlay보다 높을 경우 `z-[60]`)
- `'use client'` 필수 (상태 및 이벤트 관리)

#### Acceptance Criteria
- [ ] open prop 변경 시 애니메이션으로 열리고 닫힌다
- [ ] peek / full 상태 전환이 드래그로 동작한다
- [ ] 딤드 배경이 렌더링되며 클릭 시 닫힌다
- [ ] Escape 키로 닫힌다
- [ ] 모바일 터치 드래그 정상 동작한다
- [ ] aria-modal, role="dialog", aria-labelledby 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/BottomSheet/BottomSheet.tsx` | 메인 컴포넌트 |
| `src/components/BottomSheet/types.ts` | 타입 정의 |
| `src/components/BottomSheet/index.ts` | 배럴 익스포트 |
| `src/app/bottom-sheet/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성 — BottomSheetState, BottomSheetProps
2. `BottomSheet.tsx` — Portal(`document.body`)로 렌더링, 딤드 + 시트 컨테이너
3. 드래그 로직 — `pointerdown/pointermove/pointerup` 이벤트로 deltaY 추적
4. 상태 머신 — closed/peek/full 간 전환 조건 정의
5. 스크롤 잠금 — `useEffect`로 `document.body.style.overflow` 제어
6. 프리뷰 페이지 — 세 가지 상태 전환 데모

#### Reusable Components
- `IconButton` (`@/components/Button`) — 닫기 버튼
- `ActionButton` (`@/components/Button`) — 시트 내부 CTA 예시

#### Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title 연결)
- 포커스 트랩: 열릴 때 첫 번째 포커스 가능 요소로 이동, 닫힐 때 트리거 요소로 복귀
- `aria-hidden="true"` — 배경 콘텐츠에 적용

#### Dependencies
- 신규 패키지 없음 (`clsx` 기존 사용 중)

---

### 2. Search Bar

#### 목적
검색 전용 입력 컴포넌트. 일반 InputField와 달리 검색 UX에 특화된 상태(포커스·클리어·취소)와 leading 검색 아이콘을 갖는다.

#### Figma Reference
- DS_2 Input 페이지에서 Search 전용 variant 참조
- InputField Node: `design-inputfield.md` 참조

#### Component API

```typescript
// src/components/SearchBar/types.ts

export interface SearchBarProps {
  /** 검색어 값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 변경 콜백 */
  onChange?: (value: string) => void;
  /** 검색 제출 콜백 */
  onSearch?: (value: string) => void;
  /** 취소 클릭 콜백 */
  onCancel?: () => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 취소 버튼 레이블 (기본: "취소") */
  cancelLabel?: string;
  /** 취소 버튼 표시 조건: 'focus' | 'always' | 'never' (기본: 'focus') */
  showCancel?: 'focus' | 'always' | 'never';
  /** 비활성 상태 */
  disabled?: boolean;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 전체 너비 (기본 true) */
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}
```

#### Variants / States
| State | 설명 |
|-------|------|
| Default | 비포커스, 값 없음 — 검색 아이콘 + 플레이스홀더 |
| Focused | 포커스 — 테두리 강조, 취소 버튼 노출 |
| Active | 값 있음 — Clear(×) 버튼 노출 |
| Disabled | 비활성 — opacity 0.4 |

#### 동작
- 포커스 시 취소 버튼 슬라이드-인 (opacity + translateX, 200ms)
- 값 입력 시 우측에 Clear(×) IconButton 등장
- Clear 클릭: 값 초기화 후 포커스 유지
- 취소 클릭: 값 초기화 + blur + `onCancel` 호출
- `Enter` / `onKeyDown` → `onSearch` 호출

#### 제약
- 검색 아이콘 색상: `text-text-tertiary` (비포커스), `text-primary-regular` (포커스)
- 배경: `bg-background` (gray-100)
- 테두리: 포커스 시 `border-primary-regular` 2px
- InputField 컴포넌트와 별도로 구현 (검색 특화 UX)
- `'use client'` 필수

#### Acceptance Criteria
- [ ] 포커스/블러 상태 시각적 전환
- [ ] 값 입력 시 Clear 버튼 노출
- [ ] Clear 버튼 클릭 시 값 초기화 및 포커스 유지
- [ ] 취소 버튼 클릭 시 onCancel 호출
- [ ] Enter 키 시 onSearch 호출
- [ ] role="search", aria-label 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/SearchBar/SearchBar.tsx` | 메인 컴포넌트 |
| `src/components/SearchBar/types.ts` | 타입 정의 |
| `src/components/SearchBar/index.ts` | 배럴 익스포트 |
| `src/app/search-bar/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `SearchBar.tsx` — `useRef` (input), `useState` (focused, internalValue)
3. 아이콘: 기존 Icons 컴포넌트의 검색 아이콘 재사용 또는 SVG 인라인
4. Clear/취소 버튼 조건부 렌더링
5. 키보드 이벤트 핸들러
6. 프리뷰 페이지

#### Reusable Components
- `IconButton` (`@/components/Button`) — Clear 버튼
- `Icons` (`@/components/Icons`) — SearchIcon

#### Accessibility
- `role="search"` wrapper
- `type="search"` input
- Clear 버튼: `aria-label="검색어 지우기"`
- 취소 버튼: `aria-label="검색 취소"`

#### Dependencies
- 신규 패키지 없음

---

### 3. Skeleton

#### 목적
콘텐츠 로딩 중 레이아웃을 미리 보여주는 플레이스홀더. shimmer 애니메이션으로 로딩 중임을 표시한다.

#### Figma Reference
- DS_2 Loading/Skeleton 섹션

#### Component API

```typescript
// src/components/Skeleton/types.ts

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  /** 형태 */
  variant?: SkeletonVariant;
  /** 너비 (CSS 값 or 숫자px) */
  width?: number | string;
  /** 높이 (CSS 값 or 숫자px) */
  height?: number | string;
  /** 텍스트 variant에서 줄 수 (기본 1) */
  lines?: number;
  /** 마지막 줄 너비 비율 (텍스트 multi-line, 기본 0.7) */
  lastLineWidthRatio?: number;
  /** shimmer 애니메이션 활성화 (기본 true) */
  animate?: boolean;
  className?: string;
}
```

#### Variants / States
| Variant | 설명 |
|---------|------|
| `text` | 텍스트 줄 형태 — height 자동(1em 기준), lines로 다중 줄 |
| `circular` | 원형 — 아바타, 아이콘 플레이스홀더 |
| `rectangular` | 모서리 없는 사각형 — 이미지, 배너 |
| `rounded` | 둥근 모서리 사각형 — 카드, 칩 (border-radius: 8px) |

#### 동작
- shimmer: `background: linear-gradient(90deg, ...)` + `@keyframes shimmer` — left-to-right sweep 1.5s infinite
- `animate={false}`: 단색 skeleton (애니메이션 없음)
- `lines > 1`: `text` variant에서 `<div>` 스택 생성, 마지막 줄은 `lastLineWidthRatio` 적용

#### 제약
- 베이스 색상: `--gray-200` (`bg-gray-200`)
- shimmer 하이라이트 색상: `--gray-100` (`--bg-primary`) → 시맨틱 토큰 `var(--gray-100)` CSS 변수 직접 사용 (globals.css에 정의됨)
- 색상 하드코딩 금지 — CSS 변수 경유
- `aria-busy="true"`, `aria-label="로딩 중"` 추가

#### Acceptance Criteria
- [ ] text/circular/rectangular/rounded 모두 렌더링
- [ ] shimmer 애니메이션 동작
- [ ] lines prop으로 다중 줄 텍스트 플레이스홀더 생성
- [ ] animate={false} 시 정적 표시
- [ ] aria-busy 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Skeleton/Skeleton.tsx` | 메인 컴포넌트 |
| `src/components/Skeleton/types.ts` | 타입 정의 |
| `src/components/Skeleton/index.ts` | 배럴 익스포트 |
| `src/app/skeleton/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `globals.css`에 `@keyframes shimmer` 애니메이션 추가
2. `types.ts` 작성
3. `Skeleton.tsx` — variant별 className 매핑, lines 다중 렌더링 로직
4. Tailwind v4에서 `animate-shimmer` 유틸리티를 `@utility`로 등록 (`globals.css`)
5. 프리뷰 페이지 — 카드 레이아웃 skeleton 예제 포함

#### Reusable Components
- 없음 (독립 컴포넌트)

#### Accessibility
- `aria-busy="true"` on wrapper
- `aria-label="로딩 중"` or 부모 컨텍스트에 따라 커스터마이징 가능
- `role="status"` 추가 고려

#### Dependencies
- 신규 패키지 없음

---

### 4. Badge

#### 목적
아이콘, 아바타 등의 우측 상단에 절대 위치로 부착하여 알림 개수 또는 상태를 표시한다.

#### Figma Reference
- DS_2 Badge / Notification 섹션
- Notification 토큰: `--notification-red`

#### Component API

```typescript
// src/components/Badge/types.ts

export type BadgeVariant = 'count' | 'dot' | 'label';

export interface BadgeProps {
  /** 배지 표시 형태 */
  variant?: BadgeVariant;
  /** 표시할 숫자 (count variant) */
  count?: number;
  /** 최대 표시 숫자 (초과 시 "99+" 등 표시, 기본 99) */
  max?: number;
  /** 레이블 텍스트 (label variant) */
  label?: string;
  /** 배지 숨김 여부 */
  hidden?: boolean;
  /** 배지 색상 — 시맨틱 토큰 키 */
  color?: 'error' | 'primary' | 'caution';
  /** 앵커 위치 — 기본 'top-right' */
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  /** 배지를 씌울 자식 요소 */
  children?: React.ReactNode;
  className?: string;
}
```

#### Variants / States
| Variant | 설명 |
|---------|------|
| `dot` | 지름 8px 원형 점 (숫자 없음) |
| `count` | 숫자 표시 원형 배지 (최소 지름 16px) |
| `label` | 짧은 텍스트 레이블 배지 |

color 매핑:
- `error` → `bg-status-negative` (`--status-negative-regular`)
- `primary` → `bg-primary-regular`
- `caution` → `bg-status-caution`

#### 동작
- `children` 있으면 `relative` wrapper + `absolute` 배지
- `children` 없으면 배지 단독 렌더링
- `count > max` → `{max}+` 표시
- `count === 0` → `hidden` 처리 (hidden prop과 별개)
- `hidden={true}` → `display: none`

#### 제약
- 텍스트 색상: 배지 내부 `text-on-primary` (white)
- 크기: dot=8px, count 최소 16px (typo-caption2)
- `position: absolute` + `translate(-50%, -50%)` 조합으로 정확한 앵커

#### Acceptance Criteria
- [ ] dot/count/label variant 모두 렌더링
- [ ] count > max 시 "99+" 형태 표시
- [ ] anchorOrigin에 따른 위치 변경
- [ ] hidden prop 동작
- [ ] children 없을 때 단독 렌더링

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Badge/Badge.tsx` | 메인 컴포넌트 |
| `src/components/Badge/types.ts` | 타입 정의 |
| `src/components/Badge/index.ts` | 배럴 익스포트 |
| `src/app/badge/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `Badge.tsx` — wrapper `relative` + 배지 `absolute` 구조
3. count 포매팅 함수 (`formatCount`)
4. anchorOrigin → Tailwind 위치 클래스 매핑
5. 프리뷰 페이지 — IconButton + Avatar 위 배지 예제

#### Reusable Components
- `Avatar` (`@/components/Avatar`) — 배지 앵커 예시

#### Accessibility
- 배지가 의미 있는 숫자를 가질 때: `aria-label="알림 {count}개"` (부모 요소에)
- 장식용 dot: `aria-hidden="true"`

#### Dependencies
- 신규 패키지 없음

---

### 5. FAB (Floating Action Button)

#### 목적
화면 고정 위치에 플로팅하는 주요 액션 버튼. 페이지의 최우선 단일 액션에 사용한다.

#### Figma Reference
- DS_2 Button 페이지 — FAB 섹션 (Node ID `698:35982` 하위)

#### Component API

```typescript
// src/components/FAB/types.ts

export type FABSize = 'small' | 'medium' | 'large';
export type FABVariant = 'primary' | 'surface' | 'secondary';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'custom';

export interface FABProps {
  /** 크기 */
  size?: FABSize;
  /** 색상 변형 */
  variant?: FABVariant;
  /** 아이콘 (필수) */
  icon: React.ReactNode;
  /** 레이블 텍스트 (있으면 Extended FAB) */
  label?: string;
  /** 고정 위치 */
  position?: FABPosition;
  /** position='custom'일 때 추가 CSS */
  positionClassName?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 접근성 레이블 (label 없을 때 필수) */
  'aria-label'?: string;
  className?: string;
}
```

#### Variants / States
| 조합 | 설명 |
|------|------|
| `icon only (small)` | 40px — 보조 FAB |
| `icon only (medium)` | 56px — 기본 FAB |
| `icon only (large)` | 96px — 강조 FAB |
| `Extended (label 있음)` | 아이콘 + 레이블, pill 형태 |

variant 색상:
- `primary`: `bg-primary-strong text-on-primary`
- `surface`: `bg-surface text-primary-regular` + shadow
- `secondary`: `bg-gray-100 text-text-primary`

#### 동작
- 기본 `position: fixed` — 화면 스크롤과 무관하게 고정
- hover: `scale(1.05)` + shadow 강화
- press: `scale(0.97)`
- `position='custom'` 시 fixed를 사용자가 제어
- 스크롤 방향에 따라 숨기기/보이기는 소비자 레이어에서 처리 (컴포넌트 내 미포함)

#### 제약
- shadow: Tailwind `shadow-lg` (하드코딩 shadow 금지)
- border-radius: `rounded-full` (pill/circle 모두)
- z-index: `z-40`
- `'use client'` 필수

#### Acceptance Criteria
- [ ] small/medium/large 크기 정확한 픽셀
- [ ] label 있을 때 Extended FAB 형태
- [ ] position prop으로 위치 변경
- [ ] disabled 상태 opacity + pointer-events-none
- [ ] aria-label 없는 아이콘 전용 시 console.warn

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/FAB/FAB.tsx` | 메인 컴포넌트 |
| `src/components/FAB/types.ts` | 타입 정의 |
| `src/components/FAB/index.ts` | 배럴 익스포트 |
| `src/app/fab/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `FAB.tsx` — 크기별 클래스 맵, variant 색상 맵
3. label 유무에 따른 레이아웃 분기 (icon-only vs Extended)
4. position 매핑 (fixed + inset 클래스)
5. 프리뷰 페이지 — 스크롤 가능 콘텐츠 위 FAB 데모

#### Reusable Components
- `Icons` (`@/components/Icons`) — 아이콘

#### Accessibility
- `aria-label` 필수 (label 없을 때)
- `type="button"` 기본값

#### Dependencies
- 신규 패키지 없음

---

### 6. Divider

#### 목적
콘텐츠 섹션 간 시각적 구분선. 수평/수직 방향, 여백 variant를 지원한다.

#### Figma Reference
- DS_2 Foundation/Separator 섹션
- 토큰: `--divider-regular`, `--divider-weak`

#### Component API

```typescript
// src/components/Divider/types.ts

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'full' | 'inset' | 'middle';
export type DividerStrength = 'regular' | 'weak';

export interface DividerProps {
  /** 방향 */
  orientation?: DividerOrientation;
  /** 여백 variant */
  variant?: DividerVariant;
  /** 두께 강도 */
  strength?: DividerStrength;
  /** inset/middle variant에서 양쪽 여백 (px, 기본 16) */
  inset?: number;
  /** 자식이 있으면 텍스트 divider */
  children?: React.ReactNode;
  className?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
}
```

#### Variants / States
| Variant | 설명 |
|---------|------|
| `full` | 컨테이너 전체 너비/높이 |
| `inset` | 한쪽(왼쪽 또는 상단)에 `inset`px 여백 |
| `middle` | 양쪽에 `inset`px 여백 |

strength:
- `regular`: `--divider-regular` (gray-200)
- `weak`: `--divider-weak` (gray-100)

#### 동작
- `horizontal`: `<hr>` 태그, `border-t`, 너비 조절
- `vertical`: `<div>` 태그, `border-l`, 높이 `100%`
- children 있을 때: 가운데 텍스트 포함 divider (`flex` + `gap` + `::before/::after` 라인)

#### 제약
- 색상: `border-divider` (`--divider-regular`) 또는 `border-divider-weak` (전용 토큰 추가 필요 시 globals.css @theme 등록)
- 두께: `border-t` (1px) 고정, 두께 variant 미지원
- 절대 하드코딩 금지

#### Acceptance Criteria
- [ ] horizontal/vertical 방향 동작
- [ ] full/inset/middle variant 동작
- [ ] regular/weak 색상 차이 구분
- [ ] children 텍스트 divider 렌더링
- [ ] `role="separator"`, `aria-orientation` 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Divider/Divider.tsx` | 메인 컴포넌트 |
| `src/components/Divider/types.ts` | 타입 정의 |
| `src/components/Divider/index.ts` | 배럴 익스포트 |
| `src/app/divider/page.tsx` | 프리뷰 페이지 |
| `src/app/globals.css` | `--color-divider-weak` @theme 토큰 추가 |

#### Implementation Steps
1. `globals.css` `@theme inline` 블록에 `--color-divider-weak: var(--divider-weak)` 추가
2. `types.ts` 작성
3. `Divider.tsx` — orientation × variant 조합 클래스 맵
4. children 분기 처리
5. 프리뷰 페이지

#### Reusable Components
- 없음 (최소 컴포넌트)

#### Accessibility
- `role="separator"`
- `aria-orientation="horizontal"` | `"vertical"`
- decorative: `aria-hidden="true"` 옵션 제공 (`decorative` prop)

#### Dependencies
- 신규 패키지 없음

---

## 우선순위 2 (Priority 2)

---

### 7. Tabs

#### 목적
페이지 내 콘텐츠를 탭으로 전환. primary(상단 네비게이션 스타일)와 secondary(콘텐츠 영역 내 스타일)를 지원한다.

#### Figma Reference
- DS_2 Tabs 섹션 참조

#### Component API

```typescript
// src/components/Tabs/types.ts

export type TabsVariant = 'primary' | 'secondary';
export type TabsSize = 'lg' | 'md' | 'sm';

export interface TabItem {
  /** 탭 고유 키 */
  key: string;
  /** 탭 레이블 */
  label: string;
  /** 탭 비활성 여부 */
  disabled?: boolean;
  /** 배지 카운트 */
  badge?: number;
}

export interface TabsProps {
  /** 탭 목록 */
  items: TabItem[];
  /** 현재 활성 탭 키 */
  activeKey?: string;
  /** 기본 활성 탭 (uncontrolled) */
  defaultActiveKey?: string;
  /** 탭 변경 콜백 */
  onChange?: (key: string) => void;
  /** 스타일 변형 */
  variant?: TabsVariant;
  /** 탭 크기 */
  size?: TabsSize;
  /** 탭을 균등하게 분할 */
  fullWidth?: boolean;
  /** 스크롤 가능 (탭이 많을 때) */
  scrollable?: boolean;
  className?: string;
}
```

#### Variants / States
| Variant | 설명 |
|---------|------|
| `primary` | 하단 언더라인 인디케이터, 배경 없음 |
| `secondary` | Pill/Chip 스타일 배경, 선택 탭 fill |

각 탭 상태: `default`, `active`, `hover`, `disabled`

#### 동작
- 인디케이터: `primary` — 활성 탭 하단에 2px 언더라인 슬라이드 이동 (CSS `transform: translateX`, transition 200ms)
- `scrollable={true}`: 가로 스크롤, 스크롤바 숨김 (`overflow-x: auto; scrollbar-width: none`)
- 키보드: `ArrowLeft`/`ArrowRight`로 탭 포커스 이동, `Enter`/`Space`로 선택

#### 제약
- 인디케이터 색상: `bg-primary-regular`
- active 텍스트: `text-primary-regular font-semibold`
- inactive 텍스트: `text-text-secondary font-medium`
- disabled 텍스트: `text-text-disabled`
- `'use client'` 필수

#### Acceptance Criteria
- [ ] primary/secondary variant 렌더링
- [ ] 탭 클릭 시 콘텐츠 전환
- [ ] 인디케이터 슬라이드 애니메이션
- [ ] scrollable 동작
- [ ] 키보드 탐색 (ArrowLeft/Right)
- [ ] role="tablist", role="tab", aria-selected, aria-controls 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Tabs/Tabs.tsx` | 탭 컨테이너 |
| `src/components/Tabs/TabPanel.tsx` | 탭 콘텐츠 패널 |
| `src/components/Tabs/types.ts` | 타입 정의 |
| `src/components/Tabs/index.ts` | 배럴 익스포트 |
| `src/app/tabs/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `Tabs.tsx` — `useRef`로 인디케이터 위치 계산 (`getBoundingClientRect`)
3. `TabPanel.tsx` — `role="tabpanel"`, `aria-labelledby`
4. 키보드 이벤트 핸들러
5. 프리뷰 페이지 — primary/secondary 각 데모

#### Reusable Components
- `Badge` (`@/components/Badge`) — 탭 배지

#### Accessibility
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`
- `tabindex`: 활성 탭 0, 비활성 -1 (roving tabindex)

#### Dependencies
- 신규 패키지 없음

---

### 8. Segmented Control

#### 목적
연결된 2~5개 세그먼트 중 하나를 선택하는 토글 그룹. 상호 배타적 옵션 선택에 사용한다.

#### Figma Reference
- DS_2 Controls / Segmented Control 섹션

#### Component API

```typescript
// src/components/SegmentedControl/types.ts

export type SegmentedControlSize = 'lg' | 'md' | 'sm';

export interface SegmentItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** 세그먼트 목록 (2~5개) */
  items: SegmentItem[];
  /** 현재 선택 값 */
  value?: string;
  /** 기본 선택 값 */
  defaultValue?: string;
  /** 변경 콜백 */
  onChange?: (key: string) => void;
  /** 크기 */
  size?: SegmentedControlSize;
  /** 전체 너비 (기본 false) */
  fullWidth?: boolean;
  /** 비활성 */
  disabled?: boolean;
  className?: string;
}
```

#### Variants / States
- 각 세그먼트: `unselected`, `selected`, `disabled`
- 선택된 세그먼트: `bg-surface` + shadow, 나머지: `bg-transparent`
- 컨테이너: `bg-background` (gray-100) + `rounded-xl`

#### 동작
- 선택 인디케이터: `absolute` 배경이 선택된 세그먼트로 슬라이드 이동 (transform + transition 150ms)
- items 수 2~5 초과 시 console.warn
- `fullWidth`: 각 세그먼트 `flex-1`

#### 제약
- 배경: `bg-background`
- 선택 배경: `bg-surface`
- 선택 텍스트: `text-text-strong font-semibold`
- 미선택 텍스트: `text-text-secondary font-medium`
- 그림자: `shadow-sm`
- `'use client'` 필수

#### Acceptance Criteria
- [ ] 2~5개 세그먼트 렌더링
- [ ] 선택 인디케이터 슬라이드 애니메이션
- [ ] disabled 세그먼트 클릭 방지
- [ ] 키보드 ArrowLeft/Right 탐색
- [ ] role="group", aria-label, role="radio", aria-checked 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/SegmentedControl/SegmentedControl.tsx` | 메인 컴포넌트 |
| `src/components/SegmentedControl/types.ts` | 타입 정의 |
| `src/components/SegmentedControl/index.ts` | 배럴 익스포트 |
| `src/app/segmented-control/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `SegmentedControl.tsx` — `useRef` 배열로 각 세그먼트 DOM 참조, 인디케이터 위치/크기 계산
3. 전환 애니메이션 (`left`, `width` 절대값 CSS transition)
4. 프리뷰 페이지

#### Reusable Components
- 없음

#### Accessibility
- `role="group"` + `aria-label`
- 각 버튼: `aria-pressed` (toggle button pattern)

#### Dependencies
- 신규 패키지 없음

---

### 9. Slider

#### 목적
연속 값 범위에서 단일 값 또는 범위를 선택하는 입력 컴포넌트.

#### Figma Reference
- DS_2 Controls / Slider 섹션

#### Component API

```typescript
// src/components/Slider/types.ts

export type SliderMode = 'single' | 'range';

export interface SliderProps {
  /** 단일/범위 모드 */
  mode?: SliderMode;
  /** 최솟값 (기본 0) */
  min?: number;
  /** 최댓값 (기본 100) */
  max?: number;
  /** 스텝 (기본 1) */
  step?: number;
  /** 단일 모드 값 */
  value?: number;
  /** 범위 모드 값 [min, max] */
  rangeValue?: [number, number];
  /** 단일 모드 기본값 */
  defaultValue?: number;
  /** 범위 모드 기본값 */
  defaultRangeValue?: [number, number];
  /** 값 변경 콜백 (단일) */
  onChange?: (value: number) => void;
  /** 값 변경 콜백 (범위) */
  onRangeChange?: (value: [number, number]) => void;
  /** 비활성 */
  disabled?: boolean;
  /** 툴팁 표시 여부 (기본 true) */
  showTooltip?: boolean;
  /** 눈금 표시 여부 */
  showMarks?: boolean;
  /** 커스텀 눈금 */
  marks?: { value: number; label?: string }[];
  className?: string;
  'aria-label'?: string;
}
```

#### Variants / States
- `single`: 썸 1개
- `range`: 썸 2개, 사이 트랙 강조
- disabled: opacity 0.4, pointer-events-none

#### 동작
- 트랙 클릭 또는 썸 드래그로 값 변경
- 마우스/터치 이벤트 모두 지원
- `showTooltip`: 드래그 중 현재 값 툴팁 표시 (Tooltip 컴포넌트 재사용)
- 키보드: `ArrowLeft`/`Right` ±step, `Home`/`End` min/max

#### 제약
- 트랙 배경: `bg-border` (gray-200)
- 트랙 활성 구간: `bg-primary-regular`
- 썸: `bg-surface border-2 border-primary-regular`, `w-5 h-5 rounded-full`
- 색상 하드코딩 금지
- `'use client'` 필수

#### Acceptance Criteria
- [ ] single/range 모드 동작
- [ ] 마우스 드래그 + 터치 드래그 동작
- [ ] step 단위로 값 제한
- [ ] 키보드 조작 (ArrowLeft/Right/Home/End)
- [ ] disabled 상태
- [ ] role="slider", aria-valuemin/max/now 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Slider/Slider.tsx` | 메인 컴포넌트 |
| `src/components/Slider/types.ts` | 타입 정의 |
| `src/components/Slider/index.ts` | 배럴 익스포트 |
| `src/app/slider/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `Slider.tsx` — 트랙 `useRef`, 포인터 이벤트로 퍼센트 계산 → 값 스냅
3. range 모드: 두 썸의 교차 방지 로직
4. `showTooltip` 연결 (Tooltip 컴포넌트 사전 구현 필요 또는 간단한 인라인 툴팁)
5. 프리뷰 페이지

#### Reusable Components
- `Tooltip` (`@/components/Tooltip`) — 값 표시 (Priority 2 컴포넌트이므로 동시 구현 필요)

#### Accessibility
- `role="slider"`
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- range 모드: 두 슬라이더 모두 별도 aria 레이블

#### Dependencies
- 신규 패키지 없음

---

### 10. Tooltip

#### 목적
앵커 요소에 연결되어 컨텍스트 정보를 제공하는 작은 레이블. hover/focus 시 표시된다.

#### Figma Reference
- DS_2 Tooltip 섹션

#### Component API

```typescript
// src/components/Tooltip/types.ts

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'focus' | 'click';

export interface TooltipProps {
  /** 툴팁 텍스트 */
  content: React.ReactNode;
  /** 툴팁 위치 */
  placement?: TooltipPlacement;
  /** 트리거 방식 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 표시 딜레이 (ms, 기본 200) */
  delay?: number;
  /** 숨김 딜레이 (ms, 기본 100) */
  hideDelay?: number;
  /** 비활성 (툴팁 미표시) */
  disabled?: boolean;
  /** 최대 너비 (px, 기본 200) */
  maxWidth?: number;
  /** 앵커 요소 */
  children: React.ReactElement;
  className?: string;
}
```

#### Variants / States
| Placement | 화살표 방향 |
|-----------|------------|
| `top` | 아래를 향한 화살표 |
| `bottom` | 위를 향한 화살표 |
| `left` | 오른쪽을 향한 화살표 |
| `right` | 왼쪽을 향한 화살표 |

#### 동작
- hover enter → `delay`ms 후 표시, hover leave → `hideDelay`ms 후 숨김
- `trigger='click'`: 클릭 토글
- 표시/숨김: opacity + scale(0.95→1) transition 150ms
- 뷰포트 경계 감지: 넘칠 경우 반대 방향으로 자동 flip (기본 동작)

#### 제약
- 배경: `bg-gray-900` (텍스트 색상: `text-on-primary` white)
- 텍스트: `typo-caption1 font-medium`
- border-radius: `rounded-lg`
- padding: `px-3 py-2`
- z-index: `z-50`
- `'use client'` 필수
- `--gray-900` 은 팔레트 변수이므로 직접 사용 가능 (시맨틱 토큰이 아닌 팔레트 — 단, globals.css에 정의된 변수 경유)

#### Acceptance Criteria
- [ ] 4방향 placement 동작
- [ ] hover/focus/click trigger 동작
- [ ] delay/hideDelay 적용
- [ ] 뷰포트 경계에서 flip
- [ ] disabled 시 미표시
- [ ] role="tooltip", aria-describedby 연결

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Tooltip/Tooltip.tsx` | 메인 컴포넌트 |
| `src/components/Tooltip/types.ts` | 타입 정의 |
| `src/components/Tooltip/index.ts` | 배럴 익스포트 |
| `src/app/tooltip/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `Tooltip.tsx` — `useRef`로 앵커 DOM 참조, `useState`로 visible 제어
3. `useEffect`로 딜레이 타이머 관리 (`setTimeout/clearTimeout`)
4. 위치 계산: `getBoundingClientRect` → `position: fixed` + top/left 계산
5. flip 로직: 뷰포트 넘침 감지
6. 화살표: CSS `::before` 또는 인라인 SVG
7. 프리뷰 페이지 — 4방향 데모

#### Reusable Components
- 없음

#### Accessibility
- `role="tooltip"` on tooltip element
- 앵커에 `aria-describedby={tooltipId}` 동적 주입

#### Dependencies
- 신규 패키지 없음

---

### 11. Date Picker

#### 목적
날짜 단일 선택 또는 범위 선택을 제공하는 캘린더 기반 입력 컴포넌트.

#### Figma Reference
- DS_2 DatePicker / Calendar 섹션

#### Component API

```typescript
// src/components/DatePicker/types.ts

export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  /** 선택 모드 */
  mode?: DatePickerMode;
  /** 단일 선택 값 */
  value?: Date | null;
  /** 범위 선택 값 */
  rangeValue?: { start: Date | null; end: Date | null };
  /** 단일 선택 변경 콜백 */
  onChange?: (date: Date | null) => void;
  /** 범위 선택 변경 콜백 */
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 비활성 날짜 목록 */
  disabledDates?: Date[];
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성 */
  disabled?: boolean;
  /** 인라인 표시 (트리거 없이 항상 표시) */
  inline?: boolean;
  /** 로케일 (기본 'ko-KR') */
  locale?: string;
  className?: string;
}
```

#### Variants / States
| Mode | 설명 |
|------|------|
| `single` | 날짜 하나 선택 |
| `range` | 시작일~종료일 선택, 중간 날짜 하이라이트 |

날짜 상태: `default`, `today`, `selected`, `range-start`, `range-end`, `in-range`, `disabled`, `outside-month`

#### 동작
- `inline={false}` (기본): Input 클릭 시 드롭다운 캘린더 오픈
- 월 이동: `<` `>` 버튼으로 이전/다음 달 이동
- 연/월 클릭: 월 선택 팝업 (Year-Month picker)
- `range` 모드: 첫 클릭=start, 두 번째 클릭=end, 드래그 hover로 범위 프리뷰
- 외부 클릭 시 드롭다운 닫힘
- `Escape` 로 닫힘

#### 제약
- 선택 날짜 배경: `bg-primary-regular text-on-primary`
- 범위 내 날짜 배경: `bg-primary-regular/10` (10% opacity — `bg-blue-50` 시맨틱 `--status-info-light`)
- 오늘 날짜: `font-bold` + underline 또는 dot
- 비활성 날짜: `text-text-disabled line-through`
- `'use client'` 필수

#### Acceptance Criteria
- [ ] single/range 모드 날짜 선택
- [ ] 월 이동 동작
- [ ] minDate/maxDate 범위 외 날짜 비활성
- [ ] disabledDates 비활성
- [ ] 외부 클릭 닫힘
- [ ] 키보드 탐색 (ArrowKey, Enter, Escape)
- [ ] role="dialog", aria-label, aria-selected 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/DatePicker/DatePicker.tsx` | 트리거 + 드롭다운 조합 |
| `src/components/DatePicker/Calendar.tsx` | 캘린더 그리드 |
| `src/components/DatePicker/types.ts` | 타입 정의 |
| `src/components/DatePicker/utils.ts` | 날짜 유틸리티 (월 생성, 포맷 등) |
| `src/components/DatePicker/index.ts` | 배럴 익스포트 |
| `src/app/date-picker/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `utils.ts` — 월 날짜 배열 생성, 날짜 포맷 (`Intl.DateTimeFormat` 사용 — 외부 라이브러리 없음)
3. `Calendar.tsx` — 7×6 그리드, 날짜 상태별 클래스
4. `DatePicker.tsx` — 트리거 InputField, 드롭다운 Portal
5. range 선택 상태 관리 (step: 'start' | 'end')
6. 프리뷰 페이지 — single/range 데모

#### Reusable Components
- `InputField` (`@/components/Input`) — 트리거 입력 필드
- `IconButton` (`@/components/Button`) — 이전/다음 달 버튼

#### Accessibility
- `role="dialog"` on calendar dropdown
- `role="grid"`, `role="gridcell"`, `role="columnheader"`
- `aria-selected` on selected date cells
- `aria-disabled` on disabled dates
- 키보드: `ArrowKey` 날짜 이동, `Enter` 선택, `Escape` 닫힘

#### Dependencies
- 신규 패키지 없음 (`Intl.DateTimeFormat` 네이티브 사용)

---

## 우선순위 3 (Priority 3)

---

### 12. Stepper

#### 목적
멀티 스텝 프로세스의 진행 상태를 시각적으로 표시. 현재 단계, 완료된 단계, 미래 단계를 구분한다.

#### Figma Reference
- DS_2 Stepper / Progress Steps 섹션

#### Component API

```typescript
// src/components/Stepper/types.ts

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'completed' | 'current' | 'upcoming' | 'error';

export interface StepItem {
  /** 스텝 레이블 */
  label: string;
  /** 스텝 서브레이블 */
  description?: string;
  /** 스텝 상태 (지정하지 않으면 activeStep으로 자동 계산) */
  status?: StepStatus;
  /** 스텝 아이콘 커스터마이징 */
  icon?: React.ReactNode;
}

export interface StepperProps {
  /** 스텝 목록 */
  steps: StepItem[];
  /** 현재 활성 스텝 인덱스 (0-based) */
  activeStep?: number;
  /** 방향 */
  orientation?: StepperOrientation;
  /** 클릭 가능 스텝 (완료된 스텝 클릭 허용) */
  clickable?: boolean;
  /** 스텝 클릭 콜백 */
  onStepClick?: (index: number) => void;
  className?: string;
}
```

#### Variants / States
| Status | 표시 |
|--------|------|
| `completed` | 체크 아이콘 + primary 색상 |
| `current` | 스텝 번호 + primary 색상 + 강조 테두리 |
| `upcoming` | 스텝 번호 + disabled 색상 |
| `error` | 에러 아이콘 + negative 색상 |

#### 동작
- `activeStep` 기준 자동 상태 계산: `index < activeStep` → completed, `index === activeStep` → current, `index > activeStep` → upcoming
- 스텝 간 연결선: `completed` 구간은 `bg-primary-regular`, 나머지 `bg-border`
- `clickable`: 완료된 스텝만 클릭 가능, `onStepClick` 호출
- `vertical`: 스텝 아이콘 + 연결선 + 레이블이 수직 배열

#### 제약
- 스텝 원 크기: `w-8 h-8` (32px)
- 완료: `bg-primary-regular text-on-primary`
- 현재: `bg-surface border-2 border-primary-regular text-primary-regular`
- 미래: `bg-surface border-2 border-border text-text-disabled`
- 에러: `bg-status-negative text-on-primary`
- 연결선: `h-px` (horizontal) / `w-px` (vertical)

#### Acceptance Criteria
- [ ] horizontal/vertical 렌더링
- [ ] activeStep으로 상태 자동 계산
- [ ] completed/current/upcoming/error 시각적 구분
- [ ] clickable 모드 동작
- [ ] aria-label, aria-current="step" 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Stepper/Stepper.tsx` | 메인 컴포넌트 |
| `src/components/Stepper/StepItem.tsx` | 개별 스텝 |
| `src/components/Stepper/types.ts` | 타입 정의 |
| `src/components/Stepper/index.ts` | 배럴 익스포트 |
| `src/app/stepper/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `StepItem.tsx` — 원형 인디케이터 + 레이블 + 연결선
3. `Stepper.tsx` — steps 배열 순회, 상태 계산 로직
4. 프리뷰 페이지 — 수평/수직 + 단계 이동 데모

#### Reusable Components
- `Icons` (`@/components/Icons`) — 체크, 에러 아이콘

#### Accessibility
- 각 스텝: `aria-label="스텝 {n}: {label} - {status}"`
- 현재 스텝: `aria-current="step"`
- `role="list"` + `role="listitem"`

#### Dependencies
- 신규 패키지 없음

---

### 13. Page Control

#### 목적
캐러셀, 슬라이드 등에서 현재 페이지 위치를 점(dot) 인디케이터로 표시.

#### Figma Reference
- DS_2 PageControl / Indicator 섹션

#### Component API

```typescript
// src/components/PageControl/types.ts

export type PageControlVariant = 'dot' | 'bar' | 'number';

export interface PageControlProps {
  /** 전체 페이지 수 */
  total: number;
  /** 현재 페이지 (0-based) */
  current: number;
  /** 변경 콜백 (클릭 가능 시) */
  onChange?: (index: number) => void;
  /** 표시 형태 */
  variant?: PageControlVariant;
  /** 클릭 가능 여부 */
  clickable?: boolean;
  /** 최대 표시 dot 수 (초과 시 축소 표시, 기본 7) */
  maxVisible?: number;
  className?: string;
}
```

#### Variants / States
| Variant | 설명 |
|---------|------|
| `dot` | 원형 점 — active: 키컬러 dot, inactive: gray dot |
| `bar` | 가로 바 — active: 넓은 바, inactive: 좁은 바 |
| `number` | "{current+1} / {total}" 텍스트 |

#### 동작
- `total > maxVisible`: 중앙에 활성 dot 고정, 앞뒤 스케일 축소 dot 표시 (carousel dot 패턴)
- `clickable`: dot 클릭 시 `onChange` 호출
- `bar` variant: active bar 너비 애니메이션 (width transition)

#### 제약
- active dot: `bg-primary-regular` (w-2.5 h-2.5)
- inactive dot: `bg-border` (w-2 h-2)
- dot 간격: `gap-2`
- bar: `rounded-full`, active `w-6`, inactive `w-2`, 높이 `h-2`

#### Acceptance Criteria
- [ ] dot/bar/number variant 렌더링
- [ ] current 변경 시 인디케이터 업데이트
- [ ] maxVisible 초과 시 축소 dot 표시
- [ ] clickable 동작
- [ ] aria-label="페이지 {n}/(total}", aria-current 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/PageControl/PageControl.tsx` | 메인 컴포넌트 |
| `src/components/PageControl/types.ts` | 타입 정의 |
| `src/components/PageControl/index.ts` | 배럴 익스포트 |
| `src/app/page-control/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `PageControl.tsx` — variant 분기, dot 배열 생성
3. maxVisible overflow 로직 (슬라이딩 윈도우)
4. 프리뷰 페이지 — 슬라이더와 연동 데모

#### Reusable Components
- 없음

#### Accessibility
- `role="tablist"` 또는 `role="group"`
- 각 dot: `aria-label="페이지 {n+1}"`, `aria-current="true"` (active dot)

#### Dependencies
- 신규 패키지 없음

---

### 14. Action Sheet

#### 목적
iOS 스타일의 파괴적/비가역적 액션 확인 시트. 옵션 목록과 취소 버튼이 분리되어 표시된다.

#### Figma Reference
- DS_2 ActionSheet / Alert 섹션 (Alert Node: `5856:71629`)

#### Component API

```typescript
// src/components/ActionSheet/types.ts

export type ActionSheetItemVariant = 'default' | 'destructive' | 'disabled';

export interface ActionSheetItem {
  /** 아이템 레이블 */
  label: string;
  /** 아이템 변형 */
  variant?: ActionSheetItemVariant;
  /** 선행 아이콘 */
  icon?: React.ReactNode;
  /** 클릭 콜백 */
  onClick?: () => void;
}

export interface ActionSheetProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 시트 제목 (선택) */
  title?: string;
  /** 시트 설명 (선택) */
  description?: string;
  /** 액션 아이템 목록 */
  items: ActionSheetItem[];
  /** 취소 버튼 레이블 (기본 "취소") */
  cancelLabel?: string;
  /** 취소 버튼 숨김 여부 (기본 false) */
  hideCancel?: boolean;
  /** 딤드 클릭으로 닫기 (기본 true) */
  closeOnBackdropClick?: boolean;
}
```

#### Variants / States
아이템 variant:
| Variant | 색상 |
|---------|------|
| `default` | `text-text-primary` |
| `destructive` | `text-status-negative` |
| `disabled` | `text-text-disabled` |

#### 동작
- BottomSheet와 유사하게 하단에서 올라옴 (애니메이션 동일)
- 취소 버튼은 메인 아이템 그룹과 **분리된 카드**로 표시 (iOS 패턴)
- 아이템 클릭 시 해당 `onClick` 호출 후 자동 닫힘
- `destructive` 아이템: 클릭 전 추가 확인 없음 (Action Sheet 자체가 확인 단계)
- `disabled` 아이템: 클릭 방지

#### 제약
- 각 카드: `bg-surface rounded-2xl overflow-hidden`
- 아이템 간 구분: Divider 컴포넌트 (`weak`)
- 취소 카드: 메인 카드와 `gap-3` 분리
- 아이템 높이: `h-14` (56px)
- `'use client'` 필수

#### Acceptance Criteria
- [ ] 열림/닫힘 애니메이션
- [ ] 아이템 그룹과 취소 버튼 분리 렌더링
- [ ] destructive 아이템 색상 강조
- [ ] disabled 아이템 클릭 방지
- [ ] title/description 표시
- [ ] role="dialog", aria-modal, aria-label 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/ActionSheet/ActionSheet.tsx` | 메인 컴포넌트 |
| `src/components/ActionSheet/types.ts` | 타입 정의 |
| `src/components/ActionSheet/index.ts` | 배럴 익스포트 |
| `src/app/action-sheet/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `ActionSheet.tsx` — BottomSheet 애니메이션 패턴 재활용 (Portal + transform)
3. 두 카드(아이템 그룹, 취소) 분리 렌더링
4. Divider 컴포넌트로 아이템 간 구분
5. 프리뷰 페이지 — default/destructive 아이템 혼합 데모

#### Reusable Components
- `Divider` (`@/components/Divider`) — 아이템 구분선
- BottomSheet의 딤드/애니메이션 패턴 (코드 공유 또는 재구현)

#### Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- 포커스 트랩
- `Escape` 키 닫힘

#### Dependencies
- 신규 패키지 없음

---

### 15. Accordion

#### 목적
클릭으로 콘텐츠를 접고 펼치는 아코디언 컴포넌트. 단일/다중 열기 모드를 지원한다.

#### Figma Reference
- DS_2 Accordion / Collapse 섹션

#### Component API

```typescript
// src/components/Accordion/types.ts

export type AccordionMode = 'single' | 'multiple';

export interface AccordionItem {
  /** 아이템 고유 키 */
  key: string;
  /** 헤더 레이블 */
  label: string;
  /** 헤더 서브레이블 */
  sublabel?: string;
  /** 선행 아이콘 */
  leadingIcon?: React.ReactNode;
  /** 콘텐츠 */
  content: React.ReactNode;
  /** 비활성 여부 */
  disabled?: boolean;
}

export interface AccordionProps {
  /** 아코디언 아이템 목록 */
  items: AccordionItem[];
  /** 열기 모드 */
  mode?: AccordionMode;
  /** 현재 열린 키 (controlled, single 모드) */
  value?: string | null;
  /** 현재 열린 키들 (controlled, multiple 모드) */
  values?: string[];
  /** 기본 열린 키 (uncontrolled) */
  defaultValue?: string;
  /** 기본 열린 키들 (uncontrolled, multiple) */
  defaultValues?: string[];
  /** 변경 콜백 (single) */
  onChange?: (key: string | null) => void;
  /** 변경 콜백 (multiple) */
  onMultiChange?: (keys: string[]) => void;
  /** 아이템 간 Divider 표시 (기본 true) */
  showDivider?: boolean;
  /** 테두리 스타일 */
  bordered?: boolean;
  className?: string;
}
```

#### Variants / States
| State | 설명 |
|-------|------|
| Collapsed | 헤더만 표시, 화살표 아이콘 아래 방향 |
| Expanded | 헤더 + 콘텐츠 표시, 화살표 아이콘 위 방향 (180도 회전) |
| Disabled | 클릭 불가, opacity 0.4 |

#### 동작
- `single` 모드: 하나 열리면 이전 것 닫힘
- `multiple` 모드: 여러 개 동시 열림 가능
- 펼침 애니메이션: `max-height: 0 → max-height: 500px` + `overflow: hidden`, 또는 CSS Grid trick (`grid-template-rows: 0fr → 1fr`) — transition 250ms ease
- 화살표 아이콘: `transition: transform 250ms`, `rotate-180` (expanded 시)

#### 제약
- 헤더 배경: `bg-surface`
- 헤더 텍스트: `typo-body1 font-medium text-text-primary`
- 콘텐츠 패딩: `px-4 pb-4`
- 구분선: Divider `weak` variant
- 색상 하드코딩 금지

#### Acceptance Criteria
- [ ] single/multiple 모드 동작
- [ ] 펼침/접힘 애니메이션 (jank 없음)
- [ ] 화살표 아이콘 회전 애니메이션
- [ ] disabled 아이템 클릭 방지
- [ ] 키보드 Enter/Space로 토글
- [ ] role="list", role="listitem", aria-expanded, aria-controls 적용

#### Affected Files
| 파일 | 역할 |
|------|------|
| `src/components/Accordion/Accordion.tsx` | 아코디언 컨테이너 |
| `src/components/Accordion/AccordionItem.tsx` | 개별 아이템 |
| `src/components/Accordion/types.ts` | 타입 정의 |
| `src/components/Accordion/index.ts` | 배럴 익스포트 |
| `src/app/accordion/page.tsx` | 프리뷰 페이지 |

#### Implementation Steps
1. `types.ts` 작성
2. `AccordionItem.tsx` — `useRef`(content div) + CSS Grid trick으로 애니메이션
3. `Accordion.tsx` — controlled/uncontrolled 상태 관리, single/multiple 모드 분기
4. Divider 컴포넌트 연결
5. 프리뷰 페이지 — single/multiple + bordered 데모

#### Reusable Components
- `Divider` (`@/components/Divider`) — 아이템 구분선
- `Icons` (`@/components/Icons`) — 화살표 아이콘

#### Accessibility
- 헤더 버튼: `aria-expanded`, `aria-controls`
- 콘텐츠 패널: `id` 연결, `role="region"`, `aria-labelledby`
- 키보드: `Enter`/`Space` 토글, `ArrowUp`/`Down`으로 헤더 간 이동

#### Dependencies
- 신규 패키지 없음

---

## 공통 제약 사항 (전 컴포넌트)

1. **색상 하드코딩 금지**: `bg-[#FF0000]` 형태 arbitrary value 사용 금지. `globals.css`의 `@theme inline`에 등록된 Tailwind 유틸리티 클래스만 사용.
2. **팔레트 변수 직접 참조 허용 범위**: `var(--gray-200)` 등 팔레트 CSS 변수는 globals.css에 `:root`에 정의된 것만 참조 가능. 단, 시맨틱 토큰이 존재하면 시맨틱 토큰 우선 사용.
3. **`tailwind.config.ts` 생성 금지**: Tailwind v4 — CSS 기반 설정만 사용 (`globals.css`의 `@theme inline` 블록 수정).
4. **새 Tailwind 유틸리티 추가 시**: `globals.css`의 `@theme inline` 또는 `@utility` 블록에만 추가.
5. **`'use client'` 최소화**: 상태/이벤트가 필요한 컴포넌트만 사용. Server Component로 구현 가능한 부분은 분리.
6. **파일당 ~300줄 권장**: 초과 시 하위 컴포넌트 파일로 분리.
7. **의존성 순서 (Priority 간 의존)**:
   - `Slider`가 `Tooltip`을 사용하므로 Tooltip 먼저 구현 권장
   - `ActionSheet`가 `Divider`를 사용하므로 Divider 먼저 구현 필수
   - `Accordion`이 `Divider`를 사용하므로 Divider 먼저 구현 필수
   - `Tabs`가 `Badge`를 선택적으로 사용

---

## 구현 순서 권장

```
Priority 1 (병렬 구현 가능):
  - Divider (가장 단순, 다른 컴포넌트 의존성)
  - Skeleton
  - Badge

Priority 1 (Divider/Badge 후):
  - Bottom Sheet (Badge 독립)
  - Search Bar
  - FAB

Priority 2 (Priority 1 완료 후):
  - Tooltip (Slider 의존성)
  - Divider 활용: Tabs, Segmented Control
  - Slider (Tooltip 후)
  - Date Picker (InputField 재사용)

Priority 3 (Priority 2 완료 후):
  - Stepper
  - Page Control
  - Action Sheet (Divider, BottomSheet 패턴 재사용)
  - Accordion (Divider, Icons 재사용)
```

---

## design-system.md 업데이트 필요 항목 (Core Widgets 테이블)

구현 완료 시 `design-system.md`의 Core Widgets Inventory 테이블에 아래 행을 추가해야 한다:

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| BottomSheet | `@/components/BottomSheet` | 하단 모달 시트 | open, onClose, state, peekHeight, showHandle |
| SearchBar | `@/components/SearchBar` | 검색 입력 | value, onChange, onSearch, onCancel, showCancel |
| Skeleton | `@/components/Skeleton` | 로딩 플레이스홀더 | variant, width, height, lines, animate |
| Badge | `@/components/Badge` | 알림 배지 | variant, count, max, color, anchorOrigin |
| FAB | `@/components/FAB` | 플로팅 액션 버튼 | size, variant, icon, label, position |
| Divider | `@/components/Divider` | 구분선 | orientation, variant, strength, inset |
| Tabs | `@/components/Tabs` | 탭 전환 | items, activeKey, onChange, variant, size |
| SegmentedControl | `@/components/SegmentedControl` | 단일 선택 토글 | items, value, onChange, size, fullWidth |
| Slider | `@/components/Slider` | 값 범위 입력 | mode, min, max, step, value, rangeValue |
| Tooltip | `@/components/Tooltip` | 컨텍스트 레이블 | content, placement, trigger, delay |
| DatePicker | `@/components/DatePicker` | 날짜 선택 | mode, value, onChange, minDate, maxDate, inline |
| Stepper | `@/components/Stepper` | 멀티 스텝 진행 표시 | steps, activeStep, orientation, clickable |
| PageControl | `@/components/PageControl` | 캐러셀 인디케이터 | total, current, onChange, variant, maxVisible |
| ActionSheet | `@/components/ActionSheet` | 파괴적 액션 확인 | open, onClose, items, title, cancelLabel |
| Accordion | `@/components/Accordion` | 접기/펼치기 콘텐츠 | items, mode, value, onChange, showDivider |
