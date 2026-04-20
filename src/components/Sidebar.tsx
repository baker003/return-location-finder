'use client';

import { useState, useEffect } from 'react';

const menuItems = [
  {
    group: '파운데이션',
    items: [
      { label: '컬러 팔레트', id: 'color-palette' },
      { label: '시맨틱 토큰', id: 'semantic-tokens' },
      { label: '타이포그래피', id: 'typography' },
      { label: '접근성 대비', id: 'accessibility' },
    ],
  },
  {
    group: '컴포넌트',
    items: [
      { label: 'CTA 버튼', id: 'cta-button' },
      { label: '텍스트 버튼', id: 'text-button' },
      { label: 'Chip', id: 'chip' },
      { label: 'Tag', id: 'tag' },
      { label: 'Top Appbar', id: 'top-appbar' },
    ],
  },
  {
    group: '아이콘',
    items: [
      { label: 'Line', id: 'icons-line' },
      { label: 'Fill', id: 'icons-fill' },
      { label: 'SF Symbols 기능', id: 'icons-sf-symbols' },
    ],
  },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = menuItems.flatMap((g) => g.items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick the one closest to the top
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <aside className="fixed left-0 top-0 w-[240px] h-full bg-surface border-r border-border overflow-y-auto z-50 py-6 px-4">
      <div className="mb-6 px-2">
        <h1 className="typo-heading2 font-bold text-text-strong">DS_2</h1>
        <p className="typo-caption1 text-text-secondary mt-1">디자인 시스템</p>
      </div>

      <nav className="flex flex-col gap-6">
        {menuItems.map((group) => (
          <div key={group.group}>
            <h2 className="typo-caption1 font-semibold text-text-disabled uppercase tracking-widest px-2 mb-2 select-none border-b border-border pb-2">
              {group.group}
            </h2>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-md typo-label2 transition-colors ${
                        isActive
                          ? 'bg-background text-primary-strong font-semibold'
                          : 'text-text-primary hover:text-primary-strong'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
