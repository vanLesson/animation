import Svg, {Path} from 'react-native-svg';
import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';
import {
  addCurve,
  addLine,
  createPath,
  mix,
  serialize,
} from 'react-native-redash';
const V_FACTOR = 2.5;
const H_FACTOR = 0.4;
export const SIZE = 150;
export const MAX_HEIGHT = SIZE * V_FACTOR;

const AnimatedPath = Animated.createAnimatedComponent(Path);
interface IShapeProps {
  progress: SharedValue<number>;
  isOnTop: SharedValue<boolean>;
}
export default ({progress, isOnTop}: IShapeProps) => {
  const animatedProps = useAnimatedProps(() => {
    const distortion = {
      x: mix(progress.value, 0, SIZE * H_FACTOR),
      y: mix(progress.value, 1, V_FACTOR),
    };
    const p1 = {x: 0, y: 0};
    const p2 = {x: SIZE, y: 0};
    const p3 = {x: SIZE - distortion.x, y: SIZE * distortion.y};
    const p4 = {x: distortion.x, y: SIZE * distortion.y};
    const path = createPath(p1);
    addLine(path, p2);
    addCurve(path, {to: p3, c1: {x: p2.x, y: 0}, c2: {x: p3.x, y: 0}});
    addLine(path, p4);
    addCurve(path, {to: p1, c1: {x: p4.x, y: 0}, c2: {x: p1.x, y: 0}});

    return {
      d: serialize(path),
    };
  });
  return (
    <Svg>
      <AnimatedPath animatedProps={animatedProps} fill={'#7EDAB9'} />
    </Svg>
  );
};
