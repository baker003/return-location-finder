'use client';

import { useState } from 'react';
import { Tooltip } from '@/components/Tooltip';

export default function TooltipPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="typo-title3 font-bold text-text-strong mb-2">Tooltip</h1>
          <p className="typo-body1 text-text-secondary">
            DS_2 Tooltip 컴포넌트 — placement, trigger, delay, maxWidth 변형
          </p>
        </div>

        {/* 4방향 placement */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-6">Placement</h2>
          <div className="flex items-center justify-center gap-6 flex-wrap min-h-[160px] bg-surface rounded-2xl p-8">
            <Tooltip content="위쪽 툴팁" placement="top">
              <button className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium">
                Top
              </button>
            </Tooltip>

            <Tooltip content="아래쪽 툴팁" placement="bottom">
              <button className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium">
                Bottom
              </button>
            </Tooltip>

            <Tooltip content="왼쪽 툴팁" placement="left">
              <button className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium">
                Left
              </button>
            </Tooltip>

            <Tooltip content="오른쪽 툴팁" placement="right">
              <button className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium">
                Right
              </button>
            </Tooltip>
          </div>
        </section>

        {/* Trigger 방식 */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-6">Trigger</h2>
          <div className="bg-surface rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="typo-label1 text-text-tertiary w-24 shrink-0">hover</span>
              <Tooltip content="마우스를 올려서 표시" placement="top" trigger="hover">
                <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                  Hover me
                </button>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="typo-label1 text-text-tertiary w-24 shrink-0">click</span>
              <Tooltip
                content={`클릭으로 토글 — ${clickCount}회 열림`}
                placement="top"
                trigger="click"
              >
                <button
                  className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors"
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Click me
                </button>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="typo-label1 text-text-tertiary w-24 shrink-0">focus</span>
              <Tooltip content="포커스 시 표시 (Tab 키 사용)" placement="top" trigger="focus">
                <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary-regular">
                  Focus me (Tab)
                </button>
              </Tooltip>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="typo-label1 text-text-tertiary w-24 shrink-0">hover+focus</span>
              <Tooltip content="호버 또는 포커스로 표시" placement="top" trigger={['hover', 'focus']}>
                <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary-regular">
                  Hover or Focus
                </button>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Disabled */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-6">Disabled</h2>
          <div className="bg-surface rounded-2xl p-8 flex gap-4 flex-wrap">
            <Tooltip content="이 툴팁은 비활성" placement="top" disabled>
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-disabled opacity-40 cursor-not-allowed">
                Disabled tooltip
              </button>
            </Tooltip>

            <Tooltip content="이 툴팁은 활성" placement="top">
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                Active tooltip
              </button>
            </Tooltip>
          </div>
        </section>

        {/* maxWidth / 긴 텍스트 */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-6">maxWidth & 긴 텍스트</h2>
          <div className="bg-surface rounded-2xl p-8 flex gap-6 flex-wrap items-center">
            <Tooltip
              content="짧은 툴팁"
              placement="top"
              maxWidth={120}
            >
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                maxWidth 120
              </button>
            </Tooltip>

            <Tooltip
              content="이 툴팁은 최대 너비가 200px로 제한되어 있어서 긴 텍스트가 자동으로 줄바꿈됩니다."
              placement="top"
              maxWidth={200}
            >
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                maxWidth 200 (긴 텍스트)
              </button>
            </Tooltip>

            <Tooltip
              content="너비 300px: 더 많은 텍스트를 한 줄에 표시할 수 있습니다. 툴팁 너비가 넓어집니다."
              placement="bottom"
              maxWidth={300}
            >
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                maxWidth 300
              </button>
            </Tooltip>
          </div>
        </section>

        {/* Delay */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-6">Delay</h2>
          <div className="bg-surface rounded-2xl p-8 flex gap-6 flex-wrap items-center">
            <Tooltip content="딜레이 없음 (0ms)" placement="top" delay={0} hideDelay={0}>
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                즉시
              </button>
            </Tooltip>

            <Tooltip content="기본 딜레이 200ms" placement="top">
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                기본 (200ms)
              </button>
            </Tooltip>

            <Tooltip content="느린 딜레이 800ms" placement="top" delay={800}>
              <button className="px-4 py-2 rounded-xl border border-border typo-label1 text-text-primary hover:bg-background transition-colors">
                느리게 (800ms)
              </button>
            </Tooltip>
          </div>
        </section>

        {/* 접근성 예시 */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-4">접근성</h2>
          <div className="bg-surface rounded-2xl p-8">
            <p className="typo-body1 text-text-secondary mb-4">
              Tooltip은 <code className="bg-background px-1.5 py-0.5 rounded text-text-primary typo-label1">role=&quot;tooltip&quot;</code>과{' '}
              <code className="bg-background px-1.5 py-0.5 rounded text-text-primary typo-label1">aria-describedby</code>로 스크린 리더와 연결됩니다.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Tooltip content="저장 단축키: Ctrl+S" placement="top" trigger={['hover', 'focus']}>
                <button
                  aria-label="저장"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-text-primary hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary-regular"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4h9l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="7" y="13" width="6" height="4" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="6" y="4" width="6" height="4" fill="currentColor" />
                  </svg>
                </button>
              </Tooltip>

              <Tooltip content="삭제 (복구 불가)" placement="top" trigger={['hover', 'focus']}>
                <button
                  aria-label="삭제"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-status-negative hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-status-negative"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4h6M4 7h12M6 7l1 10h6l1-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
