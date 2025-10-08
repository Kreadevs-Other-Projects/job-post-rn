import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";

const PostedJob = () => {
  const [postedJobs, setPostedJobs] = useState([
    {
      _id: "1",
      title: "Frontend Developer",
      companyName: "KreaDevs",
      location: "Karachi, Pakistan",
      salary: { min: 60000, max: 90000 },
      jobType: "Full Time",
      date: "2025-10-05",
    },
    {
      _id: "2",
      title: "React Native Engineer",
      companyName: "TechNova",
      location: "Remote",
      salary: { min: 120000, max: 150000 },
      jobType: "Part Time",
      date: "2025-10-01",
    },
  ]);

  const handleDelete = (id: any) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Backend delete API call
              const res = await fetch(
                `http://192.168.100.7:5000/api/jobs/delete/${id}`,
                {
                  method: "DELETE",
                }
              );
              const result = await res.json();

              if (res.ok) {
                setPostedJobs((prev) => prev.filter((job) => job._id !== id));
              } else {
                Alert.alert("Error", result.message || "Failed to delete job");
              }
            } catch (err: any) {
              Alert.alert("Error", err.message || "Something went wrong");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (job: any) => {
    Alert.alert("Edit", `Editing ${job.title}`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScreenWrapper>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {postedJobs.map((job) => (
            <View key={job._id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        job.jobType === "Full Time" ? "#E0F7EC" : "#FFF5E0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color:
                          job.jobType === "Full Time" ? "#1A7F4B" : "#C07A00",
                      },
                    ]}
                  >
                    {job.jobType}
                  </Text>
                </View>
              </View>

              <Text style={styles.company}>{job.companyName}</Text>
              <Text style={styles.location}>{job.location}</Text>

              <View style={styles.salaryContainer}>
                <Text style={styles.salaryLabel}>Salary:</Text>
                <Text style={styles.salaryValue}>
                  ${job.salary.min.toLocaleString()} - $
                  {job.salary.max.toLocaleString()}
                </Text>
              </View>

              <Text style={styles.date}>Posted on: {job.date}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => handleEdit(job)}
                  style={[styles.actionBtn, { backgroundColor: "#E8F0FE" }]}
                >
                  <Ionicons name="create-outline" size={16} color="#1A73E8" />
                  <Text style={[styles.actionText, { color: "#1A73E8" }]}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(job._id)}
                  style={[styles.actionBtn, { backgroundColor: "#FEECEC" }]}
                >
                  <Ionicons name="trash-outline" size={16} color="#D32F2F" />
                  <Text style={[styles.actionText, { color: "#D32F2F" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default PostedJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100 || "#F9FAFB",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: radius._15 || 18,
    padding: scale(14),
    marginBottom: verticalScale(14),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: spacingX._15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: scale(15),
    fontWeight: "600",
    color: colors.black || "#1A1A1A",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: scale(12),
    fontWeight: "500",
  },
  company: {
    color: "#4B5563",
    fontSize: scale(13),
    marginTop: 4,
  },
  location: {
    color: "#6B7280",
    fontSize: scale(12),
    marginBottom: 8,
  },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  salaryLabel: {
    fontSize: scale(12),
    color: "#6B7280",
    marginRight: 4,
  },
  salaryValue: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#1A7F4B",
  },
  date: {
    fontSize: scale(12),
    color: "#9CA3AF",
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: scale(12),
    fontWeight: "500",
  },
});
