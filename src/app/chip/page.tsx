'use client';

import { Chip, ChipGroup } from '@/components/Chip';
import type { ChipType, ChipSize } from '@/components/Chip';

/* ── 간단한 인라인 SVG 아이콘 ── */
function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── 섹션 래퍼 ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="typo-headline2 font-semibold text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="typo-label2 font-medium text-text-secondary">{title}</h3>
      {children}
    </div>
  );
}

const types: ChipType[] = ['outlined', 'filled'];
const sizes: ChipSize[] = ['lg', 'md', 'sm', 'xs'];

export default function ChipPage() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-10 max-w-3xl mx-auto">
      <h1 className="typo-title2 font-bold text-text-strong">
        Chip 컴포넌트 프리뷰
      </h1>

      {/* 1. Type x State 매트릭스 */}
      <Section title="1. 타입 x 상태">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              <Chip type={type} label="미선택" />
              <Chip type={type} label="선택됨" selected />
              <Chip type={type} label="비활성" disabled />
              <Chip type={type} label="선택됨+비활성" selected disabled />
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 2. Size 비교 */}
      <Section title="2. 사이즈">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              {sizes.map((size) => (
                <Chip
                  key={size}
                  type={type}
                  size={size}
                  label={`사이즈 ${size}`}
                  selected
                />
              ))}
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 3. 아이콘 조합 */}
      <Section title="3. 아이콘">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="앞쪽" leadingIcon={<StarIcon />} />
          <Chip label="뒤쪽" trailingIcon={<ChevronDownIcon />} />
          <Chip
            label="양쪽"
            leadingIcon={<StarIcon />}
            trailingIcon={<CloseIcon />}
          />
          <Chip
            label="앞쪽 숨김"
            leadingIcon={<StarIcon />}
            showLeadingIcon={false}
          />
          <Chip
            label="뒤쪽 숨김"
            trailingIcon={<ChevronDownIcon />}
            showTrailingIcon={false}
          />
        </div>
        <SubSection title="선택됨 + 아이콘">
          <div className="flex flex-wrap gap-3 items-center">
            <Chip
              label="아웃라인"
              type="outlined"
              selected
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
            <Chip
              label="채움"
              type="filled"
              selected
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
            <Chip
              label="비활성"
              type="filled"
              disabled
              leadingIcon={<StarIcon />}
              trailingIcon={<CloseIcon />}
            />
          </div>
        </SubSection>
      </Section>

      {/* 4. Icon sizes per chip size */}
      <Section title="4. Chip 사이즈별 아이콘 크기">
        <div className="flex flex-wrap gap-3 items-center">
          {sizes.map((size) => (
            <Chip
              key={size}
              size={size}
              selected
              label={size}
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
          ))}
        </div>
      </Section>

      {/* 5. Count 뱃지 */}
      <Section title="5. 카운트 뱃지">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="필터" selected count={3} />
          <Chip label="필터" selected count={12} type="filled" />
          <Chip label="카운트 없음 (미선택)" count={5} />
        </div>
      </Section>

      {/* 6. NEW 뱃지 */}
      <Section title="6. NEW 뱃지 (빨간 점)">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="새로운!" showNewBadge />
          <Chip label="선택됨 새로운" showNewBadge selected />
          <Chip label="채움 새로운" showNewBadge type="filled" />
          <Chip label="비활성 새로운" showNewBadge disabled />
        </div>
      </Section>

      {/* 7. fontStyle */}
      <Section title="7. fontStyle 속성">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="자동 (미선택=body)" />
          <Chip label="자동 (선택됨=title)" selected />
          <Chip label="강제 title" fontStyle="title" />
          <Chip label="강제 body" fontStyle="body" selected />
        </div>
      </Section>

      {/* 8. ChipGroup -- Carousel */}
      <Section title="8. ChipGroup - 캐러셀">
        <ChipGroup layout="carousel">
          {Array.from({ length: 12 }, (_, i) => (
            <Chip
              key={i}
              label={`칩 ${i + 1}`}
              selected={i === 0}
              type={i % 2 === 0 ? 'outlined' : 'filled'}
            />
          ))}
        </ChipGroup>
      </Section>

      {/* 9. ChipGroup -- Multiline */}
      <Section title="9. ChipGroup - 멀티라인">
        <ChipGroup layout="multiline">
          {['전체', '대형', '중형', '소형', 'SUV', '전기차', '하이브리드', '수소차'].map(
            (name, i) => (
              <Chip
                key={name}
                label={name}
                selected={i === 0}
                type="filled"
              />
            ),
          )}
        </ChipGroup>
      </Section>

      {/* 10. ChipGroup -- Custom gap */}
      <Section title="10. ChipGroup - 커스텀 간격 (12px)">
        <ChipGroup layout="multiline" gap={12}>
          <Chip label="간격 12" />
          <Chip label="사이" />
          <Chip label="칩들" />
        </ChipGroup>
      </Section>

      {/* 11. 종합 -- 다양한 조합 */}
      <Section title="11. 전체 조합">
        <ChipGroup layout="multiline">
          <Chip
            label="필터"
            type="outlined"
            selected
            count={5}
            leadingIcon={<StarIcon />}
            trailingIcon={<ChevronDownIcon />}
            showNewBadge
          />
          <Chip
            label="채움"
            type="filled"
            selected
            size="sm"
            leadingIcon={<StarIcon />}
          />
          <Chip
            label="XS 본문"
            type="outlined"
            size="xs"
            fontStyle="body"
            trailingIcon={<CloseIcon />}
          />
          <Chip
            label="비활성"
            type="filled"
            disabled
            leadingIcon={<StarIcon />}
            showNewBadge
          />
        </ChipGroup>
      </Section>
    </div>
  );
}
