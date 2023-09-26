import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  Appearance,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Canvas,
  dist,
  Image,
  makeImageFromView,
  SkImage,
  vec,
  Circle,
  mix,
  ImageShader,
} from '@shopify/react-native-skia';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const palette = {
  black: '#0B0B0B',
  white: '#F0F2F3',
  lightGray: 'rgba(0, 0, 0, 0.04)',
  darkGray: '#3B3B3B',
};
export const theme = {
  colorScheme: 'light',
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    secondaryBackground: palette.lightGray,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {
      color: 'mainForeground',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'SFProDisplayBold',
    },
    item: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'SFProDisplayBold',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
  },
};

export const darkTheme = {
  ...theme,
  colorScheme: 'dark',
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    secondaryBackground: palette.darkGray,
  },
};
export type ColorSchemeName = 'light' | 'dark';

interface ColorScheme {
  colorScheme: ColorSchemeName;
  //ref: RefObject<View>;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
  active: boolean;
  statusBarColor: ColorSchemeName;
}

interface ColorSchemeContext extends ColorScheme {
  dispatch: (scheme: ColorScheme) => void;
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{x: number; y: number; r: number}>;
}
interface ColorSchemeProviderProps {
  children: ReactNode;
}
const defaultValue: ColorScheme = {
  colorScheme: Appearance.getColorScheme() ?? 'light',
  overlay1: null,
  overlay2: null,
  active: false,
  statusBarColor:
    (Appearance.getColorScheme() ?? 'light') === 'light' ? 'dark' : 'light',
};
const {width, height} = Dimensions.get('window');

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);
const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error('No ColorScheme context context found');
  }
  const {colorScheme, dispatch, circle, transition, active, ref} = ctx;
  const toggle = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';

      dispatch({
        statusBarColor: newColorScheme,
        colorScheme,
        overlay1: null,
        overlay2: null,
        active: true,
      });
      circle.value = {
        x,
        y,
        r: Math.max(...corners.map(c => dist(c, vec(x, y)))),
      };
      const overlay1 = await makeImageFromView(ref);
      dispatch({
        statusBarColor: newColorScheme,

        colorScheme,
        overlay1,
        overlay2: null,
        active: true,
      });
      await wait(16);
      dispatch({
        statusBarColor: newColorScheme,

        colorScheme: newColorScheme,
        overlay1,
        overlay2: null,
        active: true,
      });
      await wait(16);
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        statusBarColor: newColorScheme,

        colorScheme: newColorScheme,
        overlay1,
        overlay2,
        active: true,
      });
      const duration = 650;
      transition.value = 0;
      transition.value = withTiming(1, {duration});
      await wait(duration);
      dispatch({
        statusBarColor: colorScheme,

        colorScheme: newColorScheme,
        overlay1: null,
        overlay2: null,
        active: false,
      });
    },
    [colorScheme, dispatch, ref, transition, circle],
  );
  return {colorScheme, toggle, active};
};

export const ColorSchemeProvider = ({children}: ColorSchemeProviderProps) => {
  const transition = useSharedValue(0);
  const circle = useSharedValue({x: 0, y: 0, r: 0});
  const [{colorScheme, overlay1, statusBarColor, overlay2, active}, dispatch] =
    useReducer(colorSchemeReducer, defaultValue);
  const ref = useRef(null);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={statusBarColor === 'dark' ? 'dark-content' : 'light-content'}
      />
      <View style={{flex: 1}} ref={ref}>
        <ColorSchemeContext.Provider
          value={{
            statusBarColor,
            colorScheme,
            dispatch,
            ref,
            overlay1,
            overlay2,
            transition,
            circle,
            active,
          }}>
          {children}
        </ColorSchemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
        <Image image={overlay1} x={0} y={0} width={width} height={height} />
        {overlay2 && (
          <Circle c={circle} r={r}>
            <ImageShader
              image={overlay2}
              x={0}
              y={0}
              width={width}
              height={height}
              fit={'cover'}
            />
          </Circle>
        )}
      </Canvas>
    </View>
  );
};
