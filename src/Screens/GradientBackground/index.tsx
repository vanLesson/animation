import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {
  Canvas,
  ImageShader,
  useImage,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import BlurGradient from './components/BlurGradient';
import {HEIGHT, WIDTH} from '../../Constants';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useColorScheme} from '../../common/contexts/theme';
export default () => {
  const bluredImage = useImage(require('../../assets/zurich3.jpg'));
  const scrollY = useSharedValue(0);

  // const {bluredImage} = useColorScheme();
  console.log('imageRef', bluredImage);
  return (
    <View style={[StyleSheet.absoluteFill]}>
      {bluredImage && (
        <Canvas style={{flex: 1}}>
          <BlurGradient
            mask={
              <LinearGradient
                start={vec(0, 0)}
                colors={['transparent', 'transparent', 'black']}
                end={vec(0, HEIGHT)}
              />
            }>
            <ImageShader
              image={bluredImage}
              x={0}
              y={scrollY}
              width={WIDTH}
              height={HEIGHT}
              fit={'cover'}
            />
          </BlurGradient>
        </Canvas>
      )}
    </View>
  );
};
