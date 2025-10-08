import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";

interface ResumeFile {
  name: string;
  size: number;
  mimeType: string;
  uri: string;
}

interface FormDataType {
  name: string;
  email: string;
  description: string;
  resumeUrl: ResumeFile | null;
}

const ApplyOnJob = () => {
  const { job_id } = useLocalSearchParams<{ job_id: string }>();
  console.log(job_id);

  const [form, setForm] = useState<FormDataType>({
    name: "",
    email: "",
    description: "",
    resumeUrl: null,
  });

  const handleChange = (
    key: keyof FormDataType,
    value: string | ResumeFile | null
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      });

      if (result.canceled) return;

      const file = result.assets[0];
      const resumeUrl: ResumeFile = {
        name: file.name,
        size: file.size ?? 0,
        mimeType: file.mimeType ?? "application/pdf",
        uri: file.uri,
      };

      handleChange("resumeUrl", resumeUrl);
      Toast.show({ type: "success", text1: "Resume uploaded successfully!" });
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed to upload resume" });
    }
  };

  const handleSubmit = async () => {
    const { name, email, description, resumeUrl } = form;

    if (!name || !email || !description || !resumeUrl) {
      Toast.show({ type: "error", text1: "Please fill all fields" });
      return;
    }

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("description", description);
      if (job_id) data.append("job_id", job_id);
      data.append("file", {
        uri: resumeUrl.uri,
        name: resumeUrl.name,
        type: resumeUrl.mimeType,
      } as any);

      const response = await fetch(
        "http://192.168.100.102:5000/api/applications/apply",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Application submitted successfully!",
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Submission failed",
        });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Server error" });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for Job</Text>

      <TextInput
        placeholder="Full Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Description / Cover Letter"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
        <Text style={styles.uploadText}>
          {form.resumeUrl
            ? `Uploaded: ${form.resumeUrl.name}`
            : "Upload Resume / CV"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Application</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApplyOnJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    color: "#111",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  uploadBtn: {
    backgroundColor: "#e0e7ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    color: "#4338ca",
    fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
