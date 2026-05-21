import { StyleSheet, FlatList, View } from "react-native"
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId: catId } = route.params;

  const displayMeals = MEALS.filter(mealItem => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  })


  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(cat => cat.id === catId).title;

    navigation.setOptions({
      title: categoryTitle
    })
  }, [catId, navigation])


  return (
    <MealsList itemsData={displayMeals} />
  )
}

export default MealsOverviewScreen;
