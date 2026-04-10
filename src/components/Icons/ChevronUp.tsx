import { IconProps, IconLayer } from './types';
import IconBase from './IconBase';

const lineLayers: IconLayer[] = [
  { path: 'M480-554 304-378q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l197-197q9-9 21-9t21 9l198 198q9 9 9 21t-9 21q-9 9-21.5 9t-21.5-9L480-554Z', level: 'primary' },
];

export default function ChevronUp(props: IconProps) {
  return <IconBase {...props} lineLayers={lineLayers} variant="line" />;
}
