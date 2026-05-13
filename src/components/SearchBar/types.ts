export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  cancelLabel?: string;
  showCancel?: 'focus' | 'always' | 'never';
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}
