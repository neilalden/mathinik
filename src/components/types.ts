import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {ArgFunction} from '../common/types';

export type ScreenPropType = {
  style?: StyleProp<ViewStyle>;
  isBGGradient?: boolean;
  children: React.ReactNode;
};

export type IconPropType = {
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
  containerStyle?: StyleProp<ViewStyle>;
  size: number;
  onPress?: VoidFunction | ArgFunction;
};

export type HeaderPropType = {
  text?: string;
  Button?: React.ReactNode;
  canGoBack?: boolean;
};

export type ButtonPropType = {
  onPress: VoidFunction | ArgFunction;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  gradientColor?: Array<string>;
};
