import type { CSSProperties } from 'react';
import type { SkeletonProps } from './types';

const SHAPE_CLASS: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text: 'rounded-sm',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-lg',
};

function toStyle(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

function SingleBone({
  variant = 'text',
  width,
  height,
  animate = true,
  className = '',
  style,
}: {
  variant?: SkeletonProps['variant'];
  width?: number | string;
  height?: number | string;
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const shapeClass = SHAPE_CLASS[variant ?? 'text'];
  const animateClass = animate ? 'animate-[shimmer_1.5s_ease-in-out_infinite]' : '';
  const defaultHeight = variant === 'text' ? '1em' : undefined;

  const inlineStyle: CSSProperties = {
    width: toStyle(width),
    height: toStyle(height) ?? defaultHeight,
    ...style,
  };

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="로딩 중"
      className={`skeleton-base ${shapeClass} ${animateClass} ${className}`}
      style={inlineStyle}
    />
  );
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  lastLineWidthRatio = 0.7,
  animate = true,
  className = '',
}: SkeletonProps) {
  // Multi-line text skeleton
  if (variant === 'text' && lines > 1) {
    const animateClass = animate ? 'animate-[shimmer_1.5s_ease-in-out_infinite]' : '';

    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="로딩 중"
        className={`flex flex-col gap-2 ${className}`}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`skeleton-base rounded-sm ${animateClass}`}
            style={{
              width:
                i === lines - 1
                  ? toStyle(width)
                    ? `calc(${toStyle(width)} * ${lastLineWidthRatio})`
                    : `${lastLineWidthRatio * 100}%`
                  : toStyle(width) ?? '100%',
              height: toStyle(height) ?? '1em',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <SingleBone
      variant={variant}
      width={width}
      height={height}
      animate={animate}
      className={className}
    />
  );
}
