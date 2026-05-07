import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { mockApi } from "../utils/DummyDB";

const { width } = Dimensions.get("window");

export default function HistoryScreen({ route, navigation }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get userId from navigation params
  const userId = route.params?.userId || "ramesh@mindbox.com";

  useEffect(() => {
    setLoading(true);
    // Dynamic fetch from Mock API
    mockApi
      .getAttendanceHistory(userId)
      .then((response) => {
        setLogs(response.logs);
      })
      .catch((err) => console.error("History Sync Error:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  // DYNAMIC CARD: Calculates Today/Yesterday relative to the current device clock
  const AttendanceCard = ({ item }) => {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");

    let displayDay = item.dayName.toUpperCase();
    if (item.date === today) displayDay = "TODAY";
    else if (item.date === yesterday) displayDay = "YESTERDAY";

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.dayLabel}>{displayDay}</Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>
              {moment(item.date).format("DD MMM YYYY")}, {item.dayName}
            </Text>
            <Ionicons name="calendar-outline" size={16} color="#64748B" />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.timeContainer}>
          {/* IN TIME SECTION */}
          <View style={styles.timeBox}>
            <Text style={styles.timeTitle}>IN TIME</Text>
            <View style={styles.iconCircleGreen}>
              <Ionicons name="time-outline" size={24} color="#22C55E" />
            </View>
            <Text style={styles.timeValue}>
              {item.checkIn ? item.checkIn : "--:--"}
            </Text>
          </View>

          <View style={styles.verticalDivider} />

          {/* OUT TIME SECTION */}
          <View style={styles.timeBox}>
            <Text style={styles.timeTitle}>OUT TIME</Text>
            <View style={styles.iconCircleOrange}>
              <Ionicons name="time-outline" size={24} color="#F97316" />
            </View>
            <Text
              style={[
                styles.timeValue,
                { color: item.checkOut ? "#F97316" : "#cbd5e1" },
              ]}
            >
              {item.checkOut ? item.checkOut : "--:--"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userId })}
        >
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance History</Text>
        <TouchableOpacity>
          <View style={styles.notifDot} />
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0044CC" />
          <Text style={styles.loadingText}>Loading Logs...</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => <AttendanceCard item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="document-text-outline"
                size={60}
                color="#cbd5e1"
              />
              <Text style={styles.emptyText}>No attendance records found.</Text>
            </View>
          }
        />
      )}

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Home", { userId })}
        >
          <Ionicons name="home-outline" size={24} color="#64748B" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="time" size={24} color="#0044CC" />
          <Text style={[styles.tabLabel, styles.activeTab]}>History</Text>
          <View style={styles.activeIndicator} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#64748B", fontWeight: "600" },
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
  listContainer: { padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dayLabel: { fontSize: 15, fontWeight: "900", color: "#0044CC" },
  dateRow: { flexDirection: "row", alignItems: "center" },
  dateText: {
    fontSize: 12,
    color: "#64748B",
    marginRight: 5,
    fontWeight: "600",
  },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginBottom: 20 },
  timeContainer: { flexDirection: "row" },
  timeBox: { flex: 1, alignItems: "center" },
  timeTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 12,
  },
  iconCircleGreen: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircleOrange: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  timeValue: { fontSize: 17, fontWeight: "800", color: "#16A34A" },
  verticalDivider: { width: 1, backgroundColor: "#F1F5F9" },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: {
    textAlign: "center",
    marginTop: 15,
    color: "#94A3B8",
    fontSize: 14,
  },
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
