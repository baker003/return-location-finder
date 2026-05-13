export type StepStatus = 'completed' | 'current' | 'upcoming' | 'error';

export interface StepItemData {
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: StepItemData[];
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  clickable?: boolean;
  onStepClick?: (index: number) => void;
  className?: string;
}

export interface StepItemProps {
  step: StepItemData;
  index: number;
  status: StepStatus;
  isLast: boolean;
  orientation: 'horizontal' | 'vertical';
  clickable: boolean;
  onStepClick?: (index: number) => void;
}
