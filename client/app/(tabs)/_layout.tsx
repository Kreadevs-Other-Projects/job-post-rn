import { colors } from "@/constants/style";
import { scale } from "@/utils/styling";
import { Tabs } from "expo-router";
import {
  ChatsIcon,
  HouseIcon,
  ReadCvLogoIcon,
  UsersThreeIcon,
} from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          height: 60,
          backgroundColor: colors.neutral300,
          borderTopWidth: 0,
          borderRightWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <HouseIcon size={24} color={colors.primary} weight="fill" />
            ) : (
              <HouseIcon size={24} color={colors.primary} />
            ),
        }}
      />

      <Tabs.Screen
        name="resume"
        options={{
          tabBarLabel: "Resume",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <ReadCvLogoIcon size={24} color={colors.primary} weight="fill" />
            ) : (
              <ReadCvLogoIcon size={24} color={colors.primary} />
            ),
        }}
      />
      <Tabs.Screen
        name="application"
        options={{
          tabBarLabel: "Application",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <UsersThreeIcon size={24} color={colors.primary} weight="fill" />
            ) : (
              <UsersThreeIcon size={24} color={colors.primary} />
            ),
        }}
      />
      <Tabs.Screen
        name="interview"
        options={{
          tabBarLabel: "Interviews",
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <ChatsIcon size={24} color={colors.primary} weight="fill" />
            ) : (
              <ChatsIcon size={scale(20)} color={colors.primary} />
            ),
        }}
      />
    </Tabs>
  );
}
