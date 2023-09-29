import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

import StaticTabbar, {SIZE} from './StaticTabbar';
import Row from './Row';
import CloseIcon from '../../../assets/CloseIcon';
import ViewPassIcon from '../../../assets/ViewPassIcon';
import BlockProgressIcon from '../../../assets/BlockProgressIcon';
import ModuleProgressIcon from '../../../assets/ModuleProgressIcon';
import {mix} from 'react-native-redash';
import {useColorScheme} from '../../../common/contexts/theme';

const R = SIZE / 4;
const COLOR_light = '#02CBD6';
const END_COLOR_light = '#00B4D4';
const COLOR = '#51d710';
const END_COLOR = '#003b46';
const WIDTH = 3.14 * SIZE;
const HEIGHT = 3.5 * SIZE;

const styles = StyleSheet.create({
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    height: 100,
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  icon: {
    width: SIZE,
    height: SIZE,
    borderRadius: R,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: (Dimensions.get('window').width - WIDTH) / 2,
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
  },
  items: {
    height: HEIGHT - SIZE,
    justifyContent: 'space-evenly',
  },
});

interface TabbarProps {
  open: Animated.SharedValue<number>;
}
const W_2 = (WIDTH - SIZE) / 2 - 2 * R;
const S = SIZE - 2 * R;
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const arc = (x: number, y: number, revers: boolean = false) =>
  `a ${R} ${R} 0 0 ${revers ? 0 : 1} ${x} ${y}`;
const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `h ${WIDTH - 2 * R}`,
  arc(R, R),
  `v  ${HEIGHT - SIZE - 2 * R}`,
  arc(-R, R),
  `h ${-W_2}`,
  arc(-R, R, true),
  `v ${S}`,
  arc(-R, R),
  `h ${-S}`,
  arc(-R, -R),
  `v ${-S}`,
  arc(-R, -R, true),
  `h ${-W_2}`,
  arc(-R, -R),
  'Z',
].join(' ');
const Tabbar = ({open}: TabbarProps) => {
  const {colorScheme} = useColorScheme();

  const insets = useSafeAreaInsets();
  const animatedProps = useAnimatedProps(() => {
    const height = mix(open.value, SIZE, HEIGHT);
    const width = interpolate(
      height,
      [2 * SIZE, HEIGHT],
      [SIZE, WIDTH],
      Extrapolation.CLAMP,
    );
    const x = interpolate(width, [SIZE, WIDTH], [WIDTH / 2 - SIZE / 2, 0]);
    const y = interpolate(height, [SIZE, HEIGHT], [HEIGHT - SIZE, 0]);

    return {x, y, width, height};
  });
  // @ts-ignore
  const icon = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: !open.value ? '-0.78rad' : mix(open.value, -Math.PI / 4, 0),
        },
      ],
    };
  });
  const item = useAnimatedStyle(() => {
    return {
      opacity: interpolate(open.value, [0.75, 1], [0, 1], Extrapolation.CLAMP),
      transform: [{translateY: mix(open.value, HEIGHT + insets.bottom, 0)}],
    };
  });
  const {saveOverlay} = useColorScheme();

  return (
    <>
      <View>
        <View>
          <StaticTabbar colorScheme={colorScheme} />
          <View
            style={[styles.overlay, {paddingBottom: insets.bottom}]}
            pointerEvents="none">
            <Svg width={WIDTH} height={HEIGHT}>
              <Defs>
                <LinearGradient
                  id="gradient"
                  x1={WIDTH / 2}
                  y1={0}
                  x2={WIDTH / 2}
                  y2={HEIGHT}
                  gradientUnits="userSpaceOnUse">
                  <Stop
                    offset={0}
                    stopColor={
                      colorScheme === 'light' ? END_COLOR_light : END_COLOR
                    }
                  />
                  <Stop
                    offset={1}
                    stopColor={colorScheme === 'light' ? COLOR_light : COLOR}
                  />
                </LinearGradient>
                <Mask id={'mask'}>
                  <AnimatedRect
                    animatedProps={animatedProps}
                    rx={R}
                    ry={R}
                    fill={'white'}
                  />
                </Mask>
              </Defs>
              <Path d={d} fill={'url(#gradient)'} mask={'url(#mask)'} />
            </Svg>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await saveOverlay();
            }}
            style={[styles.overlay, {paddingBottom: insets.bottom}]}>
            <Animated.View style={[styles.icon, icon]}>
              <View>
                <CloseIcon color={'#ffffff'} />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.content,
          {
            bottom: insets.bottom,
          },
        ]}
        pointerEvents="box-none">
        <Animated.View style={[styles.items, item]}>
          <Row label="Mood check-in">
            <ModuleProgressIcon />
          </Row>
          <Row label="Change Theme">
            <ViewPassIcon color={'#ffffff'} />
          </Row>
          <Row label="Add Photo">
            <BlockProgressIcon color={'#ffffff'} />
          </Row>
        </Animated.View>
      </View>
    </>
  );
};

export default Tabbar;
