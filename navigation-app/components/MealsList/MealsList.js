import { FlatList } from "react-native"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import MealItem from "../MealItem"

function MealsList({ itemsData }) {

    function renderMealItem({ item }) {
        return <MealItem {...item} />
    }

    return (
        <View style={styles.container}>
            <FlatList data={itemsData} keyExtractor={item => item.id} renderItem={renderMealItem} />
        </View>
    )
}

export default MealsList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})
