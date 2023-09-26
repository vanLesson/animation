import React, {useEffect, useState} from 'react';

import Slider from './components/Slider';
import Slide from './components/Slide';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../Constants';
import {useColorScheme} from '../../common/contexts/theme';

export default () => {
  const {colorScheme} = useColorScheme();

  const slides = [
    {
      color: colorScheme === 'light' ? '#F2A1AD' : '#e816ff',
      title: 'Animation',
      description:
        'Dive deep into the world of animation and understand the dynamics of motion in the digital realm.',
      picture: require('../../assets/1.png'),
    },
    {
      color: colorScheme === 'light' ? '#0090D6' : '#0047fa',
      title: 'Gesture',
      description:
        'Grasp the intricacies of human gestures and their digital representations. Turn subtle movements into impactful interactions.',
      picture: require('../../assets/5.png'),
    },
    {
      color: colorScheme === 'light' ? '#69C743' : '#f6b000',
      title: 'SVG',
      description:
        'Learn about Scalable Vector Graphics (SVG) and its applications in presenting crisp visuals without pixel-based limitations.',
      picture: require('../../assets/4.png'),
    },
    {
      color: colorScheme === 'light' ? '#FB3A4D' : '#bb54ff',
      title: 'Skia',
      description:
        'Explore Skia, the graphics engine behind Chrome, and understand its potential in rendering high-quality visuals efficiently.',
      picture: require('../../assets/2.png'),
    },
    {
      color: colorScheme === 'light' ? '#F2AD62' : '#efd200',
      title: 'React native Animation',
      description: 'Go to example',
      picture: require('../../assets/3.png'),
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}>
      <Slide slide={slides[index]!} />
    </Slider>
  );
};
