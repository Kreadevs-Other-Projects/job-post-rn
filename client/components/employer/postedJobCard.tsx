import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/style";

interface JobCardProps {
  job: any;
  index: number;
  onEdit?: (job: any) => void;
  onDelete?: (id: string) => void;
}

const PostedJobCard: React.FC<JobCardProps> = ({
  job,
  index,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => onDelete && onDelete(job._id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(800)
        .delay(index * 150)
        .springify()}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {job.title}
        </Text>
        <Text style={styles.companyText}>
          <Text style={{ color: colors.primary }}>at</Text> {job.companyName}
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.jobDetail}>
          <Text style={styles.jobDetailText}>{job.location || "Unknown"}</Text>
        </View>
        <View style={[styles.jobDetail]}>
          <Text style={styles.jobDetailText}>{job.jobType || "Part-time"}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.salary}>
          {job.salary?.min} - {job.salary?.max}
          <Text style={styles.month}>/Month</Text>
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => onEdit && onEdit(job)}
            style={[styles.iconButton, { backgroundColor: "#E8F0FE" }]}
          >
            <Ionicons name="create-outline" size={16} color="#1A73E8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.iconButton, { backgroundColor: "#FEECEC" }]}
          >
            <Ionicons name="trash-outline" size={16} color="#D32F2F" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default PostedJobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
  },
  companyText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  jobDetail: {
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  jobDetailText: {
    color: "#555",
    fontSize: 13,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salary: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  month: {
    fontSize: 13,
    color: "#777",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});
