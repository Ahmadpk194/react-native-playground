import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          setAuthToken(storedToken);
        }
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;