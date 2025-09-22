import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { useEffect } from "react";
import { View } from "react-native";

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
    <View>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
