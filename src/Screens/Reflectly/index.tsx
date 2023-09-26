import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import Tabbar from './components/Tabbar';
import Backdrop from './components/Backdrop';
import {darkTheme, theme, useColorScheme} from '../../common/contexts/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
    <SafeAreaProvider style={{flex: 1}}>
      <View style={[styles.container, backgroundStyle]}>
        {children}
        <Backdrop open={open} />
        <View style={{bottom: 0, position: 'absolute'}}>
          <Tabbar open={open} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Reflectly;
