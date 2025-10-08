import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/style";
import { LogIcon } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type HeaderProps = {
  icon?: React.ReactNode;
};

const Header = ({ icon }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: verticalScale(50) }}>
        <Text
          style={{
            fontSize: scale(30),
            fontWeight: "bold",
          }}
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

      {icon && (
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: colors.primary,
            marginTop: verticalScale(50),
            padding: 7,
            borderRadius: 45,
          }}
        >
          {icon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: verticalScale(100),
    paddingHorizontal: scale(20),
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderBottomEndRadius: radius._20,
    // borderBottomStartRadius: radius._20,
  },

  headerText: {},
});
