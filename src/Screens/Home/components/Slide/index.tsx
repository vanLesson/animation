// @ts-ignore
import Color from 'color';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Defs, RadialGradient, Rect, Stop} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 60,
    paddingTop: 150,
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'SFProDisplay-Bold',
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
  },
});

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}

const Slide = ({slide: {picture, color, title, description}}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <FastImage source={picture} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.description}>{description}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Slide;
