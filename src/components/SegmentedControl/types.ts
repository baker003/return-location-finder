import type { ReactNode } from 'react';

export interface SegmentItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  items: SegmentItem[];
  value: string;
  onChange: (value: string) => void;
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}
