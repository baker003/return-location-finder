'use client';

import React from 'react';
import { Divider } from '@/components/Divider';
import type { AccordionItemData } from './types';

interface AccordionItemProps {
  item: AccordionItemData;
  index: number;
  isOpen: boolean;
  showDivider: boolean;
  onToggle: (key: string) => void;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccordionItem({
  item,
  index,
  isOpen,
  showDivider,
  onToggle,
}: AccordionItemProps) {
  const headerId = `accordion-header-${item.key}`;
  const panelId = `accordion-panel-${item.key}`;

  return (
    <div role="listitem">
      {index > 0 && showDivider && <Divider strength="weak" decorative />}

      {/* Header Button */}
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={item.disabled}
        onClick={() => !item.disabled && onToggle(item.key)}
        className={`w-full flex items-center gap-3 px-4 py-4
          bg-surface text-left
          transition-colors duration-150
          active:bg-pressed-dark-weak
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-regular focus-visible:ring-inset
          ${item.disabled ? 'opacity-40 pointer-events-none' : ''}`}
      >
        {item.leadingIcon && (
          <span className="flex-shrink-0 text-text-secondary">{item.leadingIcon}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="typo-body1 font-medium text-text-primary">{item.header}</p>
          {item.sublabel && (
            <p className="typo-caption1 text-text-tertiary mt-0.5">{item.sublabel}</p>
          )}
        </div>
        <ChevronDownIcon
          className={`text-text-tertiary flex-shrink-0 transition-transform duration-200
            ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Content Panel — CSS Grid trick for jank-free animation */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-200 ease-out
          ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 typo-body1 text-text-primary">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}
