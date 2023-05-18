import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, LocalTile, Marker, UrlTile } from 'react-native-maps';

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const initalMarkers = [
  {
    id: 1,
    latlng: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    title: 'Foo Place',
    description: 'This is a description of Foo Place',
  },
  {
    id: 2,
    latlng: {
      latitude: 38.4,
      longitude: -122.4324,
    },
    title: 'Bar Place',
    description: 'This is a description of Bar Place',
  },
];

export default function App() {
  const [region, setRegion] = useState(initialRegion);
  const [markers, setMarkers] = useState(initalMarkers);
  // useEffect(() => console.log(region), [region]);
  useEffect(() => console.log(markers), [markers]);

  const custom_pin = require('./assets/favicon.png');

  const handleDragEnd = (e: LatLng, id: number) => {
    const newMarkers = markers.map((marker) => {
      if (marker.id === id) {
        // ...marker,
        return {
          id: marker.id,
          title: marker.title,
          description: marker.description,
          latlng: {
            latitude: e.latitude,
            longitude: e.longitude,
          },
        };
      }
      return marker;
    });

    setMarkers(newMarkers);
    console.log(newMarkers);
  };

  return (
    <View style={styles.container}>
      <MapView region={region} onRegionChangeComplete={setRegion} style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            image={custom_pin}
            // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })
            onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate, marker.id)}
            draggable
          />
        ))}

        {/* Não vi nenhuma mudança com isso */}
        <UrlTile
          /**
           * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
           * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
           */
          urlTemplate={'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          /**
           * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
           * MKTileOverlay. iOS only.
           */
          maximumZ={19}
          /**
           * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
           * to be used. Its default value is false.
           */
          flipY={false}
        />
        <LocalTile
          /**
           * The path template of the locally stored tiles. The patterns {x} {y} {z} will be replaced at runtime
           * For example, /storage/emulated/0/mytiles/{z}/{x}/{y}.png
           */
          pathTemplate={'/storage/emulated/0/mytiles/{z}/{x}/{y}.png'}
          /**
           * The size of provided local tiles (usually 256 or 512).
           */
          tileSize={256}
        />
      </MapView>

          {/* <View */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  grid_buttons:{
    position: 'absolute',
    bottom: 8,
  }
});
