'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Divider } from '@/components/Divider';
import type { ActionSheetProps } from './types';

export function ActionSheet({
  open,
  onClose,
  title,
  description,
  items,
  cancelLabel = '취소',
  hideCancel = false,
  closeOnBackdropClick = true,
}: ActionSheetProps) {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted || !visible) return null;

  const content = (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: 'var(--dimmed-regular)' }}
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'action-sheet-title' : undefined}
        aria-label={!title ? '액션 선택' : undefined}
        className={`absolute bottom-0 left-0 right-0 p-4 pb-8 flex flex-col gap-3
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Main Card */}
        <div className="bg-surface rounded-2xl overflow-hidden">
          {/* Title / Description */}
          {(title || description) && (
            <div className="px-4 pt-4 pb-2 text-center">
              {title && (
                <h2
                  id="action-sheet-title"
                  className="typo-label1 font-semibold text-text-secondary"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="typo-caption1 text-text-tertiary mt-1">{description}</p>
              )}
            </div>
          )}

          {/* Items */}
          {items.map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <Divider strength="weak" decorative />}
              <button
                type="button"
                disabled={item.variant === 'disabled'}
                onClick={() => {
                  if (item.variant !== 'disabled') {
                    item.onClick?.();
                    onClose();
                  }
                }}
                className={`w-full h-14 px-4 flex items-center justify-center gap-3
                  typo-body1 transition-colors duration-150
                  active:bg-pressed-dark-weak
                  ${
                    item.variant === 'destructive'
                      ? 'text-status-negative font-medium'
                      : item.variant === 'disabled'
                      ? 'text-text-disabled pointer-events-none opacity-40'
                      : 'text-text-primary font-medium'
                  }`}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Cancel Card */}
        {!hideCancel && (
          <div className="bg-surface rounded-2xl overflow-hidden">
            <button
              type="button"
              className="w-full h-14 typo-body1 font-semibold text-primary-regular
                flex items-center justify-center
                active:bg-pressed-dark-weak transition-colors duration-150"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
