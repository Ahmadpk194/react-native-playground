import { StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/colors";

function NumberContainer({ children, style }) {
    return (
        <View style={styles.container}>
            <Text style={style ? [styles.numberText, style] : styles.numberText}>
                {children}
            </Text>
        </View>
    )
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        fontFamily: 'open-sans-bold' ,
        borderWidth: 4,
        borderColor: Colors.accent,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: Colors.accent,
        fontSize: 36,
        fontWeight: 'bold'
    }
})
