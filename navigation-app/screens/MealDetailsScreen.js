import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDeatils/Subtitle";
import List from "../components/MealDeatils/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

const MealDetailsScreen = ({ route, navigation }) => {
    const mealId = route.params.mealId;
    const meal = MEALS.find(meal => meal.id === mealId);

    function headerButtonPressHandler() {
        console.log('press')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon="star" color="white" onPress={headerButtonPressHandler} />
            }
        })
    }, [])

    return (
        <ScrollView style={styles.root}>
            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>Meal Details - {meal.title}</Text>

            <MealDetails duration={meal.duration} complexity={meal.complexity} affordability={meal.affordability} textStyle={styles.detailText} />

            <View style={styles.listOuter}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={meal.ingredients} />
                    <Subtitle>steps</Subtitle>
                    <List data={meal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailsScreen;


const styles = StyleSheet.create({
    root: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: '#e2b498'
    },
    listContainer: {
        maxWidth: '80%',
    },
    listOuter: {
        width: '100%',
        alignItems: 'center'
    }
})
