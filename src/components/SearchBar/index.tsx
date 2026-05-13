'use client';

import React, { useRef, useState, useCallback } from 'react';
import { SearchBarProps } from './types';
import Search from '@/components/Icons/Search';
import Close from '@/components/Icons/Close';

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onCancel,
  placeholder = '검색',
  cancelLabel = '취소',
  showCancel = 'focus',
  disabled = false,
  autoFocus = false,
  className,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showCancelButton =
    showCancel === 'always' ||
    (showCancel === 'focus' && focused);

  const handleFocus = useCallback(() => setFocused(true), []);

  const handleBlur = useCallback(() => setFocused(false), []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  const handleCancel = useCallback(() => {
    onChange('');
    setFocused(false);
    inputRef.current?.blur();
    onCancel?.();
  }, [onChange, onCancel]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(value);
      }
    },
    [onSearch, value]
  );

  return (
    <div
      role="search"
      className={[
        'flex items-center gap-2 w-full',
        className ?? '',
      ].join(' ')}
    >
      {/* Input Wrapper */}
      <div
        className={[
          'flex-1 flex items-center gap-2',
          'h-10 rounded-xl px-3',
          'bg-background',
          'border-2 transition-colors duration-150',
          focused ? 'border-primary-regular' : 'border-transparent',
          disabled ? 'opacity-40 pointer-events-none' : '',
        ].join(' ')}
      >
        {/* Search Icon */}
        <span
          className={[
            'flex-shrink-0 transition-colors duration-150',
            focused || value ? 'text-primary-regular' : 'text-text-tertiary',
          ].join(' ')}
        >
          <Search size={16} color="currentColor" />
        </span>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          aria-label="검색"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={[
            'flex-1 bg-transparent typo-body1 text-text-primary',
            'placeholder:text-text-tertiary',
            'outline-none min-w-0',
            // Remove default search input styling
            '[&::-webkit-search-cancel-button]:hidden',
          ].join(' ')}
        />

        {/* Clear Button */}
        {value && !disabled && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={handleClear}
            className={[
              'flex-shrink-0 flex items-center justify-center',
              'w-4 h-4 rounded-full',
              'bg-border text-surface',
              'transition-opacity duration-150',
            ].join(' ')}
          >
            <Close size={12} color="currentColor" />
          </button>
        )}
      </div>

      {/* Cancel Button */}
      {showCancel !== 'never' && (
        <button
          type="button"
          aria-label="검색 취소"
          aria-hidden={!showCancelButton}
          tabIndex={showCancelButton ? 0 : -1}
          onClick={handleCancel}
          className={[
            'typo-label1 font-medium text-text-secondary',
            'flex-shrink-0 whitespace-nowrap',
            'transition-all duration-200',
            showCancelButton
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-2 pointer-events-none w-0 overflow-hidden',
          ].join(' ')}
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
}

export type { SearchBarProps };
