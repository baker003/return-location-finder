import type { ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: number;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  scrollable?: boolean;
  className?: string;
}
