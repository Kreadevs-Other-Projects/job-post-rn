import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { AppContext, AppProvider } from '../context/context.js'
import EmployerLayout from "./employer/_layout.js";

export default function RootLayout() {
  const [loaded] = useFonts({
    GeistRegular: require("@/assets/fonts/Geist-Regular.ttf"),
    GeistSemiBold: require("@/assets/fonts/Geist-SemiBold.ttf"),
    GeistBold: require("@/assets/fonts/Geist-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  

  return (
    <>
      <AppProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animation: "slide_from_bottom",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="employer" />

        </Stack>
        <StatusBar style="dark" />
        <Toast />

      </AppProvider>
    </>
  );
}
