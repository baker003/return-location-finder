# SOCAR FRAME_2 Design System Reference

## 1. Core Widgets Inventory

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| ActionButton | `@/components/Button` | 주요 액션 버튼 (CTA, 제출, 확인) | type, variant, size, disabled, loading, fullWidth, leftIcon, rightIcon |
| TextButton | `@/components/Button` | 보조 텍스트 버튼 (취소, 보조 액션) | variant, size, disabled, leftIcon, rightIcon |
| IconButton | `@/components/Button` | 아이콘 전용 버튼 (닫기, 메뉴) | size, shape, type, icon, aria-label |
| LinkTextButton | `@/components/Button` | 인라인 링크 텍스트 버튼 | size, href, disabled |
| Chip | `@/components/Chip` | 개별 칩 아이템 (필터, 태그, 선택) | type, size(lg/md/sm/xs), selected, disabled, label, fontStyle, count, leadingIcon, trailingIcon, showNewBadge |
| ChipGroup | `@/components/Chip` | 칩 그룹 레이아웃 컨테이너 (Carousel/Multiline) | layout, gap |
| Tag | `@/components/Tag` | 읽기 전용 라벨 (상태 표시, 카테고리, 속성 강조) | type, size(xs/sm/md/lg), bold, color, label, leadingIcon, showLeadingIcon |
| TagGroup | `@/components/Tag` | Tag 그룹 컨테이너 (Divider 포함) | type, showDivider, dividerStyle, gap |
| TopAppbar | `@/components/TopAppbar` | 상단 앱바 컨테이너 (네비게이션 + 타이틀 + 액션) | theme, loading, progress, leading, instant, trailing, sticky |
| LeadingButton | `@/components/TopAppbar` | 좌측 네비게이션 버튼 (뒤로가기, 닫기, 홈) | variant, onClick, aria-label |
| TrailingButton | `@/components/TopAppbar` | 우측 액션 영역 (아이콘 버튼 그룹 / 텍스트 버튼) | variant, buttons, label, onClick |
| TopAppbarInstant | `@/components/TopAppbar` | 중앙 콘텐츠 슬롯 (Heading, Label, TextButton, Input, Image) | variant, title, label, placeholder, src |
| ProgressBar | `@/components/TopAppbar` | 프로그래스 바 (determinate / indeterminate) | progress |

> 새 위젯을 만들기 전에 이 표를 먼저 확인하세요.
> 새로 만든 재사용 위젯은 반드시 여기에 등록하세요.

## 2. Color Tokens

### Palette

SOCAR FRAME 2.0 Figma에서 추출한 팔레트:

```css
:root {
  /* Gray */
  --gray-50: #F9F9FB; --gray-100: #F2F3F8; --gray-200: #E5E8EF; --gray-300: #CBD1DC;
  --gray-400: #B4BBCB; --gray-500: #99A1B1; --gray-600: #697383; --gray-700: #4A5667;
  --gray-800: #354153; --gray-900: #262F3C; --gray-1000: #141A24;

  /* Blue (Primary) */
  --blue-50: #EBF5FF; --blue-100: #D6EBFF; --blue-200: #99CEFF; --blue-300: #6BB5FF;
  --blue-400: #3393FF; --blue-500: #0078FF; --blue-600: #0069FF; --blue-700: #0052E0;
  --blue-800: #0042C7; --blue-900: #0033A9;

  /* Red */
  --red-50: #FFF0F3; --red-100: #FFDBDF; --red-200: #FFA1AC; --red-300: #FF7686;
  --red-400: #FF576A; --red-500: #FF3A5B; --red-600: #F51441; --red-700: #E60532;
  --red-800: #D30831; --red-900: #C10027;

  /* Orange */
  --orange-50: #FFF8E6; --orange-100: #FFF3CC; --orange-200: #FFDD99; --orange-300: #FFC566;
  --orange-400: #FFA940; --orange-500: #FF8800; --orange-600: #FA7900; --orange-700: #F56A00;
  --orange-800: #EC5704; --orange-900: #DD4600;

  /* Green */
  --green-50: #E6FEF0; --green-500: #04CA81; --green-600: #00BB83;

  /* LightBlue */
  --lightblue-50: #EBFAFF; --lightblue-100: #D6F4FF; --lightblue-200: #8FDFFF;
  --lightblue-300: #54C9FF; --lightblue-400: #33BEFF; --lightblue-500: #00AEFF;
  --lightblue-600: #00A2FA; --lightblue-700: #0094F7; --lightblue-800: #0086EC;
  --lightblue-900: #006DDF;

  /* Purple */
  --purple-50: #F5F0FF; --purple-100: #EAE1FE; --purple-200: #D2C1FC;
  --purple-300: #BCA2FC; --purple-400: #AB8AFF; --purple-500: #956BFF;
  --purple-600: #8355FF; --purple-700: #7444F4; --purple-800: #622EFF;
  --purple-900: #481BDB;

  /* Indigo */
  --indigo-50: #ECEFFE; --indigo-100: #D7DEFE; --indigo-200: #B5C4FD;
  --indigo-300: #899CFB; --indigo-400: #647DFF; --indigo-500: #4B68FF;
  --indigo-600: #3554F8; --indigo-700: #2C46F0; --indigo-800: #1C36E0;
  --indigo-900: #0F27C7;

  /* Magenta */
  --magenta-50: #FFF0F7; --magenta-100: #FFE1EF; --magenta-200: #FFAFD2;
  --magenta-300: #FF85B6; --magenta-400: #FF67A6; --magenta-500: #FF4397;
  --magenta-600: #F52C87; --magenta-700: #E81E79; --magenta-800: #D71968;
  --magenta-900: #C60052;

  /* Cyan */
  --cyan-50: #E5FFFC; --cyan-100: #CDFEFB; --cyan-200: #A2F6F3;
  --cyan-300: #66EAE8; --cyan-400: #42DFE5; --cyan-500: #01C9D7;
  --cyan-600: #00B8D0; --cyan-700: #00A7C1; --cyan-800: #0097B1;
  --cyan-900: #0086A0;

  /* Lime */
  --lime-50: #F2FFD4; --lime-100: #E3FCA9; --lime-200: #CDF779;
  --lime-300: #AFF03E; --lime-400: #96E311; --lime-500: #8AD510;
  --lime-600: #78C800; --lime-700: #68B800; --lime-800: #56AB00;
  --lime-900: #499C00;

  /* RedOrange */
  --redorange-50: #FFF5EB; --redorange-100: #FFE1C2; --redorange-200: #FFBA82;
  --redorange-300: #FF9651; --redorange-400: #FF7D37; --redorange-500: #FF7017;
  --redorange-600: #F8530C; --redorange-700: #F04000; --redorange-800: #E73803;
  --redorange-900: #DE2702;
}
```

### Semantic Tokens

Figma에서 추출한 Semantic 토큰:

```css
/* Semantic — Dark (기본) */
:root {
  /* Text */
  --text-strong: var(--gray-1000);
  --text-primary: var(--gray-800);
  --text-secondary: var(--gray-600);
  --text-tertiary: var(--gray-500);
  --text-disabled: var(--gray-400);
  --text-initial: #28323C;

  /* Primary */
  --primary-regular: var(--blue-500);
  --primary-strong: var(--blue-600);
  --primary-heavy: var(--blue-700);

  /* Status */
  --status-info-light: var(--blue-50);
  --status-info-regular: var(--blue-500);
  --status-info-strong: var(--blue-600);
  --status-positive-weak: var(--green-50);
  --status-positive-regular: var(--green-500);
  --status-positive-strong: var(--green-600);
  --status-caution-weak: var(--orange-50);
  --status-caution-regular: var(--orange-500);
  --status-caution-strong: var(--orange-600);
  --status-negative-weak: var(--red-50);
  --status-negative-regular: var(--red-500);
  --status-negative-strong: var(--red-600);

  /* Accent */
  --accent-red: var(--red-500);
  --accent-orange: var(--orange-500);
  --accent-green: var(--green-500);
  --accent-light-blue: var(--lightblue-500);
  --accent-purple: var(--purple-500);
  --accent-red-orange: var(--redorange-500);
  --accent-indigo: var(--indigo-500);
  --accent-magenta: var(--magenta-500);
  --accent-lime: var(--lime-500);
  --accent-cyan: var(--cyan-500);

  /* Background */
  --background-regular: var(--gray-100);

  /* Border */
  --border-weak: var(--gray-100);
  --border-regular: var(--gray-200);

  /* Divider */
  --divider-weak: var(--gray-100);
  --divider-regular: var(--gray-200);

  /* Dimmed */
  --dimmed-regular: rgba(0, 0, 0, 0.44);

  /* Pressed */
  --pressed-dark-weak: rgba(20, 26, 36, 0.06);

  /* Notification */
  --notification-red: var(--red-500);

  /* Service */
  --service-socar: var(--blue-500);
  --service-business: var(--blue-900);

  /* Location */
  --location-return: var(--indigo-700);
}
```

### 시맨틱 토큰 용도 가이드

| CSS 변수 | 용도 |
|----------|------|
| --text-strong | 가장 강한 텍스트 (gray-1000) |
| --text-primary | 본문 텍스트 (gray-800) |
| --text-secondary | 보조 텍스트 (gray-600) |
| --text-tertiary | 3차 텍스트 (gray-500) |
| --text-disabled | 비활성 텍스트, 플레이스홀더 (gray-400) |
| --primary-regular | 주요 액션, 링크 (blue-500) |
| --primary-strong | 주요 버튼 (blue-600) |
| --primary-heavy | 강조 (blue-700) |
| --background-regular | 페이지 배경 (gray-100) |
| --border-regular | 구분선, 테두리 (gray-200) |
| --status-negative-regular | 에러 (red-500) |
| --status-caution-regular | 경고 (orange-500) |
| --status-positive-regular | 성공 (green-500) |
| --dimmed-regular | 딤 배경 (black 44%) |

### Apple HIG 시맨틱 토큰 (추가 레이어)

Apple Human Interface Guidelines 컬러 시스템의 시맨틱 구조를 SOCAR FRAME_2에 매핑한 추가 토큰입니다.

| CSS 변수 | Tailwind 클래스 | 값 | 용도 |
|----------|-----------------|------|------|
| --bg-primary | `bg-bg-primary` | gray-100 (#F2F3F8) | systemBackground — 기본 페이지 배경 |
| --bg-secondary | `bg-bg-secondary` | #FFFFFF | secondarySystemBackground — 카드/시트 배경 |
| --bg-tertiary | `bg-bg-tertiary` | gray-50 (#F9F9FB) | tertiarySystemBackground — 3차 배경 |
| --bg-grouped | `bg-bg-grouped` | gray-50 (#F9F9FB) | systemGroupedBackground — 그룹형 테이블 배경 |
| --bg-elevated | `bg-bg-elevated` | #FFFFFF | 다크모드 대비 elevated surface |
| --fill-primary | `bg-fill-primary` | rgba(20,26,36,0.08) | 텍스트 위 얇은 오버레이 |
| --fill-secondary | `bg-fill-secondary` | rgba(20,26,36,0.16) | 중간 오버레이 |
| --fill-tertiary | `bg-fill-tertiary` | rgba(20,26,36,0.24) | 강한 오버레이 |
| --separator | `border-separator` | gray-200 (#E5E8EF) | 기본 구분선 |
| --separator-opaque | `border-separator-opaque` | gray-300 (#CBD1DC) | 불투명 구분선 |

> 기존 SOCAR Semantic 토큰은 그대로 유지됩니다. Apple HIG 토큰은 추가 레이어로만 존재합니다.

### 접근성 대비 기준 (WCAG AA)

- **일반 텍스트** (14px 미만): 최소 4.5:1 대비
- **대형 텍스트** (18px bold 또는 24px 이상): 최소 3:1 대비

#### 대비 검증 결과

| 전경 | 배경 | 대비율 | AA (4.5:1) | AA Large (3:1) |
|------|------|--------|------------|----------------|
| text-primary (#354153) | bg-secondary (#FFFFFF) | 10.33:1 | PASS | PASS |
| text-secondary (#697383) | bg-secondary (#FFFFFF) | 4.79:1 | PASS | PASS |
| text-tertiary (#697383) | bg-secondary (#FFFFFF) | 4.79:1 | PASS | PASS |
| text-disabled (#99A1B1) | bg-secondary (#FFFFFF) | 2.60:1 | FAIL | FAIL |
| primary-strong (#0069FF) | bg-secondary (#FFFFFF) | 4.70:1 | PASS | PASS |
| on-primary (#FFFFFF) | primary-strong (#0069FF) | 4.70:1 | PASS | PASS |
| status-negative (#F51441) | bg-secondary (#FFFFFF) | 4.63:1 | PASS | PASS |
| text-primary (#354153) | bg-primary (#F2F3F8) | 9.32:1 | PASS | PASS |

> **참고**: text-disabled(gray-500)은 WCAG AA 일반 텍스트 기준(4.5:1)에 미달하지만, 비활성 요소는 WCAG에서 대비 요구사항이 면제됩니다. (WCAG 1.4.3 예외: "비활성 UI 컴포넌트")

### Surface / On-Surface 토큰

| Tailwind 클래스 | CSS 변수 | 값 | 용도 |
|-----------------|----------|------|------|
| bg-surface | --color-surface | #FFFFFF | 카드/칩/태그 등 흰색 배경 (bg-white 대체) |
| text-on-primary | --color-on-primary | #FFFFFF | primary 색상 배경 위 텍스트 (text-white 대체) |
| text-on-surface | --color-on-surface | var(--text-strong) | surface 위 텍스트 |

## 3. Typography

Pretendard Variable 폰트를 사용합니다. (사용 불가 시 대체 폰트 확인 후 진행)

SOCAR FRAME 2.0 타이포그래피 시스템:

| Token | Tailwind 클래스 | Size | Line Height |
|-------|-----------------|------|-------------|
| Heading/1 | `typo-heading-1` | 28 | 38 |
| Heading/2 | `typo-heading-2` | 24 | 34 |
| Heading/3 | `typo-heading-3` | 22 | 30 |
| Title/1 | `typo-title-1` | 20 | 28 |
| Title/2 | `typo-title-2` | 18 | 26 |
| Title/3 | `typo-title-3` | 16 | 24 |
| Subtitle/1 | `typo-subtitle-1` | 16 | 24 |
| Subtitle/2 | `typo-subtitle-2` | 14 | 22 |
| Subtitle/3 | `typo-subtitle-3` | 13 | 20 |
| Body/1 | `typo-body-1` | 16 | 24 |
| Body/2 | `typo-body-2` | 14 | 22 |
| Body/3 | `typo-body-3` | 13 | 20 |
| Caption/1 | `typo-caption-1` | 12 | 18 |
| Caption/2 | `typo-caption-2` | 11 | 16 |

> `typo-*` 클래스는 font-size + line-height만 포함합니다. font-weight는 별도 Tailwind 클래스(`font-bold`, `font-semibold`, `font-medium`, `font-normal` 등)로 적용하세요.
>
> 예시: `typo-body-2 font-semibold`, `typo-caption-1 font-medium`

## 4. Tailwind 테마 등록 (Tailwind v4)

`globals.css`에 `@theme inline` 블록으로 시맨틱 CSS 변수를 Tailwind 유틸리티로 매핑합니다.

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-text-strong: var(--text-strong);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-text-disabled: var(--text-disabled);
  --color-primary-regular: var(--primary-regular);
  --color-primary-strong: var(--primary-strong);
  --color-primary-heavy: var(--primary-heavy);
  --color-background: var(--background-regular);
  --color-border: var(--border-regular);
  --color-border-weak: var(--border-weak);
  --color-divider: var(--divider-regular);
  --color-status-info: var(--status-info-regular);
  --color-status-positive: var(--status-positive-regular);
  --color-status-caution: var(--status-caution-regular);
  --color-status-negative: var(--status-negative-regular);
  --color-status-negative-strong: var(--status-negative-strong);
  --color-pressed-dark-weak: var(--pressed-dark-weak);
  --color-gray-100: var(--gray-100);
  --color-gray-200: var(--gray-200);

  /* Surface */
  --color-surface: #FFFFFF;
  --color-on-primary: #FFFFFF;
  --color-on-surface: var(--text-strong);
}
```

## 5. 아이콘-텍스트 사이즈 규칙 (Carbon Design System 기준)

**기본 원칙**
- 아이콘 기본 사이즈는 16px
- 아이콘 사이즈는 텍스트 font-size가 아니라 line-height 기준으로 맞춤
- 텍스트가 커질 때만 아이콘도 키움 (16px → 20px → 24px → 32px)
- 아이콘과 텍스트는 베이스라인 정렬이 아니라 center 정렬
- 아이콘 사이즈를 임의로 변경하지 않음

**텍스트별 아이콘 사이즈**

| 텍스트 Line Height | 아이콘 사이즈 |
|---|---|
| ~20px 이하 | 16px |
| 20px ~ 26px | 20px |
| 26px ~ 32px | 24px |
| 32px 이상 | 32px |

**정렬**
- 아이콘과 텍스트는 항상 align-items: center
- 아이콘 색상은 텍스트 색상과 동일하게 맞춤

## 6. 금지사항
- 색상 하드코딩 금지 -- 반드시 시맨틱 토큰(Tailwind 클래스) 사용
- `bg-[#FF0000]` 같은 arbitrary value 금지
- Core Widgets에 등재된 위젯을 중복 구현 금지
- `tailwind.config.ts` 파일 생성 금지 -- Tailwind v4는 CSS 기반 설정만 사용

## 7. Figma 참조

### 디자인 시스템
- SOCAR FRAME 2.0: https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/

### 주요 페이지
| 페이지 | Node ID | 내용 |
|--------|---------|------|
| Color | 698:36442 | Palette + Semantic 컬러 |
| Typography | 698:36443 | 타이포그래피 시스템 |
| Iconography | 3833:34405 | 아이콘 |
| Spacing | 3833:34403 | 패딩/갭 |
| Corner Radius | 3833:34404 | 코너 라디어스 |
| Top Appbar | 690:6564 | 상단 앱바 |
| Button | 698:35982 | 버튼 |
| Bottomsheet | 698:36070 | 바텀시트 |
| Alert | 5856:71629 | 알럿 |
| Snackbar | 5954:34603 | 스낵바 |
