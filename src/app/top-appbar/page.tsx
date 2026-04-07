'use client';

import { useState } from 'react';
import {
  TopAppbar,
  LeadingButton,
  TrailingButton,
  TopAppbarInstant,
} from '@/components/TopAppbar';

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[18px] leading-[26px] font-semibold text-text-strong">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Label({ text }: { text: string }) {
  return <p className="text-[12px] leading-[18px] font-medium text-text-secondary">{text}</p>;
}

export default function TopAppbarPage() {
  const [progress, setProgress] = useState(60);

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <h1 className="text-[24px] leading-[34px] font-bold text-text-strong">
        Top Appbar Preview
      </h1>

      {/* Theme comparison */}
      <Section title="Theme">
        <Label text="white" />
        <TopAppbar
          theme="white"
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="White Theme" />}
          trailing={
            <TrailingButton
              variant="iconButtons"
              buttons={[{ icon: <StarIcon />, 'aria-label': '즐겨찾기' }]}
            />
          }
        />

        <Label text="transparent" />
        <div className="bg-gray-200 rounded-lg">
          <TopAppbar
            theme="transparent"
            leading={<LeadingButton variant="back" />}
            instant={<TopAppbarInstant variant="heading" title="Transparent Theme" />}
            trailing={
              <TrailingButton
                variant="iconButtons"
                buttons={[{ icon: <StarIcon />, 'aria-label': '즐겨찾기' }]}
              />
            }
          />
        </div>

        <Label text="dark" />
        <TopAppbar
          theme="dark"
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="Dark Theme" />}
          trailing={
            <TrailingButton
              variant="iconButtons"
              buttons={[{ icon: <StarIcon />, 'aria-label': '즐겨찾기' }]}
            />
          }
        />
      </Section>

      {/* Leading variants */}
      <Section title="Leading Variants">
        <Label text="back" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="label" title="뒤로 가기" />}
        />

        <Label text="close" />
        <TopAppbar
          leading={<LeadingButton variant="close" />}
          instant={<TopAppbarInstant variant="label" title="닫기" />}
        />

        <Label text="home" />
        <TopAppbar
          leading={<LeadingButton variant="home" />}
          instant={<TopAppbarInstant variant="label" title="홈으로" />}
        />

        <Label text="none (no leading)" />
        <TopAppbar
          instant={<TopAppbarInstant variant="heading" title="Leading 없음" />}
        />
      </Section>

      {/* Instant variants */}
      <Section title="Instant Variants">
        <Label text="heading" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="페이지 타이틀" />}
        />

        <Label text="label" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="label" title="레이블 텍스트" />}
        />

        <Label text="textButton" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={
            <TopAppbarInstant
              variant="textButton"
              label="서울특별시"
              onClick={() => alert('textButton clicked')}
            />
          }
        />

        <Label text="input" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={
            <TopAppbarInstant
              variant="input"
              placeholder="검색어를 입력하세요"
            />
          }
        />

        <Label text="input (dark)" />
        <TopAppbar
          theme="dark"
          leading={<LeadingButton variant="back" />}
          instant={
            <TopAppbarInstant
              variant="input"
              placeholder="검색어를 입력하세요"
            />
          }
        />

        <Label text="image" />
        <TopAppbar
          instant={
            <TopAppbarInstant
              variant="image"
              src="https://placehold.co/120x32/0078FF/FFFFFF?text=SOCAR"
              alt="SOCAR logo"
              height={32}
            />
          }
        />
      </Section>

      {/* Trailing variants */}
      <Section title="Trailing Variants">
        <Label text="iconButtons (1 button)" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="상세 페이지" />}
          trailing={
            <TrailingButton
              variant="iconButtons"
              buttons={[{ icon: <StarIcon />, 'aria-label': '즐겨찾기' }]}
            />
          }
        />

        <Label text="iconButtons (3 buttons)" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="상세 페이지" />}
          trailing={
            <TrailingButton
              variant="iconButtons"
              buttons={[
                { icon: <StarIcon />, 'aria-label': '즐겨찾기' },
                { icon: <ShareIcon />, 'aria-label': '공유' },
                { icon: <MoreIcon />, 'aria-label': '더보기' },
              ]}
            />
          }
        />

        <Label text="textButton" />
        <TopAppbar
          leading={<LeadingButton variant="close" />}
          instant={<TopAppbarInstant variant="heading" title="예약 확인" />}
          trailing={
            <TrailingButton
              variant="textButton"
              label="완료"
              onClick={() => alert('완료 clicked')}
            />
          }
        />

        <Label text="none (no trailing)" />
        <TopAppbar
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="Trailing 없음" />}
        />
      </Section>

      {/* Loading states */}
      <Section title="Loading States">
        <Label text={`determinate (${progress}%)`} />
        <TopAppbar
          loading
          progress={progress}
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="로딩 중..." />}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full"
        />

        <Label text="indeterminate" />
        <TopAppbar
          loading
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="로딩 중..." />}
        />

        <Label text="dark + indeterminate" />
        <TopAppbar
          theme="dark"
          loading
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="로딩 중..." />}
        />
      </Section>

      {/* Full combination: dark + trailing icons + loading */}
      <Section title="Full Combination">
        <Label text="dark + back + heading + 3 icon buttons + loading" />
        <TopAppbar
          theme="dark"
          loading
          progress={75}
          leading={<LeadingButton variant="back" />}
          instant={<TopAppbarInstant variant="heading" title="운행 화면" />}
          trailing={
            <TrailingButton
              variant="iconButtons"
              buttons={[
                { icon: <StarIcon />, 'aria-label': '즐겨찾기' },
                { icon: <ShareIcon />, 'aria-label': '공유' },
                { icon: <MoreIcon />, 'aria-label': '더보기' },
              ]}
            />
          }
        />

        <Label text="dark + close + textButton trailing" />
        <TopAppbar
          theme="dark"
          leading={<LeadingButton variant="close" />}
          instant={<TopAppbarInstant variant="label" title="설정" />}
          trailing={
            <TrailingButton
              variant="textButton"
              label="저장"
            />
          }
        />
      </Section>
    </div>
  );
}
