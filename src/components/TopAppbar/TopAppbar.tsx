'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { TopAppbarProps, TopAppbarTheme } from './types';
import { ProgressBar } from './ProgressBar';

const themeClasses: Record<TopAppbarTheme, string> = {
  white: 'bg-white text-text-strong',
  transparent: 'bg-transparent text-text-strong',
  dark: 'bg-gray-900 text-white',
};

const darkIconClass = 'text-gray-300';

export const TopAppbar = forwardRef<HTMLElement, TopAppbarProps>(
  function TopAppbar(
    {
      theme = 'white',
      loading = false,
      progress,
      leading,
      instant,
      trailing,
      sticky = false,
      children,
      className,
    },
    ref,
  ) {
    const isDark = theme === 'dark';

    return (
      <header
        ref={ref}
        aria-busy={loading || undefined}
        className={clsx(
          'relative w-full h-[52px]',
          'flex items-center',
          'px-[10px] py-[6px] gap-[6px]',
          themeClasses[theme],
          sticky && 'sticky top-0 z-50',
          className,
        )}
      >
        {leading && (
          <nav
            aria-label="네비게이션"
            className={clsx('flex-shrink-0', isDark && darkIconClass)}
          >
            {leading}
          </nav>
        )}

        <div className="flex-1 min-w-0 max-h-[40px]">
          {instant || children}
        </div>

        {trailing && (
          <div className={clsx('flex-shrink-0', isDark && darkIconClass)}>
            {trailing}
          </div>
        )}

        {loading && <ProgressBar progress={progress} />}
      </header>
    );
  },
);
