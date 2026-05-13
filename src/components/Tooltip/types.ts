import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'focus';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger | TooltipTrigger[];
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  maxWidth?: number;
  children: ReactElement;
  className?: string;
}
