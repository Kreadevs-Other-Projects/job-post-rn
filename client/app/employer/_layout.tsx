import { Stack } from "expo-router";

export default function EmployerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="applicantDetailScreen"/>
    </Stack>
  );
}
