'use client';

import { useRef, useState, useCallback, useEffect, KeyboardEvent } from 'react';
import type { SliderProps } from './types';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number) {
  return Math.round((value - min) / step) * step + min;
}

function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  rangeValue,
  mode = 'single',
  onChange,
  onRangeChange,
  disabled = false,
  showTooltip = true,
  showMarks = false,
  marks,
  className = '',
  'aria-label': ariaLabel,
}: SliderProps) {
  const isRange = mode === 'range';

  const [internalSingle, setInternalSingle] = useState(value ?? 50);
  const [internalRange, setInternalRange] = useState<[number, number]>(rangeValue ?? [20, 80]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  // Sync controlled values
  useEffect(() => {
    if (value !== undefined && !isRange) setInternalSingle(value);
  }, [value, isRange]);

  useEffect(() => {
    if (rangeValue !== undefined && isRange) setInternalRange(rangeValue);
  }, [rangeValue, isRange]);

  const currentSingle = value !== undefined ? value : internalSingle;
  const currentRange = rangeValue !== undefined ? rangeValue : internalRange;

  const thumbValues = isRange ? [currentRange[0], currentRange[1]] : [currentSingle];

  const getValueFromPointer = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      const raw = min + ratio * (max - min);
      return clamp(snapToStep(raw, min, step), min, max);
    },
    [min, max, step]
  );

  const handlePointerDown = useCallback(
    (thumbIndex: number) => (e: React.PointerEvent) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDraggingIndex(thumbIndex);
    },
    [disabled]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingIndex === null || disabled) return;
      const newVal = getValueFromPointer(e.clientX);

      if (!isRange) {
        setInternalSingle(newVal);
        onChange?.(newVal);
      } else {
        const next: [number, number] = [...currentRange] as [number, number];
        next[draggingIndex] = newVal;
        // Prevent crossing
        if (draggingIndex === 0 && next[0] > next[1]) next[0] = next[1];
        if (draggingIndex === 1 && next[1] < next[0]) next[1] = next[0];
        setInternalRange(next);
        onRangeChange?.(next);
      }
    },
    [draggingIndex, disabled, getValueFromPointer, isRange, currentRange, onChange, onRangeChange]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  const handleKeyDown = useCallback(
    (thumbIndex: number) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      let delta = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step;
      else if (e.key === 'Home') {
        e.preventDefault();
        if (!isRange) {
          const next = min;
          setInternalSingle(next);
          onChange?.(next);
        } else {
          const next: [number, number] = [...currentRange] as [number, number];
          next[thumbIndex] = min;
          setInternalRange(next);
          onRangeChange?.(next);
        }
        return;
      } else if (e.key === 'End') {
        e.preventDefault();
        if (!isRange) {
          const next = max;
          setInternalSingle(next);
          onChange?.(next);
        } else {
          const next: [number, number] = [...currentRange] as [number, number];
          next[thumbIndex] = max;
          setInternalRange(next);
          onRangeChange?.(next);
        }
        return;
      }

      if (delta === 0) return;
      e.preventDefault();

      if (!isRange) {
        const next = clamp(snapToStep(currentSingle + delta, min, step), min, max);
        setInternalSingle(next);
        onChange?.(next);
      } else {
        const next: [number, number] = [...currentRange] as [number, number];
        next[thumbIndex] = clamp(snapToStep(next[thumbIndex] + delta, min, step), min, max);
        if (thumbIndex === 0 && next[0] > next[1]) next[0] = next[1];
        if (thumbIndex === 1 && next[1] < next[0]) next[1] = next[0];
        setInternalRange(next);
        onRangeChange?.(next);
      }
    },
    [disabled, step, isRange, min, max, currentSingle, currentRange, onChange, onRangeChange]
  );

  // Fill bar geometry
  const fillLeft = isRange ? `${valueToPercent(currentRange[0], min, max)}%` : '0%';
  const fillWidth = isRange
    ? `${valueToPercent(currentRange[1], min, max) - valueToPercent(currentRange[0], min, max)}%`
    : `${valueToPercent(currentSingle, min, max)}%`;

  // Marks to display
  const displayMarks = marks ?? (showMarks ? [{ value: min }, { value: max }] : []);

  return (
    <div
      className={[
        'relative w-full py-3',
        disabled ? 'opacity-40 pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-1.5 w-full rounded-full bg-border"
      >
        {/* Active fill */}
        <div
          className="pointer-events-none absolute h-full rounded-full bg-primary-regular"
          style={{ left: fillLeft, width: fillWidth }}
        />

        {/* Thumbs */}
        {thumbValues.map((thumbVal, i) => {
          const percent = valueToPercent(thumbVal, min, max);
          const isDragging = draggingIndex === i;

          return (
            <div
              key={i}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={thumbVal}
              aria-valuetext={`${thumbVal}`}
              aria-label={
                isRange ? (i === 0 ? '최솟값' : '최댓값') : ariaLabel ?? '슬라이더'
              }
              className={[
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
                'h-5 w-5 rounded-full border-2 border-primary-regular bg-surface shadow',
                isDragging ? 'cursor-grabbing' : 'cursor-grab',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-regular focus-visible:ring-offset-2',
                'transition-shadow duration-100',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: `${percent}%` }}
              onPointerDown={handlePointerDown(i)}
              onKeyDown={handleKeyDown(i)}
            >
              {/* Tooltip */}
              {showTooltip && isDragging && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-0.5 typo-caption1 text-on-primary"
                >
                  {thumbVal}
                </div>
              )}
            </div>
          );
        })}

        {/* Marks */}
        {showMarks &&
          displayMarks.map((mark) => {
            const markPercent = valueToPercent(mark.value, min, max);
            return (
              <div
                key={mark.value}
                className="pointer-events-none absolute"
                style={{ left: `${markPercent}%` }}
              >
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 h-1 w-1 rounded-full bg-border" />
                {mark.label && (
                  <span className="absolute top-4 -translate-x-1/2 whitespace-nowrap typo-caption2 text-text-tertiary">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
