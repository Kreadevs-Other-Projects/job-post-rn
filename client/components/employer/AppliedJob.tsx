import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import { router } from "expo-router";

const ApplicantCard = ({ id, name, role, date }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => router.navigate(`/employer/applicantDetailScreen?id=${id}`)}
      >
        <Text style={styles.viewText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApplicantCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: radius._15,
    padding: spacingX._15,
    marginBottom: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: radius._30,
    marginRight: spacingX._15,
  },
  name: {
    fontSize: scale(16),
    fontWeight: "600",
    color: colors.neutral900,
  },
  role: {
    fontSize: scale(14),
    color: colors.neutral600,
  },
  date: {
    fontSize: scale(12),
    color: colors.neutral500,
    marginTop: 2,
  },
  viewBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: scale(15),
    paddingVertical: scale(6),
    borderRadius: radius._10,
  },
  viewText: {
    color: colors.white,
    fontSize: scale(14),
    fontWeight: "500",
  },
});
