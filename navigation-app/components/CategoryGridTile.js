import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

const CategoryGridTile = ({title, color, onPress}) => {
  return (
    <View style={styles.gridItem}>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPress]} onPress={onPress}>
            <View style={[styles.innerContainer, {backgroundColor: color}]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    </View> 
  )
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem:{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        overflow: Platform.OS === 'android'?'visible':'hidden',
    },
    button: {
        flex: 1,
    },
    buttonPress: {
        opacity: .7, 
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: .25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})

