import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavouriteScreen from './screens/FavouriteScreen';
import {Ionicons} from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#903e00' },
        drawerContentStyle: {backgroundColor: '#351401'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#de8049'
      }}
    >
      <Drawer.Screen name="Categories" component={CategoryScreen} options={{
        title: 'All Categories',
        drawerIcon: ({size, color}) => <Ionicons name="list" color={color} size={size} />
      }} />
      <Drawer.Screen name="Favorites" component={FavouriteScreen} options={{
        title: 'All Categories',
        drawerIcon: ({size, color}) => <Ionicons name="star" color={color} size={size} />
      }} />
    </Drawer.Navigator>
  )
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.root}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#903e00' }
          }}>

            <Stack.Screen name='AllCategories' component={DrawerNavigator} options={{
              headerShown: false
            }} />
            <Stack.Screen name='MealsOverview' component={MealsOverviewScreen}
            />
            <Stack.Screen name='MealDetails' component={MealDetailsScreen} options={{
              title: 'About meal'
            }} />


          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#903e00", // 👈 global background
  },
});