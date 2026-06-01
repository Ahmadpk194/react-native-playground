import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlinedButton from '../components/ui/OutlinedButton'
import { COLORS } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails, fetchPlaces } from '../utils/database';

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFechedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate('Map', {
      initLat: fetchedPlace.lat, initLng: fetchedPlace.lng
    })
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // use selectedplaceId to fetch data for a single place
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFechedPlace(place)

      navigation.setOptions({
        title: place.title,
      })
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading place data...</Text>
    </View>
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon={'map'} onPress={showOnMapHandler} >View on Map</OutlinedButton>
      </View>
    </ScrollView>
  )
}

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: COLORS.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})
