import { Skeleton } from '@/components/Skeleton';

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
      <div className="bg-surface rounded-xl p-4">{children}</div>
    </div>
  );
}

export default function SkeletonPage() {
  return (
    <main className="min-h-screen bg-bg-secondary p-8">
      <h1 className="typo-title3 font-bold text-text-strong mb-10">Skeleton</h1>

      <Section title="Text">
        <DemoRow label="단일 줄 (기본)">
          <Skeleton variant="text" width="60%" />
        </DemoRow>

        <DemoRow label="3줄 (lines=3, lastLineWidthRatio=0.6)">
          <Skeleton variant="text" lines={3} lastLineWidthRatio={0.6} />
        </DemoRow>

        <DemoRow label="5줄 (lines=5, lastLineWidthRatio=0.4)">
          <Skeleton variant="text" lines={5} lastLineWidthRatio={0.4} />
        </DemoRow>
      </Section>

      <Section title="Circular (아바타)">
        <DemoRow label="small (32px)">
          <Skeleton variant="circular" width={32} height={32} />
        </DemoRow>

        <DemoRow label="medium (48px)">
          <Skeleton variant="circular" width={48} height={48} />
        </DemoRow>

        <DemoRow label="large (80px)">
          <Skeleton variant="circular" width={80} height={80} />
        </DemoRow>
      </Section>

      <Section title="Rectangular">
        <DemoRow label="rectangular — 카드 썸네일">
          <Skeleton variant="rectangular" width="100%" height={160} />
        </DemoRow>
      </Section>

      <Section title="Rounded">
        <DemoRow label="rounded (border-radius 8px)">
          <Skeleton variant="rounded" width="100%" height={120} />
        </DemoRow>

        <DemoRow label="rounded — 버튼 스켈레톤">
          <div className="flex gap-2">
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={100} height={36} />
          </div>
        </DemoRow>
      </Section>

      <Section title="카드 레이아웃 조합 예시">
        <DemoRow label="아바타 + 텍스트 조합">
          <div className="flex items-start gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="text" width="40%" className="mb-2" />
              <Skeleton variant="text" lines={2} lastLineWidthRatio={0.7} />
            </div>
          </div>
        </DemoRow>

        <DemoRow label="카드 전체 스켈레톤">
          <div className="flex flex-col gap-3">
            <Skeleton variant="rounded" width="100%" height={180} />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" lines={2} lastLineWidthRatio={0.5} />
          </div>
        </DemoRow>
      </Section>

      <Section title="animate=false (정적 상태)">
        <DemoRow label="shimmer 애니메이션 없음">
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width="80%" animate={false} />
            <Skeleton variant="text" width="60%" animate={false} />
            <Skeleton variant="text" width="40%" animate={false} />
          </div>
        </DemoRow>
      </Section>
    </main>
  );
}
