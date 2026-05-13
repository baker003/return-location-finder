'use client';

import React, { useState } from 'react';
import { Accordion } from '@/components/Accordion';

const faqItems = [
  {
    key: 'q1',
    header: '쏘카는 어떻게 사용하나요?',
    content: (
      <p className="text-text-secondary typo-body1">
        앱을 다운로드하고 회원가입 후, 원하는 차량을 선택하여 예약하면 됩니다.
        예약 완료 후 차량 위치로 이동하여 앱으로 문을 열고 이용하세요.
      </p>
    ),
  },
  {
    key: 'q2',
    header: '보험은 어떻게 적용되나요?',
    content: (
      <p className="text-text-secondary typo-body1">
        쏘카는 기본 보험이 포함되어 있습니다. 추가적인 보험 옵션은 예약 시 선택할 수 있으며,
        사고 발생 시 고객센터로 즉시 연락주세요.
      </p>
    ),
  },
  {
    key: 'q3',
    header: '주유는 어떻게 하나요?',
    sublabel: '주유 및 충전 관련 안내',
    content: (
      <p className="text-text-secondary typo-body1">
        차량 내 법인카드로 주유 가능합니다. 전기차의 경우 쏘카 전용 충전소 또는
        일반 충전소를 이용하실 수 있습니다.
      </p>
    ),
  },
  {
    key: 'q4',
    header: '비활성화된 항목 (disabled)',
    content: <p>이 내용은 보이지 않습니다.</p>,
    disabled: true,
  },
];

const multiItems = [
  {
    key: 'm1',
    header: '요금 안내',
    content: (
      <div className="space-y-2">
        <p className="text-text-secondary typo-body1">시간당 요금: 5,900원~</p>
        <p className="text-text-secondary typo-body1">일 요금: 49,000원~</p>
        <p className="text-text-secondary typo-body1">주행요금: 150원/km</p>
      </div>
    ),
  },
  {
    key: 'm2',
    header: '이용 지역',
    content: (
      <p className="text-text-secondary typo-body1">
        서울, 경기, 인천, 부산, 대전, 대구, 광주, 세종 등 전국 주요 도시에서 이용 가능합니다.
      </p>
    ),
  },
  {
    key: 'm3',
    header: '멤버십 혜택',
    content: (
      <p className="text-text-secondary typo-body1">
        패스 이용 시 할인 혜택과 우선 예약권을 제공합니다.
        월정액 패스부터 연간 패스까지 다양한 상품이 있습니다.
      </p>
    ),
  },
];

export default function AccordionPage() {
  const [controlledValue, setControlledValue] = useState<string>('q1');
  const [multiValue, setMultiValue] = useState<string[]>(['m1']);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="typo-title3 font-bold text-text-strong">Accordion</h1>

        {/* Single mode with divider */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Single mode (기본, showDivider)</h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <Accordion items={faqItems} mode="single" showDivider />
          </div>
        </section>

        {/* Single mode, no divider */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Single mode (divider 없음)</h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <Accordion items={faqItems.slice(0, 3)} mode="single" showDivider={false} />
          </div>
        </section>

        {/* Bordered */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Bordered</h2>
          <Accordion items={faqItems.slice(0, 3)} mode="single" bordered showDivider />
        </section>

        {/* Multiple mode */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">
            Multiple mode (동시에 여러 항목 열기)
          </h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <Accordion items={multiItems} mode="multiple" showDivider />
          </div>
        </section>

        {/* Controlled single */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">
            Controlled (single) — 현재: {controlledValue || '없음'}
          </h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <Accordion
              items={faqItems.slice(0, 3)}
              mode="single"
              value={controlledValue}
              onChange={(v) => setControlledValue(typeof v === 'string' ? v : v[0] ?? '')}
              showDivider
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {faqItems.slice(0, 3).map((item) => (
              <button
                key={item.key}
                className={`px-3 py-1.5 rounded-lg typo-label2 font-medium border
                  ${controlledValue === item.key
                    ? 'bg-primary-regular text-on-primary border-primary-regular'
                    : 'bg-surface text-text-secondary border-border'
                  }`}
                onClick={() => setControlledValue(controlledValue === item.key ? '' : item.key)}
              >
                {item.header.substring(0, 8)}...
              </button>
            ))}
          </div>
        </section>

        {/* Controlled multiple */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">
            Controlled (multiple) — 열린 항목: {multiValue.join(', ') || '없음'}
          </h2>
          <div className="bg-surface rounded-2xl overflow-hidden">
            <Accordion
              items={multiItems}
              mode="multiple"
              value={multiValue}
              onChange={(v) => setMultiValue(Array.isArray(v) ? v : v ? [v] : [])}
              showDivider
            />
          </div>
        </section>
      </div>
    </main>
  );
}
