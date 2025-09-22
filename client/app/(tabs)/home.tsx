import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
  return (
    <ScreenWrapper>
      {/* <Header /> */}
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Home</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
