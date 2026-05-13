import type { BadgeProps, AnchorOrigin } from './types';

const COLOR_CLASS: Record<NonNullable<BadgeProps['color']>, string> = {
  primary: 'bg-primary-regular text-on-primary',
  error: 'bg-status-negative text-on-primary',
  caution: 'bg-status-caution text-on-primary',
};

function getAnchorClass(origin: AnchorOrigin): string {
  const { vertical, horizontal } = origin;

  if (vertical === 'top' && horizontal === 'right') {
    return 'top-0 right-0 -translate-y-1/2 translate-x-1/2';
  }
  if (vertical === 'top' && horizontal === 'left') {
    return 'top-0 left-0 -translate-y-1/2 -translate-x-1/2';
  }
  if (vertical === 'bottom' && horizontal === 'right') {
    return 'bottom-0 right-0 translate-y-1/2 translate-x-1/2';
  }
  return 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2';
}

function formatCount(count: number, max: number): string {
  return count > max ? `${max}+` : String(count);
}

function BadgeContent({
  variant,
  count,
  max,
  label,
  color,
  className,
  isAbsolute,
  anchorOrigin,
}: {
  variant: NonNullable<BadgeProps['variant']>;
  count?: number;
  max: number;
  label?: string;
  color: NonNullable<BadgeProps['color']>;
  className: string;
  isAbsolute: boolean;
  anchorOrigin: BadgeProps['anchorOrigin'];
}) {
  const colorClass = COLOR_CLASS[color];
  const positionClass =
    isAbsolute && anchorOrigin ? `absolute ${getAnchorClass(anchorOrigin)}` : '';
  const ariaLabel =
    variant === 'count' && count !== undefined ? `${count}개 알림` : undefined;

  if (variant === 'dot') {
    return (
      <span
        aria-hidden="true"
        className={`inline-block w-2 h-2 rounded-full ${colorClass} ${positionClass} ${className}`}
      />
    );
  }

  if (variant === 'count') {
    // Auto-hide when count is 0
    if (count === 0) return null;

    return (
      <span
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full typo-caption2 font-semibold ${colorClass} ${positionClass} ${className}`}
      >
        {count !== undefined ? formatCount(count, max) : null}
      </span>
    );
  }

  // label variant
  return (
    <span
      className={`inline-flex items-center h-4 px-1.5 rounded-full typo-caption2 font-medium ${colorClass} ${positionClass} ${className}`}
    >
      {label}
    </span>
  );
}

export function Badge({
  variant = 'count',
  count,
  max = 99,
  label,
  hidden = false,
  color = 'error',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  children,
  className = '',
}: BadgeProps) {
  if (hidden) {
    if (children) return <>{children}</>;
    return null;
  }

  const badgeContent = (
    <BadgeContent
      variant={variant}
      count={count}
      max={max}
      label={label}
      color={color}
      className={className}
      isAbsolute={!!children}
      anchorOrigin={anchorOrigin}
    />
  );

  if (children) {
    return (
      <span
        className="relative inline-flex"
        aria-label={variant === 'dot' ? '알림 있음' : undefined}
      >
        {children}
        {badgeContent}
      </span>
    );
  }

  return badgeContent;
}
