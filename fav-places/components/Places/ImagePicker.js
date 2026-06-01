import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react";
import { COLORS } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({ onTakeImage }) {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState()

    async function verifyPermissions() {
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grand camera permission to use this app.');

            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return false;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        onTakeImage(image.assets[0].uri)
        setPickedImage(image.assets[0].uri);
    };


    let imagePreview = <Text>No Image Taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon={'camera'} onPress={takeImageHandler}>Take Photo</OutlinedButton>
        </View>
    )
}

export default ImagePicker;


const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
})
