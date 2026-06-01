import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from "../../constants/colors";

function OutlinedButton({ children, icon, onPress }) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Ionicons style={styles.icon} name={icon} size={18} color={COLORS.primary500} />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary500,
        flexDirection: 'row'
    },
    pressed: {
        opacity: .7
    },
    icon: {
        marginRight: 6
    }, 
    text:{
        color: COLORS.primary500
    }
})
