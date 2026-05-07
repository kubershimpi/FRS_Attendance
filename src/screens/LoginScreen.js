import React, { useState, useEffect } from "react";
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
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { UsersDatabase } from "../utils/DummyDB";

export default function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- DEBUG HOOK: Placed correctly at the top level ---
  useEffect(() => {
    const cleanId = userId.toLowerCase().trim();
    // Only log if the user exists in our local DB
    if (userId && UsersDatabase[cleanId]) {
      const currentPass = UsersDatabase[cleanId].password;
      console.log(`[DEBUG] Current DB Password for ${userId}: ${currentPass}`);
    }
  }, [userId]); // Runs every time the user types in the ID field

  const handleLogin = () => {
    if (!userId || !password) {
      Alert.alert(
        "Missing Fields",
        "Please enter both your Email/Phone and Password.",
      );
      return;
    }

    const cleanUserId = userId.toLowerCase().trim();
    const userRecord = UsersDatabase[cleanUserId];

    if (!userRecord) {
      Alert.alert("Login Failed", "This email/mobile is not registered.");
      return;
    }

    if (userRecord.password === password) {
      // SUCCESS: Navigate to Profile and pass the dynamic data
      navigation.navigate("Profile", { userData: userRecord.profile });
    } else {
      Alert.alert("Incorrect Password", "The password you entered is wrong.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* --- HEADER --- */}
        <View style={styles.headerContainer}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={45}
              color="white"
            />
          </View>
          <Text style={styles.title}>FRS ATTENDANCE</Text>
          <Text style={styles.subtitle}>Welcome Back!</Text>
        </View>

        {/* --- FORM --- */}
        <View style={styles.formContainer}>
          {/* Email/Phone Input */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#1e293b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor="#9ca3af"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#1e293b"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#1e293b"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Container */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => {
              if (!userId) {
                Alert.alert(
                  "Enter your ID",
                  "Please type your Email or Phone number in the box above so we can find your account.",
                );
                return;
              }
              if (!UsersDatabase[userId.toLowerCase().trim()]) {
                Alert.alert(
                  "Account Not Found",
                  "We cannot find an account with that ID.",
                );
                return;
              }
              navigation.navigate("ForgotPassword", { userId: userId });
            }}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFBFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#0044CC",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0044CC",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFBFF",
    borderWidth: 1,
    borderColor: "#93A3D8",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1e293b",
    height: "100%",
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#0044CC",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
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
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
