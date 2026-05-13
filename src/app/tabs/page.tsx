'use client';

import { useState } from 'react';
import { Tabs } from '@/components/Tabs/Tabs';
import { TabPanel } from '@/components/Tabs/TabPanel';

const BASIC_ITEMS = [
  { key: 'home', label: '홈' },
  { key: 'search', label: '검색' },
  { key: 'profile', label: '프로필' },
];

const ICON_ITEMS = [
  {
    key: 'car',
    label: '차량',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3 9a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2zm-1-6H4L2 7h12L12 3zM1 8l1.5-5h11L15 8v5h-2v-1H3v1H1V8z" />
      </svg>
    ),
  },
  {
    key: 'booking',
    label: '예약',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5 0v2H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2h-2V0H5zm5 2V0H6v2H5V1H3a1 1 0 00-1 1v1h12V2a1 1 0 00-1-1h-2v1h-1z" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: '설정',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 5a3 3 0 100 6 3 3 0 000-6zM1.5 7.5h1.1A5.5 5.5 0 007 3.1V2h2v1.1a5.5 5.5 0 004.4 4.4H14.5v1h-1.1A5.5 5.5 0 009 12.9V14H7v-1.1A5.5 5.5 0 002.6 8.5H1.5v-1z" />
      </svg>
    ),
  },
];

const SCROLL_ITEMS = [
  { key: 'tab1', label: '전체' },
  { key: 'tab2', label: '승용차' },
  { key: 'tab3', label: 'SUV' },
  { key: 'tab4', label: '전기차' },
  { key: 'tab5', label: '미니밴' },
  { key: 'tab6', label: '화물차' },
  { key: 'tab7', label: '스포츠카' },
];

const BADGE_ITEMS = [
  { key: 'notif1', label: '알림', badge: 3 },
  { key: 'notif2', label: '메시지', badge: 12 },
  { key: 'notif3', label: '예약', badge: 0 },
  { key: 'notif4', label: '결제', badge: 105 },
];

const DISABLED_ITEMS = [
  { key: 'enabled1', label: '이용 가능' },
  { key: 'disabled1', label: '점검 중', disabled: true },
  { key: 'enabled2', label: '정상' },
];

export default function TabsPage() {
  const [basicKey, setBasicKey] = useState('home');
  const [fullWidthKey, setFullWidthKey] = useState('home');
  const [scrollKey, setScrollKey] = useState('tab1');
  const [iconKey, setIconKey] = useState('car');
  const [secKey, setSecKey] = useState('home');
  const [secFwKey, setSecFwKey] = useState('car');
  const [sizeSmKey, setSizeSmKey] = useState('home');
  const [sizeLgKey, setSizeLgKey] = useState('home');
  const [badgeKey, setBadgeKey] = useState('notif1');
  const [disabledKey, setDisabledKey] = useState('enabled1');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="typo-title3 font-bold text-text-strong mb-2">Tabs</h1>
          <p className="typo-body1 text-text-secondary">DS_2 탭 컴포넌트 프리뷰</p>
        </div>

        {/* Primary — 기본 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary (기본)</h2>
          <Tabs items={BASIC_ITEMS} activeKey={basicKey} onChange={setBasicKey} />
          <TabPanel id="home" activeKey={basicKey}>
            <div className="rounded-xl bg-surface p-4 typo-body1 text-text-primary shadow-sm">
              홈 탭 콘텐츠입니다.
            </div>
          </TabPanel>
          <TabPanel id="search" activeKey={basicKey}>
            <div className="rounded-xl bg-surface p-4 typo-body1 text-text-primary shadow-sm">
              검색 탭 콘텐츠입니다.
            </div>
          </TabPanel>
          <TabPanel id="profile" activeKey={basicKey}>
            <div className="rounded-xl bg-surface p-4 typo-body1 text-text-primary shadow-sm">
              프로필 탭 콘텐츠입니다.
            </div>
          </TabPanel>
        </section>

        {/* Primary — fullWidth */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary — fullWidth</h2>
          <Tabs
            items={BASIC_ITEMS}
            activeKey={fullWidthKey}
            onChange={setFullWidthKey}
            fullWidth
          />
        </section>

        {/* Primary — scrollable */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary — scrollable</h2>
          <Tabs
            items={SCROLL_ITEMS}
            activeKey={scrollKey}
            onChange={setScrollKey}
            scrollable
          />
        </section>

        {/* Primary — 아이콘 + sm 크기 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary — 아이콘 + sm 크기</h2>
          <Tabs
            items={ICON_ITEMS}
            activeKey={iconKey}
            onChange={setIconKey}
            size="sm"
          />
        </section>

        {/* Primary — 배지 */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary — 배지</h2>
          <Tabs
            items={BADGE_ITEMS}
            activeKey={badgeKey}
            onChange={setBadgeKey}
            fullWidth
          />
        </section>

        {/* Primary — disabled */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Primary — disabled 탭</h2>
          <Tabs
            items={DISABLED_ITEMS}
            activeKey={disabledKey}
            onChange={setDisabledKey}
            fullWidth
          />
        </section>

        {/* Size variants */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Size — lg</h2>
          <Tabs items={BASIC_ITEMS} activeKey={sizeLgKey} onChange={setSizeLgKey} size="lg" />
          <h2 className="typo-label1 font-semibold text-text-primary mt-4">Size — sm</h2>
          <Tabs items={BASIC_ITEMS} activeKey={sizeSmKey} onChange={setSizeSmKey} size="sm" />
        </section>

        {/* Secondary */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Secondary (기본)</h2>
          <Tabs
            items={BASIC_ITEMS}
            activeKey={secKey}
            onChange={setSecKey}
            variant="secondary"
          />
        </section>

        {/* Secondary — fullWidth */}
        <section className="space-y-3">
          <h2 className="typo-label1 font-semibold text-text-primary">Secondary — fullWidth + 아이콘</h2>
          <Tabs
            items={ICON_ITEMS}
            activeKey={secFwKey}
            onChange={setSecFwKey}
            variant="secondary"
            fullWidth
          />
        </section>
      </div>
    </div>
  );
}
