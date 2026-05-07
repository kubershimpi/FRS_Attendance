import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UsersDatabase } from "../utils/DummyDB"; // Import our mock database!

export default function ForgotPasswordScreen({ route, navigation }) {
  const [selectedMethod, setSelectedMethod] = useState("phone");

  // 1. Get the userId passed from the Login Screen
  const userId = route.params?.userId?.toLowerCase().trim() || "";

  // 2. Look up the user in our database
  const userRecord = UsersDatabase[userId];

  // 3. Extract their real data (with safe fallbacks)
  const userPhone = userRecord?.profile?.phone || "No phone linked";
  const userEmail = userRecord?.profile?.email || "No email linked";

  const handleSendOTP = () => {
    // Pass the selected method AND the userId forward to the OTP screen
    navigation.navigate("Otp", {
      method: selectedMethod,
      userId: userId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed" size={45} color="#0044CC" />
          </View>
          <Text style={styles.subtitle}>
            Choose an option to receive{"\n"}OTP for password reset
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedMethod === "phone" && styles.optionCardActive,
          ]}
          onPress={() => setSelectedMethod("phone")}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconBox}>
            <Ionicons name="call" size={24} color="#0044CC" />
          </View>
          <View style={styles.optionTextContainer}>
            {/* Displaying Dynamic Data */}
            <Text style={styles.optionValue}>{userPhone}</Text>
            <Text style={styles.optionLabel}>Send OTP to Mobile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedMethod === "email" && styles.optionCardActive,
          ]}
          onPress={() => setSelectedMethod("email")}
          activeOpacity={0.7}
        >
          <View style={styles.optionIconBox}>
            <Ionicons name="mail" size={24} color="#0044CC" />
          </View>
          <View style={styles.optionTextContainer}>
            {/* Displaying Dynamic Data */}
            <Text style={styles.optionValue}>{userEmail}</Text>
            <Text style={styles.optionLabel}>Send OTP to Email</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... styles remain exactly the same as before ...
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
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFBFF",
    borderWidth: 1.5,
    borderColor: "#93A3D8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  optionCardActive: { borderColor: "#0044CC", backgroundColor: "#F4F7FF" },
  optionIconBox: { marginRight: 16 },
  optionTextContainer: { flex: 1 },
  optionValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  optionLabel: { fontSize: 14, color: "#64748b", fontWeight: "500" },
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
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
