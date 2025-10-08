import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const JobCard: React.FC<{ job: any }> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const timeAgo = (dateIso?: string) => {
    if (!dateIso) return "";
    const then = new Date(dateIso).getTime();
    const now = Date.now();
    const diff = Math.max(0, Math.floor((now - then) / 1000));
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator>
  //         <Text>Loading...</Text>
  //       </ActivityIndicator>
  //     </View>
  //   )
  // }

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/jobDetailScreen",
          params: { jobId: job._id ?? job.id },
        })
      }
      style={styles.pressable}
    >
      <Animated.View
        style={styles.card}
        entering={FadeInDown.duration(1500).delay(500).springify()}
      >
        <View style={styles.headerRow}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.image}
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.titleText} numberOfLines={1}>
              {job.title}
            </Text>
            <Text style={styles.companyText}>
              <Text style={{ color: colors.primary }}>at</Text>{" "}
              {job.companyName}
            </Text>
          </View>
          <View style={styles.timeWrap}>
            <Text style={styles.timeText}>
              {timeAgo(job.createdAt) || "new"}
            </Text>
          </View>
        </View>

        {job.description ? (
          <Text style={styles.description} numberOfLines={3}>
            {job.description}
          </Text>
        ) : null}

        <View style={styles.detailsRow}>
          <View style={styles.jobDetail}>
            <Text style={styles.jobDetailText}>
              {job.jobLocation || "Karachi, Pakistan"}
            </Text>
          </View>
          <View style={[styles.jobDetail, styles.jobDetailRight]}>
            <Text style={styles.jobDetailText}>
              {job.jobType || "part-time"}
            </Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <Text style={styles.salary}>
            {job.salary?.min} - {job.salary?.max}
            <Text style={styles.month}>/Month</Text>
          </Text>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() =>
              router.push({
                pathname: "/applyOnJob",
                params: { job_id: job._id },
              })
            }
          >
            <Text style={styles.applyBtnText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.neutral100,
    borderRadius: radius._17,
    marginVertical: verticalScale(10),
    padding: 16,
    flexDirection: "column",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: radius._15,
  },
  pressable: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextWrap: {
    paddingLeft: 12,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  companyText: {
    fontSize: 14,
    color: colors.neutral400,
  },
  timeWrap: {
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  timeText: {
    fontSize: 12,
    color: colors.neutral400,
  },
  description: {
    marginTop: 10,
    color: colors.neutral700,
    fontSize: 14,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  jobDetail: {
    backgroundColor: colors.neutral200,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: radius._6,
  },
  jobDetailRight: {
    marginLeft: 8,
  },

  jobDetailText: {
    fontSize: 12,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(12),
    alignItems: "center",
  },

  salary: {
    fontSize: scale(18),
  },
  month: {
    fontSize: scale(12),
  },

  applyBtn: {
    backgroundColor: colors.primary,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: radius._6,
  },

  applyBtnText: {
    fontSize: scale(12),
    color: colors.white,
  },
});
