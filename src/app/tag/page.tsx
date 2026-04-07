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
const sizes: TagSize[] = ['sm', 'md', 'lg'];
const colors: TagColor[] = [
  'indigo', 'blue', 'red', 'orange', 'green', 'lightblue',
  'purple', 'magenta', 'cyan', 'lime', 'redorange', 'gray',
];
const groupTypes: TagGroupType[] = ['fill-light', 'fill-dark', 'fill', 'outlined', 'basic'];

export default function TagPage() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-12">
      <h1 className="text-[24px] font-bold leading-[34px] text-text-strong">
        Tag Component
      </h1>

      {/* ── 1. Type 비교 ── */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-text-strong">1. Types</h2>
        <div className="flex flex-wrap items-center gap-3">
          {types.map((t) => (
            <Tag key={t} type={t} label={t} color="indigo" leadingIcon={<StarIcon />} />
          ))}
        </div>
      </section>

      {/* ── 2. Size 비교 ── */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-text-strong">2. Sizes</h2>
        {sizes.map((s) => (
          <div key={s} className="flex flex-wrap items-center gap-3 mb-2">
            <span className="w-8 text-[12px] text-text-secondary font-medium">{s}</span>
            <Tag size={s} label="Label" leadingIcon={<StarIcon />} />
            <Tag size={s} label="No Icon" showLeadingIcon={false} />
            <Tag size={s} label="Bold" bold leadingIcon={<StarIcon />} />
          </div>
        ))}
      </section>

      {/* ── 3. Bold 비교 ── */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-text-strong">3. Bold</h2>
        <div className="space-y-2">
          {sizes.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-8 text-[12px] text-text-secondary font-medium">{s}</span>
              <Tag size={s} label="Regular" bold={false} />
              <Tag size={s} label="Bold" bold />
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. All Colors x Types ── */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-text-strong">4. Colors x Types</h2>
        <div className="space-y-6">
          {types.map((t) => (
            <div key={t} className="space-y-2">
              <h3 className="text-[14px] font-medium text-text-secondary">{t}</h3>
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
        <h2 className="text-[18px] font-semibold text-text-strong">
          5. Leading Icon (show / hide)
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tag label="With Icon" leadingIcon={<StarIcon />} showLeadingIcon />
          <Tag label="Hidden Icon" leadingIcon={<StarIcon />} showLeadingIcon={false} />
          <Tag label="No Icon Prop" />
        </div>
      </section>

      {/* ── 6. TagGroup ── */}
      <section className="space-y-6">
        <h2 className="text-[18px] font-semibold text-text-strong">6. TagGroup</h2>

        {/* Group types */}
        <div className="space-y-4">
          <h3 className="text-[14px] font-medium text-text-secondary">Group Types</h3>
          {groupTypes.map((gt) => (
            <div key={gt} className="space-y-1">
              <p className="text-[12px] text-text-tertiary">type=&quot;{gt}&quot;</p>
              <TagGroup type={gt}>
                <Tag label="Tag 1" color="indigo" leadingIcon={<StarIcon />} />
                <Tag label="Tag 2" color="blue" leadingIcon={<StarIcon />} />
                <Tag label="Tag 3" color="red" leadingIcon={<StarIcon />} />
              </TagGroup>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="space-y-4">
          <h3 className="text-[14px] font-medium text-text-secondary">Divider</h3>
          <div className="space-y-2">
            <p className="text-[12px] text-text-tertiary">dot divider</p>
            <TagGroup type="fill" showDivider dividerStyle="dot">
              <Tag label="Seoul" color="indigo" />
              <Tag label="Jeju" color="blue" />
              <Tag label="Busan" color="red" />
            </TagGroup>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-text-tertiary">slash divider</p>
            <TagGroup type="basic" showDivider dividerStyle="slash">
              <Tag label="Seoul" color="indigo" />
              <Tag label="Jeju" color="blue" />
              <Tag label="Busan" color="red" />
            </TagGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
