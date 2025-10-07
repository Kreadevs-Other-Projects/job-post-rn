import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { colors, radius } from "@/constants/style";
import { scale, verticalScale } from "@/utils/styling";
import Toast from "react-native-toast-message";

type OtpModalProps = {
  visible: boolean;
  onClose: () => void;
};

const VerifyOTP = ({ visible, onClose }: OtpModalProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!otp || otp.length < 4) {
      Toast.show({ type: "error", text1: "Enter the full OTP" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.100.102:5000/api/auth/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Toast.show({ type: "success", text1: result.message || "Verified" });
        setLoading(false);
        onClose();
      } else {
        setLoading(false);
        Toast.show({ type: "error", text1: result.message || "Invalid OTP" });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({ type: "error", text1: "Network error" });
      console.log("OTP verify error", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter OTP</Text>
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.primary}
            blurOnFilled
            theme={{
              pinCodeTextStyle: { color: colors.primary },
              containerStyle: { marginBottom: 20 },
            }}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => setOtp(text)}
          />

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonDisabled : null]}
            onPress={handleVerification}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.neutral100} />
            ) : (
              <Text style={[styles.buttonText, { color: colors.neutral100 }]}>
                Verify
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: radius._12 || 12,
    alignItems: "center",
  },
  title: {
    fontSize: scale(18),
    marginBottom: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(10),
    borderRadius: radius._10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: "600",
  },
  cancel: {
    marginTop: 10,
  },
  cancelText: {
    color: colors.neutral500,
  },
});
