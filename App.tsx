import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
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
      <MapView
        initialRegion={region}
        // onRegionChangeComplete={setRegion}
        onRegionChange={setRegion}
        style={styles.map}>
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

      <View style={styles.grid_buttons}>
        <View
          style={styles.grid_text}>
          <Text style={styles.text}>
            {region.latitude.toString().substring(0, 8)},{' '}
            {region.longitude.toString().substring(0,10)}
          </Text>
        </View>

        <View style={styles.container_buttons}>
          <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          },
          styles.button]} >
            <Text>Jump</Text>
          </Pressable>
          <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          },
          styles.button]}>
            <Text>Animate</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: 'relative',
    justifyContent: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  grid_buttons: {
    position: 'absolute',
    bottom: 40,
    height: 'auto',

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    rowGap: 12,
  },

  grid_text:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },

  text: {
    textAlign: 'center',

    padding: 16,
    width: 240,
    backgroundColor: 'rgba(255, 255, 255, 0.712)',
    borderRadius: 30,

    fontSize: 14,
    fontWeight: '700',
  },

  container_buttons:{width: 240, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'},

  button: {
    width: '40%',
    borderRadius: 24,
    padding: 16,

    alignItems: 'center',
  },
});
