import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// HERO FIX: Ensure the import uses curly braces for named exports
import { updatePasswordInDB } from "../utils/DummyDB";

export default function CreateNewPasswordScreen({ route, navigation }) {
  const userId = route.params?.userId || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isLongEnough = newPassword.length >= 8;
  const hasSpecialChar = /[0-9!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isDifferent = newPassword !== "password123";
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  const handleResetPassword = () => {
    if (isLongEnough && hasSpecialChar && isDifferent && passwordsMatch) {
      // Call the function from DummyDB
      const success = updatePasswordInDB(userId, newPassword);

      if (success) {
        navigation.navigate("Success");
      } else {
        Alert.alert("Error", "Could not find user to update.");
      }
    } else {
      Alert.alert(
        "Validation Error",
        "Please ensure all security criteria are met.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#1e293b" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create New Password</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.iconSection}>
            <View style={styles.iconCircle}>
              <Ionicons name="shield-checkmark" size={45} color="#0044CC" />
            </View>
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>
              Your new password must be{"\n"}different from previous
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#1e293b"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                <Ionicons
                  name={showNew ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#1e293b"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#1e293b"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#1e293b"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checklist}>
            <ValidationItem
              label="At least 8 characters"
              isValid={isLongEnough}
            />
            <ValidationItem
              label="Contains number or symbol"
              isValid={hasSpecialChar}
            />
            <ValidationItem
              label="Different from old password"
              isValid={isDifferent}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              !(passwordsMatch && isLongEnough && hasSpecialChar) &&
                styles.buttonDisabled,
            ]}
            onPress={handleResetPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ValidationItem = ({ label, isValid }) => (
  <View style={styles.checkItem}>
    <Ionicons
      name={isValid ? "checkmark-circle" : "checkmark-circle-outline"}
      size={20}
      color={isValid ? "#22c55e" : "#cbd5e1"}
    />
    <Text style={[styles.checkText, isValid && styles.checkTextValid]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFBFF" },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#1e293b" },
  placeholder: { width: 38 },
  iconSection: { alignItems: "center", marginBottom: 30 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  form: { marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#93A3D8",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: "#1e293b" },
  checklist: { marginBottom: 30 },
  checkItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  checkText: { marginLeft: 10, fontSize: 14, color: "#64748b" },
  checkTextValid: { color: "#1e293b", fontWeight: "500" },
  primaryButton: {
    backgroundColor: "#0044CC",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    marginBottom: 20,
  },
  buttonDisabled: { backgroundColor: "#93A3D8" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
