import { StyleSheet, View } from "react-native"
import Colors from "../../constants/colors"

const Card = ({children}) => {
  return (
    <View style={styles.card}>
        {children}
    </View>
  )
}

export default Card


const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.primary500,
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})