/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SCREEN_NAMES} from './Constants';
import Home from './Screens/Home';
import Reflectly from './Screens/Reflectly';
import {darkTheme, theme, useColorScheme} from './common/contexts/theme';
import StikyShapes from './Screens/StikyShapes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default (): JSX.Element => {
  const {colorScheme} = useColorScheme();

  const backgroundStyle = {
    backgroundColor:
      colorScheme === 'dark'
        ? darkTheme.colors.mainBackground
        : theme.colors.mainBackground,
  };

  return (
    <GestureHandlerRootView style={[backgroundStyle, {flex: 1}]}>
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationContainer>
          <Reflectly>
            <Stack.Navigator
              initialRouteName={SCREEN_NAMES.HOME}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={SCREEN_NAMES.HOME} component={Home} />
              <Stack.Screen
                name={SCREEN_NAMES.STICKY}
                component={StikyShapes}
              />
            </Stack.Navigator>
          </Reflectly>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
