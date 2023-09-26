import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeIcon from '../../../assets/HomeIcon';
import {ColorShema} from '../../../common/types/theme';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../Constants';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 32,
  },
  block: {
    width: 24,
    height: 24,
  },
});
export const SIZE = width / 5;

const StaticTabbar = ({colorScheme}: {colorScheme: ColorShema}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const onStiky = () => {
    // @ts-ignore
    navigation.navigate(SCREEN_NAMES.STICKY);
  };
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: 16 + insets.bottom},
        colorScheme === 'light'
          ? {backgroundColor: 'white'}
          : {backgroundColor: 'black'},
      ]}>
      <TouchableOpacity onPress={() => {}}>
        <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <HomeIcon />
      </TouchableOpacity>
      <View style={styles.block} />
      <TouchableOpacity onPress={() => {}}>
        <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={onStiky}>
        <HomeIcon />
      </TouchableOpacity>
    </View>
  );
};

export default StaticTabbar;
