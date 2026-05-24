import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios'
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';


function WelcomeScreen() {
  const [isFetching, setIsFetching] = useState(false)
  const [fetchedMsg, setFetchedMsg] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    setIsFetching(true)
    axios.get('https://react-native-auth-72d54-default-rtdb.firebaseio.com/message.json?auth=' + token, {}).then(response => {
      setFetchedMsg(response.data)
      setIsFetching(false)
    })
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      {isFetching ? <ActivityIndicator size="small" /> : <Text>{fetchedMsg}</Text>}
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});