import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {useColorScheme} from '../common/contexts/theme';

function Icon({color = '#7E7E7E'}) {
  const {colorScheme} = useColorScheme();

  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill={colorScheme === 'light' ? color : 'white'}
        d="M13.06 2.25a1.5 1.5 0 00-2.12 0L.969 12.219a.751.751 0 001.062 1.062L3 12.31v7.939a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25v-7.94l.969.97a.75.75 0 101.062-1.061L19.5 8.689V3.75a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v1.94l-3.44-3.44zm6.44 8.56v9.44a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-9.44l7.5-7.5 7.5 7.5z"
      />
    </Svg>
  );
}

export default Icon;
