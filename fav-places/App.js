import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { COLORS } from './constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary500 },
          headerTintColor: COLORS.gray700,
          contentStyle: {backgroundColor: COLORS.gray700}
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} options={({ navigation }) => ({
            title: 'Your Favorite Places',
            headerRight: ({ tintColor }) => <IconButton color={tintColor} size={30} icon={'add'} onPress={() => navigation.navigate('AddPlace')} />
          })} />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{
            title: 'Add a new Place'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}