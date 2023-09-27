import {Dimensions, StyleSheet} from 'react-native';
import Stik, {MAX_HEIGHT, SIZE} from './components/Stik';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {mix, snapPoint} from 'react-native-redash';
import {HEIGHT, WIDTH} from '../Home/components/Slider';

export default () => {
  const isOnTop = useSharedValue(true);
  const sticked = useSharedValue(true);
  const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));
  const translateY = useSharedValue(0);
  const progress = useDerivedValue(
    () =>
      sticking.value *
      interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP),
  );
  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: ({translationY}) => {
        translateY.value = isOnTop.value ? translationY : -translationY;
        if (translateY.value > MAX_HEIGHT) {
          sticked.value = false;
        }
      },
      onEnd: ({velocityY: velocity}) => {
        const dest = snapPoint(translateY.value, velocity, [
          0,
          HEIGHT - SIZE - 150,
        ]);
        translateY.value = withSpring(dest, {velocity}, () => {
          sticked.value = true;
          if (dest !== 0) {
            isOnTop.value = !isOnTop.value;
            translateY.value = 0;
          }
        });
      },
    });
  // @ts-ignore
  const container = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: isOnTop.value ? '0rad' : mix(0, -Math.PI, 0),
        },
      ],
    };
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: (1 - sticking.value) * translateY.value,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: (WIDTH - SIZE) / 2,
          top: 0,
          bottom: 0,
          width: SIZE,
          height: Dimensions.get('window').height - 150,
        },
        container,
      ]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[StyleSheet.absoluteFill, style]}>
          <Stik progress={progress} isOnTop={isOnTop} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
