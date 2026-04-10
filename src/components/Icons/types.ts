/* ── Rendering Modes ── */
export type RenderingMode = 'monochrome' | 'hierarchical' | 'palette' | 'multicolor';

/* ── Weights (SF font weight 매칭) ── */
export type IconWeight = 'ultralight' | 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy' | 'black';

/* ── Scales ── */
export type IconScale = 'small' | 'medium' | 'large';

/* ── Weight → strokeWidth 매핑 ── */
export const weightToStroke: Record<IconWeight, number> = {
  ultralight: 1,
  thin: 1,
  light: 1,
  regular: 2,
  medium: 2,
  semibold: 2,
  bold: 2,
  heavy: 3,
  black: 3,
};

/* ── Scale → size 배율 (cap height 기준) ── */
export const scaleMultiplier: Record<IconScale, number> = {
  small: 1,
  medium: 1.15,
  large: 1.3,
};

/* ── 레이어 정의 (Hierarchical/Palette/Multicolor용) ── */
export interface IconLayer {
  path: string;
  level: 'primary' | 'secondary' | 'tertiary';
  /** Line 변형에서도 fill로 렌더링 (점, 원형 마크 등) */
  fillOnly?: boolean;
}

/* ── Hierarchical opacity ── */
export const hierarchicalOpacity: Record<string, number> = {
  primary: 1,
  secondary: 0.5,
  tertiary: 0.25,
};

/* ── Animation types ── */
export type IconAnimation =
  | 'none'
  | 'bounce'
  | 'scale'
  | 'pulse'
  | 'rotate'
  | 'wiggle'
  | 'breathe';

/* ── Variable Color ── */
export interface VariableColorConfig {
  value: number; // 0~100
  layers: string[]; // 색상이 적용될 레이어 순서
}

/* ── Icon Props ── */
export interface IconProps {
  /** 아이콘 크기 (px). 기본 24 */
  size?: number;
  /** 아이콘 색상. 기본 'currentColor' */
  color?: string;
  /** 스트로크 두께 (Line 스타일). weight로 자동 결정 가능 */
  strokeWidth?: number;
  /** 폰트 weight 매칭. strokeWidth보다 우선 */
  weight?: IconWeight;
  /** 텍스트 대비 스케일. 기본 'medium' */
  scale?: IconScale;
  /** 렌더링 모드. 기본 'monochrome' */
  renderingMode?: RenderingMode;
  /** Palette 모드에서 레이어별 색상 [primary, secondary, tertiary] */
  paletteColors?: [string, string?, string?];
  /** 애니메이션. 기본 'none' */
  animation?: IconAnimation;
  /** Multicolor 모드에서 레이어별 고유 색상 */
  multicolorMap?: Record<string, string>;
  /** Variable Color 설정 */
  variableColor?: VariableColorConfig;
  /** 추가 className */
  className?: string;
}
