'use client';

import React, { useState } from 'react';
import { Stepper } from '@/components/Stepper';

const steps3 = [
  { label: '주문 확인', description: '주문 내역 검토' },
  { label: '결제', description: '카드 정보 입력' },
  { label: '완료', description: '주문 완료' },
];

const steps4 = [
  { label: '회원 정보' },
  { label: '차량 선택' },
  { label: '예약 확인' },
  { label: '완료' },
];

const steps5 = [
  { label: '출발지' },
  { label: '경유지' },
  { label: '목적지' },
  { label: '결제' },
  { label: '완료' },
];

const stepsWithError = [
  { label: '서류 제출' },
  { label: '검토 중', status: 'error' as const, description: '서류 오류 발생' },
  { label: '승인' },
  { label: '완료' },
];

export default function StepperPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="typo-title3 font-bold text-text-strong">Stepper</h1>

        {/* Horizontal — 3 steps */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Horizontal — 3 Steps (activeStep: 1)</h2>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper steps={steps3} activeStep={1} orientation="horizontal" />
          </div>
        </section>

        {/* Horizontal — 4 steps */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Horizontal — 4 Steps (activeStep: 2)</h2>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper steps={steps4} activeStep={2} orientation="horizontal" />
          </div>
        </section>

        {/* Horizontal — 5 steps, all completed */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Horizontal — 5 Steps (activeStep: 5, 전체 완료)</h2>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper steps={steps5} activeStep={5} orientation="horizontal" />
          </div>
        </section>

        {/* With error */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Error Step</h2>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper steps={stepsWithError} activeStep={1} orientation="horizontal" />
          </div>
        </section>

        {/* Vertical */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Vertical (activeStep: 1)</h2>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper steps={steps3} activeStep={1} orientation="vertical" />
          </div>
        </section>

        {/* Clickable */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">
            Clickable — activeStep: {activeStep}
          </h2>
          <p className="typo-label1 text-text-tertiary">완료된 스텝을 클릭하면 해당 스텝으로 이동합니다</p>
          <div className="bg-surface rounded-2xl p-6">
            <Stepper
              steps={steps4}
              activeStep={activeStep}
              orientation="horizontal"
              clickable
              onStepClick={(index) => setActiveStep(index)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium disabled:opacity-40"
              onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
              disabled={activeStep === 0}
            >
              이전
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-primary-regular text-on-primary typo-label1 font-medium disabled:opacity-40"
              onClick={() => setActiveStep((p) => Math.min(steps4.length, p + 1))}
              disabled={activeStep === steps4.length}
            >
              다음
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
