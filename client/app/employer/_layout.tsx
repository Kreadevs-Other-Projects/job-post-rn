import { Stack } from "expo-router";

export default function EmployerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* This name must match the file name inside employer folder */}
      <Stack.Screen name="home" />
      {/* Other screens in employer can go here */}
    </Stack>
  );
}
