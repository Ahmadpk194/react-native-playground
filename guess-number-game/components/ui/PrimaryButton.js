import { Pressable, StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/colors"


const PrimaryButton = ({ children, onPress }) => {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable onPress={onPress} style={({ pressed }) =>
                pressed ? [styles.buttonContainer, styles.onPress] : styles.buttonContainer}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.buttonPrimary,
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 4
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    onPress: {
        opacity: .6
    }
})
