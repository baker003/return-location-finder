'use client';

import React, { useState, useCallback } from 'react';
import { AccordionItem } from './AccordionItem';
import type { AccordionProps } from './types';

export function Accordion({
  items,
  mode = 'single',
  defaultValue,
  value,
  onChange,
  showDivider = true,
  bordered = false,
  className = '',
}: AccordionProps) {
  const getInitialOpen = (): string[] => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
    }
    return [];
  };

  const [openKeys, setOpenKeys] = useState<string[]>(getInitialOpen);

  // Controlled mode: sync from value prop
  const effectiveOpenKeys = value !== undefined
    ? (Array.isArray(value) ? value : value ? [value] : [])
    : openKeys;

  const handleToggle = useCallback(
    (key: string) => {
      if (value !== undefined) {
        // Controlled
        if (mode === 'single') {
          const next = effectiveOpenKeys.includes(key) ? '' : key;
          onChange?.(next);
        } else {
          const next = effectiveOpenKeys.includes(key)
            ? effectiveOpenKeys.filter((k) => k !== key)
            : [...effectiveOpenKeys, key];
          onChange?.(next);
        }
        return;
      }

      // Uncontrolled
      setOpenKeys((prev) => {
        if (mode === 'single') {
          const next = prev.includes(key) ? [] : [key];
          onChange?.(next[0] ?? '');
          return next;
        } else {
          const next = prev.includes(key)
            ? prev.filter((k) => k !== key)
            : [...prev, key];
          onChange?.(next);
          return next;
        }
      });
    },
    [mode, value, effectiveOpenKeys, onChange]
  );

  return (
    <div
      role="list"
      className={`
        ${bordered ? 'border border-border rounded-xl overflow-hidden' : ''}
        ${className}
      `}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.key}
          item={item}
          index={index}
          isOpen={effectiveOpenKeys.includes(item.key)}
          showDivider={showDivider}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
