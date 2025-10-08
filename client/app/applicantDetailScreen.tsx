import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import {
  ArrowLeftIcon,
  BackpackIcon,
  SkipBackIcon,
} from "phosphor-react-native";

const ApplicantDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const applicant = {
    id,
    name: "John Doe",
    role: "Frontend Developer",
    appliedOn: "02 Oct 2025",
    routine: "Available: Mon - Fri (9 AM - 5 PM)",
    jobTitle: "React Native Developer",
    experience: "2 Years",
    skills: ["React Native", "JavaScript", "UI/UX", "REST APIs"],
    expectedSalary: "$1500 - $2000",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  };

  return (
    <>
      {/* <ScreenWrapper>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <ArrowLeftIcon size={24} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Image source={{ uri: applicant.image }} style={styles.avatar} />
        <Text style={styles.name}>{applicant.name}</Text>
        <Text style={styles.role}>{applicant.role}</Text>
        <Text style={styles.subText}>Applied on {applicant.appliedOn}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Applicant Details</Text>
        <DetailRow label="ID" value={applicant.id} />
        <DetailRow label="Routine" value={applicant.routine} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Job Information</Text>
        <DetailRow label="Job Title" value={applicant.jobTitle} />
        <DetailRow label="Experience" value={applicant.experience} />
        <DetailRow label="Expected Salary" value={applicant.expectedSalary} />
        <DetailRow label="Skills" value={applicant.skills.join(", ")} />
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}>
          <Text style={styles.actionText}>Accept Interview</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#FFC107" }]}>
          <Text style={styles.actionText}>Waiting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#F44336" }]}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ScreenWrapper> */}
    </>
  );
};

// const DetailRow = ({ label, value }) => (
//   <View style={styles.row}>
//     <Text style={styles.label}>{label}</Text>
//     <Text style={styles.value}>{value}</Text>
//   </View>
// );

export default ApplicantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral200,
    padding: spacingX._20,
  },
  backBtn: {
    marginBottom: verticalScale(10),
  },
  backText: {
    fontSize: scale(16),
    color: colors.primary,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: verticalScale(10),
  },
  name: {
    fontSize: scale(22),
    fontWeight: "700",
    color: colors.neutral900,
  },
  role: {
    fontSize: scale(16),
    color: colors.primary,
    marginTop: 2,
  },
  subText: {
    fontSize: scale(13),
    color: colors.neutral600,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacingX._20,
    borderRadius: radius._15,
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    marginBottom: verticalScale(10),
    color: colors.neutral800,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  label: {
    fontSize: scale(14),
    fontWeight: "600",
    color: colors.neutral700,
  },
  value: {
    fontSize: scale(14),
    color: colors.neutral600,
    flexShrink: 1,
    textAlign: "right",
  },
  actionContainer: {
    gap: 10,
    // padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  actionBtn: {
    flex: 1,
    paddingVertical: scale(6),
    padding: 20,
    borderRadius: radius._10,
    alignItems: "center",
  },
  actionText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: scale(16),
  },
});
