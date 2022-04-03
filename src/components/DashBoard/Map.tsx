import MapboxGL from '@react-native-mapbox-gl/maps'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MAPBOX_TOKEN } from 'react-native-dotenv'

MapboxGL.setAccessToken(MAPBOX_TOKEN)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
})

const Map = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  )
}

export default Map
