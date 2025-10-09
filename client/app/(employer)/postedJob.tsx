import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { AppContext } from "@/context/context";
import { useFocusEffect } from "expo-router";
import { url } from "../url";
import PostedJobCard from "@/components/employer/postedJobCard";
import PostJobForm from "../postJobScreen";

interface JobUpdateData {
  title?: string;
  location?: string;
  salary?: string;
  experience?: string;
  description?: string;
  requirements?: string[];
  skills?: string[];
  benefits?: string[];
  jobType?: string;
}

interface JobResponse {
  success: boolean;
  status: number;
  message: string;
  job?: any; // you can define a `Job` interface for stricter typing later
}

const PostedJob = () => {
  // const { employerJobs, setEmployerJobs } = useContext(AppContext);

  const [employerJobs, setEmployerJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAllListedJobs = async () => {
    try {
      const response = await fetch(`${url}/jobs/getAllJobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setEmployerJobs(result.jobs);
        console.log(result.jobs);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllListedJobs();
  }, []);

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
              const res = await fetch(
                `http://192.168.100.102:5000/api/jobs/delete/${id}`,
                {
                  method: "DELETE",
                }
              );
              const result = await res.json();

              if (result.success) {
                setEmployerJobs((prev) =>
                  prev.filter((job: any) => job._id !== id)
                );
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

  const handleEdit = async (
    id: string,
    updatedData: JobUpdateData
  ): Promise<void> => {
    try {
      const response = await fetch(
        `http://192.168.100.102:5000/api/jobs/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data: JobResponse = await response.json();

      if (!response.ok) {
        console.error("Error updating job:", data.message);
        return;
      }

      console.log("✅ Job updated successfully:", data.job);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* <ScreenWrapper>
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
      </ScreenWrapper> */}

      {employerJobs ? (
        <View style={styles.cards}>
          <View>
            <Text style={styles.text}>
              Job Posted by{" "}
              <Text style={{ color: colors.primary, fontSize: scale(12) }}>
                {employerJobs[0]?.companyName || "Unknown"}
              </Text>
            </Text>
          </View>
          <FlatList
            data={employerJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <PostedJobCard
                job={item}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          />
        </View>
      ) : (
        <View>
          <Text>No Job post Added yet</Text>
        </View>
      )}

      <PostJobForm visible={showForm} onClose={() => setShowForm(false)} />
    </View>
  );
};

export default PostedJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100 || "#F9FAFB",
  },

  cards: {
    padding: 16,
  },

  text: {
    margin: scale(15),
    fontSize: scale(20),
    fontWeight: 600,
  },
});
