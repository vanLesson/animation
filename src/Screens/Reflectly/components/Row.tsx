import React, {ComponentProps} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useColorScheme} from '../../../common/contexts/theme';

interface RowProps {
  label: string;
  children: ComponentProps<any>['name'];
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'GothamRounded-Medium',
    marginRight: 8,
  },
});

const Row = ({label, children}: RowProps) => {
  const {toggle, active, saveOverlay} = useColorScheme();

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(e => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });
  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {children}
      </View>
    </GestureDetector>
  );
};

export default Row;
