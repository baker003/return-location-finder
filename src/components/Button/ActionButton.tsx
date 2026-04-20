'use client';

import clsx from 'clsx';
import type { ActionButtonProps, ActionButtonSize } from './types';
import { Spinner } from './Spinner';

const sizeClasses: Record<ActionButtonSize, string> = {
  large:  'h-14 px-3 typo-headline2 rounded-[14px]',
  medium: 'h-[46px] px-[10px] typo-body1 rounded-xl',
  small:  'h-[38px] px-2 py-[6px] typo-label2 rounded-lg',
};

const styleVariantClasses: Record<string, string> = {
  'fill-primary':   'bg-primary-strong text-on-primary hover:brightness-95',
  'fill-secondary': 'bg-gray-200 text-text-primary hover:brightness-95',
  'fill-tertiary':  'bg-gray-100 text-text-secondary hover:brightness-95',
  'outline-primary':   'bg-transparent text-primary-strong border border-primary-strong hover:bg-pressed-dark-weak',
  'outline-secondary': 'bg-transparent text-text-primary border border-border hover:bg-pressed-dark-weak',
  'outline-tertiary':  'bg-transparent text-text-secondary border border-border hover:bg-pressed-dark-weak',
};

const iconSizeClasses: Record<ActionButtonSize, string> = {
  large:  '[&>svg]:w-5 [&>svg]:h-5',
  medium: '[&>svg]:w-4 [&>svg]:h-4',
  small:  '[&>svg]:w-[14px] [&>svg]:h-[14px]',
};

export function ActionButton({
  style = 'fill',
  variant = 'primary',
  size = 'large',
  weight = 'bold',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  htmlType = 'button',
  className,
}: ActionButtonProps) {
  const isDisabledOrLoading = disabled || loading;
  const fontWeightClass = weight === 'bold' ? 'font-semibold' : 'font-normal';

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      aria-disabled={(disabled || loading) || undefined}
      aria-busy={loading || undefined}
      onClick={isDisabledOrLoading ? undefined : onClick}
      className={clsx(
        'relative inline-flex items-center justify-center gap-[6px]',
        'whitespace-nowrap',
        'disabled:pointer-events-none',
        sizeClasses[size],
        fontWeightClass,
        styleVariantClasses[`${style}-${variant}`],
        disabled && 'opacity-40',
        loading && 'pointer-events-none',
        fullWidth && 'w-full',
        !isDisabledOrLoading && 'active:scale-[0.96]',
        className,
      )}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size="md" />
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
