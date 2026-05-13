'use client';

import { ChevronLeft, ChevronRight } from '@/components/Icons';
import {
  getMonthDays,
  formatYearMonth,
  isSameDay,
  isInRange,
  isDisabled as checkDisabled,
  isToday,
} from './utils';
import type { CalendarProps } from './types';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function Calendar({
  year,
  month,
  mode,
  value,
  rangeValue,
  hoverDate,
  onDateClick,
  onDateHover,
  onMonthChange,
  minDate,
  maxDate,
  disabledDates,
  locale = 'ko-KR',
}: CalendarProps) {
  const days = getMonthDays(year, month);

  const handlePrev = () => {
    if (month === 0) onMonthChange(year - 1, 11);
    else onMonthChange(year, month - 1);
  };

  const handleNext = () => {
    if (month === 11) onMonthChange(year + 1, 0);
    else onMonthChange(year, month + 1);
  };

  const rangeStart = rangeValue?.[0] ?? null;
  const rangeEnd = rangeValue?.[1] ?? null;

  // For live range preview: if only start is selected, use hoverDate as tentative end
  const effectiveEnd = rangeEnd ?? hoverDate ?? null;

  function getCellClasses(date: Date, isCurrentMonth: boolean): string {
    const disabled = checkDisabled(date, minDate, maxDate, disabledDates);
    const today = isToday(date);

    let base =
      'relative flex items-center justify-center h-9 w-full typo-label1 transition-colors duration-100 select-none';

    if (disabled) {
      return `${base} text-text-disabled opacity-40 cursor-not-allowed`;
    }
    if (!isCurrentMonth) {
      base += ' opacity-30';
    }

    if (mode === 'single') {
      const selected = value && isSameDay(date, value);
      if (selected) {
        return `${base} bg-primary-regular text-on-primary rounded-full font-semibold`;
      }
      if (today) {
        return `${base} font-bold text-text-primary hover:bg-background rounded-full cursor-pointer`;
      }
      return `${base} text-text-primary hover:bg-background rounded-full cursor-pointer`;
    }

    // Range mode
    const isStart = rangeStart && isSameDay(date, rangeStart);
    const isEnd = rangeEnd && isSameDay(date, rangeEnd);
    const isStartOrEnd = isStart || isEnd;
    const inRange = isInRange(date, rangeStart, effectiveEnd);

    if (isStartOrEnd) {
      // Rounded pill on start/end, bg strip for range fill
      let roundClass = 'rounded-full';
      if (isStart && effectiveEnd && rangeStart!.getTime() !== effectiveEnd.getTime()) {
        roundClass = 'rounded-l-full';
      }
      if (isEnd && rangeStart) {
        roundClass = 'rounded-r-full';
      }
      // If same day for start and end
      if (rangeStart && rangeEnd && isSameDay(rangeStart, rangeEnd)) {
        roundClass = 'rounded-full';
      }
      return `${base} ${roundClass} bg-primary-regular text-on-primary font-semibold cursor-pointer`;
    }

    if (inRange) {
      if (today) {
        return `${base} bg-status-info-light text-text-primary font-bold rounded-none cursor-pointer`;
      }
      return `${base} bg-status-info-light text-text-primary rounded-none cursor-pointer`;
    }

    if (today) {
      return `${base} font-bold text-text-primary hover:bg-background rounded-full cursor-pointer`;
    }
    return `${base} text-text-primary hover:bg-background rounded-full cursor-pointer`;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          aria-label="이전 달"
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg
                     hover:bg-background transition-colors duration-100
                     text-text-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="typo-headline2 font-semibold text-text-strong">
          {formatYearMonth(year, month, locale)}
        </span>

        <button
          type="button"
          aria-label="다음 달"
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg
                     hover:bg-background transition-colors duration-100
                     text-text-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div role="row" className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            role="columnheader"
            aria-label={day}
            className="text-center typo-caption1 text-text-tertiary py-1 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div role="grid" className="grid grid-cols-7">
        {days.map(({ date, isCurrentMonth }, idx) => {
          const disabled = checkDisabled(date, minDate, maxDate, disabledDates);
          const today = isToday(date);
          const isSelected =
            mode === 'single'
              ? !!(value && isSameDay(date, value))
              : !!(
                  (rangeValue?.[0] && isSameDay(date, rangeValue[0])) ||
                  (rangeValue?.[1] && isSameDay(date, rangeValue[1]))
                );

          return (
            <button
              key={idx}
              role="gridcell"
              type="button"
              aria-selected={isSelected}
              aria-disabled={disabled}
              aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${today ? ' (오늘)' : ''}`}
              disabled={disabled}
              className={getCellClasses(date, isCurrentMonth)}
              onClick={() => !disabled && onDateClick(date)}
              onMouseEnter={() => onDateHover?.(date)}
              onMouseLeave={() => onDateHover?.(null)}
            >
              {date.getDate()}
              {today && !isSelected && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-regular"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
