import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UsersDatabase } from "../utils/DummyDB"; // Pulling in the mock DB

export default function OtpScreen({ route, navigation }) {
  // 1. Extract the data passed from the ForgotPassword screen
  const method = route.params?.method || "phone";
  const userId = route.params?.userId || "";

  // 2. Fetch the user's real details from the database
  const userRecord = UsersDatabase[userId];

  // 3. Determine what to display based on their selection
  const displayContact =
    method === "phone"
      ? userRecord?.profile?.phone || "your registered mobile"
      : userRecord?.profile?.email || "your registered email";

  // State for the 6-digit OTP and Timer
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle typing in the OTP boxes (Auto-advance)
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus to next box if typing
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace (Auto-retreat)
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    // In a real app, you'd check if the OTP matches here.
    // For now, we pass the userId forward to the final Reset Password screen!
    navigation.navigate("CreateNewPassword", { userId: userId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter OTP</Text>
          <View style={styles.placeholder} />
        </View>

        {/* --- ICON --- */}
        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="chatbubble-ellipses" size={40} color="#0044CC" />
          </View>
          <Text style={styles.subtitle}>We have sent a 6-digit OTP to</Text>
          {/* DYNAMIC DATA RENDERED HERE */}
          <Text style={styles.contactText}>{displayContact}</Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeText}>Change?</Text>
          </TouchableOpacity>
        </View>

        {/* --- 6-DIGIT OTP INPUTS --- */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpBox, digit && styles.otpBoxActive]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* --- TIMER --- */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            Resend OTP in{" "}
            <Text style={styles.timerBold}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          </Text>
        </View>

        {/* --- VERIFY BUTTON --- */}
        <View style={styles.bottomSpacer} />
        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFBFF" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#1e293b" },
  placeholder: { width: 38 },
  iconSection: { alignItems: "center", marginBottom: 40 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 6,
  },
  contactText: {
    fontSize: 18,
    color: "#0044CC",
    fontWeight: "bold",
    marginBottom: 8,
  },
  changeText: { fontSize: 14, color: "#0044CC", fontWeight: "600" },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#93A3D8",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    backgroundColor: "#FAFBFF",
  },
  otpBoxActive: { borderColor: "#0044CC", backgroundColor: "#F4F7FF" },
  timerContainer: { alignItems: "center", marginBottom: 20 },
  timerText: { fontSize: 14, color: "#64748b", fontWeight: "500" },
  timerBold: { color: "#0044CC", fontWeight: "700" },
  bottomSpacer: { flex: 1 },
  primaryButton: {
    backgroundColor: "#0044CC",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0044CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
