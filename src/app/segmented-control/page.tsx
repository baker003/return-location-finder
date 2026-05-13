'use client';

import { useState } from 'react';
import { SegmentedControl } from '@/components/SegmentedControl/SegmentedControl';

const TWO_ITEMS = [
  { value: 'day', label: '일별' },
  { value: 'month', label: '월별' },
];

const THREE_ITEMS = [
  { value: 'list', label: '목록' },
  { value: 'map', label: '지도' },
  { value: 'card', label: '카드' },
];

const FOUR_ITEMS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '이용중' },
  { value: 'reserved', label: '예약' },
  { value: 'done', label: '완료' },
];

const ICON_ITEMS = [
  {
    value: 'grid',
    label: '그리드',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="currentColor">
        <rect x="0" y="0" width="6" height="6" rx="1" />
        <rect x="8" y="0" width="6" height="6" rx="1" />
        <rect x="0" y="8" width="6" height="6" rx="1" />
        <rect x="8" y="8" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    value: 'list',
    label: '리스트',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="currentColor">
        <rect x="0" y="1" width="14" height="2" rx="1" />
        <rect x="0" y="6" width="14" height="2" rx="1" />
        <rect x="0" y="11" width="14" height="2" rx="1" />
      </svg>
    ),
  },
  {
    value: 'map',
    label: '지도',
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="currentColor">
        <path d="M7 1a5 5 0 00-5 5c0 3.5 5 8 5 8s5-4.5 5-8a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
  },
];

const DISABLED_ITEMS = [
  { value: 'on', label: '켜짐' },
  { value: 'off', label: '꺼짐', disabled: true },
  { value: 'auto', label: '자동' },
];

export default function SegmentedControlPage() {
  const [twoVal, setTwoVal] = useState('day');
  const [threeVal, setThreeVal] = useState('list');
  const [fourVal, setFourVal] = useState('all');
  const [iconVal, setIconVal] = useState('grid');
  const [lgVal, setLgVal] = useState('list');
  const [smVal, setSmVal] = useState('list');
  const [fwVal, setFwVal] = useState('all');
  const [disabledItemVal, setDisabledItemVal] = useState('on');
  const [disabledAll, setDisabledAll] = useState('day');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="typo-title3 font-bold text-text-strong mb-2">Segmented Control</h1>
          <p className="typo-body1 text-text-secondary">DS_2 세그먼트 컨트롤 컴포넌트 프리뷰</p>
        </div>

        {/* 2개 세그먼트 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">2개 세그먼트</h2>
          <SegmentedControl items={TWO_ITEMS} value={twoVal} onChange={setTwoVal} />
        </section>

        {/* 3개 세그먼트 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">3개 세그먼트</h2>
          <SegmentedControl items={THREE_ITEMS} value={threeVal} onChange={setThreeVal} />
        </section>

        {/* 4개 세그먼트 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">4개 세그먼트</h2>
          <SegmentedControl items={FOUR_ITEMS} value={fourVal} onChange={setFourVal} />
        </section>

        {/* 아이콘 포함 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">아이콘 포함</h2>
          <SegmentedControl items={ICON_ITEMS} value={iconVal} onChange={setIconVal} />
        </section>

        {/* 크기 변형 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Size — lg</h2>
          <SegmentedControl items={THREE_ITEMS} value={lgVal} onChange={setLgVal} size="lg" />
          <h2 className="typo-label1 font-semibold text-text-primary mt-4">Size — md (기본)</h2>
          <SegmentedControl items={THREE_ITEMS} value={threeVal} onChange={setThreeVal} size="md" />
          <h2 className="typo-label1 font-semibold text-text-primary mt-4">Size — sm</h2>
          <SegmentedControl items={THREE_ITEMS} value={smVal} onChange={setSmVal} size="sm" />
        </section>

        {/* fullWidth */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">fullWidth</h2>
          <SegmentedControl items={FOUR_ITEMS} value={fwVal} onChange={setFwVal} fullWidth />
        </section>

        {/* 개별 disabled */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">개별 항목 disabled</h2>
          <SegmentedControl
            items={DISABLED_ITEMS}
            value={disabledItemVal}
            onChange={setDisabledItemVal}
          />
        </section>

        {/* 전체 disabled */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">전체 disabled</h2>
          <SegmentedControl
            items={TWO_ITEMS}
            value={disabledAll}
            onChange={setDisabledAll}
            disabled
          />
        </section>
      </div>
    </div>
  );
}
