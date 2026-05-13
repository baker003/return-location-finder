'use client';

import { useState } from 'react';
import { Slider } from '@/components/Slider/Slider';

export default function SliderPage() {
  const [single, setSingle] = useState(40);
  const [range, setRange] = useState<[number, number]>([20, 70]);
  const [noTooltip, setNoTooltip] = useState(60);
  const [stepped, setStepped] = useState(25);
  const [marked, setMarked] = useState(50);
  const [customMarked, setCustomMarked] = useState(30);
  const [disabledVal] = useState(65);
  const [disabledRange] = useState<[number, number]>([30, 80]);

  const CUSTOM_MARKS = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="typo-title3 font-bold text-text-strong mb-2">Slider</h1>
          <p className="typo-body1 text-text-secondary">DS_2 슬라이더 컴포넌트 프리뷰</p>
        </div>

        {/* Single — 기본 */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Single (기본)</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider value={single} onChange={setSingle} aria-label="기본 슬라이더" />
            <p className="mt-3 typo-caption1 text-text-tertiary">현재 값: {single}</p>
          </div>
        </section>

        {/* Single — Tooltip 없음 */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Single — Tooltip 비활성</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider
              value={noTooltip}
              onChange={setNoTooltip}
              showTooltip={false}
              aria-label="툴팁 없는 슬라이더"
            />
            <p className="mt-3 typo-caption1 text-text-tertiary">현재 값: {noTooltip}</p>
          </div>
        </section>

        {/* Single — Step=10 */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Single — Step=10</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider
              value={stepped}
              onChange={setStepped}
              step={10}
              aria-label="10단위 슬라이더"
            />
            <p className="mt-3 typo-caption1 text-text-tertiary">현재 값: {stepped}</p>
          </div>
        </section>

        {/* Single — Marks (기본) */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Single — showMarks</h2>
          <div className="rounded-xl bg-surface p-6 pb-8 shadow-sm">
            <Slider
              value={marked}
              onChange={setMarked}
              showMarks
              aria-label="눈금 슬라이더"
            />
            <p className="mt-5 typo-caption1 text-text-tertiary">현재 값: {marked}</p>
          </div>
        </section>

        {/* Single — 커스텀 Marks */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Single — 커스텀 Marks</h2>
          <div className="rounded-xl bg-surface p-6 pb-10 shadow-sm">
            <Slider
              value={customMarked}
              onChange={setCustomMarked}
              showMarks
              marks={CUSTOM_MARKS}
              step={25}
              aria-label="커스텀 눈금 슬라이더"
            />
            <p className="mt-6 typo-caption1 text-text-tertiary">현재 값: {customMarked}</p>
          </div>
        </section>

        {/* Range */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Range</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider
              mode="range"
              rangeValue={range}
              onRangeChange={setRange}
            />
            <p className="mt-3 typo-caption1 text-text-tertiary">
              현재 범위: {range[0]} ~ {range[1]}
            </p>
          </div>
        </section>

        {/* Range — Marks */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Range — Marks</h2>
          <div className="rounded-xl bg-surface p-6 pb-10 shadow-sm">
            <Slider
              mode="range"
              rangeValue={range}
              onRangeChange={setRange}
              showMarks
              marks={CUSTOM_MARKS}
              step={25}
            />
            <p className="mt-6 typo-caption1 text-text-tertiary">
              현재 범위: {range[0]} ~ {range[1]}
            </p>
          </div>
        </section>

        {/* Disabled — Single */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Disabled — Single</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider value={disabledVal} disabled aria-label="비활성 슬라이더" />
          </div>
        </section>

        {/* Disabled — Range */}
        <section className="space-y-4">
          <h2 className="typo-label1 font-semibold text-text-primary">Disabled — Range</h2>
          <div className="rounded-xl bg-surface p-6 shadow-sm">
            <Slider mode="range" rangeValue={disabledRange} disabled />
          </div>
        </section>
      </div>
    </div>
  );
}
