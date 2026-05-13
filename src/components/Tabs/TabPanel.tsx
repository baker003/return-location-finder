import type { ReactNode } from 'react';

interface TabPanelProps {
  id: string;
  activeKey: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ id, activeKey, children, className = '' }: TabPanelProps) {
  const isActive = id === activeKey;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={!isActive}
      className={className}
    >
      {isActive && children}
    </div>
  );
}
