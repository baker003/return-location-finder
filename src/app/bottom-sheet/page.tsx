'use client';

import React, { useState } from 'react';
import BottomSheet from '@/components/BottomSheet';
import { BottomSheetState } from '@/components/BottomSheet/types';

type DemoKey = 'peek' | 'full' | 'scroll';

interface DemoConfig {
  state: BottomSheetState;
  title: string;
  subtitle?: string;
  showCloseButton?: boolean;
  scrollable?: boolean;
  peekHeight?: number;
}

const DEMOS: Record<DemoKey, DemoConfig> = {
  peek: {
    state: 'peek',
    title: 'Peek 상태',
    subtitle: '아래에서 일부만 보이는 상태입니다',
    showCloseButton: true,
    peekHeight: 240,
  },
  full: {
    state: 'full',
    title: 'Full 상태',
    subtitle: '전체 높이로 펼쳐진 상태입니다',
    showCloseButton: true,
  },
  scroll: {
    state: 'full',
    title: '스크롤 가능',
    subtitle: '내용이 많을 때 스크롤됩니다',
    showCloseButton: true,
    scrollable: true,
  },
};

export default function BottomSheetPage() {
  const [open, setOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<DemoKey>('full');
  const [sheetState, setSheetState] = useState<BottomSheetState>('full');

  function openDemo(key: DemoKey) {
    setActiveDemo(key);
    setSheetState(DEMOS[key].state);
    setOpen(true);
  }

  const config = DEMOS[activeDemo];

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <h1 className="typo-title3 font-bold text-text-strong mb-2">Bottom Sheet</h1>
        <p className="typo-body1 text-text-secondary mb-8">
          드래그 핸들을 잡고 아래로 내리면 닫힙니다. ESC 키 또는 배경 클릭으로도 닫힙니다.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => openDemo('peek')}
            className={[
              'w-full h-12 rounded-xl typo-label1 font-semibold',
              'bg-primary-regular text-on-primary',
              'transition-opacity hover:opacity-90 active:opacity-80',
            ].join(' ')}
          >
            Peek 상태로 열기 (하단 일부 노출)
          </button>

          <button
            type="button"
            onClick={() => openDemo('full')}
            className={[
              'w-full h-12 rounded-xl typo-label1 font-semibold',
              'bg-primary-strong text-on-primary',
              'transition-opacity hover:opacity-90 active:opacity-80',
            ].join(' ')}
          >
            Full 상태로 열기 (전체 높이)
          </button>

          <button
            type="button"
            onClick={() => openDemo('scroll')}
            className={[
              'w-full h-12 rounded-xl typo-label1 font-semibold',
              'border-2 border-primary-regular text-primary-regular bg-surface',
              'transition-opacity hover:opacity-80 active:opacity-70',
            ].join(' ')}
          >
            스크롤 가능 열기 (긴 콘텐츠)
          </button>
        </div>

        {/* State indicator */}
        <div className="mt-8 p-4 bg-surface rounded-xl border border-border">
          <p className="typo-caption1 text-text-tertiary mb-1">현재 상태</p>
          <p className="typo-label1 font-semibold text-text-primary">
            {open ? `열림 (${sheetState})` : '닫힘'}
          </p>
        </div>
      </div>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        state={sheetState}
        onStateChange={setSheetState}
        title={config.title}
        subtitle={config.subtitle}
        showCloseButton={config.showCloseButton}
        scrollable={config.scrollable ?? false}
        peekHeight={config.peekHeight ?? 280}
        maxHeightVh={90}
      >
        {activeDemo === 'scroll' ? (
          <div className="py-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 border-b border-border last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-background flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="typo-label1 font-medium text-text-primary">항목 {i + 1}</p>
                  <p className="typo-caption1 text-text-tertiary">스크롤 테스트 콘텐츠입니다</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p className="typo-body1 text-text-primary mb-4">
              Bottom Sheet 컴포넌트 데모입니다. 드래그 핸들을 아래로 내리면 닫히거나 상태가 변경됩니다.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setSheetState('peek')}
                className="h-10 rounded-lg typo-label1 font-medium bg-background text-text-primary transition-opacity hover:opacity-80"
              >
                Peek 상태로
              </button>
              <button
                type="button"
                onClick={() => setSheetState('full')}
                className="h-10 rounded-lg typo-label1 font-medium bg-background text-text-primary transition-opacity hover:opacity-80"
              >
                Full 상태로
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 rounded-lg typo-label1 font-medium text-status-negative transition-opacity hover:opacity-80"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </BottomSheet>
    </main>
  );
}
