import { IconProps, IconLayer } from './types';
import IconBase from './IconBase';

const fillLayers: IconLayer[] = [
  { path: 'm480-240-196 84q-30 13-57-5t-27-50v-574q0-24 18-42t42-18h440q24 0 42 18t18 42v574q0 32-27 50t-57 5l-196-84Z', level: 'primary' },
];

export default function BookmarkFill(props: IconProps) {
  return <IconBase {...props} fillLayers={fillLayers} variant="fill" />;
}
