import type { ReactNode } from 'react';

export type BottomSheetState = 'closed' | 'peek' | 'full';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  state?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
  peekHeight?: number;
  maxHeightVh?: number;
  showHandle?: boolean;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  scrollable?: boolean;
  children?: ReactNode;
  className?: string;
}
