import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "@/utils/styling";
import { radius, spacingX, spacingY } from "@/constants/style";

interface Applicant {
  _id: string;
  name: string;
  jobTitle: string;
  date: string;
  image: string;
}

interface SubmittedApplicationCardProps {
  item: Applicant;
  onViewDetails: () => void;
}

const SubmittedApplicationCard: React.FC<SubmittedApplicationCardProps> = ({
  item,
  onViewDetails,
}) => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: item.image }} style={styles.avatar} /> */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        <Text style={styles.date}>Applied on {item.date}</Text>
        <TouchableOpacity style={styles.detailButton} onPress={onViewDetails}>
          <Text style={styles.detailButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmittedApplicationCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: radius._15,
    marginBottom: spacingY._15,
    padding: scale(14),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    marginHorizontal: 10,
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: radius._30,
    marginRight: spacingX._10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#111",
  },
  jobTitle: {
    fontSize: scale(14),
    color: "#555",
    marginVertical: 2,
  },
  date: {
    fontSize: scale(12),
    color: "#777",
    marginBottom: spacingY._7,
  },
  detailButton: {
    backgroundColor: "#007bff",
    paddingVertical: verticalScale(6),
    paddingHorizontal: spacingX._12,
    borderRadius: radius._6,
    alignSelf: "flex-start",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: scale(12),
    fontWeight: "500",
  },
});
