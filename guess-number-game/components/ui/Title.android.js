import { Platform, StyleSheet, Text } from "react-native"
import Colors from "../../constants/colors"

const Title = ({ children, style }) => {
  return (
    <Text style={style ? [styles.title, style] : styles.title}>{children}</Text>
  )
}

export default Title;


const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: Colors.accent,
    padding: 8,
    maxWidth: '80%',
    width: 300
  }
})