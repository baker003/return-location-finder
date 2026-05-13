'use client';

import { useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import type { TabsProps } from './types';

const SIZE_CLASSES = {
  lg: 'h-14 px-4 typo-body1',
  md: 'h-12 px-4 typo-label1',
  sm: 'h-10 px-3 typo-label2',
} as const;

export function Tabs({
  items,
  activeKey,
  onChange,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  scrollable = false,
  className = '',
}: TabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const updateIndicator = useCallback(() => {
    if (variant !== 'primary') return;
    const activeIndex = items.findIndex((item) => item.key === activeKey);
    const activeTab = tabRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    if (!activeTab || !indicator) return;

    const parent = activeTab.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    indicator.style.left = `${tabRect.left - parentRect.left + (parent.scrollLeft || 0)}px`;
    indicator.style.width = `${tabRect.width}px`;
  }, [activeKey, items, variant]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentEnabledIndex = enabledItems.findIndex(
      (item) => item.key === items[currentIndex].key
    );

    let nextEnabledItem: typeof enabledItems[0] | undefined;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextEnabledItem = enabledItems[(currentEnabledIndex + 1) % enabledItems.length];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextEnabledItem =
        enabledItems[(currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextEnabledItem = enabledItems[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      nextEnabledItem = enabledItems[enabledItems.length - 1];
    }

    if (nextEnabledItem) {
      onChange(nextEnabledItem.key);
      const nextIndex = items.findIndex((item) => item.key === nextEnabledItem!.key);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const listClasses = [
    'relative flex',
    variant === 'primary'
      ? 'border-b border-border'
      : 'bg-background rounded-xl p-1 gap-1',
    scrollable ? 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : '',
    !fullWidth && variant === 'secondary' ? 'w-fit' : 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="tablist" aria-label="탭 목록" className={listClasses}>
      {variant === 'primary' && (
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 h-0.5 bg-primary-regular transition-all duration-200 ease-out"
          style={{ left: 0, width: 0 }}
        />
      )}

      {items.map((item, index) => {
        const isActive = item.key === activeKey;
        const isDisabled = !!item.disabled;

        const activeClass =
          variant === 'primary'
            ? 'text-primary-regular font-semibold'
            : 'bg-surface text-on-surface font-semibold rounded-lg shadow-sm';

        const inactiveClass =
          variant === 'secondary'
            ? 'text-text-secondary font-medium bg-transparent'
            : 'text-text-secondary font-medium';

        const buttonClasses = [
          'relative flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors duration-150',
          SIZE_CLASSES[size],
          fullWidth ? 'flex-1' : '',
          isDisabled ? 'text-text-disabled pointer-events-none opacity-50' : isActive ? activeClass : inactiveClass,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={item.key}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${item.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${item.key}`}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            className={buttonClasses}
            onClick={() => !isDisabled && onChange(item.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {item.icon}
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-status-negative px-1 typo-caption2 font-semibold text-on-primary">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
