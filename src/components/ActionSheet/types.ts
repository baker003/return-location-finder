export interface ActionSheetItem {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'disabled';
  onClick?: () => void;
}

export interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  items: ActionSheetItem[];
  cancelLabel?: string;
  hideCancel?: boolean;
  closeOnBackdropClick?: boolean;
}
