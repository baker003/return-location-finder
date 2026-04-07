import { type ReactNode, type MouseEvent, type ChangeEvent } from 'react';

/** TopAppbar background theme */
export type TopAppbarTheme = 'white' | 'transparent' | 'dark';

/** TopAppbar Props */
export interface TopAppbarProps {
  /** Background theme */
  theme?: TopAppbarTheme;
  /** Loading state -- shows ProgressBar when true */
  loading?: boolean;
  /** Progress percentage (0~100). Indeterminate when undefined */
  progress?: number;
  /** Leading area (LeadingButton) */
  leading?: ReactNode;
  /** Instant area (TopAppbarInstant) */
  instant?: ReactNode;
  /** Trailing area (TrailingButton) */
  trailing?: ReactNode;
  /** Sticky positioning */
  sticky?: boolean;
  /** Children as alternative to instant */
  children?: ReactNode;
  /** Additional Tailwind classes */
  className?: string;
}

/** LeadingButton variant */
export type LeadingButtonVariant = 'back' | 'close' | 'home';

/** LeadingButton Props */
export interface LeadingButtonProps {
  /** Button variant */
  variant: LeadingButtonVariant;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label */
  'aria-label'?: string;
  /** Additional Tailwind classes */
  className?: string;
}

/** TrailingButton icon button item */
export interface TrailingIconButtonItem {
  /** Icon element */
  icon: ReactNode;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label (required) */
  'aria-label': string;
}

/** TrailingButton -- iconButtons variant */
export interface TrailingIconButtonsProps {
  /** Icon buttons mode */
  variant: 'iconButtons';
  /** Icon button list (max 3 recommended) */
  buttons: TrailingIconButtonItem[];
  /** Additional Tailwind classes */
  className?: string;
}

/** TrailingButton -- textButton variant */
export interface TrailingTextButtonProps {
  /** Text button mode */
  variant: 'textButton';
  /** Button label */
  label: string;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional Tailwind classes */
  className?: string;
}

/** TrailingButton discriminated union */
export type TrailingButtonProps = TrailingIconButtonsProps | TrailingTextButtonProps;

/** TopAppbarInstant -- heading variant */
export interface InstantHeadingProps {
  variant: 'heading';
  title: string;
  className?: string;
}

/** TopAppbarInstant -- label variant */
export interface InstantLabelProps {
  variant: 'label';
  title: string;
  className?: string;
}

/** TopAppbarInstant -- textButton variant */
export interface InstantTextButtonProps {
  variant: 'textButton';
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/** TopAppbarInstant -- input variant */
export interface InstantInputProps {
  variant: 'input';
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  className?: string;
}

/** TopAppbarInstant -- image variant */
export interface InstantImageProps {
  variant: 'image';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/** TopAppbarInstant discriminated union */
export type TopAppbarInstantProps =
  | InstantHeadingProps
  | InstantLabelProps
  | InstantTextButtonProps
  | InstantInputProps
  | InstantImageProps;

/** ProgressBar Props */
export interface ProgressBarProps {
  /** Progress percentage (0~100). Indeterminate when undefined */
  progress?: number;
  /** Accessible label for the progress bar */
  'aria-label'?: string;
  /** Additional Tailwind classes */
  className?: string;
}
