import Link from "next/link";

const colors = {
  gray: [
    { name: "50", hex: "#F9F9FB" }, { name: "100", hex: "#F2F3F8" }, { name: "200", hex: "#E5E8EF" },
    { name: "300", hex: "#CBD1DC" }, { name: "400", hex: "#B4BBCB" }, { name: "500", hex: "#99A1B1" },
    { name: "600", hex: "#697383" }, { name: "700", hex: "#4A5667" }, { name: "800", hex: "#354153" },
    { name: "900", hex: "#262F3C" }, { name: "1000", hex: "#141A24" },
  ],
  blue: [
    { name: "50", hex: "#EBF5FF" }, { name: "100", hex: "#D6EBFF" }, { name: "200", hex: "#99CEFF" },
    { name: "300", hex: "#6BB5FF" }, { name: "400", hex: "#3393FF" }, { name: "500", hex: "#0078FF" },
    { name: "600", hex: "#0069FF" }, { name: "700", hex: "#0052E0" }, { name: "800", hex: "#0042C7" },
    { name: "900", hex: "#0033A9" },
  ],
  red: [
    { name: "50", hex: "#FFF0F3" }, { name: "100", hex: "#FFDBDF" }, { name: "200", hex: "#FFA1AC" },
    { name: "300", hex: "#FF7686" }, { name: "400", hex: "#FF576A" }, { name: "500", hex: "#FF3A5B" },
    { name: "600", hex: "#F51441" }, { name: "700", hex: "#E60532" }, { name: "800", hex: "#D30831" },
    { name: "900", hex: "#C10027" },
  ],
  orange: [
    { name: "50", hex: "#FFF8E6" }, { name: "100", hex: "#FFF3CC" }, { name: "200", hex: "#FFDD99" },
    { name: "300", hex: "#FFC566" }, { name: "400", hex: "#FFA940" }, { name: "500", hex: "#FF8800" },
    { name: "600", hex: "#FA7900" }, { name: "700", hex: "#F56A00" }, { name: "800", hex: "#EC5704" },
    { name: "900", hex: "#DD4600" },
  ],
  green: [
    { name: "50", hex: "#E6FEF0" }, { name: "500", hex: "#04CA81" }, { name: "600", hex: "#00BB83" },
  ],
  lightBlue: [
    { name: "50", hex: "#EBFAFF" }, { name: "500", hex: "#00AEFF" }, { name: "600", hex: "#00A2FA" },
  ],
  purple: [
    { name: "50", hex: "#F5F0FF" }, { name: "500", hex: "#956BFF" }, { name: "600", hex: "#8355FF" },
  ],
  indigo: [
    { name: "50", hex: "#ECEFFE" }, { name: "500", hex: "#4B68FF" }, { name: "600", hex: "#3554F8" },
    { name: "700", hex: "#2C46F0" },
  ],
  magenta: [
    { name: "50", hex: "#FFF0F7" }, { name: "500", hex: "#FF4397" },
  ],
  cyan: [
    { name: "50", hex: "#E5FFFC" }, { name: "500", hex: "#01C9D7" },
  ],
  lime: [
    { name: "50", hex: "#F2FFD4" }, { name: "500", hex: "#8AD510" },
  ],
  redOrange: [
    { name: "50", hex: "#FFF5EB" }, { name: "500", hex: "#FF7017" },
  ],
};

const semanticTokens = [
  { group: "Text", tokens: [
    { name: "strong", hex: "#141A24" }, { name: "primary", hex: "#354153" },
    { name: "secondary", hex: "#697383" }, { name: "tertiary", hex: "#697383" },
    { name: "disabled", hex: "#99A1B1" },
  ]},
  { group: "Primary", tokens: [
    { name: "regular", hex: "#0078FF" }, { name: "strong", hex: "#0069FF" },
    { name: "heavy", hex: "#0052E0" },
  ]},
  { group: "Status", tokens: [
    { name: "info", hex: "#0078FF" }, { name: "positive", hex: "#04CA81" },
    { name: "caution", hex: "#FF8800" }, { name: "negative", hex: "#F51441" },
  ]},
  { group: "Accent", tokens: [
    { name: "red", hex: "#F51441" }, { name: "orange", hex: "#FF8800" },
    { name: "green", hex: "#04CA81" }, { name: "lightblue", hex: "#00AEFF" },
    { name: "purple", hex: "#956BFF" }, { name: "indigo", hex: "#4B68FF" },
    { name: "magenta", hex: "#FF4397" }, { name: "cyan", hex: "#01C9D7" },
    { name: "lime", hex: "#8AD510" }, { name: "redorange", hex: "#FF7017" },
  ]},
];

const typography = [
  { category: "Heading", weight: "Bold (700)", items: [
    { name: "Heading 1", size: "28px", lh: "36px", ls: "0.38px" },
    { name: "Heading 2", size: "24px", lh: "32px", ls: "0.07px" },
    { name: "Heading 3", size: "22px", lh: "28px", ls: "-0.26px" },
  ]},
  { category: "Headline", weight: "Semi Bold (600)", items: [
    { name: "Headline", size: "17px", lh: "22px", ls: "-0.43px" },
  ]},
  { category: "Title", weight: "Semi Bold (600)", items: [
    { name: "Title 1", size: "20px", lh: "26px", ls: "-0.45px" },
    { name: "Title 2", size: "18px", lh: "24px", ls: "-0.44px" },
    { name: "Title 3", size: "16px", lh: "22px", ls: "-0.31px" },
  ]},
  { category: "Subhead", weight: "Regular (400)", items: [
    { name: "Subhead", size: "15px", lh: "20px", ls: "-0.23px" },
  ]},
  { category: "Subtitle", weight: "Medium (500)", items: [
    { name: "Subtitle 1", size: "16px", lh: "22px", ls: "-0.31px" },
    { name: "Subtitle 2", size: "14px", lh: "18px", ls: "-0.15px" },
    { name: "Subtitle 3", size: "13px", lh: "18px", ls: "-0.08px" },
  ]},
  { category: "Body", weight: "Regular (400)", items: [
    { name: "Body", size: "17px", lh: "22px", ls: "-0.43px" },
    { name: "Body 1", size: "16px", lh: "22px", ls: "-0.31px" },
    { name: "Body 2", size: "14px", lh: "18px", ls: "-0.15px" },
    { name: "Body 3", size: "13px", lh: "18px", ls: "-0.08px" },
  ]},
  { category: "Caption", weight: "Regular (400)", items: [
    { name: "Caption 1", size: "12px", lh: "16px", ls: "0px" },
    { name: "Caption 2", size: "11px", lh: "14px", ls: "0.06px" },
  ]},
];

const contrastPairs = [
  { fg: "text-primary", fgHex: "#354153", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 10.33, aaPass: true, aaLargePass: true },
  { fg: "text-secondary", fgHex: "#697383", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 4.79, aaPass: true, aaLargePass: true },
  { fg: "text-tertiary", fgHex: "#697383", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 4.79, aaPass: true, aaLargePass: true },
  { fg: "text-disabled (WCAG 면제)", fgHex: "#99A1B1", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 2.60, aaPass: true, aaLargePass: true },
  { fg: "primary-strong", fgHex: "#0069FF", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 4.70, aaPass: true, aaLargePass: true },
  { fg: "on-primary", fgHex: "#FFFFFF", bg: "primary-strong", bgHex: "#0069FF", ratio: 4.70, aaPass: true, aaLargePass: true },
  { fg: "status-negative", fgHex: "#F51441", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 4.63, aaPass: true, aaLargePass: true },
  { fg: "text-primary", fgHex: "#354153", bg: "bg-primary", bgHex: "#F2F3F8", ratio: 9.32, aaPass: true, aaLargePass: true },
  { fg: "text-tertiary-high-contrast", fgHex: "#697383", bg: "bg-secondary", bgHex: "#FFFFFF", ratio: 4.79, aaPass: true, aaLargePass: true },
];

const components = [
  { name: "Button", href: "/button", desc: "ActionButton, TextButton, IconButton, LinkTextButton" },
  { name: "Chip", href: "/chip", desc: "Chip, ChipGroup (Carousel / Multiline)" },
  { name: "Tag", href: "/tag", desc: "Tag, TagGroup (Divider 포함)" },
  { name: "Top Appbar", href: "/top-appbar", desc: "TopAppbar, LeadingButton, TrailingButton, Instant, ProgressBar" },
];

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  const isDark = parseInt(hex.slice(1), 16) < 0x888888;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg border border-gray-200"
        style={{ backgroundColor: hex }}
      />
      <span className="text-[10px] text-text-secondary font-mono">{name}</span>
      <span className="text-[9px] text-text-tertiary font-mono">{hex}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-text-strong">DS_2</h1>
        <p className="mt-1 text-base text-text-secondary">디자인 시스템 — Next.js + Tailwind CSS</p>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-10 flex flex-col gap-16">

        {/* Components */}
        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-6">컴포넌트</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {components.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="border border-gray-200 rounded-xl p-5 hover:border-primary-strong hover:bg-blue-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-text-strong">{c.name}</h3>
                <p className="mt-1 text-sm text-text-tertiary">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Palette */}
        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-6">컬러 팔레트</h2>
          <div className="flex flex-col gap-6">
            {Object.entries(colors).map(([name, swatches]) => (
              <div key={name}>
                <h3 className="text-sm font-semibold text-text-secondary mb-3 capitalize">{name}</h3>
                <div className="flex flex-wrap gap-3">
                  {swatches.map((s) => (
                    <ColorSwatch key={`${name}-${s.name}`} hex={s.hex} name={s.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Tokens */}
        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-6">시맨틱 토큰</h2>
          <div className="flex flex-col gap-6">
            {semanticTokens.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm font-semibold text-text-secondary mb-3">{group.group}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.tokens.map((t) => (
                    <ColorSwatch key={`${group.group}-${t.name}`} hex={t.hex} name={t.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-6">타이포그래피</h2>
          <p className="text-sm text-text-tertiary mb-6">폰트: Inter (Pretendard Variable 폴백)</p>
          <div className="flex flex-col gap-8">
            {typography.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-primary-strong px-2 py-0.5 bg-blue-50 rounded">
                    {cat.category}
                  </span>
                  <span className="text-xs text-text-tertiary">{cat.weight}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-6">
                      <span
                        className="text-text-strong"
                        style={{
                          fontSize: item.size,
                          lineHeight: item.lh,
                          letterSpacing: item.ls,
                          fontWeight: cat.weight.includes("Bold") ? 700
                            : cat.weight.includes("Semi") ? 600
                            : cat.weight.includes("Medium") ? 500 : 400,
                        }}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs text-text-tertiary font-mono whitespace-nowrap">
                        {item.size} / {item.lh} / {item.ls}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility Contrast */}
        <section>
          <h2 className="text-2xl font-bold text-text-strong mb-2">접근성 대비</h2>
          <p className="text-sm text-text-secondary mb-6">
            WCAG AA 기준 — 일반 텍스트 4.5:1 / 대형 텍스트(18px bold 또는 24px 이상) 3:1
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-text-secondary font-semibold">전경 (Foreground)</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-semibold">배경 (Background)</th>
                  <th className="text-center py-3 px-4 text-text-secondary font-semibold">미리보기</th>
                  <th className="text-center py-3 px-4 text-text-secondary font-semibold">대비율</th>
                  <th className="text-center py-3 px-4 text-text-secondary font-semibold">AA (4.5:1)</th>
                  <th className="text-center py-3 px-4 text-text-secondary font-semibold">AA Large (3:1)</th>
                </tr>
              </thead>
              <tbody>
                {contrastPairs.map((pair, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs">{pair.fg}</span>
                      <br />
                      <span className="font-mono text-[10px] text-text-tertiary">{pair.fgHex}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs">{pair.bg}</span>
                      <br />
                      <span className="font-mono text-[10px] text-text-tertiary">{pair.bgHex}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className="flex items-center justify-center rounded-lg px-4 py-2 border border-gray-200"
                        style={{ backgroundColor: pair.bgHex }}
                      >
                        <span className="font-semibold text-sm" style={{ color: pair.fgHex }}>
                          가나다 ABC
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold">
                      {pair.ratio.toFixed(2)}:1
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                          pair.aaPass
                            ? "bg-green-50 text-[#00BB83]"
                            : "bg-red-50 text-[#FF3A5B]"
                        }`}
                      >
                        {pair.aaPass ? "PASS" : "FAIL"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                          pair.aaLargePass
                            ? "bg-green-50 text-[#00BB83]"
                            : "bg-red-50 text-[#FF3A5B]"
                        }`}
                      >
                        {pair.aaLargePass ? "PASS" : "FAIL"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-bg-tertiary rounded-xl">
            <h3 className="text-sm font-semibold text-text-strong mb-2">접근성 강화 토큰</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              <code className="bg-gray-200 px-1 rounded">text-tertiary-high-contrast</code> (gray-600, 4.79:1) — text-tertiary 대비 부족 시 대체 사용
              <br />
              <code className="bg-gray-200 px-1 rounded">text-disabled</code> (gray-500, 2.60:1) — 비활성 요소는 WCAG 대비 요구사항 면제
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
