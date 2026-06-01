import { FlatList, StyleSheet, Text, View } from "react-native"
import PlaceItem from "./PlaceItem"
import { COLORS } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
    const navigation = useNavigation();

    function selectPlaceHandler(id) {
        navigation.navigate('PlaceDetails', {
            placeId: id
        })
    }

    if (!places || places.length === 0) {
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet - Start adding some!</Text>
        </View>
    }


    return (
        <FlatList style={styles.list} data={places} keyExtractor={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />} />
    )
}

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 14,
        marginVertical: 8
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: COLORS.primary200
    }
})
