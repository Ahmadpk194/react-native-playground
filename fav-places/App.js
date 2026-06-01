import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/ui/IconButton';
import { COLORS } from './constants/colors';
import { init } from './utils/database';
import PlaceDetails from './screens/PlaceDetails';

SplashScreen.preventAutoHideAsync(); // keep splash visible until DB is ready

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInit(true);
        SplashScreen.hideAsync(); // hide splash once DB is ready
      })
      .catch(err => console.log('DB: ', err));
  }, []);

  if (!dbInit) return null; // splash screen is still visible, so null is fine

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary500 },
          headerTintColor: COLORS.gray700,
          contentStyle: { backgroundColor: COLORS.gray700 }
        }}>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  size={30}
                  icon='add'
                  onPress={() => navigation.navigate('AddPlace')}
                />
              )
            })}
          />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{ title: 'Add a new Place' }} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title: 'Loading Place...'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}