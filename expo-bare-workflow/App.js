import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);


  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="auto" />
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          {/* Logo container */}
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Form container */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>

          <View style={[styles.inputContainer,]}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Password" secureTextEntry={!showPassword} />

              <Button title={showPassword ? 'Hide' : 'Show'} onPress={() => setShowPassword((current) => !current)} />

            </View>
          </View>

          <Pressable style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressed]}>
            <View>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </Pressable>
        </View>

        <Button title="Get location" onPress={getLocation} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor: '#f5deb3',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 32,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  formContainer: {
    marginTop: 32,

  },

  inputContainer: {
    marginVertical: 8,

  },

  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#e2b497',
    borderRadius: 4,
    fontSize: 16,
  },

  buttonContainer: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5deb3',
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
