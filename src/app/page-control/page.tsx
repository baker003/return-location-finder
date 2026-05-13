'use client';

import React, { useState } from 'react';
import { PageControl } from '@/components/PageControl';

export default function PageControlPage() {
  const [dot3, setDot3] = useState(0);
  const [dot5, setDot5] = useState(2);
  const [dot10, setDot10] = useState(4);
  const [bar5, setBar5] = useState(1);
  const [num, setNum] = useState(2);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="typo-title3 font-bold text-text-strong">Page Control</h1>

        {/* Dot — 3 pages */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Dot — 3 pages (static)</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={3} current={1} variant="dot" />
          </div>
        </section>

        {/* Dot — 5 pages, clickable */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Dot — 5 pages (clickable, current: {dot5})</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={5} current={dot5} variant="dot" clickable onChange={setDot5} />
          </div>
        </section>

        {/* Dot — 10 pages (sliding window) */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Dot — 10 pages, maxVisible=7 (current: {dot10})</h2>
          <div className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-4">
            <PageControl total={10} current={dot10} variant="dot" clickable maxVisible={7} onChange={setDot10} />
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-lg bg-primary-regular text-on-primary typo-label2 disabled:opacity-40"
                onClick={() => setDot10((p) => Math.max(0, p - 1))}
                disabled={dot10 === 0}
              >
                이전
              </button>
              <button
                className="px-3 py-1.5 rounded-lg bg-primary-regular text-on-primary typo-label2 disabled:opacity-40"
                onClick={() => setDot10((p) => Math.min(9, p + 1))}
                disabled={dot10 === 9}
              >
                다음
              </button>
            </div>
          </div>
        </section>

        {/* Bar — 5 pages */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Bar — 5 pages (clickable, current: {bar5})</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={5} current={bar5} variant="bar" clickable onChange={setBar5} />
          </div>
        </section>

        {/* Bar — 3 pages static */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Bar — 3 pages (static)</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={3} current={0} variant="bar" />
          </div>
        </section>

        {/* Number */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Number variant (current: {num})</h2>
          <div className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-4">
            <PageControl total={10} current={num} variant="number" />
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded-lg bg-primary-regular text-on-primary typo-label2 disabled:opacity-40"
                onClick={() => setNum((p) => Math.max(0, p - 1))}
                disabled={num === 0}
              >
                이전
              </button>
              <button
                className="px-3 py-1.5 rounded-lg bg-primary-regular text-on-primary typo-label2 disabled:opacity-40"
                onClick={() => setNum((p) => Math.min(9, p + 1))}
                disabled={num === 9}
              >
                다음
              </button>
            </div>
          </div>
        </section>

        {/* Dot — 3 static (no clickable) */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Dot — 3 pages (static, 클릭 불가)</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={3} current={dot3} variant="dot" />
          </div>
        </section>
      </div>
    </main>
  );
}
