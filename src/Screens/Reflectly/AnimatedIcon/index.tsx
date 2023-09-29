import {StyleSheet, View} from 'react-native';
import HomeIcon from '../../../assets/HomeIcon';
import {useState} from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const tabs = [
  {icon: <HomeIcon />},
  {icon: <HomeIcon />},
  {icon: <HomeIcon />},
  {icon: <HomeIcon />},
];
export default () => {
  const [active, setisActive] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(() => {
          return <></>;
        })}
      </View>
    </View>
  );
};
