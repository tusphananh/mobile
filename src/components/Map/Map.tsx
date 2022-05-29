import {
  faLocationArrow,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BlurView} from '@react-native-community/blur';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Animated, Easing, TouchableOpacity, View} from 'react-native';
import uuid from 'react-native-uuid';
import env from '../../config/env';
import {Position} from '../../constants/DashBoardConstants';
import {MapNavigatorItem} from '../../constants/MapConstants';
import {primaryColor} from '../globalStyles';
import styles from './MapStyles';
MapboxGL.setAccessToken(env.MAPBOX_TOKEN);

const Marker: React.FC<{position: Position; isMe?: boolean}> = ({
  position,
  isMe,
}) => {
  const [progress] = useState(new Animated.Value(10));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 40,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 10,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapboxGL.PointAnnotation
      id={uuid.v4().toString()}
      coordinate={[position.lng, position.lat]}>
      <Animated.View
        style={[
          isMe ? styles.marker_outter__green : styles.marker_outter__red,
          styles.marker_outter,
          {width: progress, height: progress},
        ]}>
        <View
          style={[
            isMe ? styles.marker__green : styles.marker__red,
            styles.marker,
          ]}
        />
      </Animated.View>
    </MapboxGL.PointAnnotation>
  );
};

const MapNavigator: React.FC<{
  navigatorItems: MapNavigatorItem[];
}> = ({navigatorItems}) => {
  return (
    <Fragment>
      {navigatorItems.map(item => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={uuid.v4().toString()}
          onPress={item.onPress}>
          <BlurView
            style={styles.zoomBtn}
            blurType="dark"
            blurAmount={10}
            blurRadius={10}
            overlayColor="transparent">
            <FontAwesomeIcon icon={item.icon} color={item.color} />
          </BlurView>
        </TouchableOpacity>
      ))}
    </Fragment>
  );
};
const Map: React.FC<{curPos?: Position; children?: JSX.Element}> = ({
  curPos,
  children,
}) => {
  const [curZoomLevel, setCurZoomLevel] = useState(15);
  const camera = useRef<MapboxGL.Camera | null>(null);
  const [navigatorItems] = useState([
    {
      icon: faPlus,
      color: primaryColor,
      onPress: () => {
        setCurZoomLevel(prev => prev + 1);
      },
    },
    {
      icon: faMinus,
      color: primaryColor,
      onPress: () => {
        setCurZoomLevel(prev => prev - 1);
      },
    },
    {
      icon: faLocationArrow,
      color: primaryColor,
      onPress: () => {
        camera.current?.flyTo([curPos?.lng, curPos?.lat]);
      },
    },
  ]);

  return (
    <View style={styles.container}>
      {children}
      <View style={[styles.zoomContainer]}>
        <MapNavigator navigatorItems={navigatorItems} />
      </View>
      <MapboxGL.MapView
        logoEnabled={false}
        styleURL="mapbox://styles/mapbox/dark-v10"
        style={[styles.map]}>
        {curPos && (
          <MapboxGL.Camera
            ref={camera}
            zoomLevel={curPos ? curZoomLevel : 5}
            animationMode="flyTo"
            centerCoordinate={[curPos.lng, curPos.lat]}
          />
        )}

        {curPos && <Marker position={curPos} isMe />}
      </MapboxGL.MapView>
    </View>
  );
};

export default Map;
