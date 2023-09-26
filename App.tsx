/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ColorSchemeProvider} from './src/common/contexts/theme';
import AppProvider from './src/AppProvider';

function App(): JSX.Element {
  return (
    <ColorSchemeProvider>
      <AppProvider />
    </ColorSchemeProvider>
  );
}

export default App;
