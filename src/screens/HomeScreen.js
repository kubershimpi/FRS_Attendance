import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { mockApi } from "../utils/DummyDB";

const { width } = Dimensions.get("window");

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState(null);
  const userId = route.params?.userId || "ramesh@mindbox.com";

  useEffect(() => {
    // Poll the "API" every 5 seconds to simulate live FRS detection
    const fetchData = () => {
      mockApi.getHomeStatus(userId).then((response) => {
        setData(response);
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  if (!data)
    return (
      <View style={styles.center}>
        <Text>Syncing with Camera...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* BLUE HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { userData: data.employee })
          }
        >
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
        <TouchableOpacity>
          <View style={styles.notifDot} />
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* FRS STATUS CARD */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={60}
              color="#0044CC"
            />
            <View style={styles.statusDot} />
          </View>

          <Text style={styles.statusTitle}>
            {data.today.checkIn ? "Checked In" : "Yet to Check In"}
          </Text>
          <Text style={styles.statusSubtitle}>
            {data.today.checkIn
              ? "Your attendance has been recorded."
              : "Please check in to mark your attendance."}
          </Text>

          <View style={styles.divider} />

          {/* TIME DISPLAY */}
          <View style={styles.timeRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>IN TIME</Text>
              <View style={styles.timeIconCircle}>
                <Ionicons name="time-outline" size={24} color="#22C55E" />
              </View>
              <Text style={styles.timeValue}>{data.today.checkIn || "--"}</Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.timeBox}>
              <Text style={styles.timeLabel}>OUT TIME</Text>
              <View
                style={[styles.timeIconCircle, { backgroundColor: "#FFF7ED" }]}
              >
                <Ionicons name="time-outline" size={24} color="#F97316" />
              </View>
              <Text style={styles.timeValue}>
                {data.today.checkOut || "--"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#0044CC" />
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  notifDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: "#0044CC",
  },
  scrollContainer: { padding: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  statusDot: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#3B82F6",
    borderWidth: 3,
    borderColor: "white",
  },
  statusTitle: { fontSize: 22, fontWeight: "800", color: "#1E293B" },
  statusSubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 30,
  },
  timeRow: { flexDirection: "row", width: "100%" },
  timeBox: { flex: 1, alignItems: "center" },
  timeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0044CC",
    marginBottom: 15,
  },
  timeIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  timeValue: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  verticalDivider: { width: 1, backgroundColor: "#F1F5F9" },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    flexDirection: "row",
    backgroundColor: "white",
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
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
