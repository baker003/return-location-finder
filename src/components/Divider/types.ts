import type { ReactNode } from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'full' | 'inset' | 'middle';
  strength?: 'regular' | 'weak';
  inset?: number;
  children?: ReactNode;
  decorative?: boolean;
  className?: string;
}
