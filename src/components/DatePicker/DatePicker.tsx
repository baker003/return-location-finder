'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Calendar } from './Calendar';
import { formatDate, isSameDay } from './utils';
import type { DatePickerProps } from './types';

// Inline calendar icon SVG (no external dep)
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 3v4M13 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DatePicker({
  mode = 'single',
  value,
  rangeValue,
  onChange,
  onRangeChange,
  minDate,
  maxDate,
  disabledDates = [],
  placeholder = '날짜를 선택하세요',
  locale = 'ko-KR',
  inline = false,
  disabled = false,
  className,
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(
    value?.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    value?.getMonth() ?? today.getMonth(),
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  useEffect(() => {
    if (rangeValue?.[0]) {
      setViewYear(rangeValue[0].getFullYear());
      setViewMonth(rangeValue[0].getMonth());
    }
  }, [rangeValue]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (mode === 'single') {
        onChange?.(date);
        setOpen(false);
      } else {
        const [start, end] = rangeValue ?? [null, null];
        if (!start || (start && end)) {
          // Start a new range
          onRangeChange?.([date, null]);
        } else {
          // Complete the range
          if (isSameDay(date, start)) {
            onRangeChange?.([date, date]);
          } else if (date < start) {
            onRangeChange?.([date, start]);
          } else {
            onRangeChange?.([start, date]);
          }
          setOpen(false);
        }
      }
    },
    [mode, onChange, onRangeChange, rangeValue],
  );

  const handleMonthChange = useCallback((year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
  }, []);

  // Formatted display value
  function getDisplayValue(): string {
    if (mode === 'single') {
      return value ? formatDate(value, locale) : '';
    }
    const [start, end] = rangeValue ?? [null, null];
    if (!start) return '';
    if (!end) return formatDate(start, locale) + ' –';
    if (isSameDay(start, end)) return formatDate(start, locale);
    return `${formatDate(start, locale)} – ${formatDate(end, locale)}`;
  }

  const displayValue = getDisplayValue();

  // Dropdown position (below trigger)
  function getDropdownStyle(): React.CSSProperties {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 360;

    if (spaceBelow >= dropdownHeight || spaceBelow > rect.top) {
      return {
        top: rect.bottom + 8,
        left: rect.left,
      };
    }
    return {
      bottom: window.innerHeight - rect.top + 8,
      left: rect.left,
    };
  }

  const calendarEl = (
    <Calendar
      year={viewYear}
      month={viewMonth}
      mode={mode}
      value={value}
      rangeValue={rangeValue}
      hoverDate={hoverDate}
      onDateClick={handleDateClick}
      onDateHover={mode === 'range' ? setHoverDate : undefined}
      onMonthChange={handleMonthChange}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      locale={locale}
    />
  );

  if (inline) {
    return (
      <div className={`bg-surface rounded-2xl p-4 w-[320px] ${className ?? ''}`}>
        {calendarEl}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className ?? ''}`}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="날짜 선택"
        aria-expanded={open}
        aria-haspopup="dialog"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full flex items-center gap-2 h-12 px-4 rounded-xl
          bg-surface border typo-body1 text-left
          transition-colors duration-150
          ${open ? 'border-primary-regular' : 'border-border'}
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-primary-regular'}`}
      >
        <CalendarIcon className="w-5 h-5 text-text-tertiary flex-shrink-0" />
        <span className={displayValue ? 'text-text-primary' : 'text-text-tertiary'}>
          {displayValue || placeholder}
        </span>
      </button>

      {/* Dropdown via portal */}
      {mounted && open &&
        createPortal(
          <div
            ref={dropdownRef}
            role="dialog"
            aria-label="날짜 선택 달력"
            aria-modal="true"
            className="fixed z-50 bg-surface rounded-2xl shadow-lg border border-border
                       w-[320px] p-4 animate-scale-in"
            style={getDropdownStyle()}
          >
            {calendarEl}
          </div>,
          document.body,
        )
      }
    </div>
  );
}

export default DatePicker;
