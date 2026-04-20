'use client';

import { useState, type ComponentProps } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  ActionButton,
  TextButton,
  IconButton,
  LinkTextButton,
} from '@/components/Button';
import type { ActionButtonStyle, ActionButtonVariant, ActionButtonSize, ActionButtonWeight, TextButtonVariant, TextButtonSize, TextButtonWeight } from '@/components/Button';
import { Chip } from '@/components/Chip';
import type { ChipType, ChipSize } from '@/components/Chip';
import { Tag, TagGroup } from '@/components/Tag';
import type { TagType, TagSize, TagColor, TagGroupType } from '@/components/Tag';
import {
  TopAppbar,
  LeadingButton,
  TrailingButton,
  TopAppbarInstant,
} from '@/components/TopAppbar';
import {
  ArrowLeft as IconArrowLeft, ArrowRight as IconArrowRight,
  ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight,
  ChevronUp as IconChevronUp, ChevronDown as IconChevronDown,
  Menu as IconMenu, Close as IconClose,
  Search as IconSearch, Plus as IconPlus, Minus as IconMinus,
  Check as IconCheck, Edit as IconEdit, Delete as IconDelete,
  Share as IconShare, Download as IconDownload, Upload as IconUpload,
  Refresh as IconRefresh,
  Notification as IconNotification, Mail as IconMail,
  Chat as IconChat, Phone as IconPhone,
  User as IconUser, Settings as IconSettings, Logout as IconLogout,
  Info as IconInfo, Warning as IconWarning, Error as IconError,
  Success as IconSuccess, Help as IconHelp,
  Image as IconImage, Camera as IconCamera, Play as IconPlay, Pause as IconPause,
  Home as IconHome, Bookmark as IconBookmark, Heart as IconHeart,
  Star as IconStar, Filter as IconFilter, Eye as IconEye,
  // Fill icons
  ArrowLeftFill as IconArrowLeftFill, ArrowRightFill as IconArrowRightFill,
  ChevronLeftFill as IconChevronLeftFill, ChevronRightFill as IconChevronRightFill,
  ChevronUpFill as IconChevronUpFill, ChevronDownFill as IconChevronDownFill,
  MenuFill as IconMenuFill, CloseFill as IconCloseFill,
  SearchFill as IconSearchFill, PlusFill as IconPlusFill, MinusFill as IconMinusFill,
  CheckFill as IconCheckFill, EditFill as IconEditFill, DeleteFill as IconDeleteFill,
  ShareFill as IconShareFill, DownloadFill as IconDownloadFill, UploadFill as IconUploadFill,
  RefreshFill as IconRefreshFill,
  NotificationFill as IconNotificationFill, MailFill as IconMailFill,
  ChatFill as IconChatFill, PhoneFill as IconPhoneFill,
  UserFill as IconUserFill, SettingsFill as IconSettingsFill, LogoutFill as IconLogoutFill,
  InfoFill as IconInfoFill, WarningFill as IconWarningFill, ErrorFill as IconErrorFill,
  SuccessFill as IconSuccessFill, HelpFill as IconHelpFill,
  ImageFill as IconImageFill, CameraFill as IconCameraFill, PlayFill as IconPlayFill, PauseFill as IconPauseFill,
  HomeFill as IconHomeFill, BookmarkFill as IconBookmarkFill, HeartFill as IconHeartFill,
  StarFill as IconStarFill, FilterFill as IconFilterFill, EyeFill as IconEyeFill,
} from '@/components/Icons';
import type { RenderingMode, IconWeight, IconScale, IconAnimation } from '@/components/Icons';

/* ────────────────────────────────────────
   Foundation Data
   ──────────────────────────────────────── */

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

/* ────────────────────────────────────────
   Shared Icons
   ──────────────────────────────────────── */

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

function ChipStarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function ChipChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChipCloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagStarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.42.83 4.81L8 12.26 3.67 14.5l.83-4.81L1 6.27l4.91-.71L8 1z" />
    </svg>
  );
}

function AppbarStarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

/* ────────────────────────────────────────
   Shared Section wrappers
   ──────────────────────────────────────── */

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg border border-border"
        style={{ backgroundColor: hex }}
      />
      <span className="typo-caption2 text-text-secondary font-mono">{name}</span>
      <span className="typo-caption2 text-text-tertiary font-mono">{hex}</span>
    </div>
  );
}

function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
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

function ChipSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="typo-headline2 font-semibold text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function ChipSubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="typo-label2 font-medium text-text-secondary">{title}</h3>
      {children}
    </div>
  );
}

function AppbarLabel({ text }: { text: string }) {
  return <p className="typo-caption1 font-medium text-text-secondary">{text}</p>;
}

/* ────────────────────────────────────────
   Button constants (Figma 기준)
   ──────────────────────────────────────── */

const ctaStyles: ActionButtonStyle[] = ['fill', 'outline'];
const ctaVariants: ActionButtonVariant[] = ['primary', 'secondary', 'tertiary'];
const ctaSizes: ActionButtonSize[] = ['large', 'medium', 'small'];
const ctaWeights: ActionButtonWeight[] = ['bold', 'light'];
const textBtnVariants: TextButtonVariant[] = ['primary', 'secondary', 'tertiary', 'on-primary'];
const textBtnSizes: TextButtonSize[] = [20, 18, 16, 14];
const textBtnWeights: TextButtonWeight[] = ['bold', 'light'];
const iconTypes = ['fill', 'outline', 'ghost'] as const;

/* ────────────────────────────────────────
   Chip constants
   ──────────────────────────────────────── */

const chipTypes: ChipType[] = ['outlined', 'filled'];
const chipSizes: ChipSize[] = ['lg', 'md', 'sm', 'xs'];

/* ────────────────────────────────────────
   Tag constants
   ──────────────────────────────────────── */

const tagTypes: TagType[] = ['fill-light', 'fill-dark', 'fill', 'outlined', 'text'];
const tagSizes: TagSize[] = ['xs', 'sm', 'md', 'lg'];
const tagColors: TagColor[] = [
  'indigo', 'blue', 'red', 'orange', 'green', 'lightblue',
  'purple', 'magenta', 'cyan', 'lime', 'redorange', 'gray',
];
const groupTypes: TagGroupType[] = ['fill-light', 'fill-dark', 'fill', 'outlined', 'basic'];

/* ════════════════════════════════════════
   PAGE
   ════════════════════════════════════════ */

export default function Home() {
  const [progress, setProgress] = useState(60);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      <main className="ml-[240px] max-w-[1200px] px-8 py-10 flex flex-col gap-16">

        {/* ═══════════ Foundation: Color Palette ═══════════ */}
        <section id="color-palette" className="scroll-mt-6">
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

        {/* ═══════════ Foundation: Semantic Tokens ═══════════ */}
        <section id="semantic-tokens" className="scroll-mt-6">
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

        {/* ═══════════ Foundation: Typography ═══════════ */}
        <section id="typography" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-6">타이포그래피</h2>
          <p className="text-sm text-text-tertiary mb-6">폰트: Inter (Pretendard Variable 폴백)</p>
          <div className="flex flex-col gap-8">
            {typography.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-primary-strong px-2 py-0.5 bg-bg-primary rounded">
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

        {/* ═══════════ Foundation: Accessibility Contrast ═══════════ */}
        <section id="accessibility" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-2">접근성 대비</h2>
          <p className="text-sm text-text-secondary mb-6">
            WCAG AA 기준 -- 일반 텍스트 4.5:1 / 대형 텍스트(18px bold 또는 24px 이상) 3:1
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
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
                  <tr key={idx} className="border-b border-border-weak">
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs">{pair.fg}</span>
                      <br />
                      <span className="font-mono typo-caption2 text-text-tertiary">{pair.fgHex}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs">{pair.bg}</span>
                      <br />
                      <span className="font-mono typo-caption2 text-text-tertiary">{pair.bgHex}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className="flex items-center justify-center rounded-lg px-4 py-2 border border-border"
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
                            ? "bg-status-positive/10 text-status-positive"
                            : "bg-status-negative/10 text-status-negative"
                        }`}
                      >
                        {pair.aaPass ? "PASS" : "FAIL"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                          pair.aaLargePass
                            ? "bg-status-positive/10 text-status-positive"
                            : "bg-status-negative/10 text-status-negative"
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
              <code className="bg-gray-200 px-1 rounded">text-tertiary-high-contrast</code> (gray-600, 4.79:1) -- text-tertiary 대비 부족 시 대체 사용
              <br />
              <code className="bg-gray-200 px-1 rounded">text-disabled</code> (gray-500, 2.60:1) -- 비활성 요소는 WCAG 대비 요구사항 면제
            </p>
          </div>
        </section>

        {/* ═══════════ Component: CTA 버튼 ═══════════ */}
        <section id="cta-button" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-8">CTA 버튼</h2>

          {ctaStyles.map((style) => (
            <SectionWrapper key={style} title={style === 'outline' ? 'line' : style}>
              {ctaVariants.map((variant) => (
                <SubSection key={variant} title={`위계: ${variant}`}>
                  {ctaWeights.map((weight) => (
                    <SubSection key={weight} title={`종류: ${weight}`}>
                      {ctaSizes.map((size) => (
                        <ActionButton key={size} style={style} variant={variant} size={size} weight={weight}
                          leftIcon={<IconSuccessFill />} rightIcon={<IconChevronRight />}>
                          텍스트
                        </ActionButton>
                      ))}
                      <SubSection title="아이콘: 왼쪽">
                        {ctaSizes.map((size) => (
                          <ActionButton key={size} style={style} variant={variant} size={size} weight={weight}
                            leftIcon={<IconSuccessFill />}>
                            텍스트
                          </ActionButton>
                        ))}
                      </SubSection>
                      <SubSection title="아이콘: 오른쪽">
                        {ctaSizes.map((size) => (
                          <ActionButton key={size} style={style} variant={variant} size={size} weight={weight}
                            rightIcon={<IconChevronRight />}>
                            텍스트
                          </ActionButton>
                        ))}
                      </SubSection>
                    </SubSection>
                  ))}
                </SubSection>
              ))}
            </SectionWrapper>
          ))}
        </section>

        {/* ═══════════ Component: 텍스트 버튼 ═══════════ */}
        <section id="text-button" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-8">텍스트 버튼</h2>

          {textBtnVariants.map((variant) => (
            <SectionWrapper key={variant} title={`위계: ${variant}`}>
              {textBtnWeights.map((weight) => (
                <SubSection key={weight} title={`종류: ${weight}`}>
                  {textBtnSizes.map((size) => (
                    <TextButton key={`${size}-text`} variant={variant} size={size} weight={weight}>
                      {size}px
                    </TextButton>
                  ))}
                </SubSection>
              ))}
              <SubSection title="아이콘: 왼쪽 (활성화=yes)">
                {textBtnSizes.map((size) => (
                  <TextButton key={size} variant={variant} size={size} leftIcon={<IconSuccessFill />}>
                    {size}px
                  </TextButton>
                ))}
              </SubSection>
              <SubSection title="아이콘: 오른쪽">
                {textBtnSizes.map((size) => (
                  <TextButton key={size} variant={variant} size={size} rightIcon={<IconChevronRight />}>
                    {size}px
                  </TextButton>
                ))}
              </SubSection>
              <SubSection title="아이콘: 양쪽">
                {textBtnSizes.map((size) => (
                  <TextButton key={size} variant={variant} size={size} leftIcon={<IconSuccessFill />} rightIcon={<IconChevronRight />}>
                    {size}px
                  </TextButton>
                ))}
              </SubSection>
              <SubSection title="상태: 로딩">
                {textBtnSizes.map((size) => (
                  <TextButton key={size} variant={variant} size={size} loading>
                    {size}px
                  </TextButton>
                ))}
              </SubSection>
              <SubSection title="상태: 비활성">
                {textBtnSizes.map((size) => (
                  <TextButton key={size} variant={variant} size={size} disabled>
                    {size}px
                  </TextButton>
                ))}
              </SubSection>
            </SectionWrapper>
          ))}
        </section>

        {/* ═══════════ Component: Chip ═══════════ */}
        <section id="chip" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-8">Chip</h2>

          <SectionWrapper title="타입 × 상태">
            {(['outlined', 'filled'] as const).map((type) => (
              <SubSection key={type} title={`타입: ${type}`}>
                <Chip type={type}>기본</Chip>
                <Chip type={type} selected>선택됨</Chip>
                <Chip type={type} disabled>비활성</Chip>
              </SubSection>
            ))}
          </SectionWrapper>

          <SectionWrapper title="사이즈">
            {(['outlined', 'filled'] as const).map((type) => (
              <SubSection key={type} title={`타입: ${type}`}>
                {(['lg', 'md', 'sm', 'xs'] as const).map((size) => (
                  <Chip key={size} type={type} size={size} selected>{size}</Chip>
                ))}
              </SubSection>
            ))}
          </SectionWrapper>

          <SectionWrapper title="아이콘">
            <SubSection title="왼쪽아이콘">
              {(['outlined', 'filled'] as const).map((type) => (
                <Chip key={type} type={type} leadingIcon={<IconSuccessFill size={16} />} showLeadingIcon>{type}</Chip>
              ))}
            </SubSection>
            <SubSection title="오른쪽아이콘">
              {(['outlined', 'filled'] as const).map((type) => (
                <Chip key={type} type={type} trailingIcon={<IconSuccessFill size={16} />} showTrailingIcon>{type}</Chip>
              ))}
            </SubSection>
            <SubSection title="양쪽아이콘 + 선택됨">
              {(['outlined', 'filled'] as const).map((type) => (
                <Chip key={type} type={type} leadingIcon={<IconSuccessFill size={16} />} showLeadingIcon trailingIcon={<IconSuccessFill size={16} />} showTrailingIcon selected>{type}</Chip>
              ))}
            </SubSection>
          </SectionWrapper>

          <SectionWrapper title="신규뱃지">
            <SubSection title="">
              <Chip showNewBadge>기본</Chip>
              <Chip showNewBadge selected>선택됨</Chip>
              <Chip showNewBadge type="filled">채움</Chip>
              <Chip showNewBadge disabled>비활성</Chip>
            </SubSection>
          </SectionWrapper>
        </section>

        {/* ═══════════ Component: Tag ═══════════ */}
        <section id="tag" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-8">Tag</h2>

          <SectionWrapper title="타입">
            <SubSection title="">
              {(['fill-light', 'fill-dark', 'fill', 'outlined', 'text'] as const).map((t) => (
                <Tag key={t} type={t} label={t} color="indigo" leadingIcon={<TagStarIcon />} showLeadingIcon />
              ))}
            </SubSection>
          </SectionWrapper>

          <SectionWrapper title="사이즈">
            {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
              <SubSection key={size} title={`size: ${size}`}>
                <Tag size={size} label={size} leadingIcon={<TagStarIcon />} showLeadingIcon />
                <Tag size={size} label={`${size} 아이콘 없음`} showLeadingIcon={false} />
              </SubSection>
            ))}
          </SectionWrapper>

          <SectionWrapper title="컬러 × 타입">
            {(['fill-light', 'fill-dark', 'fill', 'outlined', 'text'] as const).map((type) => (
              <SubSection key={type} title={`type: ${type}`}>
                {(['indigo', 'blue', 'red', 'orange', 'green', 'lightblue', 'purple', 'magenta', 'cyan', 'lime', 'redorange', 'gray'] as const).map((color) => (
                  <Tag key={color} type={type} color={color} label={color} leadingIcon={<TagStarIcon />} showLeadingIcon />
                ))}
              </SubSection>
            ))}
          </SectionWrapper>
        </section>

        {/* ═══════════ Component: Top Appbar ═══════════ */}
        <section id="top-appbar" className="scroll-mt-6 space-y-8">
          <h2 className="text-2xl font-bold text-text-strong">Top Appbar</h2>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">테마</h3>
            <div className="space-y-2">
              <AppbarLabel text="white" />
              <TopAppbar
                theme="white"
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="화이트 테마" />}
                trailing={<TrailingButton variant="iconButtons" buttons={[{ icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' }]} />}
              />

              <AppbarLabel text="transparent" />
              <div className="bg-gray-200 rounded-lg">
                <TopAppbar
                  theme="transparent"
                  leading={<LeadingButton variant="back" />}
                  instant={<TopAppbarInstant variant="heading" title="투명 테마" />}
                  trailing={<TrailingButton variant="iconButtons" buttons={[{ icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' }]} />}
                />
              </div>

              <AppbarLabel text="dark" />
              <TopAppbar
                theme="dark"
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="다크 테마" />}
                trailing={<TrailingButton variant="iconButtons" buttons={[{ icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' }]} />}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">좌측 버튼 변형</h3>
            <div className="space-y-2">
              <AppbarLabel text="back" />
              <TopAppbar leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="label" title="뒤로 가기" />} />

              <AppbarLabel text="close" />
              <TopAppbar leading={<LeadingButton variant="close" />} instant={<TopAppbarInstant variant="label" title="닫기" />} />

              <AppbarLabel text="home" />
              <TopAppbar leading={<LeadingButton variant="home" />} instant={<TopAppbarInstant variant="label" title="홈으로" />} />

              <AppbarLabel text="없음" />
              <TopAppbar instant={<TopAppbarInstant variant="heading" title="좌측 버튼 없음" />} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">중앙 콘텐츠 변형</h3>
            <div className="space-y-2">
              <AppbarLabel text="heading" />
              <TopAppbar leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="heading" title="페이지 타이틀" />} />

              <AppbarLabel text="label" />
              <TopAppbar leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="label" title="레이블 텍스트" />} />

              <AppbarLabel text="textButton" />
              <TopAppbar
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="textButton" label="서울특별시" onClick={() => alert('textButton clicked')} />}
              />

              <AppbarLabel text="input" />
              <TopAppbar leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="input" placeholder="검색어를 입력하세요" />} />

              <AppbarLabel text="input (dark)" />
              <TopAppbar theme="dark" leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="input" placeholder="검색어를 입력하세요" />} />

              <AppbarLabel text="image" />
              <TopAppbar
                instant={<TopAppbarInstant variant="image" src="https://placehold.co/120x32/0078FF/FFFFFF?text=DS_2" alt="DS_2 logo" height={32} />}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">우측 버튼 변형</h3>
            <div className="space-y-2">
              <AppbarLabel text="아이콘 버튼 (1개)" />
              <TopAppbar
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="상세 페이지" />}
                trailing={<TrailingButton variant="iconButtons" buttons={[{ icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' }]} />}
              />

              <AppbarLabel text="아이콘 버튼 (3개)" />
              <TopAppbar
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="상세 페이지" />}
                trailing={
                  <TrailingButton
                    variant="iconButtons"
                    buttons={[
                      { icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' },
                      { icon: <ShareIcon />, 'aria-label': '공유' },
                      { icon: <MoreIcon />, 'aria-label': '더보기' },
                    ]}
                  />
                }
              />

              <AppbarLabel text="텍스트 버튼" />
              <TopAppbar
                leading={<LeadingButton variant="close" />}
                instant={<TopAppbarInstant variant="heading" title="예약 확인" />}
                trailing={<TrailingButton variant="textButton" label="완료" onClick={() => alert('완료 clicked')} />}
              />

              <AppbarLabel text="없음" />
              <TopAppbar leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="heading" title="우측 버튼 없음" />} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">로딩 상태</h3>
            <div className="space-y-2">
              <AppbarLabel text={`determinate (${progress}%)`} />
              <TopAppbar
                loading
                progress={progress}
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="로딩 중..." />}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />

              <AppbarLabel text="무한 로딩" />
              <TopAppbar loading leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="heading" title="로딩 중..." />} />

              <AppbarLabel text="다크 + 무한 로딩" />
              <TopAppbar theme="dark" loading leading={<LeadingButton variant="back" />} instant={<TopAppbarInstant variant="heading" title="로딩 중..." />} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="typo-headline2 font-semibold text-text-strong">전체 조합</h3>
            <div className="space-y-2">
              <AppbarLabel text="다크 + 뒤로가기 + 헤딩 + 아이콘 버튼 3개 + 로딩" />
              <TopAppbar
                theme="dark"
                loading
                progress={75}
                leading={<LeadingButton variant="back" />}
                instant={<TopAppbarInstant variant="heading" title="내 예약" />}
                trailing={
                  <TrailingButton
                    variant="iconButtons"
                    buttons={[
                      { icon: <AppbarStarIcon />, 'aria-label': '즐겨찾기' },
                      { icon: <ShareIcon />, 'aria-label': '공유' },
                      { icon: <MoreIcon />, 'aria-label': '더보기' },
                    ]}
                  />
                }
              />

              <AppbarLabel text="다크 + 닫기 + 텍스트 버튼" />
              <TopAppbar
                theme="dark"
                leading={<LeadingButton variant="close" />}
                instant={<TopAppbarInstant variant="label" title="설정" />}
                trailing={<TrailingButton variant="textButton" label="저장" />}
              />
            </div>
          </div>
        </section>

        {/* ═══════════ Component: Icons — Line ═══════════ */}
        <section id="icons-line" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-2">아이콘 — Line</h2>
          <p className="text-sm text-text-secondary mb-8">
            Line 스타일 &middot; 40개 아이콘 &middot; viewBox 24x24 &middot; stroke 2px &middot; round cap/join
          </p>

          {/* Navigation */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">네비게이션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['ArrowLeft', IconArrowLeft], ['ArrowRight', IconArrowRight],
                ['ChevronLeft', IconChevronLeft], ['ChevronRight', IconChevronRight],
                ['ChevronUp', IconChevronUp], ['ChevronDown', IconChevronDown],
                ['Menu', IconMenu], ['Close', IconClose],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">액션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['Search', IconSearch], ['Plus', IconPlus], ['Minus', IconMinus], ['Check', IconCheck],
                ['Edit', IconEdit], ['Delete', IconDelete], ['Share', IconShare], ['Download', IconDownload],
                ['Upload', IconUpload], ['Refresh', IconRefresh],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">커뮤니케이션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['Notification', IconNotification], ['Mail', IconMail], ['Chat', IconChat], ['Phone', IconPhone],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">사용자</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['User', IconUser], ['Settings', IconSettings], ['Logout', IconLogout],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">상태</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['Info', IconInfo], ['Warning', IconWarning], ['Error', IconError],
                ['Success', IconSuccess], ['Help', IconHelp],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">미디어</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['Image', IconImage], ['Camera', IconCamera], ['Play', IconPlay], ['Pause', IconPause],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">기타</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['Home', IconHome], ['Bookmark', IconBookmark], ['Heart', IconHeart],
                ['Star', IconStar], ['Filter', IconFilter], ['Eye', IconEye],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size comparison */}
          <div>
            <h3 className="text-sm font-semibold text-text-secondary mb-4">사이즈 비교</h3>
            <div className="flex items-end gap-6">
              {[16, 20, 24, 32].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <IconHeart size={s} />
                  <span className="typo-caption2 text-text-tertiary">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Component: Icons — Fill ═══════════ */}
        <section id="icons-fill" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-2">아이콘 — Fill</h2>
          <p className="text-sm text-text-secondary mb-8">
            Fill 스타일 &middot; 40개 아이콘 &middot; viewBox 24x24 &middot; fill currentColor &middot; stroke none
          </p>

          {/* Navigation */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">네비게이션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['ArrowLeftFill', IconArrowLeftFill], ['ArrowRightFill', IconArrowRightFill],
                ['ChevronLeftFill', IconChevronLeftFill], ['ChevronRightFill', IconChevronRightFill],
                ['ChevronUpFill', IconChevronUpFill], ['ChevronDownFill', IconChevronDownFill],
                ['MenuFill', IconMenuFill], ['CloseFill', IconCloseFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">액션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['SearchFill', IconSearchFill], ['PlusFill', IconPlusFill], ['MinusFill', IconMinusFill], ['CheckFill', IconCheckFill],
                ['EditFill', IconEditFill], ['DeleteFill', IconDeleteFill], ['ShareFill', IconShareFill], ['DownloadFill', IconDownloadFill],
                ['UploadFill', IconUploadFill], ['RefreshFill', IconRefreshFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">커뮤니케이션</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['NotificationFill', IconNotificationFill], ['MailFill', IconMailFill], ['ChatFill', IconChatFill], ['PhoneFill', IconPhoneFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">사용자</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['UserFill', IconUserFill], ['SettingsFill', IconSettingsFill], ['LogoutFill', IconLogoutFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">상태</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['InfoFill', IconInfoFill], ['WarningFill', IconWarningFill], ['ErrorFill', IconErrorFill],
                ['SuccessFill', IconSuccessFill], ['HelpFill', IconHelpFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">미디어</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['ImageFill', IconImageFill], ['CameraFill', IconCameraFill], ['PlayFill', IconPlayFill], ['PauseFill', IconPauseFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">기타</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {([
                ['HomeFill', IconHomeFill], ['BookmarkFill', IconBookmarkFill], ['HeartFill', IconHeartFill],
                ['StarFill', IconStarFill], ['FilterFill', IconFilterFill], ['EyeFill', IconEyeFill],
              ] as [string, React.FC<{ size?: number }>][]).map(([name, Icon]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                    <Icon size={24} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary text-center leading-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size comparison */}
          <div>
            <h3 className="text-sm font-semibold text-text-secondary mb-4">사이즈 비교</h3>
            <div className="flex items-end gap-6">
              {[16, 20, 24, 32].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <IconHeartFill size={s} />
                  <span className="typo-caption2 text-text-tertiary">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SF Symbols 기능 ═══════════ */}
        <section id="icons-sf-symbols" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-text-strong mb-2">SF Symbols 기능</h2>
          <p className="text-sm text-text-secondary mb-8">
            렌더링 모드 4종 &middot; Weight 9단계 &middot; Scale 3단계 &middot; Variable Color &middot; 애니메이션 6종
          </p>

          {/* 1. Rendering Modes */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">1. 렌더링 모드</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {/* Monochrome */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Monochrome</span>
                <div className="flex gap-3">
                  <IconNotification size={32} renderingMode="monochrome" color="#0069FF" />
                  <IconError size={32} renderingMode="monochrome" color="#0069FF" />
                  <IconHome size={32} renderingMode="monochrome" color="#0069FF" />
                </div>
                <span className="typo-caption2 text-text-tertiary">단일 색상</span>
              </div>
              {/* Hierarchical */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Hierarchical</span>
                <div className="flex gap-3">
                  <IconNotification size={32} renderingMode="hierarchical" color="#0069FF" />
                  <IconError size={32} renderingMode="hierarchical" color="#0069FF" />
                  <IconHome size={32} renderingMode="hierarchical" color="#0069FF" />
                </div>
                <span className="typo-caption2 text-text-tertiary">단일 색상 + 계층 투명도</span>
              </div>
              {/* Palette */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Palette</span>
                <div className="flex gap-3">
                  <IconNotification size={32} renderingMode="palette" paletteColors={['#0069FF', '#FF3A5B']} />
                  <IconError size={32} renderingMode="palette" paletteColors={['#0069FF', '#FF3A5B']} />
                  <IconHome size={32} renderingMode="palette" paletteColors={['#0069FF', '#FF3A5B']} />
                </div>
                <span className="typo-caption2 text-text-tertiary">레이어별 사용자 색상</span>
              </div>
              {/* Multicolor */}
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Multicolor</span>
                <div className="flex gap-3">
                  <IconWarning size={32} renderingMode="multicolor" multicolorMap={{ primary: '#FF8800', secondary: '#FFFFFF' }} />
                  <IconError size={32} renderingMode="multicolor" multicolorMap={{ primary: '#F51441', secondary: '#FFFFFF' }} />
                  <IconSuccess size={32} renderingMode="multicolor" multicolorMap={{ primary: '#04CA81', secondary: '#FFFFFF' }} />
                </div>
                <span className="typo-caption2 text-text-tertiary">고유 색상 매핑</span>
              </div>
            </div>

            {/* Fill 렌더링 모드 */}
            <h4 className="text-xs font-semibold text-text-tertiary mt-6 mb-3">Fill 변형 렌더링 모드</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Monochrome</span>
                <div className="flex gap-3">
                  <IconErrorFill size={32} renderingMode="monochrome" color="#F51441" />
                  <IconSuccessFill size={32} renderingMode="monochrome" color="#04CA81" />
                  <IconWarningFill size={32} renderingMode="monochrome" color="#FF8800" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Hierarchical</span>
                <div className="flex gap-3">
                  <IconErrorFill size={32} renderingMode="hierarchical" color="#F51441" />
                  <IconSuccessFill size={32} renderingMode="hierarchical" color="#04CA81" />
                  <IconWarningFill size={32} renderingMode="hierarchical" color="#FF8800" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Palette</span>
                <div className="flex gap-3">
                  <IconErrorFill size={32} renderingMode="palette" paletteColors={['#F51441', '#FFFFFF']} />
                  <IconSuccessFill size={32} renderingMode="palette" paletteColors={['#04CA81', '#FFFFFF']} />
                  <IconWarningFill size={32} renderingMode="palette" paletteColors={['#FF8800', '#141A24']} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <span className="typo-caption1 font-semibold text-text-secondary">Multicolor</span>
                <div className="flex gap-3">
                  <IconErrorFill size={32} renderingMode="multicolor" multicolorMap={{ primary: '#F51441', secondary: '#FFFFFF' }} />
                  <IconSuccessFill size={32} renderingMode="multicolor" multicolorMap={{ primary: '#04CA81', secondary: '#FFFFFF' }} />
                  <IconWarningFill size={32} renderingMode="multicolor" multicolorMap={{ primary: '#FF8800', secondary: '#141A24' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Weights */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">2. Weight</h3>
            <div className="flex flex-wrap gap-4">
              {(['ultralight', 'thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'heavy', 'black'] as IconWeight[]).map((w) => (
                <div key={w} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-background border border-border">
                    <IconHeart size={28} weight={w} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary capitalize">{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Scales */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">3. Scale</h3>
            <div className="flex items-end gap-8">
              {(['small', 'medium', 'large'] as IconScale[]).map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg bg-background border border-border p-3">
                    <IconStar size={24} scale={s} />
                  </div>
                  <span className="typo-caption2 text-text-tertiary capitalize">{s}</span>
                </div>
              ))}
            </div>
            <p className="typo-caption2 text-text-tertiary mt-2">
              Small: 1x &middot; Medium: 1.15x &middot; Large: 1.3x (텍스트 대비 자동 스케일)
            </p>
          </div>

          {/* 4. Design Variants */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">4. 디자인 변형 (Line ↔ Fill)</h3>
            <div className="flex flex-wrap gap-6">
              {([
                ['Heart', IconHeart, IconHeartFill],
                ['Star', IconStar, IconStarFill],
                ['Home', IconHome, IconHomeFill],
                ['Bookmark', IconBookmark, IconBookmarkFill],
                ['Notification', IconNotification, IconNotificationFill],
                ['Error', IconError, IconErrorFill],
              ] as [string, React.FC<ComponentProps<typeof IconHeart>>, React.FC<ComponentProps<typeof IconHeartFill>>][]).map(([name, Line, Fill]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                      <Line size={24} />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border">
                      <Fill size={24} />
                    </div>
                  </div>
                  <span className="typo-caption2 text-text-tertiary">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Variable Color */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">5. Variable Color</h3>
            <p className="typo-caption2 text-text-tertiary mb-3">값(0~100)에 따라 레이어별 활성화 임계치 적용</p>
            <div className="flex flex-wrap gap-4">
              {[0, 25, 50, 75, 100].map((v) => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-background border border-border">
                    <IconNotification
                      size={28}
                      color="#0069FF"
                      variableColor={{ value: v, layers: ['secondary', 'primary'] }}
                    />
                  </div>
                  <span className="typo-caption2 text-text-tertiary">{v}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Animations */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">6. 애니메이션</h3>
            <div className="flex flex-wrap gap-6">
              {(['none', 'bounce', 'scale', 'pulse', 'rotate', 'wiggle', 'breathe'] as IconAnimation[]).map((a) => (
                <div key={a} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-background border border-border">
                    <IconNotification size={28} animation={a} color="#0069FF" />
                  </div>
                  <span className="typo-caption2 text-text-tertiary capitalize">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. 조합 예시 */}
          <div>
            <h3 className="text-sm font-semibold text-text-secondary mb-4">7. 조합 예시</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border">
                <IconErrorFill size={32} renderingMode="palette" paletteColors={['#F51441', '#FFFFFF']} weight="bold" scale="large" />
                <span className="typo-caption2 text-text-tertiary text-center">Palette + Bold<br/>+ Large</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border">
                <IconNotification size={32} renderingMode="hierarchical" color="#0069FF" weight="semibold" animation="wiggle" />
                <span className="typo-caption2 text-text-tertiary text-center">Hierarchical<br/>+ Wiggle</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border">
                <IconHeartFill size={32} renderingMode="monochrome" color="#F51441" animation="pulse" scale="large" />
                <span className="typo-caption2 text-text-tertiary text-center">Monochrome + Pulse<br/>+ Large</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border">
                <IconHome size={32} renderingMode="palette" paletteColors={['#0069FF', '#FF8800']} weight="light" />
                <span className="typo-caption2 text-text-tertiary text-center">Palette + Light<br/>Weight</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background border border-border">
                <IconSuccessFill size={32} renderingMode="multicolor" multicolorMap={{ primary: '#04CA81', secondary: '#FFFFFF' }} animation="bounce" />
                <span className="typo-caption2 text-text-tertiary text-center">Multicolor<br/>+ Bounce</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
