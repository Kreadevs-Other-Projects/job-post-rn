import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper"
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";

const {width} = Dimensions.get("window")
const Auth = () => {
  const tabs = ["login", "signup"];
  const [activeTab, setActiveTab] = useState("login");

  const translateX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(translateX, {
        toValue: activeTab === "login" ? 0 : -width,
        useNativeDriver: true
    }).start()
  }, [activeTab])

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        <View style={{marginTop: verticalScale(50)}}>
            <Text style={{fontSize: scale(50)}}>Jobi<Text  style={{fontSize: scale(50), color: colors.primary}}>FY</Text></Text>
        </View>
        {/* Toggle Buttons */}
        <View style={styles.switchContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.neutral350,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? colors.white : colors.black },
                  ]}
                >
                  {tab.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {activeTab === "login" ? (
            // Login Form
            <View style={styles.formInner}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />

              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.primary,
                    fontWeight: "600",
                  }}
                >
                  Login
                </Text>
              </Text>
            </View>
          ) : (
            // Signup Form
            <View style={styles.formInner}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="First Name"
                  style={[styles.input, { flex: 1, marginRight: spacingX._10 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  style={[styles.input, { flex: 1 }]}
                />
              </View>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />

              <TextInput
                placeholder="Phone"
                secureTextEntry
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                placeholderTextColor={colors.neutral500}
                style={styles.input}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>

              <Text style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.primary,
                    fontWeight: "600",
                  }}
                >
                  Signup
                </Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  switchContainer: {
    backgroundColor: colors.neutral350,
    flexDirection: "row",
    alignSelf: "center",
    padding: scale(10),
    marginTop: verticalScale(70),
    gap: spacingX._20,
    borderRadius: radius._10,
  },

  tabButton: {
    borderRadius: radius._6,
    paddingVertical: scale(5),
    paddingHorizontal: scale(15),
  },

  tabText: {
    fontSize: scale(16),
    fontWeight: "600",
  },

  formContainer: {
    backgroundColor: colors.neutral200,
    borderRadius: radius._10,
    marginTop: verticalScale(50),
    width: verticalScale(320),
    padding: spacingX._20,
  },

  formInner: {
    gap: verticalScale(20),
  },

  input: {
    // borderRadius: radius._10,
    borderBottomWidth: 1,
    borderColor: colors.neutral400,
    // backgroundColor: colors.neutral100,
    paddingVertical: verticalScale(8),
    paddingHorizontal: spacingX._10,
    fontSize: scale(14),
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    borderRadius: radius._10,
    alignItems: "center",
  },

  buttonText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: "600",
  },

  linkText: {
    color: colors.primary,
    fontSize: scale(13),
    textAlign: "right",
  },
});