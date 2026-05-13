'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { SegmentedControlProps } from './types';

const SIZE_CLASSES = {
  lg: 'h-10 px-4 typo-body1',
  md: 'h-8 px-3 typo-label1',
  sm: 'h-7 px-2 typo-label2',
} as const;

export function SegmentedControl({
  items,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}: SegmentedControlProps) {
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 4,
    width: 0,
  });

  const updateIndicator = useCallback(() => {
    const activeIndex = items.findIndex((item) => item.value === value);
    const activeEl = segmentRefs.current[activeIndex];
    if (!activeEl) return;

    const parent = activeEl.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: elRect.left - parentRect.left,
      width: elRect.width,
    });
  }, [value, items]);

  useEffect(() => {
    // Small delay to ensure layout is computed
    const id = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(id);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const containerClasses = [
    'relative flex bg-background rounded-xl p-1 gap-1',
    fullWidth ? 'w-full' : 'w-fit',
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="group" aria-label="세그먼트 선택" className={containerClasses}>
      {/* Sliding Indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 top-1 rounded-[10px] bg-surface shadow-sm transition-all duration-150 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />

      {items.map((item, index) => {
        const isSelected = item.value === value;
        const isItemDisabled = !!item.disabled;

        const buttonClasses = [
          'relative z-10 flex items-center justify-center gap-1.5 rounded-lg transition-colors duration-150',
          SIZE_CLASSES[size],
          fullWidth ? 'flex-1' : '',
          isSelected ? 'text-text-strong font-semibold' : 'text-text-secondary font-medium',
          isItemDisabled ? 'opacity-40 pointer-events-none' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={item.value}
            ref={(el) => {
              segmentRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isItemDisabled || disabled}
            className={buttonClasses}
            onClick={() => !isItemDisabled && !disabled && onChange(item.value)}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
