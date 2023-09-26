import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import Tabbar from './components/Tabbar';
import Backdrop from './components/Backdrop';
import {darkTheme, theme, useColorScheme} from '../../common/contexts/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#f5eeee',
  },
});
const Reflectly = ({children}) => {
  const open = useSharedValue(0);
  const {colorScheme} = useColorScheme();

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'dark'
        ? darkTheme.colors.mainBackground
        : theme.colors.mainBackground,
  };
  return (
    <View style={[styles.container, backgroundStyle]}>
      {children}
      <Backdrop open={open} />
      <Tabbar open={open} />
    </View>
  );
};

export default Reflectly;
