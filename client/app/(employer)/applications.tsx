import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { colors, radius, spacingX, spacingY } from "@/constants/style"; // if you use custom color constants
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { scale, verticalScale } from "@/utils/styling";

const Applications = () => {
  const applicants = [
    {
      id: 1,
      name: "Sarah Ahmed",
      jobTitle: "React Native Developer",
      date: "Oct 7, 2025",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Ali Raza",
      jobTitle: "Backend Engineer",
      date: "Oct 5, 2025",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Hina Khan",
      jobTitle: "UI/UX Designer",
      date: "Oct 2, 2025",
      image: "https://randomuser.me/api/portraits/women/20.jpg",
    },
  ];

  const handleViewDetails = (applicant) => {
    Alert.alert("View Details", `You clicked on ${applicant.name}`);
    // here navigate to applicant detail page later
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Applications Received</Text>

          {applicants.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.avatar} />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <Text style={styles.date}>Applied on {item.date}</Text>

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => handleViewDetails(item)}
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default Applications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContainer: {
    padding: scale(20)
  },
  title: {
    fontSize: scale(20),
    fontWeight: "700",
    marginBottom: verticalScale(15),
    color: "#111",
  },
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
