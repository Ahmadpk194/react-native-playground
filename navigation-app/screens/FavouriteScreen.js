import { useContext } from 'react';
import { Text,View } from 'react-native';
import { FavoritesContext } from '../store/context/favorites-context';
import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function FavouriteScreen() {
    // const favMealsCtx = useContext(FavoritesContext);
    // const favMeals = MEALS.filter(meal => favMealsCtx.ids.includes(meal.id));

    const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
    const favMeals = MEALS.filter(meal => favoriteMealIds.includes(meal.id));

    if(favMeals.length === 0){
        return <View style={styles.rootContainer}>
            <Text style={styles.text}>You have no favorite meals yes.</Text>
        </View>
    }

    return (
        <MealsList itemsData={favMeals} />
    )
}

export default FavouriteScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
})
