import { Badge } from '@/components/Badge';

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
      <p className="typo-caption1 text-text-tertiary mb-3">{label}</p>
      <div className="bg-surface rounded-xl p-6 flex flex-wrap gap-8 items-center">
        {children}
      </div>
    </div>
  );
}

// 배지를 붙일 대상 박스
function AnchorBox({ label }: { label?: string }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center typo-caption2 text-text-secondary">
      {label ?? ''}
    </div>
  );
}

// 아이콘 버튼 모양의 대상
function IconBox() {
  return (
    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2a6 6 0 0 1 6 6c0 3.5-1.5 5.5-3 7H7C5.5 13.5 4 11.5 4 8a6 6 0 0 1 6-6Zm0 15a1 1 0 0 0 0 2 1 1 0 0 0 0-2Z"
          fill="currentColor"
          className="text-text-tertiary"
        />
      </svg>
    </div>
  );
}

export default function BadgePage() {
  return (
    <main className="min-h-screen bg-bg-secondary p-8">
      <h1 className="typo-title3 font-bold text-text-strong mb-10">Badge</h1>

      <Section title="Variant">
        <DemoRow label="dot">
          <Badge variant="dot" color="error">
            <IconBox />
          </Badge>
          <Badge variant="dot" color="primary">
            <IconBox />
          </Badge>
          <Badge variant="dot" color="caution">
            <IconBox />
          </Badge>
        </DemoRow>

        <DemoRow label="count">
          <Badge variant="count" count={1} color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="count" count={9} color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="count" count={99} color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="count" count={100} max={99} color="error">
            <AnchorBox label="99+" />
          </Badge>
          <Badge variant="count" count={999} max={99} color="primary">
            <AnchorBox />
          </Badge>
        </DemoRow>

        <DemoRow label="label">
          <Badge variant="label" label="NEW" color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="label" label="HOT" color="primary">
            <AnchorBox />
          </Badge>
          <Badge variant="label" label="SALE" color="caution">
            <AnchorBox />
          </Badge>
        </DemoRow>
      </Section>

      <Section title="Color">
        <DemoRow label="primary / error / caution — dot">
          <Badge variant="dot" color="primary">
            <AnchorBox />
          </Badge>
          <Badge variant="dot" color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="dot" color="caution">
            <AnchorBox />
          </Badge>
        </DemoRow>

        <DemoRow label="primary / error / caution — count">
          <Badge variant="count" count={5} color="primary">
            <AnchorBox />
          </Badge>
          <Badge variant="count" count={5} color="error">
            <AnchorBox />
          </Badge>
          <Badge variant="count" count={5} color="caution">
            <AnchorBox />
          </Badge>
        </DemoRow>
      </Section>

      <Section title="anchorOrigin">
        <DemoRow label="top-right (기본) / top-left / bottom-right / bottom-left">
          <Badge
            variant="count"
            count={3}
            color="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <AnchorBox label="TR" />
          </Badge>
          <Badge
            variant="count"
            count={3}
            color="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <AnchorBox label="TL" />
          </Badge>
          <Badge
            variant="count"
            count={3}
            color="error"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <AnchorBox label="BR" />
          </Badge>
          <Badge
            variant="count"
            count={3}
            color="error"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <AnchorBox label="BL" />
          </Badge>
        </DemoRow>
      </Section>

      <Section title="children 없음 — standalone">
        <DemoRow label="children 없이 단독 사용">
          <Badge variant="dot" color="error" />
          <Badge variant="count" count={7} color="error" />
          <Badge variant="count" count={42} color="primary" />
          <Badge variant="label" label="NEW" color="error" />
          <Badge variant="label" label="BETA" color="primary" />
        </DemoRow>
      </Section>

      <Section title="hidden">
        <DemoRow label="hidden=true — 배지 숨김">
          <Badge variant="dot" color="error" hidden>
            <AnchorBox label="숨김" />
          </Badge>
          <Badge variant="count" count={5} color="error" hidden={false}>
            <AnchorBox label="표시" />
          </Badge>
        </DemoRow>

        <DemoRow label="count=0 — 자동 숨김">
          <Badge variant="count" count={0} color="error">
            <AnchorBox label="0" />
          </Badge>
          <Badge variant="count" count={1} color="error">
            <AnchorBox label="1" />
          </Badge>
        </DemoRow>
      </Section>
    </main>
  );
}
