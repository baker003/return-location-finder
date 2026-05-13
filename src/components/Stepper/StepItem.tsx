'use client';

import React from 'react';
import type { StepItemProps, StepStatus } from './types';

const statusClasses: Record<StepStatus, string> = {
  completed: 'bg-primary-regular text-on-primary',
  current: 'bg-surface border-2 border-primary-regular text-primary-regular',
  upcoming: 'bg-surface border-2 border-border text-text-disabled',
  error: 'bg-status-negative text-on-primary',
};

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StepItem({
  step,
  index,
  status,
  isLast,
  orientation,
  clickable,
  onStepClick,
}: StepItemProps) {
  const isHorizontal = orientation === 'horizontal';
  const isClickable = clickable && status === 'completed';

  const statusLabel: Record<StepStatus, string> = {
    completed: '완료',
    current: '현재',
    upcoming: '예정',
    error: '오류',
  };

  function renderIndicatorContent() {
    if (status === 'completed') return <CheckIcon />;
    if (status === 'error') return <ErrorIcon />;
    return <span>{index + 1}</span>;
  }

  if (isHorizontal) {
    return (
      <li
        role="listitem"
        className="flex-1 flex flex-col items-center"
      >
        <div className="flex items-center w-full">
          {/* Connector before */}
          {index > 0 && (
            <div
              className={`flex-1 h-px mx-2 transition-colors duration-200 ${
                status === 'completed' || status === 'current' ? 'bg-primary-regular' : 'bg-border'
              }`}
            />
          )}

          {/* Indicator */}
          <button
            type="button"
            aria-label={`스텝 ${index + 1}: ${step.label} - ${statusLabel[status]}`}
            aria-current={status === 'current' ? 'step' : undefined}
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick?.(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center
              flex-shrink-0 typo-label2 font-semibold
              transition-colors duration-200
              ${statusClasses[status]}
              ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
              ${!isClickable ? 'disabled:cursor-default' : ''}`}
          >
            {renderIndicatorContent()}
          </button>

          {/* Connector after */}
          {!isLast && (
            <div
              className={`flex-1 h-px mx-2 transition-colors duration-200 ${
                status === 'completed' ? 'bg-primary-regular' : 'bg-border'
              }`}
            />
          )}
        </div>

        {/* Label below */}
        <div className="mt-2 text-center px-1">
          <p
            className={`typo-label2 font-medium ${
              status === 'upcoming' ? 'text-text-disabled' : 'text-text-primary'
            }`}
          >
            {step.label}
          </p>
          {step.description && (
            <p className="typo-caption1 text-text-tertiary mt-0.5">{step.description}</p>
          )}
        </div>
      </li>
    );
  }

  // Vertical
  return (
    <li role="listitem" className="flex gap-3">
      <div className="flex flex-col items-center">
        {/* Indicator */}
        <button
          type="button"
          aria-label={`스텝 ${index + 1}: ${step.label} - ${statusLabel[status]}`}
          aria-current={status === 'current' ? 'step' : undefined}
          disabled={!isClickable}
          onClick={() => isClickable && onStepClick?.(index)}
          className={`w-8 h-8 rounded-full flex items-center justify-center
            flex-shrink-0 typo-label2 font-semibold
            transition-colors duration-200
            ${statusClasses[status]}
            ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
        >
          {renderIndicatorContent()}
        </button>

        {/* Connector below */}
        {!isLast && (
          <div
            className={`w-px flex-1 my-1 min-h-[24px] transition-colors duration-200 ${
              status === 'completed' ? 'bg-primary-regular' : 'bg-border'
            }`}
          />
        )}
      </div>

      {/* Label right */}
      <div className="py-1 pb-6">
        <p
          className={`typo-label1 font-medium ${
            status === 'upcoming' ? 'text-text-disabled' : 'text-text-primary'
          }`}
        >
          {step.label}
        </p>
        {step.description && (
          <p className="typo-caption1 text-text-tertiary mt-0.5">{step.description}</p>
        )}
      </div>
    </li>
  );
}
