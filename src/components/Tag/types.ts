export type TagType = 'fill-light' | 'fill-dark' | 'fill' | 'outlined' | 'text';
export type TagSize = 'sm' | 'md' | 'lg';
export type TagColor =
  | 'indigo'
  | 'blue'
  | 'red'
  | 'orange'
  | 'green'
  | 'lightblue'
  | 'purple'
  | 'magenta'
  | 'cyan'
  | 'lime'
  | 'redorange'
  | 'gray';

export type TagGroupType =
  | 'fill-light'
  | 'fill-dark'
  | 'fill'
  | 'outlined'
  | 'basic';

export type DividerStyle = 'dot' | 'slash';

export interface TagProps {
  /** 컨테이너 스타일 */
  type?: TagType;
  /** 크기 (높이 20/24/28px) */
  size?: TagSize;
  /** Bold 여부 -- true 시 SemiBold(600) */
  bold?: boolean;
  /** 강조 색상 */
  color?: TagColor;
  /** 라벨 텍스트 (필수) */
  label: string;
  /** 왼쪽 아이콘 */
  leadingIcon?: React.ReactNode;
  /** 왼쪽 아이콘 표시 여부 */
  showLeadingIcon?: boolean;
  /** 추가 className */
  className?: string;
}

export interface TagGroupProps {
  /** Tag Group 타입 (자식 Tag의 type 결정) */
  type?: TagGroupType;
  /** Tag 사이 구분자 표시 여부 */
  showDivider?: boolean;
  /** 구분자 스타일 */
  dividerStyle?: DividerStyle;
  /** Tag 간 간격 (px, 기본 8) */
  gap?: number;
  /** 자식 Tag 요소들 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}
