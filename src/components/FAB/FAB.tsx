import { type FABProps } from './types';

const sizeClasses: Record<NonNullable<FABProps['size']>, string> = {
  small: 'w-10 h-10',
  medium: 'w-14 h-14',
  large: 'w-24 h-24',
};

const iconSizeClasses: Record<NonNullable<FABProps['size']>, string> = {
  small: '[&>svg]:w-5 [&>svg]:h-5',
  medium: '[&>svg]:w-6 [&>svg]:h-6',
  large: '[&>svg]:w-9 [&>svg]:h-9',
};

const variantClasses: Record<NonNullable<FABProps['variant']>, string> = {
  primary: 'bg-primary-strong text-on-primary shadow-md',
  surface: 'bg-surface text-primary-regular shadow-lg',
  secondary: 'bg-background text-text-primary shadow-md',
};

const positionClasses: Record<NonNullable<FABProps['position']>, string> = {
  'bottom-right': 'fixed z-40 bottom-4 right-4',
  'bottom-left': 'fixed z-40 bottom-4 left-4',
  'bottom-center': 'fixed z-40 bottom-4 left-1/2 -translate-x-1/2',
  'custom': 'fixed z-40',
};

export function FAB({
  icon,
  label,
  size = 'medium',
  variant = 'primary',
  position,
  onClick,
  disabled = false,
  className = '',
  style,
  'aria-label': ariaLabel,
}: FABProps) {
  const isExtended = Boolean(label);

  const positionClass = position ? positionClasses[position] : 'relative';

  const sizeClass = isExtended
    ? 'h-14 w-auto min-w-[56px]'
    : sizeClasses[size];

  const shadowClass = size === 'small' ? 'shadow-sm' : 'shadow-md';
  const effectiveShadow = variant === 'surface' ? 'shadow-lg' : shadowClass;

  // For extended FAB, icon is always 24px regardless of size prop
  const iconClass = isExtended
    ? '[&>svg]:w-6 [&>svg]:h-6'
    : iconSizeClasses[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isExtended ? undefined : ariaLabel}
      aria-disabled={disabled ? 'true' : undefined}
      style={style}
      className={[
        'flex items-center justify-center rounded-full',
        'transition-all duration-200',
        'hover:brightness-90',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-regular focus-visible:ring-offset-2',
        disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : 'cursor-pointer',
        isExtended ? 'gap-2 px-4' : '',
        sizeClass,
        effectiveShadow,
        variantClasses[variant],
        positionClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={iconClass}>{icon}</span>
      {label && (
        <span className="typo-label1 font-semibold whitespace-nowrap">{label}</span>
      )}
    </button>
  );
}
