export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | null;
  rangeValue?: [Date | null, Date | null];
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  locale?: string;
  inline?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface CalendarProps {
  year: number;
  month: number;
  mode: DatePickerMode;
  value?: Date | null;
  rangeValue?: [Date | null, Date | null];
  hoverDate?: Date | null;
  onDateClick: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
  onMonthChange: (year: number, month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
}
