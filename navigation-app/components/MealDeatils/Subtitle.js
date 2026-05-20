import { StyleSheet, Text } from "react-native"

function Subtitle({children, style}) {
    return (
        <Text style={[styles.subtitle, style]}>{children}</Text>
    )
}

export default Subtitle


const styles = StyleSheet.create({
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 12,
        marginVertical: 4,
        padding: 6,
        textAlign: 'center',
        borderBottomColor: '#e2b498',
        borderBottomWidth: 2
    }
})