'use client';

import { FAB } from '@/components/FAB';

/* ── Demo icons ── */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeLinecap="round" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="typo-headline1 font-bold text-text-strong mb-6 border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="typo-label1 text-text-tertiary mb-3">{label}</p>
      <div className="flex items-center gap-6 flex-wrap">{children}</div>
    </div>
  );
}

export default function FABPreviewPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <h1 className="typo-title2 font-bold text-text-strong mb-2">FAB</h1>
      <p className="typo-body1 text-text-secondary mb-10">
        Floating Action Button — primary / surface / secondary variants, three sizes, extended mode, disabled state.
      </p>

      {/* 1. Size × primary */}
      <Section title="Size (variant=primary)">
        <Row label="small (40×40)">
          <FAB
            icon={<PlusIcon />}
            size="small"
            variant="primary"
            aria-label="추가"
          />
        </Row>
        <Row label="medium (56×56) — default">
          <FAB
            icon={<PlusIcon />}
            size="medium"
            variant="primary"
            aria-label="추가"
          />
        </Row>
        <Row label="large (96×96)">
          <FAB
            icon={<PlusIcon />}
            size="large"
            variant="primary"
            aria-label="추가"
          />
        </Row>
      </Section>

      {/* 2. Variant × medium */}
      <Section title="Variant (size=medium)">
        <Row label="primary — bg-primary-strong, text-on-primary">
          <FAB
            icon={<PlusIcon />}
            size="medium"
            variant="primary"
            aria-label="추가"
          />
        </Row>
        <Row label="surface — bg-surface, text-primary-regular, shadow-lg">
          <FAB
            icon={<EditIcon />}
            size="medium"
            variant="surface"
            aria-label="편집"
          />
        </Row>
        <Row label="secondary — bg-gray-100, text-text-primary">
          <FAB
            icon={<ShareIcon />}
            size="medium"
            variant="secondary"
            aria-label="공유"
          />
        </Row>
      </Section>

      {/* 3. Extended FAB */}
      <Section title="Extended FAB (label prop)">
        <Row label="primary, label=새 항목 추가">
          <FAB
            icon={<PlusIcon />}
            label="새 항목 추가"
            variant="primary"
          />
        </Row>
        <Row label="surface, label=편집하기">
          <FAB
            icon={<EditIcon />}
            label="편집하기"
            variant="surface"
          />
        </Row>
        <Row label="secondary, label=공유하기">
          <FAB
            icon={<ShareIcon />}
            label="공유하기"
            variant="secondary"
          />
        </Row>
      </Section>

      {/* 4. Disabled */}
      <Section title="Disabled">
        <Row label="disabled — opacity-40, pointer-events-none">
          <FAB
            icon={<PlusIcon />}
            size="small"
            variant="primary"
            disabled
            aria-label="추가 (비활성)"
          />
          <FAB
            icon={<PlusIcon />}
            size="medium"
            variant="primary"
            disabled
            aria-label="추가 (비활성)"
          />
          <FAB
            icon={<PlusIcon />}
            size="large"
            variant="primary"
            disabled
            aria-label="추가 (비활성)"
          />
          <FAB
            icon={<PlusIcon />}
            label="비활성 Extended"
            variant="primary"
            disabled
          />
        </Row>
      </Section>

      {/* 5. Inline placement (position prop omitted) */}
      <Section title="Inline Placement (position prop 없음 → relative)">
        <Row label="인라인 배치 — 레이아웃 흐름에 따름">
          <div className="bg-surface border border-border rounded-xl p-6 flex items-center gap-4">
            <span className="typo-body1 text-text-secondary">콘텐츠 영역</span>
            <FAB
              icon={<PlusIcon />}
              size="medium"
              variant="primary"
              aria-label="추가"
            />
            <FAB
              icon={<EditIcon />}
              size="medium"
              variant="surface"
              aria-label="편집"
            />
          </div>
        </Row>
      </Section>

      {/* 6. Fixed position demo */}
      <Section title="Fixed Position Demo">
        <p className="typo-body2 text-text-secondary mb-4">
          아래 FAB는 <code className="typo-label2 bg-gray-200 px-1.5 py-0.5 rounded">position=&quot;bottom-right&quot;</code>로 고정 배치됩니다. 스크롤해도 화면 우하단에 고정됩니다.
        </p>
        <div className="bg-gray-100 rounded-xl p-6">
          <p className="typo-body1 text-text-tertiary">
            position=&quot;bottom-right&quot; → <code className="typo-label2 bg-gray-200 px-1.5 py-0.5 rounded">fixed z-40 bottom-4 right-4</code><br />
            position=&quot;bottom-left&quot; → <code className="typo-label2 bg-gray-200 px-1.5 py-0.5 rounded">fixed z-40 bottom-4 left-4</code><br />
            position=&quot;bottom-center&quot; → <code className="typo-label2 bg-gray-200 px-1.5 py-0.5 rounded">fixed z-40 bottom-4 left-1/2 -translate-x-1/2</code>
          </p>
        </div>
      </Section>

      {/* Fixed FAB — actually rendered at bottom-right */}
      <FAB
        icon={<PlusIcon />}
        label="새 항목"
        variant="primary"
        position="bottom-right"
        aria-label="새 항목 추가"
        onClick={() => alert('FAB 클릭!')}
      />
    </div>
  );
}
