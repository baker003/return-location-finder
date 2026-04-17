'use client';

import { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import type { TagProps, TagType, TagSize, TagColor } from './types';
import { TagGroupContext } from './TagGroup';

/* ── Accent color: text/bg 유틸리티 매핑 ── */
const accentText: Record<TagColor, string> = {
  indigo: 'text-indigo-600',
  blue: 'text-blue-600',
  red: 'text-accent-red',
  orange: 'text-accent-orange',
  green: 'text-accent-green',
  lightblue: 'text-accent-light-blue',
  purple: 'text-accent-purple',
  magenta: 'text-accent-magenta',
  cyan: 'text-accent-cyan',
  lime: 'text-accent-lime',
  redorange: 'text-accent-red-orange',
  gray: 'text-text-tertiary',
};

const accentBg: Record<TagColor, string> = {
  indigo: 'bg-indigo-600',
  blue: 'bg-blue-600',
  red: 'bg-accent-red',
  orange: 'bg-accent-orange',
  green: 'bg-accent-green',
  lightblue: 'bg-accent-light-blue',
  purple: 'bg-accent-purple',
  magenta: 'bg-accent-magenta',
  cyan: 'bg-accent-cyan',
  lime: 'bg-accent-lime',
  redorange: 'bg-accent-red-orange',
  gray: 'bg-text-tertiary',
};

/* ── Size 클래스 (height + font-size + line-height + vertical padding) ── */
const sizeClasses: Record<TagSize, string> = {
  xs: 'h-5 py-[2px] typo-caption-2',
  sm: 'h-6 py-[2px] typo-caption-1',
  md: 'h-7 py-[2px] typo-footnote',
  lg: 'h-8 py-[2px] typo-footnote',
};

/* ── Font weight: size x bold ── */
const fontWeight: Record<TagSize, Record<'regular' | 'bold', string>> = {
  xs: { regular: 'font-normal', bold: 'font-semibold' },
  sm: { regular: 'font-medium', bold: 'font-semibold' },
  md: { regular: 'font-normal', bold: 'font-semibold' },
  lg: { regular: 'font-normal', bold: 'font-semibold' },
};

/* ── Padding: size x showIcon ── */
const paddingClasses: Record<TagSize, Record<'icon' | 'text', string>> = {
  xs: { icon: 'pl-[6px] pr-2', text: 'pl-2 pr-2' },
  sm: { icon: 'pl-2 pr-[10px]', text: 'pl-[10px] pr-[10px]' },
  md: { icon: 'pl-[10px] pr-3', text: 'pl-3 pr-3' },
  lg: { icon: 'pl-3 pr-[14px]', text: 'pl-[14px] pr-[14px]' },
};

/* ── Icon size (line-height 기준: ~20px→16, 20~26→20, 26~32→24, 32+→32) ── */
const iconSizeClasses: Record<TagSize, string> = {
  xs: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 16px → 아이콘 16px */
  sm: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 18px → 아이콘 16px */
  md: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 20px → 아이콘 16px */
  lg: '[&>svg]:w-5 [&>svg]:h-5',       /* leading 22px → 아이콘 20px */
};

/* ── Type x Color 스타일 (bg, text, border) ── */
function getTypeClasses(type: TagType, color: TagColor): string {
  switch (type) {
    case 'fill-light':
      return clsx('bg-surface', accentText[color]);
    case 'fill-dark':
      return clsx(accentBg[color], 'text-on-primary');
    case 'fill':
      return clsx('bg-gray-100', accentText[color]);
    case 'outlined':
      return 'bg-surface border border-divider text-text-primary';
    case 'text':
      return 'bg-transparent text-text-primary';
  }
}

/* ── Outlined/Text 타입에서 아이콘 accent 색상 필요 ── */
function getIconAccentClass(type: TagType, color: TagColor): string | undefined {
  if (type === 'outlined' || type === 'text') {
    return accentText[color];
  }
  return undefined; // fill-light, fill-dark, fill 은 부모 색상 상속
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  function Tag(
    {
      type: typeProp,
      size = 'md',
      bold = false,
      color = 'indigo',
      label,
      leadingIcon,
      showLeadingIcon = true,
      className,
    },
    ref,
  ) {
    /* TagGroup Context로부터 type 오버라이드 */
    const groupType = useContext(TagGroupContext);
    const type: TagType = groupType ?? typeProp ?? 'fill';

    const showIcon = !!leadingIcon && showLeadingIcon;

    return (
      <span
        ref={ref}
        className={clsx(
          /* base */
          'inline-flex items-center rounded-full whitespace-nowrap',
          'cursor-default select-none',
          /* size */
          sizeClasses[size],
          /* font weight */
          fontWeight[size][bold ? 'bold' : 'regular'],
          /* padding */
          paddingClasses[size][showIcon ? 'icon' : 'text'],
          /* type x color */
          getTypeClasses(type, color),
          className,
        )}
      >
        {/* Leading Icon */}
        {showIcon && (
          <span
            className={clsx(
              'flex-shrink-0 flex items-center mr-1',
              iconSizeClasses[size],
              getIconAccentClass(type, color),
            )}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        {/* Label */}
        <span className="leading-[1]">{label}</span>
      </span>
    );
  },
);
