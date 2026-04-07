'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/components/Button/IconButton';
import type { LeadingButtonProps, LeadingButtonVariant } from './types';

const defaultLabels: Record<LeadingButtonVariant, string> = {
  back: '뒤로 가기',
  close: '닫기',
  home: '홈으로',
};

function ChevronLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
    </svg>
  );
}

const variantIcons: Record<LeadingButtonVariant, React.ReactNode> = {
  back: <ChevronLeftIcon />,
  close: <CloseIcon />,
  home: <HomeIcon />,
};

export const LeadingButton = forwardRef<HTMLButtonElement, LeadingButtonProps>(
  function LeadingButton({ variant, onClick, 'aria-label': ariaLabel, className }, ref) {
    return (
      <IconButton
        ref={ref}
        size="sm"
        type="ghost"
        shape="square"
        icon={variantIcons[variant]}
        aria-label={ariaLabel || defaultLabels[variant]}
        onClick={onClick}
        className={clsx('[&>svg]:!w-6 [&>svg]:!h-6', className)}
      />
    );
  },
);
