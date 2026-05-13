export interface AccordionItemData {
  key: string;
  header: string;
  content: React.ReactNode;
  disabled?: boolean;
  sublabel?: string;
  leadingIcon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  mode?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  showDivider?: boolean;
  bordered?: boolean;
  className?: string;
}
