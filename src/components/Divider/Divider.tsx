import type { DividerProps } from './types';

export function Divider({
  orientation = 'horizontal',
  variant = 'full',
  strength = 'regular',
  inset = 16,
  children,
  decorative = false,
  className = '',
}: DividerProps) {
  const ariaProps = decorative
    ? { 'aria-hidden': true as const, role: 'none' as const }
    : { role: 'separator' as const };

  const strengthClass =
    strength === 'weak' ? 'border-divider-weak' : 'border-divider';

  // Vertical divider
  if (orientation === 'vertical') {
    return (
      <div
        {...ariaProps}
        aria-orientation={decorative ? undefined : 'vertical'}
        className={`inline-block self-stretch border-l ${strengthClass} ${className}`}
      />
    );
  }

  // Horizontal with text children
  if (children) {
    const childAriaProps = decorative
      ? { 'aria-hidden': true as const, role: 'presentation' as const }
      : { role: 'presentation' as const };

    return (
      <div
        {...childAriaProps}
        className={`flex items-center gap-4 ${className}`}
      >
        <span className={`flex-1 border-t ${strengthClass}`} />
        <span className="typo-caption1 text-text-tertiary">{children}</span>
        <span className={`flex-1 border-t ${strengthClass}`} />
      </div>
    );
  }

  // Horizontal — plain hr
  const insetStyle =
    variant === 'inset'
      ? { marginLeft: inset }
      : variant === 'middle'
      ? { marginLeft: inset, marginRight: inset }
      : undefined;

  return (
    <hr
      {...ariaProps}
      aria-orientation={decorative ? undefined : 'horizontal'}
      className={`border-t ${strengthClass} ${className}`}
      style={insetStyle}
    />
  );
}
