import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { getProfilePicture } from "@/services/imageService";
import { scale, verticalScale } from "@/utils/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/style";
import {
  CaretLeftIcon,
  GearIcon,
  LockIcon,
  SignOutIcon,
  UserIcon,
} from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type AccountOptionProps = {
  title: string;
  icon: React.ReactNode;
  bgColor?: string;
  routeName: any;
};

const Profile = () => {
  const options: AccountOptionProps[] = [
    {
      title: "Edit Profile",
      icon: <UserIcon size={30} color={"#fff"} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/(tabs)/edit-profile",
    },
    {
      title: "Settings",
      icon: <GearIcon size={30} color={"#fff"} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/(tabs)/edit-profile",
    },
    {
      title: "Privacy Policy",
      icon: <LockIcon size={30} color={"#fff"} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/(tabs)/edit-profile",
    },
    {
      title: "Logout",
      icon: <SignOutIcon size={30} color={"#fff"} weight="fill" />,
      bgColor: "#6366f1",
      routeName: "/auth",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            router.replace("/auth");
            console.log("logged out");
          } catch (error) {
            console.log("Logout error:", error);
          }
        },
      },
    ]);
  };

  return (
    <>
      <Header />
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image source={getProfilePicture(null)} style={styles.avatar} />
            <Text style={styles.avatarName}>Company Name</Text>
            <Text style={styles.avatarEmail}>company@gmail.com</Text>
          </View>

          <View style={{ marginTop: 100 }}>
            {options.map((option, key) => (
              <View style={{ marginHorizontal: spacingX._20 }} key={key}>
                <TouchableOpacity
                  style={{ marginBottom: spacingY._20 }}
                  onPress={() => {
                    if (option.title === "Logout") handleLogout();
                    else router.push(option.routeName);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: scale(12),
                      }}
                    >
                      <View
                        style={{
                          width: verticalScale(40),
                          height: verticalScale(40),
                          borderRadius: radius._10,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: option.bgColor || colors.neutral200,
                        }}
                      >
                        {option.icon}
                      </View>

                      <Text
                        style={{
                          fontSize: scale(16),
                          fontWeight: "500",
                          color: colors.black,
                        }}
                      >
                        {option.title}
                      </Text>
                    </View>

                    <CaretLeftIcon
                      size={22}
                      color={colors.neutral600}
                      weight="bold"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    borderRadius: radius._10,
    marginTop: spacingY._20,
  },
  avatarName: {
    fontSize: scale(20),
    fontWeight: "600",
    marginTop: spacingY._10,
  },
  avatarEmail: {
    fontSize: scale(14),
    color: colors.neutral600,
    marginTop: spacingY._5,
  },
  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: 50,
  },
});
