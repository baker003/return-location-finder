'use client';

import { createContext, forwardRef, Children } from 'react';
import clsx from 'clsx';
import type { TagGroupProps, TagGroupType, TagType } from './types';

/* ── TagGroup type -> 자식 Tag type 매핑 ── */
const groupTypeToTagType: Record<TagGroupType, TagType> = {
  'fill-light': 'fill-light',
  'fill-dark': 'fill-dark',
  fill: 'fill',
  outlined: 'outlined',
  basic: 'text',
};

/* ── Context: 자식 Tag에 type 전달 ── */
export const TagGroupContext = createContext<TagType | null>(null);

export const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  function TagGroup(
    {
      type = 'fill',
      showDivider = false,
      dividerStyle = 'dot',
      gap = 8,
      children,
      className,
    },
    ref,
  ) {
    const tagType = groupTypeToTagType[type];
    const dividerChar = dividerStyle === 'slash' ? '/' : '\u00B7';
    const childArray = Children.toArray(children);

    return (
      <TagGroupContext.Provider value={tagType}>
        <div
          ref={ref}
          role="group"
          className={clsx('inline-flex flex-wrap items-center', className)}
          style={{ gap: `${gap}px` }}
        >
          {showDivider
            ? childArray.flatMap((child, i) => {
                const items = [child];
                if (i < childArray.length - 1) {
                  items.push(
                    <span
                      key={`divider-${i}`}
                      className="text-text-tertiary text-[12px] leading-[18px] select-none"
                      aria-hidden="true"
                    >
                      {dividerChar}
                    </span>,
                  );
                }
                return items;
              })
            : children}
        </div>
      </TagGroupContext.Provider>
    );
  },
);
