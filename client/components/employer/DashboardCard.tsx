import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors, radius } from "@/constants/style";
import { scale } from "@/utils/styling";

type cardProps = {
  title: string;
  count: number;
  icons: React.ReactNode;
};

const DashboardCard = ({ title, count, icons }: cardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.iconWrapper}>{icons}</View>
    </Pressable>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 75,
    backgroundColor: colors.neutral100,
    borderRadius: radius._15,
    padding: scale(10),
    borderCurve: "continuous",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  cardPressed: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

  title: {
    fontFamily: "arial",
    fontSize: scale(14),
    fontWeight: "600",
  },
  count: {
    fontFamily: "arial",
    fontSize: scale(18),
    color: colors.primary,
    fontWeight: "600",
  },
  iconWrapper: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
