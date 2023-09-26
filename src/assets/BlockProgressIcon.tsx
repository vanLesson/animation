import Svg, {Path} from 'react-native-svg';

export default ({color = '#23C461'}) => {
  return (
    <Svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 16 16"
      testID="block-progress-icon">
      <Path
        fill={color}
        d="M6 10.78L3.22 8l-.947.94L6 12.667l8-8-.94-.94L6 10.78z"
      />
    </Svg>
  );
};
