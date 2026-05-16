import { StyleSheet, Text, View } from "react-native"
import Colors from "../../constants/colors";

function GuessLogItem({roundNumber, guess}) {
  return (
    <View style={styles.listItems}>
        <Text style={styles.itemText}> #{roundNumber} </Text>
        <Text style={styles.itemText}> Opponent's guess: {guess} </Text>
    </View>
  )
}

export default GuessLogItem;


const styles = StyleSheet.create({
    listItems: {
        borderColor: Colors.primary500,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    itemText: {
        fontFamily: 'open-sans'
    }
})
