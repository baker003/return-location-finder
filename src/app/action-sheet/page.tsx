'use client';

import React, { useState } from 'react';
import { ActionSheet } from '@/components/ActionSheet';

export default function ActionSheetPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [titledOpen, setTitledOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const basicItems = [
    {
      label: '사진 찍기',
      onClick: () => setLastAction('사진 찍기'),
    },
    {
      label: '앨범에서 선택',
      onClick: () => setLastAction('앨범에서 선택'),
    },
    {
      label: '파일 선택',
      onClick: () => setLastAction('파일 선택'),
    },
  ];

  const destructiveItems = [
    {
      label: '공유하기',
      onClick: () => setLastAction('공유하기'),
    },
    {
      label: '즐겨찾기 추가',
      onClick: () => setLastAction('즐겨찾기 추가'),
    },
    {
      label: '삭제',
      variant: 'destructive' as const,
      onClick: () => setLastAction('삭제'),
    },
    {
      label: '사용 불가 기능',
      variant: 'disabled' as const,
    },
  ];

  const titledItems = [
    {
      label: '예약 변경',
      onClick: () => setLastAction('예약 변경'),
    },
    {
      label: '예약 취소',
      variant: 'destructive' as const,
      onClick: () => setLastAction('예약 취소'),
    },
  ];

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="typo-title3 font-bold text-text-strong">Action Sheet</h1>

        {lastAction && (
          <div className="bg-surface rounded-xl px-4 py-3 border border-border">
            <p className="typo-label1 text-text-primary">
              선택된 액션: <span className="font-semibold text-primary-regular">{lastAction}</span>
            </p>
          </div>
        )}

        {/* Basic */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">기본 Action Sheet</h2>
          <button
            className="w-full py-3.5 rounded-xl bg-primary-regular text-on-primary typo-body1 font-semibold"
            onClick={() => setBasicOpen(true)}
          >
            기본 Action Sheet 열기
          </button>
          <ActionSheet
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            items={basicItems}
          />
        </section>

        {/* Destructive */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Destructive + Disabled 포함</h2>
          <button
            className="w-full py-3.5 rounded-xl bg-primary-regular text-on-primary typo-body1 font-semibold"
            onClick={() => setDestructiveOpen(true)}
          >
            Destructive Action Sheet 열기
          </button>
          <ActionSheet
            open={destructiveOpen}
            onClose={() => setDestructiveOpen(false)}
            items={destructiveItems}
            cancelLabel="닫기"
          />
        </section>

        {/* With title and description */}
        <section className="space-y-3">
          <h2 className="typo-headline1 font-semibold text-text-primary">Title + Description 포함</h2>
          <button
            className="w-full py-3.5 rounded-xl bg-primary-regular text-on-primary typo-body1 font-semibold"
            onClick={() => setTitledOpen(true)}
          >
            Title + Description Action Sheet 열기
          </button>
          <ActionSheet
            open={titledOpen}
            onClose={() => setTitledOpen(false)}
            title="예약 관리"
            description="예약을 변경하거나 취소할 수 있습니다"
            items={titledItems}
          />
        </section>
      </div>
    </main>
  );
}
