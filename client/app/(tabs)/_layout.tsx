import { colors } from "@/constants/style";
import { scale } from "@/utils/styling";
import { Tabs } from "expo-router";
import {
  ChartBarIcon,
  ChatsIcon,
  HouseIcon,
  ReadCvLogoIcon,
  UsersThreeIcon,
} from "phosphor-react-native";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            height: 80,
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
                <ReadCvLogoIcon
                  size={24}
                  color={colors.primary}
                  weight="fill"
                />
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
                <ChartBarIcon size={24} color={colors.primary} weight="fill" />
              ) : (
                <ChartBarIcon size={24} color={colors.primary} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <UsersThreeIcon
                  size={24}
                  color={colors.primary}
                  weight="fill"
                />
              ) : (
                <UsersThreeIcon size={scale(20)} color={colors.primary} />
              ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
