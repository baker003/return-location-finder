'use client';

import {
  cloneElement,
  useCallback,
  useId,
  useRef,
  useState,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import type { TooltipProps, TooltipPlacement } from './types';

interface Position {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

const ARROW_SIZE = 8;
const GAP = 6; // gap between anchor and tooltip

function computePosition(
  anchor: DOMRect,
  tooltip: DOMRect,
  preferred: TooltipPlacement,
  maxWidth: number,
): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placements: TooltipPlacement[] = [preferred, getOpposite(preferred), 'top', 'bottom', 'left', 'right'];
  const uniquePlacements = [...new Set(placements)];

  for (const p of uniquePlacements) {
    const pos = calcPos(anchor, tooltip, p, maxWidth);
    if (fitsInViewport(pos, tooltip, maxWidth, vw, vh)) {
      return { ...pos, placement: p };
    }
  }

  // Fallback: use preferred even if it overflows
  return { ...calcPos(anchor, tooltip, preferred, maxWidth), placement: preferred };
}

function getOpposite(p: TooltipPlacement): TooltipPlacement {
  const map: Record<TooltipPlacement, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  return map[p];
}

function calcPos(
  anchor: DOMRect,
  tooltip: DOMRect,
  placement: TooltipPlacement,
  maxWidth: number,
): { top: number; left: number } {
  const effectiveWidth = Math.min(tooltip.width || maxWidth, maxWidth);
  const tooltipHeight = tooltip.height || 32;

  switch (placement) {
    case 'top':
      return {
        top: anchor.top - tooltipHeight - GAP - ARROW_SIZE / 2,
        left: anchor.left + anchor.width / 2 - effectiveWidth / 2,
      };
    case 'bottom':
      return {
        top: anchor.bottom + GAP + ARROW_SIZE / 2,
        left: anchor.left + anchor.width / 2 - effectiveWidth / 2,
      };
    case 'left':
      return {
        top: anchor.top + anchor.height / 2 - tooltipHeight / 2,
        left: anchor.left - effectiveWidth - GAP - ARROW_SIZE / 2,
      };
    case 'right':
      return {
        top: anchor.top + anchor.height / 2 - tooltipHeight / 2,
        left: anchor.right + GAP + ARROW_SIZE / 2,
      };
  }
}

function fitsInViewport(
  pos: { top: number; left: number },
  tooltip: DOMRect,
  maxWidth: number,
  vw: number,
  vh: number,
): boolean {
  const w = Math.min(tooltip.width || maxWidth, maxWidth);
  const h = tooltip.height || 32;
  return pos.top >= 0 && pos.left >= 0 && pos.top + h <= vh && pos.left + w <= vw;
}

function getArrowClass(placement: TooltipPlacement): string {
  switch (placement) {
    case 'top':
      return 'bottom-[-4px] left-1/2 -translate-x-1/2';
    case 'bottom':
      return 'top-[-4px] left-1/2 -translate-x-1/2';
    case 'left':
      return 'right-[-4px] top-1/2 -translate-y-1/2';
    case 'right':
      return 'left-[-4px] top-1/2 -translate-y-1/2';
  }
}

export function Tooltip({
  content,
  placement = 'top',
  trigger = ['hover', 'focus'],
  delay = 200,
  hideDelay = 100,
  disabled = false,
  maxWidth = 200,
  children,
  className,
}: TooltipProps) {
  const tooltipId = useId();
  const anchorRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, placement });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const updatePosition = useCallback(() => {
    if (!anchorRef.current || !tooltipRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const pos = computePosition(anchorRect, tooltipRect, placement, maxWidth);
    setPosition(pos);
  }, [placement, maxWidth]);

  const scheduleShow = useCallback(() => {
    if (disabled) return;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [disabled, delay]);

  const scheduleHide = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  const handleToggleClick = useCallback(() => {
    if (disabled) return;
    setVisible((prev) => !prev);
  }, [disabled]);

  // Update position after tooltip renders
  useEffect(() => {
    if (visible) {
      // Use rAF to allow tooltip to render first
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [visible, updatePosition]);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const extraProps: Record<string, unknown> = {
    ref: (el: HTMLElement | null) => {
      anchorRef.current = el;
    },
    'aria-describedby': visible ? tooltipId : undefined,
  };

  if (!disabled) {
    if (triggers.includes('hover')) {
      extraProps.onMouseEnter = scheduleShow;
      extraProps.onMouseLeave = scheduleHide;
    }
    if (triggers.includes('focus')) {
      extraProps.onFocus = scheduleShow;
      extraProps.onBlur = scheduleHide;
    }
    if (triggers.includes('click')) {
      extraProps.onClick = handleToggleClick;
    }
  }

  const arrowClass = getArrowClass(position.placement);

  return (
    <>
      {cloneElement(children, extraProps)}
      {mounted && visible &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`fixed z-50 pointer-events-none
              bg-gray-900 text-on-primary
              typo-caption1 font-medium
              px-3 py-2 rounded-lg
              animate-scale-in
              ${className ?? ''}`}
            style={{ top: position.top, left: position.left, maxWidth }}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${arrowClass}`}
              aria-hidden="true"
            />
          </div>,
          document.body,
        )
      }
    </>
  );
}

export default Tooltip;
