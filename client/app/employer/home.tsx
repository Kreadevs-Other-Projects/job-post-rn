import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { scale, verticalScale } from "@/utils/styling";
import { colors, radius, spacingX } from "@/constants/style";
import DashboardCard from "@/components/employer/DashboardCard";

const Home = () => {
  return (
    <>
      <Header />
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Dashboard Overview</Text>
              <Text>Welcome back!</Text>
            </View> 
            {/* <View style={{ backgroundColor: colors.primary, padding: 10, borderRadius: radius._10, marginHorizontal: spacingX._20}}>
              <TouchableOpacity>
                <Text style={{color: colors.white, fontSize: scale(14)}}>Post Job</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', gap:10, marginTop: verticalScale(30)}}>
            <DashboardCard title="Total Job Posted" count={24}/>
            <DashboardCard title="Total Job Applicant" count={84}/>
          </View>

          <View style={styles.postJobBtn}>
            <TouchableOpacity>
              <Text>Post a job</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerText: {
    fontSize: scale(24),
    fontWeight: 600,
  },

  postJobBtn: {
    position: 'absolute',
    bottom: 0,
    
  }
});
