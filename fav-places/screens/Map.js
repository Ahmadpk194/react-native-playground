import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/ui/IconButton';

function Map({ navigation, route }) {
  const initLocation = route.params ? { lat: route.params.initLat, lng: route.params.initLng } : null;

  const [selectedLocation, setSelectedLocation] = useState(initLocation);

  const region = {
    latitude: initLocation ? initLocation.lat : 46.8182,
    longitude: initLocation ? initLocation.lng : 8.2275,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };


  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng })
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "You have to pick a location by tapping on the map first!");

      return;
    };

    navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initLocation) {
      return; // hide save button if we are from place details page
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton icon={'save'} size={24} color={tintColor} onPress={savePickedLocationHandler} />
    })
  }, [navigation, savePickedLocationHandler, initLocation])

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler} >
      {selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation?.lat, longitude: selectedLocation?.lng }} />}
    </MapView>
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
