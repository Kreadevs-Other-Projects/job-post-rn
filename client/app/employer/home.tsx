import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { scale, verticalScale } from "@/utils/styling";
import { colors, radius, spacingX } from "@/constants/style";
import DashboardCard from "@/components/employer/DashboardCard";
import { LogIcon, SignOut, TrendUpIcon } from "phosphor-react-native";
import RecentJobsApplid from "@/components/employer/AppliedJob";
import PostJobForm from "./postJobScreen";
import Header from "@/components/Header";

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header icon={<SignOut color="white" size={20}/>}/>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Dashboard Overview</Text>
              <Text>Welcome back!</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              marginTop: verticalScale(30),
            }}
          >
            <DashboardCard
              title="Total Job Posted"
              count={24}
              icons={<TrendUpIcon size={24} color="#7DDA58" />}
            />
            <DashboardCard
              title="Total Job Applicant"
              count={84}
              icons={<TrendUpIcon size={24} color="#7DDA58" />}
            />
          </View>

          <View style={{ marginTop: verticalScale(10) }}>
            <View>
              <Text>Recent Applicants</Text>
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <RecentJobsApplid
                name="John"
                role="Full Stack Developer"
                date="10/10/2025"
              />
            </View>
          </View>

          <View style={styles.postJobBtn}>
            <TouchableOpacity
              onPress={() => setShowForm(true)}
              style={styles.fab}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PostJobForm visible={showForm} onClose={() => setShowForm(false)} />
      </ScreenWrapper>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: spacingX._15,
  },

  header: {
    // margin: scale(),
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    fontSize: scale(24),
    fontWeight: 600,
  },
  // postJobBtn: {
  //   position: "absolute",
  //   bottom: 25, // thoda upar margin from bottom
  //   left: 0,
  //   right: 0,
  //   backgroundColor: colors.primary,
  //   paddingVertical: scale(12),
  //   alignItems: "center", // text center
  //   borderRadius: radius._10, // rounded edges
  //   borderCurve: "continuous",
  // },

  postJobBtn: {
  position: "absolute",
  bottom: 60,
  right: 10,
},

fab: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: colors.primary,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 6,
},

plus: {
  fontSize: scale(28),
  color: colors.white,
  fontWeight: "bold",
  marginTop: -2, 
},

});
