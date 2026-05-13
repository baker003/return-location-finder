'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';

export default function SearchBarPage() {
  const [defaultValue, setDefaultValue] = useState('');
  const [alwaysValue, setAlwaysValue] = useState('');
  const [neverValue, setNeverValue] = useState('검색어 예시');
  const [disabledValue] = useState('비활성 상태');
  const [lastSearch, setLastSearch] = useState('');

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <h1 className="typo-title3 font-bold text-text-strong mb-2">Search Bar</h1>
        <p className="typo-body1 text-text-secondary mb-8">
          Enter 키로 검색, X 버튼으로 초기화, 취소 버튼으로 포커스 해제됩니다.
        </p>

        <div className="flex flex-col gap-8">
          {/* Default — showCancel='focus' */}
          <section>
            <h2 className="typo-label2 font-semibold text-text-tertiary mb-2 uppercase tracking-wide">
              Default (showCancel: focus)
            </h2>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <SearchBar
                value={defaultValue}
                onChange={setDefaultValue}
                onSearch={(v) => setLastSearch(v)}
                onCancel={() => setDefaultValue('')}
                placeholder="검색어를 입력하세요"
                showCancel="focus"
              />
              {defaultValue && (
                <p className="typo-caption1 text-text-tertiary mt-2">
                  입력값: <span className="text-text-primary font-medium">{defaultValue}</span>
                </p>
              )}
            </div>
          </section>

          {/* Always show cancel */}
          <section>
            <h2 className="typo-label2 font-semibold text-text-tertiary mb-2 uppercase tracking-wide">
              Always (showCancel: always)
            </h2>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <SearchBar
                value={alwaysValue}
                onChange={setAlwaysValue}
                onSearch={(v) => setLastSearch(v)}
                onCancel={() => setAlwaysValue('')}
                placeholder="항상 취소 버튼이 보입니다"
                showCancel="always"
                cancelLabel="취소"
              />
            </div>
          </section>

          {/* Never show cancel — with value pre-filled */}
          <section>
            <h2 className="typo-label2 font-semibold text-text-tertiary mb-2 uppercase tracking-wide">
              값 있음 상태 (showCancel: never)
            </h2>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <SearchBar
                value={neverValue}
                onChange={setNeverValue}
                onSearch={(v) => setLastSearch(v)}
                placeholder="검색"
                showCancel="never"
              />
            </div>
          </section>

          {/* Disabled */}
          <section>
            <h2 className="typo-label2 font-semibold text-text-tertiary mb-2 uppercase tracking-wide">
              Disabled
            </h2>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <SearchBar
                value={disabledValue}
                onChange={() => {}}
                placeholder="검색"
                disabled
                showCancel="always"
              />
            </div>
          </section>

          {/* Search result display */}
          {lastSearch && (
            <div className="p-4 bg-surface rounded-xl border border-primary-regular">
              <p className="typo-caption1 text-text-tertiary mb-1">마지막 검색어</p>
              <p className="typo-label1 font-semibold text-primary-regular">{lastSearch}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
