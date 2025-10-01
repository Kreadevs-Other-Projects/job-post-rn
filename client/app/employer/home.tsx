import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import { scale } from "@/utils/styling";
import { colors, radius } from "@/constants/style";
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
            <View style={{ backgroundColor: colors.primary, padding: 10, borderRadius: radius._10, marginHorizontal: 60}}>
              <TouchableOpacity>
                <Text style={{color: colors.white, fontSize: scale(14)}}>Post Job</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <DashboardCard/>
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
  },

  header: {
    margin: scale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerText: {
    fontSize: scale(24),
    fontWeight: 600,
  },
});
