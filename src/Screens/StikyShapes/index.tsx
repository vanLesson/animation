import Svg, {Path} from 'react-native-svg';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

export const SIZE = 150;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const d = `M 0 ${SIZE}`;
interface IShapeProps {}
export default () => {
  const animatedProps = useAnimatedProps(() => {
    return {
      d: d,
    };
  });
  return (
    <Svg>
      <AnimatedPath animatedProps={animatedProps} />
    </Svg>
  );
};
