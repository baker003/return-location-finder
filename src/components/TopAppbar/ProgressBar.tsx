'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ProgressBarProps } from './types';

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar({ progress, 'aria-label': ariaLabel, className }, ref) {
    const isDeterminate = progress !== undefined;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={ariaLabel || '로딩 진행률'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isDeterminate ? progress : undefined}
        className={clsx(
          'absolute bottom-0 left-0 right-0',
          'h-[2px] w-full',
          'bg-gray-100 overflow-hidden',
          className,
        )}
      >
        <div
          className={clsx(
            'h-full bg-primary-regular',
            isDeterminate
              ? 'transition-[width] duration-200 ease-linear'
              : 'w-[40%] animate-[progress-indeterminate_1.5s_ease-in-out_infinite]',
          )}
          style={isDeterminate ? { width: `${Math.min(100, Math.max(0, progress))}%` } : undefined}
        />
      </div>
    );
  },
);
