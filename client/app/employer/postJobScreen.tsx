import { colors } from "@/constants/style";
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

const { height } = Dimensions.get("window");

type postJobScreenProps = {
  visible: boolean,
  onClose: () => void
}

const PostJobForm = ({ visible, onClose }:postJobScreenProps) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  // start from screen bottom
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

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayBg}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
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
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Company Name"
              style={styles.input}
              value={company}
              onChangeText={setCompany}
            />
            <TextInput
              placeholder="Job Location"
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              placeholder="Expected Salary (e.g. $1000 - $2000)"
              style={styles.input}
              value={salary}
              onChangeText={setSalary}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Experience Required (e.g. 2 years)"
              style={styles.input}
              value={experience}
              onChangeText={setExperience}
            />
            <TextInput
              placeholder="Job Description"
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.submitBtn}>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  overlayBg: {
    flex: 1
  },
  sheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
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
});

export default PostJobForm;
