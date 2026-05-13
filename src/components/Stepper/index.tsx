'use client';

import React from 'react';
import { StepItem } from './StepItem';
import type { StepperProps, StepStatus } from './types';

function deriveStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'current';
  return 'upcoming';
}

export function Stepper({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  clickable = false,
  onStepClick,
  className = '',
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <ol
      role="list"
      className={`${isHorizontal ? 'flex items-start' : 'flex flex-col'} ${className}`}
    >
      {steps.map((step, index) => {
        const status: StepStatus = step.status ?? deriveStatus(index, activeStep);
        return (
          <StepItem
            key={index}
            step={step}
            index={index}
            status={status}
            isLast={index === steps.length - 1}
            orientation={orientation}
            clickable={clickable}
            onStepClick={onStepClick}
          />
        );
      })}
    </ol>
  );
}
