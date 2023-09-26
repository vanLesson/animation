import Svg, {Path} from 'react-native-svg';

export default ({color = '#f5f5f5', fill = 'rgba(238,249,242,0)'}) => {
  return (
    <Svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 16 17"
      testID="module-progress-icon">
      <Path
        fill={fill}
        stroke={color}
        d="M15.5 8.147c0 4.232-3.366 7.646-7.5 7.646S.5 12.38.5 8.147C.5 3.915 3.866.5 8 .5s7.5 3.415 7.5 7.647z"
      />
      <Path
        fill={color}
        d="M6.498 9.718L4.413 7.633l-.71.705 2.795 2.795 6-6-.705-.705-5.295 5.29z"
      />
    </Svg>
  );
};
