'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { BottomSheetProps, BottomSheetState } from './types';
import Close from '@/components/Icons/Close';

export default function BottomSheet({
  open,
  onClose,
  state = 'full',
  onStateChange,
  peekHeight = 280,
  maxHeightVh = 90,
  showHandle = true,
  title,
  subtitle,
  showCloseButton = false,
  closeOnBackdropClick = true,
  scrollable = true,
  children,
  className,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);
  // rendered: portal DOM에 실제로 마운트할지 여부 (닫힘 애니메이션 완료 후 unmount)
  const [rendered, setRendered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // open 변경 시 rendered 동기화 — open=true이면 즉시 렌더, false이면 300ms 후 unmount
  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setRendered(true);
    } else {
      closeTimerRef.current = setTimeout(() => {
        setRendered(false);
        closeTimerRef.current = null;
      }, 300);
    }
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [open]);

  // ESC key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const getTranslateY = useCallback(() => {
    if (!open) return 'translateY(100%)';
    if (isDragging) return `translateY(${dragOffset}px)`;
    if (state === 'closed') return 'translateY(100%)';
    if (state === 'peek') return `translateY(calc(100% - ${peekHeight}px))`;
    return 'translateY(0)';
  }, [open, isDragging, dragOffset, state, peekHeight]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only start drag on handle area or non-scrollable content
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartOffset.current = 0;
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientY - dragStartY.current;
    // Only allow downward drag (positive delta)
    const clamped = Math.max(0, delta);
    setDragOffset(clamped);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap logic: if dragged more than 100px down, close or go to peek
    if (dragOffset > 120) {
      if (state === 'full' && onStateChange) {
        onStateChange('peek');
      } else {
        onClose();
      }
    } else if (dragOffset > 40 && state === 'peek') {
      onClose();
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, state, onStateChange, onClose]);

  if (!mounted || !rendered) return null;

  const content = (
    <div
      className="fixed inset-0 z-40"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: open ? 'var(--dimmed-regular)' : 'transparent',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={closeOnBackdropClick && open ? onClose : undefined}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        aria-label={!title ? '하단 시트' : undefined}
        className={[
          'absolute bottom-0 left-0 right-0 z-50',
          'bg-surface rounded-t-2xl',
          'flex flex-col touch-none',
          isDragging ? '' : 'transition-transform duration-300',
          className ?? '',
        ].join(' ')}
        style={{
          transform: getTranslateY(),
          maxHeight: `${maxHeightVh}vh`,
          transitionTimingFunction: isDragging ? undefined : 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Drag Handle */}
        {showHandle && (
          <div
            className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
          >
            <div className="w-9 h-1 rounded-full bg-border" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2
                id="bottom-sheet-title"
                className="typo-headline1 font-semibold text-text-strong"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="typo-label1 text-text-secondary mt-0.5">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                className="ml-2 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-text-tertiary hover:bg-fill-primary transition-colors"
              >
                <Close size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={[
            'flex-1 px-4 pb-6',
            scrollable ? 'overflow-y-auto' : 'overflow-hidden',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}

export type { BottomSheetProps, BottomSheetState };
