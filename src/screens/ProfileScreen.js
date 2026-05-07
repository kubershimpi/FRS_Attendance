import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ route, navigation }) {
  // Extract the dynamic data passed from the Login success!
  const userData = route.params?.userData || {
    name: "Ramesh Kumar",
    email: "ramesh.kumar@mindbox.com",
    phone: "+91 98765 43210",
    department: "IT Department",
    designation: "Software Engineer",
    location: "Bangalore, India",
  };

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <View style={styles.notifDot} />
          <Ionicons name="notifications-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBg}>
              <Ionicons name="person" size={50} color="#0044CC" />
            </View>
          </View>

          <Text style={styles.profileName}>{userData.name}</Text>

          <View style={styles.divider} />

          {/* INFORMATION ROWS */}
          <View style={styles.infoList}>
            <InfoRow icon="mail-outline" label="Email" value={userData.email} />
            <InfoRow icon="call-outline" label="Phone" value={userData.phone} />
            <InfoRow
              icon="business-outline"
              label="Department"
              value={userData.department}
            />
            <InfoRow
              icon="briefcase-outline"
              label="Designation"
              value={userData.designation}
            />
            <InfoRow
              icon="location-outline"
              label="Location"
              value={userData.location}
              isLast
            />
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <View style={styles.logoutLeft}>
            <Ionicons name="log-out-outline" size={24} color="#E53935" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM TAB BAR NAVIGATION */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={24} color="#0044CC" />
          <Text style={[styles.tabLabel, styles.activeTab]}>Home</Text>
          <View style={styles.activeIndicator} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("History")}
        >
          <Ionicons name="time-outline" size={24} color="#64748B" />
          <Text style={styles.tabLabel}>History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const InfoRow = ({ icon, label, value, isLast }) => (
  <View style={[styles.infoRow, !isLast && styles.rowBorder]}>
    <View style={styles.labelGroup}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color="#0044CC" />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    backgroundColor: "#0044CC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  headerBtn: { padding: 5 },
  notifDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: "#0044CC",
  },

  scrollContainer: { padding: 20, paddingBottom: 120 },

  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarContainer: { alignItems: "center", marginTop: 10 },
  avatarBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 10 },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  labelGroup: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    backgroundColor: "#EEF4FF",
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  infoLabel: { fontSize: 14, color: "#64748B", fontWeight: "500" },
  infoValue: {
    fontSize: 14,
    color: "#0044CC",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },

  logoutBtn: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  logoutLeft: { flexDirection: "row", alignItems: "center" },
  logoutText: {
    marginLeft: 12,
    color: "#E53935",
    fontSize: 16,
    fontWeight: "700",
  },

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: width, // Fixes visibility on emulator
    flexDirection: "row",
    backgroundColor: "white",
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabLabel: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: "500" },
  activeTab: { color: "#0044CC", fontWeight: "700" },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 3,
    backgroundColor: "#0044CC",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
