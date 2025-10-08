import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { scale } from "@/utils/styling";
import { colors } from "@/constants/style";
import { AppContext } from "@/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const { userId, authToken, role } = useContext(AppContext);
  const [isNavigated, setIsNavigated] = useState(true);

  const Navigation = async () => {
    const newUser = await AsyncStorage.getItem("newUser");

    if (newUser === "0") {
      const timeout = setTimeout(() => {
        router.navigate("/entranceScreen");
        setIsNavigated(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (!userId || !authToken) {
      const timeout = setTimeout(() => {
        router.navigate("/auth");
        setIsNavigated(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (role === "applicant") {
      const timeout = setTimeout(() => {
        router.navigate("/(tabs)/home");
        setIsNavigated(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (role === "employer") {
      const timeout = setTimeout(() => {
        router.navigate("/(employer)/home");
        setIsNavigated(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      return (
        <View>
          <Text>Invalid Page 404</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    if (!isNavigated) {
      setIsNavigated(true);
    }

    const timeoutId = setTimeout(() => {
      Navigation();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [userId]);

  // useEffect(() => {
  //   router.navigate("/(tabs)/home");
  // });
  return (
    <ScreenWrapper style={{ backgroundColor: colors.primary }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: scale(30), fontWeight: "bold", color: "white" }}
        >
          Jobi
          <Text
            style={{
              fontSize: scale(30),
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            FY
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};
export default Index;
