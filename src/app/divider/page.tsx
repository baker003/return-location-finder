import { Divider } from '@/components/Divider';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="typo-headline1 font-semibold text-text-strong mb-6">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="typo-caption1 text-text-tertiary mb-2">{label}</p>
      {children}
    </div>
  );
}

export default function DividerPage() {
  return (
    <main className="min-h-screen bg-bg-secondary p-8">
      <h1 className="typo-title3 font-bold text-text-strong mb-10">Divider</h1>

      <Section title="Horizontal — Variant">
        <DemoRow label="full (default)">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider variant="full" />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>

        <DemoRow label="inset (16px)">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider variant="inset" inset={16} />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>

        <DemoRow label="inset (48px)">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider variant="inset" inset={48} />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>

        <DemoRow label="middle (16px)">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider variant="middle" inset={16} />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>
      </Section>

      <Section title="Strength">
        <DemoRow label="regular (기본)">
          <div className="bg-surface rounded-xl p-4">
            <Divider strength="regular" />
          </div>
        </DemoRow>

        <DemoRow label="weak">
          <div className="bg-surface rounded-xl p-4">
            <Divider strength="weak" />
          </div>
        </DemoRow>
      </Section>

      <Section title="Vertical">
        <DemoRow label="vertical — regular">
          <div className="bg-surface rounded-xl p-4 flex items-stretch gap-4 h-16">
            <span className="typo-body1 text-text-primary flex items-center">항목 A</span>
            <Divider orientation="vertical" strength="regular" />
            <span className="typo-body1 text-text-primary flex items-center">항목 B</span>
            <Divider orientation="vertical" strength="regular" />
            <span className="typo-body1 text-text-primary flex items-center">항목 C</span>
          </div>
        </DemoRow>

        <DemoRow label="vertical — weak">
          <div className="bg-surface rounded-xl p-4 flex items-stretch gap-4 h-16">
            <span className="typo-body1 text-text-primary flex items-center">항목 A</span>
            <Divider orientation="vertical" strength="weak" />
            <span className="typo-body1 text-text-primary flex items-center">항목 B</span>
          </div>
        </DemoRow>
      </Section>

      <Section title="Text Divider (children)">
        <DemoRow label="텍스트 divider — regular">
          <div className="bg-surface rounded-xl p-4">
            <Divider strength="regular">또는</Divider>
          </div>
        </DemoRow>

        <DemoRow label="텍스트 divider — weak">
          <div className="bg-surface rounded-xl p-4">
            <Divider strength="weak">OR</Divider>
          </div>
        </DemoRow>
      </Section>

      <Section title="Decorative (aria-hidden)">
        <DemoRow label="decorative=true — 보조 기술에서 무시됨">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">장식용 구분선</p>
            <Divider decorative />
            <p className="typo-body1 text-text-primary mt-3">하단 내용</p>
          </div>
        </DemoRow>
      </Section>
    </main>
  );
}
