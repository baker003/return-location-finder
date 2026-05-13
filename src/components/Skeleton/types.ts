export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: number | string;
  height?: number | string;
  lines?: number;
  lastLineWidthRatio?: number;
  animate?: boolean;
  className?: string;
}
