import { colors, radius, spacingX } from "@/constants/style";
import { verticalScale } from "@/utils/styling";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");

type postJobScreenProps = {
  visible: boolean;
  onClose: () => void;
};

type submitFormProps = {
  title?: string;
  companyName?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  description?: string;
  requirements?: string;
  skills?: string;
  benefits?: string;
  minSalary?: number;
  maxSalary?: number;
};

const PostJobForm = ({ visible, onClose }: postJobScreenProps) => {
  const jobTypeOptions = [
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
  ];

  const [submitForm, setSubmitForm] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "",
    experience: "",
    description: "",
    requirements: "",
    skills: "",
    benefits: "",
    minSalary: "",
    maxSalary: "",
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const handleChange = (field: keyof submitFormProps, value: string) => {
    // if (field === "minSalary") {
    //   let cleaned = value.replace(/^\$/, "");
    //   setSubmitForm((prev) => ({
    //     ...prev,
    //     minSalary: cleaned ? `$${cleaned}` : "",
    //   }));
    // } else if (field === "maxSalary") {
    //   let cleaned = value.replace(/^\$/, "");
    //   setSubmitForm((prev) => ({
    //     ...prev,
    //     maxSalary: cleaned ? `$${cleaned}` : "",
    //   }));
    // } else {
    //   setSubmitForm((prev) => ({
    //     ...prev,
    //     [field]: value,
    //   }));
    // }

    setSubmitForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSubmit = async () => {
    if (Object.values(submitForm).some((val) => val === "")) {
      Toast.show({
        type: "error",
        text1: "Please Fill All fields",
      });
      return;
    }

    try {
      const response = await fetch(
        // `http://192.168.100.7:5000/api/jobs/addJob`,
        `http://192.168.100.102:5000/api/jobs/addJob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },

          body: JSON.stringify({
            title: submitForm.title,
            companyName: submitForm.companyName,
            location: submitForm.location,
            jobType: submitForm.jobType,
            experience: submitForm.experience,
            description: submitForm.description,
            requirements: submitForm.requirements,
            skills: submitForm.skills,
            benefits: submitForm.benefits,
            minSalary: submitForm.minSalary,
            maxSalary: submitForm.maxSalary,
          }),
        }
      );

      const result = await response.json();

      if (result.Ok) {
        Toast.show({
          type: "success",
          text1: "Job added sucessfully",
        });
        setModalVisible(false);
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "missing field",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Internal Server Error",
      });
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayBg}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Post a Job</Text>

            <TextInput
              placeholder="Job Title (e.g. Software Engineer)"
              style={styles.input}
              value={submitForm.title}
              onChangeText={(title) => handleChange("title", title)}
            />
            <TextInput
              placeholder="Company Name"
              style={styles.input}
              value={submitForm.companyName}
              onChangeText={(companyName) =>
                handleChange("companyName", companyName)
              }
            />
            <TextInput
              placeholder="Job Location"
              style={styles.input}
              value={submitForm.location}
              onChangeText={(location) => handleChange("location", location)}
            />

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TextInput
                placeholder="Min Salary"
                style={[styles.input, { width: "48%" }]}
                value={submitForm.minSalary}
                onChangeText={(minSalary) =>
                  handleChange("minSalary", minSalary)
                }
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Max Salary"
                style={[styles.input, { width: "48%" }]}
                value={submitForm.maxSalary}
                onChangeText={(maxSalary) =>
                  handleChange("maxSalary", maxSalary)
                }
                keyboardType="numeric"
              />
            </View>

            <TextInput
              placeholder="Experience Required (e.g. 2 years)"
              style={styles.input}
              value={submitForm.experience}
              onChangeText={(experience) =>
                handleChange("experience", experience)
              }
            />
            <View style={{ gap: 10 }}>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                closeModalWhenSelectedItem={true}
                data={jobTypeOptions}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={submitForm.jobType}
                onChange={(item) => {
                  setSubmitForm({ ...submitForm, jobType: item.value });
                }}
              />
            </View>
            <TextInput
              placeholder="Job Description"
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              multiline
              value={submitForm.description}
              onChangeText={(description) =>
                handleChange("description", description)
              }
            />

            <TextInput
              placeholder="Requirements (comma separated)"
              style={[styles.input, { height: 60, textAlignVertical: "top" }]}
              multiline
              value={submitForm.requirements}
              onChangeText={(requirements) =>
                handleChange("requirements", requirements)
              }
            />

            <TextInput
              placeholder="Skills (comma separated)"
              style={[styles.input, { height: 60, textAlignVertical: "top" }]}
              multiline
              value={submitForm.skills}
              onChangeText={(skills) => handleChange("skills", skills)}
            />

            <TextInput
              placeholder="Benefits (comma separated)"
              style={[styles.input, { height: 60, textAlignVertical: "top" }]}
              multiline
              value={submitForm.benefits}
              onChangeText={(benefits) => handleChange("benefits", benefits)}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Post Job</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.17)",
    justifyContent: "flex-end",
  },
  overlayBg: {
    flex: 1,
  },
  sheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

export default PostJobForm;
