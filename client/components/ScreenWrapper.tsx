import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StatusBar,
} from "react-native";
import React from "react";
import { colors } from "@/constants/style";

type ScreenWrapperProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
};

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  // Use a safer paddingTop value for iOS
  let paddingTop = Platform.OS == "ios" ? 40 : 20;

  return (
    <View
      style={[
        style,
        {
          paddingTop,
          flex: 1,
          backgroundColor: colors.neutral200,
        },
      ]}
    >
      <StatusBar barStyle={"dark-content"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;
