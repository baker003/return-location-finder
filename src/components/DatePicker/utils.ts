/**
 * DatePicker 순수 헬퍼 함수 모음 (외부 라이브러리 없음)
 */

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

/**
 * 주어진 year/month(0-indexed)의 6×7 달력 그리드 날짜 배열 반환.
 * 앞/뒤에 이전달·다음달 날짜 포함.
 */
export function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 일요일(0) 시작 — 첫째 날 요일만큼 이전 달 날짜 채우기
  const startOffset = firstDay.getDay(); // 0=Sun
  const days: CalendarDay[] = [];

  // 이전 달 날짜
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // 현재 달 날짜
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  // 다음 달 날짜 (6주 = 42칸 고정)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
  }

  return days;
}

/** Date → 표시용 문자열 (locale 기반) */
export function formatDate(date: Date | null, locale: string = 'ko-KR'): string {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** 년월 헤더용 포맷 */
export function formatYearMonth(year: number, month: number, locale: string = 'ko-KR'): string {
  const date = new Date(year, month, 1);
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date);
}

/** 두 날짜가 같은 날인지 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** date가 start와 end 사이인지 (start/end 당일 제외) */
export function isInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  if (s > e) return t > e && t < s;
  return t > s && t < e;
}

/** date가 비활성 여부 */
export function isDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
    return true;
  }
  if (maxDate) {
    const maxEnd = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() + 1);
    if (date >= maxEnd) return true;
  }
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

/** 오늘 날짜인지 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}
