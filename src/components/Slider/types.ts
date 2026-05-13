export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  rangeValue?: [number, number];
  mode?: 'single' | 'range';
  onChange?: (value: number) => void;
  onRangeChange?: (value: [number, number]) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  showMarks?: boolean;
  marks?: SliderMark[];
  className?: string;
  'aria-label'?: string;
}
