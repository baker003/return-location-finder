'use client';

import React from 'react';
import type { PageControlProps } from './types';

function getVisibleDots(total: number, current: number, maxVisible: number): number[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const half = Math.floor(maxVisible / 2);
  let start = current - half;
  let end = current + half;

  if (start < 0) {
    start = 0;
    end = maxVisible - 1;
  } else if (end >= total) {
    end = total - 1;
    start = total - maxVisible;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getDotSize(dotIndex: number, current: number, visibleDots: number[]): string {
  if (dotIndex === current) return 'w-2.5 h-2.5 bg-primary-regular';

  const distFromCurrent = Math.abs(dotIndex - current);
  const isAdjacent = distFromCurrent === 1;

  if (isAdjacent) return 'w-2 h-2 bg-border opacity-60';
  return 'w-1.5 h-1.5 bg-border opacity-30';
}

export function PageControl({
  total,
  current,
  onChange,
  variant = 'dot',
  clickable = false,
  maxVisible = 7,
  className = '',
}: PageControlProps) {
  if (total <= 0) return null;

  if (variant === 'number') {
    return (
      <span className={`typo-label1 text-text-secondary ${className}`}>
        <span className="text-text-strong font-semibold">{current + 1}</span>
        &nbsp;/&nbsp;{total}
      </span>
    );
  }

  if (variant === 'bar') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="페이지 인디케이터">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`페이지 ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            disabled={!clickable}
            onClick={() => clickable && onChange?.(i)}
            className={`h-1.5 rounded-full transition-all duration-300
              ${i === current ? 'w-6 bg-primary-regular' : 'w-1.5 bg-border'}
              ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
          />
        ))}
      </div>
    );
  }

  // dot variant
  const visibleDots = getVisibleDots(total, current, maxVisible);

  return (
    <div
      role="tablist"
      aria-label="페이지 인디케이터"
      className={`flex items-center gap-2 ${className}`}
    >
      {visibleDots.map((dotIndex) => (
        <button
          key={dotIndex}
          role="tab"
          type="button"
          aria-label={`페이지 ${dotIndex + 1}`}
          aria-selected={dotIndex === current}
          disabled={!clickable}
          onClick={() => clickable && onChange?.(dotIndex)}
          className={`rounded-full transition-all duration-200
            ${getDotSize(dotIndex, current, visibleDots)}
            ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
        />
      ))}
    </div>
  );
}
