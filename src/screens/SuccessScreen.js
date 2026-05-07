import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- SUCCESS ICON CONTAINER --- */}
        <View style={styles.iconContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Ionicons name="checkmark" size={50} color="white" />
            </View>
          </View>
        </View>

        {/* --- TEXT CONTENT --- */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Password Changed!</Text>
          <Text style={styles.subtitle}>
            Your password has been changed successfully.{"\n"}
            Use your new password to log in.
          </Text>
        </View>

        {/* --- BUTTON TO ROUTE TO LOGIN --- */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  outerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#E6EDFF", // Soft blue outer glow
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0044CC", // Bold blue core
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0044CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
