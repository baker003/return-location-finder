'use client';

import clsx from 'clsx';
import type { ChipProps, ChipSize } from './types';

/* ── Size 클래스 (높이 + 폰트 사이즈) ── */
const sizeClasses: Record<ChipSize, string> = {
  lg: 'h-10 typo-callout',
  md: 'h-9 typo-footnote',
  sm: 'h-8 typo-footnote',
  xs: 'h-7 typo-caption-1',
};

/* ── 아이콘 크기 (lg: 20px, 나머지: 16px) ── */
const iconSizeClasses: Record<ChipSize, string> = {
  lg: '[&>svg]:w-5 [&>svg]:h-5',
  md: '[&>svg]:w-4 [&>svg]:h-4',
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  xs: '[&>svg]:w-4 [&>svg]:h-4',
};

/* ── Type x State: 배경/텍스트/보더 ── */
function getStyleClasses(
  type: 'outlined' | 'filled',
  selected: boolean,
  disabled: boolean,
): string {
  if (disabled) {
    return type === 'outlined'
      ? 'bg-surface border border-border text-text-disabled cursor-not-allowed'
      : 'bg-background text-text-disabled cursor-not-allowed';
  }
  if (selected) {
    return type === 'outlined'
      ? 'bg-surface border border-primary-strong text-primary-strong'
      : 'bg-primary-strong text-on-primary';
  }
  return type === 'outlined'
    ? 'bg-surface border border-border text-text-primary'
    : 'bg-background text-text-primary';
}

/* ── 아이콘 색상 ── */
function getIconColorClass(
  type: 'outlined' | 'filled',
  selected: boolean,
  disabled: boolean,
): string {
  if (disabled) return 'text-text-disabled';
  if (selected) {
    return type === 'filled' ? 'text-on-primary' : 'text-primary-strong';
  }
  return 'text-text-secondary';
}

export function Chip({
  type = 'outlined',
  size = 'md',
  selected = false,
  disabled = false,
  showLeadingIcon = false,
  showTrailingIcon = false,
  showNewBadge = false,
  leadingIcon,
  trailingIcon,
  children,
  onClick,
  className,
}: ChipProps) {
  const hasLeading = !!leadingIcon && showLeadingIcon;
  const hasTrailing = !!trailingIcon && showTrailingIcon;

  const fontWeightClass = selected ? 'font-semibold' : 'font-normal';
  const iconColor = getIconColorClass(type, selected, disabled);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        /* base */
        'relative inline-flex items-center justify-center',
        'gap-1.5 rounded-full',
        'whitespace-nowrap flex-shrink-0',
        'disabled:pointer-events-none',
        'overflow-visible',
        /* size */
        sizeClasses[size],
        /* padding */
        hasLeading ? 'pl-2' : 'pl-3',
        hasTrailing ? 'pr-2' : 'pr-3',
        /* font weight */
        fontWeightClass,
        /* type x state */
        getStyleClasses(type, selected, disabled),
        className,
      )}
    >
      {/* Leading Icon */}
      {hasLeading && (
        <span
          className={clsx(
            'flex-shrink-0 flex items-center',
            iconSizeClasses[size],
            iconColor,
          )}
        >
          {leadingIcon}
        </span>
      )}

      {/* Label */}
      <span className="inline-flex items-center leading-[1]">
        {children}
      </span>

      {/* Trailing Icon */}
      {hasTrailing && (
        <span
          className={clsx(
            'flex-shrink-0 flex items-center',
            iconSizeClasses[size],
            iconColor,
          )}
        >
          {trailingIcon}
        </span>
      )}

      {/* NEW Badge */}
      {showNewBadge && (
        <span
          className={clsx(
            'absolute -top-1.5 -right-1.5',
            'flex items-center justify-center',
            'w-4 h-4 rounded-full',
            'typo-caption-2 font-bold text-on-primary',
            'bg-notification-red',
          )}
        >
          N
        </span>
      )}
    </button>
  );
}
