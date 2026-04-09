'use client';

import {
  ActionButton,
  TextButton,
  IconButton,
  LinkTextButton,
} from '@/components/Button';

/* Simple placeholder icon for demo */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const actionTypes = ['fill', 'outline', 'ghost'] as const;
const actionVariants = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const textVariants = ['primary', 'secondary', 'tertiary'] as const;
const iconTypes = ['fill', 'outline', 'ghost'] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text-strong mb-6 border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-text-secondary mb-3">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-text-strong mb-2">
        DS_2 -- Button 컴포넌트
      </h1>
      <p className="text-text-secondary mb-10">
        Button 컴포넌트 패밀리의 모든 variant / 사이즈 / 상태 조합입니다.
      </p>

      {/* ── ActionButton ── */}
      <Section title="1. ActionButton">
        {actionTypes.map((type) => (
          <div key={type} className="mb-8">
            <h3 className="text-base font-semibold text-text-primary mb-4 capitalize">
              타입: {type}
            </h3>
            {actionVariants.map((variant) => (
              <SubSection key={variant} title={`${type} / ${variant}`}>
                {sizes.map((size) => (
                  <ActionButton key={size} type={type} variant={variant} size={size}>
                    {size.toUpperCase()}
                  </ActionButton>
                ))}
              </SubSection>
            ))}
          </div>
        ))}

        <SubSection title="아이콘 포함">
          <ActionButton leftIcon={<PlusIcon />}>왼쪽 아이콘</ActionButton>
          <ActionButton rightIcon={<ChevronRight />}>오른쪽 아이콘</ActionButton>
          <ActionButton leftIcon={<PlusIcon />} rightIcon={<ChevronRight />}>
            양쪽 아이콘
          </ActionButton>
        </SubSection>

        <SubSection title="전체 너비">
          <div className="w-full">
            <ActionButton fullWidth>전체 너비 버튼</ActionButton>
          </div>
        </SubSection>

        <SubSection title="로딩 상태">
          {actionTypes.map((type) => (
            <ActionButton key={type} type={type} loading>
              로딩
            </ActionButton>
          ))}
        </SubSection>

        <SubSection title="비활성 상태">
          {actionTypes.map((type) =>
            actionVariants.map((variant) => (
              <ActionButton key={`${type}-${variant}`} type={type} variant={variant} disabled>
                비활성
              </ActionButton>
            )),
          )}
        </SubSection>
      </Section>

      {/* ── TextButton ── */}
      <Section title="2. TextButton">
        {textVariants.map((variant) => (
          <SubSection key={variant} title={`변형: ${variant}`}>
            {sizes.map((size) => (
              <TextButton key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </TextButton>
            ))}
          </SubSection>
        ))}

        <SubSection title="아이콘 포함">
          <TextButton leftIcon={<PlusIcon />}>왼쪽 아이콘</TextButton>
          <TextButton rightIcon={<ChevronRight />}>오른쪽 아이콘</TextButton>
        </SubSection>

        <SubSection title="비활성">
          {textVariants.map((variant) => (
            <TextButton key={variant} variant={variant} disabled>
              비활성 {variant}
            </TextButton>
          ))}
        </SubSection>
      </Section>

      {/* ── IconButton ── */}
      <Section title="3. IconButton">
        {iconTypes.map((type) => (
          <SubSection key={type} title={`Type: ${type}`}>
            {sizes.map((size) => (
              <IconButton
                key={size}
                type={type}
                size={size}
                icon={<CloseIcon />}
                aria-label={`닫기 (${size})`}
              />
            ))}
          </SubSection>
        ))}

        <SubSection title="원형">
          {sizes.map((size) => (
            <IconButton
              key={size}
              shape="circle"
              size={size}
              icon={<HeartIcon />}
              aria-label={`좋아요 (${size})`}
            />
          ))}
        </SubSection>

        <SubSection title="원형 + 채움">
          {sizes.map((size) => (
            <IconButton
              key={size}
              shape="circle"
              type="fill"
              size={size}
              icon={<HeartIcon />}
              aria-label={`좋아요 (${size})`}
            />
          ))}
        </SubSection>

        <SubSection title="비활성">
          {iconTypes.map((type) => (
            <IconButton
              key={type}
              type={type}
              disabled
              icon={<CloseIcon />}
              aria-label={`닫기 (비활성 ${type})`}
            />
          ))}
        </SubSection>
      </Section>

      {/* ── LinkTextButton ── */}
      <Section title="4. LinkTextButton">
        <SubSection title="사이즈">
          {sizes.map((size) => (
            <LinkTextButton key={size} size={size}>
              링크 {size.toUpperCase()}
            </LinkTextButton>
          ))}
        </SubSection>

        <SubSection title="앵커 태그 (<a>)">
          <LinkTextButton href="https://socar.kr">사이트 방문</LinkTextButton>
        </SubSection>

        <SubSection title="비활성">
          <LinkTextButton disabled>비활성 링크</LinkTextButton>
          <LinkTextButton href="https://socar.kr" disabled>
            비활성 앵커
          </LinkTextButton>
        </SubSection>
      </Section>
    </div>
  );
}
