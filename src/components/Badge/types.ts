import type { ReactNode } from 'react';

export interface AnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeProps {
  variant?: 'count' | 'dot' | 'label';
  count?: number;
  max?: number;
  label?: string;
  hidden?: boolean;
  color?: 'primary' | 'error' | 'caution';
  anchorOrigin?: AnchorOrigin;
  children?: ReactNode;
  className?: string;
}
