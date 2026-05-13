import { type CSSProperties, type MouseEvent, type ReactNode } from 'react';

export type FABSize = 'small' | 'medium' | 'large';
export type FABVariant = 'primary' | 'surface' | 'secondary';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'custom';

interface FABBaseProps {
  icon: ReactNode;
  size?: FABSize;
  variant?: FABVariant;
  position?: FABPosition;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface FABExtendedProps extends FABBaseProps {
  label: string;
  'aria-label'?: string;
}

interface FABIconOnlyProps extends FABBaseProps {
  label?: undefined;
  'aria-label': string;
}

export type FABProps = FABExtendedProps | FABIconOnlyProps;
