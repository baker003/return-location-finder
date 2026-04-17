'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/components/Button/IconButton';
import { TextButton } from '@/components/Button/TextButton';
import type { TrailingButtonProps } from './types';

export const TrailingButton = forwardRef<HTMLDivElement, TrailingButtonProps>(
  function TrailingButton(props, ref) {
    if (props.variant === 'iconButtons') {
      const { buttons, className } = props;
      return (
        <div
          ref={ref}
          className={clsx('flex items-center gap-[6px]', className)}
        >
          {buttons.map((btn, index) => (
            <IconButton
              key={index}
              size="sm"
              type="ghost"
              shape="square"
              icon={btn.icon}
              aria-label={btn['aria-label']}
              onClick={btn.onClick}
              className="[&>svg]:!w-6 [&>svg]:!h-6"
            />
          ))}
        </div>
      );
    }

    const { label, onClick, className } = props;
    return (
      <div ref={ref}>
        <TextButton
          variant="primary"
          size={16}
          onClick={onClick}
          className={clsx('h-[40px] typo-headline', className)}
        >
          {label}
        </TextButton>
      </div>
    );
  },
);
