'use client';

import { forwardRef, type MouseEvent } from 'react';
import clsx from 'clsx';
import type { LinkTextButtonProps, ButtonSize } from './types';

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'typo-caption-1 font-medium',
  sm: 'typo-footnote font-semibold',
  md: 'typo-footnote font-semibold',
  lg: 'typo-callout  font-semibold',
  xl: 'typo-headline font-semibold',
};

const baseClasses = clsx(
  'inline-flex items-center',
  'underline underline-offset-2',
  'transition-transform duration-150 ease-in-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2',
);

type LinkRef = HTMLButtonElement & HTMLAnchorElement;

export const LinkTextButton = forwardRef<LinkRef, LinkTextButtonProps>(
  function LinkTextButton(
    {
      size = 'md',
      disabled = false,
      children,
      onClick,
      href,
      className,
    },
    ref,
  ) {
    const classes = clsx(
      baseClasses,
      sizeClasses[size],
      disabled
        ? 'text-text-disabled decoration-text-disabled pointer-events-none'
        : [
            'text-primary-strong decoration-primary-strong',
            'hover:text-primary-heavy hover:decoration-primary-heavy',
            'active:scale-[0.96]',
          ],
      className,
    );

    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick as (e: MouseEvent<HTMLAnchorElement>) => void}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : (onClick as (e: MouseEvent<HTMLButtonElement>) => void)}
        className={clsx(classes, 'disabled:pointer-events-none')}
      >
        {children}
      </button>
    );
  },
);
