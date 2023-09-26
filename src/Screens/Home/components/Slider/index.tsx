import {Dimensions, StyleSheet, View} from 'react-native';
import Wave, {Side} from '../Wave';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint, useVector} from 'react-native-redash';
import {useEffect} from 'react';

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;
interface SliderProps {
  index: number;
  setIndex: (key: number) => void;
  children: JSX.Element;
  prev: JSX.Element;
  next: JSX.Element;
}
export default ({
  index,
  setIndex,
  children: current,
  prev,
  next,
}: SliderProps) => {
  const activeSide = useSharedValue(Side.NONE);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);
  const isTransitiongLeft = useSharedValue(false);
  const isTransitiongRight = useSharedValue(false);
  const hasPrev = !!prev;
  const hasNext = !!next;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({x}) => {
      if (x < MARGIN_WIDTH) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MARGIN_WIDTH) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({x, y}) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    },
    onEnd: ({x, velocityX, velocityY}) => {
      if (activeSide.value === Side.LEFT) {
        const snapPoints = [MIN_LEDGE, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitiongLeft.value = dest === WIDTH;
        left.x.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitiongLeft.value,
            restSpeedThreshold: isTransitiongLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitiongLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitiongLeft.value) {
              hasPrev && runOnJS(setIndex)(index - 1);
            }
          },
        );
      } else if (activeSide.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MIN_LEDGE, 0];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitiongRight.value = dest === 0;
        right.x.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitiongRight.value,
            restSpeedThreshold: isTransitiongRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitiongRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitiongRight.value) {
              hasNext && runOnJS(setIndex)(index + 1);
            }
          },
        );
      }
    },
  });
  const leftStyle = useAnimatedStyle(() => {
    return {
      zIndex: activeSide.value === Side.LEFT ? 100 : 0,
    };
  });
  useEffect(() => {
    left.x.value = withSpring(MIN_LEDGE);
    right.x.value = withSpring(MIN_LEDGE);
  }, [left.x, right.x]);
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[StyleSheet.absoluteFill, {zIndex: -1}]}>
        {current}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave
              side={Side.LEFT}
              position={left}
              isTransition={isTransitiongLeft}>
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <View style={[StyleSheet.absoluteFill]}>
            <Wave
              side={Side.RIGHT}
              position={right}
              isTransition={isTransitiongLeft}>
              {next}
            </Wave>
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};
