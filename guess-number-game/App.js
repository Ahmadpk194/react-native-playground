import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font'

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setIsGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // keep splash visible
  }


  function pickGameHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setIsGameIsOver(false)
  }

  let screen = <StartGameScreen onPickNumber={pickGameHandler} />
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} roundsNumber={guessRounds} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} onStartNewGame={startNewGameHandler} roundsNumber={guessRounds} />
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0)
  }

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#92094d', '#e7c143']} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/images/background.png')}
          resizeMode="cover" style={styles.rootScreen} imageStyle={styles.bgImage}>

          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,                  // Forces the View to fill the entire screen
  },
  bgImage: {
    opacity: .2
  }
});