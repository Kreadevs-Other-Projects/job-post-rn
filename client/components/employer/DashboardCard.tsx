import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { colors, radius } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import LinearGradient from "react-native-linear-gradient";

type DashboardCardProps = {
  title: string;
  count: number | string;
  style?: StyleProp<ViewStyle>;
  size?: "sm" | "md" | "lg";
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  count,
  style,
  size = "md",
}) => {
  // animated value cycles 0 -> 1 -> 0 continuously
  const anim = useRef(new Animated.Value(0)).current;



  <View style={styles.card}>
    <LinearGradient
      colors={["rgba(0,0,0,0.2)", "transparent"]}
      style={StyleSheet.absoluteFillObject}
    />
    <Text>Content</Text>
  </View>


  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.linear),
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.linear),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [anim]);

  // interpolate border color through a small palette
  const borderColor = anim.interpolate({
    inputRange: [0, 0.35, 0.7, 1],
    outputRange: [
      colors.primary ?? "#4F46E5",
      "#06B6D4", // teal
      "#F59E0B", // amber
      colors.primary ?? "#4F46E5",
    ],
  });

  // subtle pulsing glow
  const glow = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.06, 0.18, 0.06],
  });

  const cardHeight =
    size === "sm" ? verticalScale(110) : size === "lg" ? verticalScale(190) : verticalScale(150);

  return (
    <Animated.View
      style={[
        styles.outer, // outer provides animated border & shadow
        { borderColor, shadowOpacity: (glow as any) },
        style,
      ]}
    >
      {/* inner content — transparent glass body */}
      <View style={[styles.inner, { height: cardHeight }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
    </Animated.View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
 outer: {
  borderRadius: radius._15,
  borderWidth: 2,
  backgroundColor: "rgba(255,255,255,0.05)",
  overflow: "hidden",
  // remove shadow
  shadowColor: "transparent",
  elevation: 0,
},
  inner: {
    backgroundColor: "rgba(255,255,255,0.05)", // not fully transparent → stops shadow leak
    borderRadius: radius._13,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: scale(14),
    color: colors.primary,
    fontWeight: "600",
    marginBottom: verticalScale(6),
  },
  count: {
    fontSize: scale(26),
    color: "#FFFFFF", // strong contrast on dark backgrounds
    fontWeight: "800",
  },
});
