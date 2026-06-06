import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { use, useEffect } from 'react';

// Show notifications while app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
  }),
});

export default function App() {

  useEffect(() => {

    async function configPushNotification() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { stauts } = Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission required!', 'Push notification need permission.')
        return
      }

      Notifications.getExpoPushTokenAsync().then(pushToken => {
        console.log(pushToken)
      })
    }

    configPushNotification()

  }, [])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECIEVED')
      const userName = notification.request.content.data.userName;
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('RESPONSE RECIEVED');
      // console.log(response.notification.request.content.data)
    })

    return () => {
      subscription.remove()
      subscription2.remove()
    }
  }, [])

  // Request permission + setup Android channel
  useEffect(() => {
    async function setupPushNotification() {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        console.log('Notification permission not granted');
        return;
      }

      // Android notification channel (IMPORTANT)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    }

    setupPushNotification();
  }, []);

  // Schedule local notification
  const scheduleLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification',
        data: { userName: 'Ahmad' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleLocalNotification}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});