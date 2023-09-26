import React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

function Icon({width = 24, height = 24, color = '#2F2F37'}) {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <G clipPath="url(#clip0_4990_28547)">
        <Path
          fill={color}
          d="M17.613 15.515a9.75 9.75 0 10-2.095 2.098h-.002c.045.06.093.117.147.172l5.775 5.775a1.5 1.5 0 102.123-2.121l-5.775-5.775a1.498 1.498 0 00-.173-.149zM18 9.75a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4990_28547">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Icon;
