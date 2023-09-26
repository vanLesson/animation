import {SkImage} from '@shopify/react-native-skia';

export type ColorShema = 'light' | 'dark';
interface IColorShema {
  colorShema: ColorShema;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
  active: boolean;
  statusBarStyle: ColorShema;
}
