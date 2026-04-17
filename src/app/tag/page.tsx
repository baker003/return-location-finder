import { Tag, TagGroup } from '@/components/Tag';
import type { TagType, TagSize, TagColor, TagGroupType } from '@/components/Tag';

/* ── 간단한 샘플 SVG 아이콘 ── */
function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.42.83 4.81L8 12.26 3.67 14.5l.83-4.81L1 6.27l4.91-.71L8 1z" />
    </svg>
  );
}

const types: TagType[] = ['fill-light', 'fill-dark', 'fill', 'outlined', 'text'];
const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg'];
const colors: TagColor[] = [
  'indigo', 'blue', 'red', 'orange', 'green', 'lightblue',
  'purple', 'magenta', 'cyan', 'lime', 'redorange', 'gray',
];
const groupTypes: TagGroupType[] = ['fill-light', 'fill-dark', 'fill', 'outlined', 'basic'];

export default function TagPage() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-12">
      <h1 className="typo-title-1 font-bold text-text-strong">
        Tag 컴포넌트
      </h1>

      {/* ── 1. Type 비교 ── */}
      <section className="space-y-4">
        <h2 className="typo-headline font-semibold text-text-strong">1. 타입</h2>
        <div className="flex flex-wrap items-center gap-3">
          {types.map((t) => (
            <Tag key={t} type={t} label={t} color="indigo" leadingIcon={<StarIcon />} />
          ))}
        </div>
      </section>

      {/* ── 2. Size 비교 ── */}
      <section className="space-y-4">
        <h2 className="typo-headline font-semibold text-text-strong">2. 사이즈</h2>
        {sizes.map((s) => (
          <div key={s} className="flex flex-wrap items-center gap-3 mb-2">
            <span className="w-8 typo-caption-1 text-text-secondary font-medium">{s}</span>
            <Tag size={s} label="라벨" leadingIcon={<StarIcon />} />
            <Tag size={s} label="아이콘 없음" showLeadingIcon={false} />
            <Tag size={s} label="굵게" bold leadingIcon={<StarIcon />} />
          </div>
        ))}
      </section>

      {/* ── 3. Bold 비교 ── */}
      <section className="space-y-4">
        <h2 className="typo-headline font-semibold text-text-strong">3. 굵기</h2>
        <div className="space-y-2">
          {sizes.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-8 typo-caption-1 text-text-secondary font-medium">{s}</span>
              <Tag size={s} label="기본" bold={false} />
              <Tag size={s} label="굵게" bold />
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. All Colors x Types ── */}
      <section className="space-y-4">
        <h2 className="typo-headline font-semibold text-text-strong">4. 컬러 x 타입</h2>
        <div className="space-y-6">
          {types.map((t) => (
            <div key={t} className="space-y-2">
              <h3 className="typo-footnote font-medium text-text-secondary">{t}</h3>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c) => (
                  <Tag
                    key={c}
                    type={t}
                    color={c}
                    label={c}
                    leadingIcon={<StarIcon />}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Icon 유무 ── */}
      <section className="space-y-4">
        <h2 className="typo-headline font-semibold text-text-strong">
          5. 아이콘 (표시 / 숨김)
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tag label="아이콘 표시" leadingIcon={<StarIcon />} showLeadingIcon />
          <Tag label="아이콘 숨김" leadingIcon={<StarIcon />} showLeadingIcon={false} />
          <Tag label="아이콘 없음" />
        </div>
      </section>

      {/* ── 6. TagGroup ── */}
      <section className="space-y-6">
        <h2 className="typo-headline font-semibold text-text-strong">6. TagGroup</h2>

        {/* Group types */}
        <div className="space-y-4">
          <h3 className="typo-footnote font-medium text-text-secondary">그룹 타입</h3>
          {groupTypes.map((gt) => (
            <div key={gt} className="space-y-1">
              <p className="typo-caption-1 text-text-tertiary">type=&quot;{gt}&quot;</p>
              <TagGroup type={gt}>
                <Tag label="태그 1" color="indigo" leadingIcon={<StarIcon />} />
                <Tag label="태그 2" color="blue" leadingIcon={<StarIcon />} />
                <Tag label="태그 3" color="red" leadingIcon={<StarIcon />} />
              </TagGroup>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="space-y-4">
          <h3 className="typo-footnote font-medium text-text-secondary">구분자</h3>
          <div className="space-y-2">
            <p className="typo-caption-1 text-text-tertiary">점(·) 구분자</p>
            <TagGroup type="fill" showDivider dividerStyle="dot">
              <Tag label="서울" color="indigo" />
              <Tag label="제주" color="blue" />
              <Tag label="부산" color="red" />
            </TagGroup>
          </div>
          <div className="space-y-2">
            <p className="typo-caption-1 text-text-tertiary">슬래시(/) 구분자</p>
            <TagGroup type="basic" showDivider dividerStyle="slash">
              <Tag label="서울" color="indigo" />
              <Tag label="제주" color="blue" />
              <Tag label="부산" color="red" />
            </TagGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
