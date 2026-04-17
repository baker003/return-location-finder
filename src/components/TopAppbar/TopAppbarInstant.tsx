'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { TopAppbarInstantProps } from './types';

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-text-secondary flex-shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-current"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export const TopAppbarInstant = forwardRef<HTMLDivElement, TopAppbarInstantProps>(
  function TopAppbarInstant(props, ref) {
    const { variant, className } = props;

    if (variant === 'heading') {
      return (
        <div ref={ref} className={clsx('flex items-center h-full', className)}>
          <h1 className="typo-headline font-semibold text-current truncate">
            {props.title}
          </h1>
        </div>
      );
    }

    if (variant === 'label') {
      return (
        <div ref={ref} className={clsx('flex items-center h-full', className)}>
          <span className="typo-headline font-semibold text-current truncate">
            {props.title}
          </span>
        </div>
      );
    }

    if (variant === 'textButton') {
      return (
        <div ref={ref} className={clsx('flex items-center h-full', className)}>
          <button
            type="button"
            onClick={props.onClick}
            className={clsx(
              'flex items-center gap-1 h-full',
              'rounded-lg',
              'hover:bg-pressed-dark-weak',
              'active:scale-[0.96]',
              'transition-transform duration-150 ease-in-out',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary-strong focus-visible:ring-offset-2',
            )}
          >
            <span className="typo-headline font-semibold text-current">
              {props.label}
            </span>
            <ChevronDownIcon />
          </button>
        </div>
      );
    }

    if (variant === 'input') {
      return (
        <div
          ref={ref}
          className={clsx(
            'flex items-center w-full h-[40px]',
            'bg-gray-100 rounded-[10px]',
            'px-3 gap-2',
            'focus-within:ring-2 focus-within:ring-primary-strong',
            className,
          )}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
            className={clsx(
              'flex-1 bg-transparent',
              'typo-footnote',
              'text-current',
              'placeholder:text-text-disabled',
              'outline-none',
            )}
          />
        </div>
      );
    }

    // variant === 'image'
    return (
      <div ref={ref} className={clsx('flex items-center h-full', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
          className="max-h-[40px] object-contain"
        />
      </div>
    );
  },
);
