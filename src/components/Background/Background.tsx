import React from 'react';
import {ImageBackground} from 'react-native';
import styles from './BackgroundStyles';
import BackgroundImage from '../../assets/images/background.jpg';
const Background: React.FC<{
  children: React.ReactElement[] | React.ReactElement;
}> = ({children}) => {
  return (
    <ImageBackground style={styles.background} source={BackgroundImage}>
      {Array.isArray(children) ? children : [children]}
    </ImageBackground>
  );
};

export default Background;
