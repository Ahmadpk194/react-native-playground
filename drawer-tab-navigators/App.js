import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen'
import UserScreen from './screens/UserScreen';
import {Ionicons} from '@expo/vector-icons'

const BottomTabs = createBottomTabNavigator()

export default function App() {
  return (

    <NavigationContainer>
      <BottomTabs.Navigator initialRouteName='User' screenOptions={{
        headerStyle: {
          backgroundColor: '#4d0f87'
        },
        headerTintColor: 'white',
        tabBarActiveTintColor: '#4d0f87'
      }}>
        <BottomTabs.Screen name='Welcome' component={WelcomeScreen} options={{
          tabBarIcon: ({size, color}) => <Ionicons name="home" color={color} size={size} />
        }} />
        <BottomTabs.Screen name='User' component={UserScreen} options={{
          tabBarIcon: ({size, color}) => <Ionicons name="person" color={color} size={size} />
        }} />
      </BottomTabs.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({

});
