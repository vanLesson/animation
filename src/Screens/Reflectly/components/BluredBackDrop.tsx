// import React, {useReducer} from 'react';
// import {Appearance, Pressable, StyleSheet} from 'react-native';
// import Animated, {
//   withTiming,
//   useAnimatedProps,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
// import {
//   Canvas,
//   Circle,
//   Image,
//   ImageShader,
//   LinearGradient,
//   vec,
// } from '@shopify/react-native-skia';
// import {HEIGHT, WIDTH} from '../../../Constants';
// import BlurGradient from '../../GradientBackground/components/BlurGradient';
//
// interface BackdropProps {
//   open: Animated.SharedValue<number>;
// }
// const defaultValue = {
//   overlay1: null,
//   overlay2: null,
//   active: false,
// };
// const colorSchemeReducer = (_, colorScheme) => {
//   return colorScheme;
// };
//
// export default ({open}: BackdropProps) => {
//   const animatedProps = useAnimatedProps(() => ({
//     pointerEvents: open.value < 1 ? ('none' as const) : ('box-none' as const),
//   }));
//   // const style = useAnimatedStyle(() => ({
//   //   backgroundColor: '#000000',
//   //   opacity: 0.6 * open.value,
//   // }));
//
//   return (
//     <Animated.View
//       style={[StyleSheet.absoluteFill]}
//       animatedProps={animatedProps}>
//       <Pressable
//         style={StyleSheet.absoluteFill}
//         onPress={() => (open.value = withTiming(0))}
//       />
//       <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
//         <BlurGradient>
//           <Image image={overlay1} x={0} y={0} width={WIDTH} height={HEIGHT} />
//           {overlay2 && (
//             <ImageShader
//               image={overlay2}
//               x={0}
//               y={0}
//               width={WIDTH}
//               height={HEIGHT}
//               fit={'cover'}
//             />
//           )}
//         </BlurGradient>
//       </Canvas>
//     </Animated.View>
//   );
// };
