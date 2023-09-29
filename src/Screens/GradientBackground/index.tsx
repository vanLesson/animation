import {StyleSheet} from 'react-native';
import {
  Canvas,
  ImageShader,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import BlurGradient from './components/BlurGradient';
import {HEIGHT, WIDTH} from '../../Constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ColorSchemeContext} from '../../common/contexts/theme';
import {useContext} from 'react';

interface IGBG {
  open: SharedValue<number>;
}
export default ({open}: IGBG) => {
  // const bluredImage = useImage(require('../../assets/zurich3.jpg'));
  const scrollY = useSharedValue(0);

  // @ts-ignore
  const {savedOverly} = useContext(ColorSchemeContext);
  console.log('savedOverly', savedOverly);
  const stales = useAnimatedStyle(() => {
    return {
      opacity: withTiming(open.value, {duration: 100}),
    };
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFill, stales]}>
      {savedOverly && (
        <Canvas style={{flex: 1}}>
          <BlurGradient
            mask={
              <LinearGradient
                start={vec(10, 0)}
                colors={['transparent', 'transparent', 'black']}
                end={vec(0, 0)}
              />
            }>
            <ImageShader
              image={savedOverly}
              x={0}
              y={scrollY}
              width={WIDTH}
              height={HEIGHT}
              fit={'cover'}
            />
          </BlurGradient>
        </Canvas>
      )}
    </Animated.View>
  );
};
