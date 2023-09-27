import {Path} from 'react-native-svg';
import {useRef, useState} from 'react';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';

interface IAnimatedStroke {
  d: string;
  progress: SharedValue<number>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ['#FFC27a', '#7EDAB9', '#45A6E5', '#FE8777'];

export default ({d, progress}: IAnimatedStroke) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const strokeDashOffset = useAnimatedProps(() => {
    return {
      strokeDashoffset:
        length -
        length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
    };
  });
  const strokeBackGround = useAnimatedProps(() => {
    return {
      strokeDashoffset:
        length -
        length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
    };
  });

  return (
    <>
      <AnimatedPath
        onLayout={() => {
          // @ts-ignore
          setLength(ref.current.getTotalLength());
        }}
        animatedProps={strokeBackGround}
        ref={ref}
        d={d}
        stroke={stroke}
        fill={'rgba(0,0,0,0)'}
        strokeWidth={10}
        strokeDasharray={length}
      />
      <AnimatedPath
        onLayout={() => {
          // @ts-ignore
          setLength(ref.current.getTotalLength());
        }}
        animatedProps={strokeDashOffset}
        ref={ref}
        d={d}
        stroke={'black'}
        fill={'rgba(0,0,0,0)'}
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
};
