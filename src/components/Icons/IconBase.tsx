'use client';

import { IconProps, IconLayer, weightToStroke, scaleMultiplier, hierarchicalOpacity } from './types';

/* ── 애니메이션 CSS 클래스 ── */
const animationClasses: Record<string, string> = {
  none: '',
  bounce: 'animate-bounce',
  scale: 'hover:scale-110 transition-transform',
  pulse: 'animate-pulse',
  rotate: 'animate-spin',
  wiggle: 'animate-wiggle',
  breathe: 'animate-breathe',
};

interface IconBaseProps extends IconProps {
  /** Line 스타일 레이어 (stroke 기반) */
  lineLayers?: IconLayer[];
  /** Fill 스타일 레이어 (fill 기반) */
  fillLayers?: IconLayer[];
  /** Monochrome fill용 단일 경로 (evenodd 컷아웃 지원) */
  monoPath?: string;
  /** 변형 (line/fill) */
  variant?: 'line' | 'fill';
}

export default function IconBase({
  size = 24,
  color = 'currentColor',
  strokeWidth,
  weight = 'regular',
  scale = 'medium',
  renderingMode = 'monochrome',
  paletteColors,
  animation = 'none',
  variableColor,
  className,
  lineLayers = [],
  fillLayers = [],
  monoPath,
  multicolorMap = {},
  variant = 'line',
}: IconBaseProps) {
  const resolvedStroke = strokeWidth ?? weightToStroke[weight];
  const resolvedSize = Math.round(size * scaleMultiplier[scale]);
  const layers = variant === 'fill' ? fillLayers : lineLayers;

  function getLayerColor(level: string, index: number): string {
    switch (renderingMode) {
      case 'monochrome':
        return color;
      case 'hierarchical':
        return color;
      case 'palette':
        if (paletteColors) {
          if (level === 'primary') return paletteColors[0];
          if (level === 'secondary') return paletteColors[1] ?? paletteColors[0];
          if (level === 'tertiary') return paletteColors[2] ?? paletteColors[1] ?? paletteColors[0];
        }
        return color;
      case 'multicolor':
        return multicolorMap[level] ?? color;
      default:
        return color;
    }
  }

  function getLayerOpacity(level: string): number {
    if (renderingMode === 'hierarchical') {
      return hierarchicalOpacity[level] ?? 1;
    }
    if (variableColor && variableColor.layers.includes(level)) {
      const idx = variableColor.layers.indexOf(level);
      const threshold = ((idx + 1) / variableColor.layers.length) * 100;
      return variableColor.value >= threshold ? 1 : 0.2;
    }
    return 1;
  }

  const animClass = animationClasses[animation] || '';

  // Fill 변형 + Monochrome: 단일 evenodd 경로로 렌더링 (컷아웃 효과)
  if (variant === 'fill' && renderingMode === 'monochrome' && monoPath) {
    return (
      <svg
        width={resolvedSize}
        height={resolvedSize}
        viewBox="0 -960 960 960"
        fill="none"
        className={`${animClass} ${className ?? ''}`.trim()}
        aria-hidden="true"
      >
        <path d={monoPath} fill={color} fillRule="evenodd" clipRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 -960 960 960"
      fill="none"
      className={`${animClass} ${className ?? ''}`.trim()}
      aria-hidden="true"
    >
      {layers.map((layer, i) => {
        const layerColor = getLayerColor(layer.level, i);
        const opacity = getLayerOpacity(layer.level);

        // 모든 레이어를 fill 기반으로 렌더링
        // (Material Symbols Rounded는 Line/Fill 모두 fill 기반 path)
        return (
          <path
            key={i}
            d={layer.path}
            fill={layerColor}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
}
