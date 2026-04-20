'use client';

import clsx from 'clsx';
import type { TextButtonProps, TextButtonSize } from './types';
import { Spinner } from './Spinner';

const sizeClasses: Record<TextButtonSize, { height: string; typo: string; rounded: string }> = {
  20: { height: 'h-12', typo: 'typo-heading2',  rounded: 'rounded-xl' },
  18: { height: 'h-10', typo: 'typo-headline2', rounded: 'rounded-[10px]' },
  16: { height: 'h-9',  typo: 'typo-body1',  rounded: 'rounded-lg' },
  14: { height: 'h-8',  typo: 'typo-label2', rounded: 'rounded-lg' },
};

const variantClasses: Record<string, string> = {
  primary:    'text-primary-strong',
  secondary:  'text-text-primary',
  tertiary:   'text-text-secondary',
  'on-primary': 'text-on-primary',
};

const iconSizeClasses: Record<TextButtonSize, string> = {
  20: '[&>svg]:w-6 [&>svg]:h-6',
  18: '[&>svg]:w-5 [&>svg]:h-5',
  16: '[&>svg]:w-4 [&>svg]:h-4',
  14: '[&>svg]:w-4 [&>svg]:h-4',
};

export function TextButton({
  variant = 'primary',
  size = 16,
  weight = 'bold',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className,
}: TextButtonProps) {
  const sc = sizeClasses[size];
  const fontWeightClass = weight === 'bold' ? 'font-semibold' : 'font-normal';
  const isDisabledOrLoading = disabled || loading;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-disabled={(disabled || loading) || undefined}
      aria-busy={loading || undefined}
      onClick={isDisabledOrLoading ? undefined : onClick}
      className={clsx(
        'relative inline-flex items-center justify-center gap-[6px]',
        'bg-transparent px-2 whitespace-nowrap',
        'disabled:pointer-events-none',
        sc.height, sc.typo, sc.rounded,
        fontWeightClass,
        disabled ? 'text-text-disabled' : variantClasses[variant],
        !disabled && !loading && 'hover:bg-pressed-dark-weak active:scale-[0.96]',
        className,
      )}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </span>
      )}
      <span className={clsx('flex items-center gap-[6px]', loading && 'invisible')}>
        {leftIcon && (
          <span className={clsx('flex-shrink-0 flex items-center', iconSizeClasses[size])}>
            {leftIcon}
          </span>
        )}
        <span className="leading-[1]">{children}</span>
        {rightIcon && (
          <span className={clsx('flex-shrink-0 flex items-center', iconSizeClasses[size])}>
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
}
