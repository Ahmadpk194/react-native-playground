import { StyleSheet, FlatList, View } from "react-native"
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId: catId } = route.params;

  const displayMeals = MEALS.filter(mealItem => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  })


  function renderMealItem({ item }) {
    return <MealItem {...item} navigation={navigation} />
  }

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(cat => cat.id === catId).title;

    navigation.setOptions({
      title: categoryTitle
    })
  }, [catId, navigation])


  return (
    <View style={styles.container}>
      <FlatList data={displayMeals} keyExtractor={item => item.id} renderItem={renderMealItem} />
    </View>
  )
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})
