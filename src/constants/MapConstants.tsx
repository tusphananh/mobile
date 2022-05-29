import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface MapNavigatorItem {
  icon: IconProp;
  color: string;
  onPress?: () => void;
}
