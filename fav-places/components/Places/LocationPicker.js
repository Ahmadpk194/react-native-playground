import { Alert, Image, StyleSheet, Text, View } from "react-native"
import OutlinedButton from "../ui/OutlinedButton"
import { COLORS } from "../../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location'
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../utils/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
    const [locData, setLocData] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params ? { latitude: route.params.pickedLat, longitude: route.params.pickedLng } : null;

            // console.log(mapPickedLocation)
            setLocData(mapPickedLocation)
        }

    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocaiton() {
            if (locData) {
                const address = await getAddress(locData.latitude, locData.longitude);
                onPickLocation({ ...locData, address: address });
            };
        }

        handleLocaiton();
    }, [locData, onPickLocation])

    async function verifyPermissions() {

        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grand location permission to use this app.');

            return false;
        }

        return true;
    };

    async function getLocationHandler() {
        try {
            const hasPermission = await verifyPermissions();

            if (!hasPermission) {
                return;
            }

            const location = await getCurrentPositionAsync();
            // console.log(location)
            setLocData(location.coords)
        } catch (error) {
            console.log(error)
        }
    }

    function pickonMapHandler() {
        navigation.navigate('Map')
    };

    let locationPreview = <Text>No location picked yet.</Text>;


    if (locData) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(locData.latitude, locData.longitude) }} />
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocationHandler} >Locate User</OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickonMapHandler} >Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
