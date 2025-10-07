import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import ScreensHeader from "@/components/ScreensHeader";
import { colors, spacingX, spacingY } from "@/constants/style";
import { Image } from "expo-image";
import { scale } from "@/utils/styling";
import { MapPinIcon } from "phosphor-react-native";
import { useLocalSearchParams } from "expo-router";
import { url } from "./url";
import { AppContext } from "@/context/context";
import { timeAgo } from "../services/TimeServer";
import moment from "moment";

type JobProps = {
  companyName?: string;
  createdAt?: string;
  description?: string;
  location?: string;
  jobType?: string;
  jobLocation?: string;
  experience?: string;
  salary?: string;
  requirements?: string;
  benefits?: string;
  title?: string;
};

const jobDetailScreen = () => {
  const { jobId } = useLocalSearchParams();
  const { authToken } = useContext(AppContext);
  const [job, setJob] = useState<JobProps | null>(null);
  const [postingTime, setPostingtime] = useState("");

  const jobDetail = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.102:5000/api/jobs/getJob/${jobId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const result = await response.json();
      const payload = result.data ?? result.job ?? result.jobData ?? result;
      if (result.success === undefined || result.success === true) {
        setJob(payload);
      }
    } catch (error) {
      console.log("Error in job detail screen", error);
    }
  };

  useEffect(() => {
    if (authToken && jobId) {
      jobDetail();
    }
  }, [authToken, jobId]);

  return (
    <ScreenWrapper>
      <ScreensHeader />
      <View style={styles.Container}>
        <ScrollView
          style={styles.scrollingWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerHeader}>
            <View style={styles.companyInfo}>
              <Image
                source={require("../assets/images/favicon.png")}
                style={styles.profileImage}
                contentFit="cover"
                transition={1000}
              />
              <View>
                <Text style={styles.text1}>{job?.companyName}</Text>
                <Text style={[styles.text2, { color: colors.neutral500 }]}>
                  Posted:{" "}
                  {job?.createdAt ? moment(job.createdAt).fromNow() : "new"}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: spacingY._5,
                    gap: spacingX._5,
                  }}
                >
                  <MapPinIcon size={16} color={colors.neutral500} />
                  <Text style={styles.text2}>{job?.location}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: spacingY._5,
                    gap: spacingX._5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.text2}>{job?.jobType}</Text>
                  <Text>-</Text>
                  <Text style={styles.text2}>{job?.jobLocation}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: spacingY._20,
                paddingHorizontal: spacingX._20,
                borderWidth: 1,
                borderColor: colors.primary,
                gap: spacingX._20,
                backgroundColor: colors.neutral200,
                borderRadius: 10,
                padding: spacingX._10,
                maxWidth: "80%",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: 600 }}>Experience</Text>
                <Text>{job?.experience}</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: 600 }}>Salary</Text>
                <Text>{job?.salary}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.Heading1}>{job?.title}</Text>
          </View>
          <View>
            <View style={{ marginTop: spacingY._20 }}>
              <Text style={styles.heading2}>About The Job</Text>
              <Text style={styles.textDescription}>{job?.description}</Text>
            </View>
            <View>
              <Text style={styles.heading2}>Requirements</Text>
              <Text
                style={{
                  fontFamily: "GeistRegular",
                  fontSize: scale(14),
                  marginTop: spacingY._10,
                  marginBottom: spacingY._10,
                  lineHeight: 24,
                  color: colors.neutral800,
                  alignItems: "flex-start",
                }}
              >
                {job?.requirements}
              </Text>
            </View>
            <View>
              <Text style={styles.heading2}>Perks & Benefits</Text>
              <Text
                style={{
                  fontFamily: "GeistRegular",
                  fontSize: scale(14),
                  marginTop: spacingY._10,
                  marginBottom: spacingY._10,
                  lineHeight: 24,
                  color: colors.neutral800,
                  alignItems: "flex-start",
                }}
              >
                {job?.benefits}
              </Text>
            </View>
          </View>
          {/* <View>
                        <Text style={{ fontSize: scale(16), fontWeight: 600 }}>Activity on this job:</Text>
                        <Text>Invite Sent: 10</Text>
                    </View> */}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: colors.primary,
            padding: spacingX._15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: colors.white, fontWeight: 600 }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default jobDetailScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: scale(20),
  },

  scrollingWrapper: {
    marginTop: 10,
    marginBottom: 80,
  },

  containerHeader: {
    alignItems: "center",
  },

  companyInfo: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: spacingX._10,
  },

  profileImage: {
    borderRadius: 10,
    marginRight: 10,
    width: 50,
    height: 50,
  },

  text1: {
    fontSize: scale(18),
    fontWeight: 400,
  },

  text2: {
    fontSize: scale(12),
    fontWeight: 400,
    color: colors.neutral500,
  },

  textDescription: {
    fontFamily: "GeistRegular",
    fontSize: scale(14),
    marginTop: spacingY._10,
    marginBottom: spacingY._10,
    color: colors.neutral800,
    lineHeight: 20,
  },
  Heading1: {
    fontSize: scale(24),
    fontWeight: 600,
    textAlign: "left",
    marginTop: spacingY._20,
    fontFamily: "GeistBold",
  },

  heading2: {
    fontSize: scale(18),
    fontWeight: 600,
    fontFamily: "GeistSemiBold",
  },
});
