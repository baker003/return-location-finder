'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/DatePicker';
import { formatDate } from '@/components/DatePicker/utils';

export default function DatePickerPage() {
  const today = new Date();

  // Single mode
  const [singleDate, setSingleDate] = useState<Date | null>(null);

  // Range mode
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([null, null]);

  // Inline single
  const [inlineDate, setInlineDate] = useState<Date | null>(new Date());

  // minDate / maxDate
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

  // Disabled dates
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="typo-title3 font-bold text-text-strong mb-2">Date Picker</h1>
          <p className="typo-body1 text-text-secondary">
            DS_2 DatePicker 컴포넌트 — single/range mode, inline, minDate/maxDate, disabled dates
          </p>
        </div>

        {/* Single mode */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Single Mode</h2>
          <p className="typo-label1 text-text-tertiary mb-4">단일 날짜 선택</p>
          <div className="bg-surface rounded-2xl p-6 space-y-4">
            <DatePicker
              mode="single"
              value={singleDate}
              onChange={(d) => setSingleDate(d)}
              placeholder="날짜를 선택하세요"
              locale="ko-KR"
            />
            {singleDate && (
              <p className="typo-label1 text-text-secondary">
                선택된 날짜:{' '}
                <span className="text-primary-regular font-semibold">
                  {formatDate(singleDate, 'ko-KR')}
                </span>
              </p>
            )}
          </div>
        </section>

        {/* Range mode */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Range Mode</h2>
          <p className="typo-label1 text-text-tertiary mb-4">시작일 / 종료일 범위 선택</p>
          <div className="bg-surface rounded-2xl p-6 space-y-4">
            <DatePicker
              mode="range"
              rangeValue={rangeValue}
              onRangeChange={(r) => setRangeValue(r)}
              placeholder="기간을 선택하세요"
              locale="ko-KR"
            />
            {(rangeValue[0] || rangeValue[1]) && (
              <div className="typo-label1 text-text-secondary space-y-1">
                <p>
                  시작:{' '}
                  <span className="text-primary-regular font-semibold">
                    {rangeValue[0] ? formatDate(rangeValue[0], 'ko-KR') : '–'}
                  </span>
                </p>
                <p>
                  종료:{' '}
                  <span className="text-primary-regular font-semibold">
                    {rangeValue[1] ? formatDate(rangeValue[1], 'ko-KR') : '–'}
                  </span>
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setRangeValue([null, null])}
              className="typo-label1 text-text-tertiary hover:text-text-primary transition-colors"
            >
              초기화
            </button>
          </div>
        </section>

        {/* Inline */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Inline 캘린더</h2>
          <p className="typo-label1 text-text-tertiary mb-4">
            <code className="bg-background px-1.5 py-0.5 rounded">inline=true</code> — 항상 노출, 팝업 없음
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            <DatePicker
              mode="single"
              value={inlineDate}
              onChange={(d) => setInlineDate(d)}
              inline
              locale="ko-KR"
            />
            {inlineDate && (
              <div className="bg-surface rounded-2xl p-4 self-start">
                <p className="typo-label2 text-text-tertiary mb-1">선택된 날짜</p>
                <p className="typo-headline2 font-semibold text-primary-regular">
                  {formatDate(inlineDate, 'ko-KR')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* minDate / maxDate */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">minDate / maxDate 제약</h2>
          <p className="typo-label1 text-text-tertiary mb-4">
            오늘 -2일 ~ 오늘 +14일 범위만 선택 가능
          </p>
          <div className="bg-surface rounded-2xl p-6 space-y-4">
            <DatePicker
              mode="single"
              minDate={minDate}
              maxDate={maxDate}
              placeholder="제약된 날짜 선택"
              locale="ko-KR"
            />
            <p className="typo-caption1 text-text-tertiary">
              선택 가능:{' '}
              {formatDate(minDate, 'ko-KR')} ~ {formatDate(maxDate, 'ko-KR')}
            </p>
          </div>
        </section>

        {/* Disabled dates */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Disabled Dates</h2>
          <p className="typo-label1 text-text-tertiary mb-4">
            특정 날짜 비활성 (+3일, +7일, +10일)
          </p>
          <div className="bg-surface rounded-2xl p-6 space-y-4">
            <DatePicker
              mode="single"
              disabledDates={disabledDates}
              placeholder="날짜를 선택하세요 (일부 비활성)"
              locale="ko-KR"
            />
            <p className="typo-caption1 text-text-tertiary">
              비활성 날짜:{' '}
              {disabledDates.map((d) => formatDate(d, 'ko-KR')).join(', ')}
            </p>
          </div>
        </section>

        {/* Disabled picker */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Disabled</h2>
          <div className="bg-surface rounded-2xl p-6">
            <DatePicker
              mode="single"
              value={new Date()}
              placeholder="비활성 상태"
              disabled
              locale="ko-KR"
            />
          </div>
        </section>

        {/* Inline Range */}
        <section>
          <h2 className="typo-headline2 font-semibold text-text-primary mb-2">Inline Range 캘린더</h2>
          <p className="typo-label1 text-text-tertiary mb-4">인라인 범위 선택</p>
          <InlineRangeDemo />
        </section>
      </div>
    </div>
  );
}

function InlineRangeDemo() {
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([null, null]);
  const { formatDate: fmt } = { formatDate };

  return (
    <div className="flex flex-wrap gap-6 items-start">
      <DatePicker
        mode="range"
        rangeValue={rangeValue}
        onRangeChange={(r) => setRangeValue(r)}
        inline
        locale="ko-KR"
      />
      <div className="bg-surface rounded-2xl p-4 self-start space-y-2">
        <p className="typo-label2 text-text-tertiary">선택 범위</p>
        <p className="typo-label1 text-text-primary">
          시작: <span className="text-primary-regular font-semibold">
            {rangeValue[0] ? fmt(rangeValue[0], 'ko-KR') : '–'}
          </span>
        </p>
        <p className="typo-label1 text-text-primary">
          종료: <span className="text-primary-regular font-semibold">
            {rangeValue[1] ? fmt(rangeValue[1], 'ko-KR') : '–'}
          </span>
        </p>
        {(rangeValue[0] || rangeValue[1]) && (
          <button
            type="button"
            onClick={() => setRangeValue([null, null])}
            className="typo-caption1 text-text-tertiary hover:text-text-primary transition-colors mt-2"
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
}
