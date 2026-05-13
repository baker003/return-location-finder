export interface PageControlProps {
  total: number;
  current: number;
  onChange?: (index: number) => void;
  variant?: 'dot' | 'bar' | 'number';
  clickable?: boolean;
  maxVisible?: number;
  className?: string;
}
