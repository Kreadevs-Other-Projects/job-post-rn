import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import { url } from "./url.js";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "@/context/context.js";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  id: string;
}

type registerProps = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type loginForm = {
  email: string;
  password: string;
};
const { width } = Dimensions.get("window");

const Auth = () => {
  const tabs = ["login", "signup"];
  const [activeTab, setActiveTab] = useState("login");
  const { setAuthToken, setUserId, setRole, role } = useContext(AppContext);
  const userRef = useRef<string | null>(null);

  const [registerForm, setRegisterForm] = useState<registerProps>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const roleOptions = [
    { label: "employer", value: "employer" },
    { label: "applicant", value: "applicant" },
  ];

  const [chooseRole, setChooseRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [LoginForm, setLoginForm] = useState<loginForm>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof registerProps, value: string) => {
    if (activeTab === "login") {
      setLoginForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setRegisterForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  }
  const registerUser = async () => {
    if (Object.values(registerForm).some((val) => val === "")) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
      });
    }
    const response = await fetch(
      `http://192.168.100.102:5000/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          role: registerForm.role,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "User registered successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: result.message,
      });
    }
  };
  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.100.102:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: LoginForm.email,
            password: LoginForm.password,
          }),
        }
      );

      const result = await response.json();
      console.log("result", result);

      if (!response.ok) {
        throw new Error("Login failed: " + (result.message || "Unknown error"));
      }

      console.log(result.user.role);
      

      await AsyncStorage.setItem("TOKEN", result.token);
      await AsyncStorage.setItem("userId", result.user.id);
      await AsyncStorage.setItem("role", result.user.role);

      setAuthToken(result.token);
      setRole(result.user.role);

      const decodeToken = jwtDecode<MyJwtPayload>(result.token);
      const storedUserToken = decodeToken?.id;
      if (storedUserToken) {
        userRef.current = storedUserToken;
        setUserId(storedUserToken);
      } else {
        console.log("No user found for this id");
      }

      Toast.show({
        type: "success",
        text1: "Congratulations",
        text2: "User Login Successfully",
      });
      if(role === "employer"){
        router.replace('/employer/home')
      } else {
        router.replace('/(tabs)/home')
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Server Error. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ marginTop: verticalScale(50) }}>
            <Text style={{ fontSize: scale(50) }}>
              Jobi
              <Text style={{ fontSize: scale(50), color: colors.primary }}>
                FY
              </Text>
            </Text>
          </View>
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

          <View style={styles.formContainer}>
            {activeTab === "login" ? (
              <View style={styles.formInner}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.neutral500}
                  style={styles.input}
                  onChangeText={(email) => handleChange("email", email)}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={colors.neutral500}
                  style={styles.input}
                  onChangeText={(pass) => handleChange("password", pass)}
                />

                <TouchableOpacity>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={loginUser}>
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
              <View style={styles.formInner}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    placeholder="Full name"
                    style={[styles.input, { flex: 1 }]}
                    onChangeText={(name) => handleChange("name", name)}
                    value={registerForm.name}
                    keyboardType="default"
                  />
                </View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.neutral500}
                  style={styles.input}
                  onChangeText={(email) => handleChange("email", email)}
                  keyboardType="default"
                />

                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={colors.neutral500}
                  style={styles.input}
                  onChangeText={(password) =>
                    handleChange("password", password)
                  }
                  keyboardType="default"
                />

                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: colors.neutral700,
                    }}
                  >
                    Choose Role
                  </Text>

                  <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    closeModalWhenSelectedItem={true}
                    data={roleOptions}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    value={registerForm.role}
                    onChange={(item) => {
                      setRegisterForm({ ...registerForm, role: item.value });
                    }}
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={registerUser}>
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
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderColor: colors.neutral400,
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

  dropdown: {
    height: verticalScale(50),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius._17,
    paddingHorizontal: spacingX._12,
    justifyContent: "center",
  },

  dropdownContainer: {
    borderRadius: radius._12,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  placeholderStyle: {
    fontSize: 16,
    color: colors.neutral500,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },

  iconStyle: {
    width: 22,
    height: 22,
    tintColor: colors.primary,
  },

  itemTextStyle: {
    fontSize: 15,
    color: colors.neutral700,
  },
});
