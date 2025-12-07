import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// THEME CONTEXT
import { useTheme } from "@/context/ThemeContext";

export default function NotificationScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "#1E1E1E" : "#fff";
  const cardBg = isDark ? "#2A2A2A" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const subColor = isDark ? "#aaa" : "#555";
  const lineColor = isDark ? "#444" : "#E5E5E5";
  const navBg = isDark ? "#1C1C1C" : "#F9FAFB";
  const iconDim = isDark ? "#aaa" : "#777";

  const updateBoxBorder = isDark ? "#ccc" : "#101828";

  const [notifications, setNotifications] = useState([
    {
      title: "Software Engineer",
      type: "Skilled",
      company: "Tech Solutions Ltd",
      expires: "12/31/2025",
      location: "Rivers, Nigeria",
      description:
        "We are looking for a passionate software engineer to join our team.",
      posted: "20mins ago",
    },
    {
      title: "Office Assistant",
      type: "Unskilled",
      company: "Greenfield Agency",
      expires: "01/10/2026",
      location: "Lagos, Nigeria",
      description:
        "Assist with daily office tasks including filing, organizing, and support.",
      posted: "1hr ago",
    },
    {
      title: "IT Support Intern",
      type: "Internship",
      company: "BlueSky ICT",
      expires: "02/15/2026",
      location: "Abuja, Nigeria",
      description:
        "Work with the IT support team to ensure smooth office operations.",
      posted: "1 day ago",
    },
  ]);

  const [sortModalVisible, setSortModalVisible] = useState(false);

  const badgeColors = {
    Skilled: "#0078D7",
    Unskilled: "#16a34a",
    Internship: "#f59e0b",
  };

  const sortOptions = ["Date Posted", "Job Type", "Company Name"];

  const sortJobs = (option: string) => {
    let sortedJobs = [...notifications];

    const timeToMinutes = (posted: string) => {
      const [num, unit] = posted.split(" ");
      if (unit.startsWith("min")) return parseInt(num);
      if (unit.startsWith("hr")) return parseInt(num) * 60;
      if (unit.startsWith("day")) return parseInt(num) * 1440;
      return 0;
    };

    if (option === "Date Posted") {
      sortedJobs.sort((a, b) => timeToMinutes(a.posted) - timeToMinutes(b.posted));
    } else if (option === "Job Type") {
      sortedJobs.sort((a, b) => a.type.localeCompare(b.type));
    } else if (option === "Company Name") {
      sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
    }

    setNotifications(sortedJobs);
    setSortModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      {/* TOP BAR */}
      <View style={[styles.topBar, { backgroundColor: bg }]}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.topTitle, { color: textColor }]}>Notifications</Text>
      </View>

      <View style={[styles.logoLine, { backgroundColor: lineColor }]} />

      {/* SORT MODAL */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.modalOption, { borderBottomColor: lineColor }]}
                onPress={() => sortJobs(option)}
              >
                <Text style={[styles.modalOptionText, { color: textColor }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* UPDATE NOTIFICATION */}
        <View
          style={[
            styles.updateBox,
            { borderColor: updateBoxBorder, backgroundColor: cardBg },
          ]}
        >
          <Text style={[styles.updateText, { color: textColor }]}>
            There’s an update for the app
          </Text>
        </View>

        {/* SORT BUTTON */}
        <View style={styles.sortWrapper}>
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setSortModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#0078D7" />
            <Text style={[styles.sortText]}>Sort</Text>
          </TouchableOpacity>
        </View>

        {/* EMPTY NOTIFICATION */}
        {notifications.length === 0 && (
          <View style={styles.noResultWrapper}>
            <Ionicons name="notifications-outline" size={70} color={iconDim} />
            <Text style={[styles.noResultText, { color: iconDim }]}>
              No Notifications
            </Text>
            <Text style={[styles.noResultSub, { color: iconDim }]}>
              You currently have no notifications.  
              Check back later for updates.
            </Text>
          </View>
        )}

        {/* JOB CARDS */}
        {notifications.map((job, index) => (
          <View key={index} style={[styles.jobCard, { backgroundColor: cardBg }]}>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: "/jobdetails", params: job })
                }
              >
                <Text style={[styles.jobTitle, { color: textColor }]}>
                  {job.title}
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.badge,
                  { backgroundColor: badgeColors[job.type] },
                ]}
              >
                {job.type}
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={[styles.company, { color: subColor }]}>
                {job.company}
              </Text>
              <Text style={[styles.expires, { color: subColor }]}>
                Expires: {job.expires}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color={subColor} />
              <Text style={[styles.location, { color: subColor }]}>
                {job.location}
              </Text>

              <MaterialCommunityIcons
                name="access-point"
                size={16}
                color={subColor}
                style={{ marginLeft: 12 }}
              />
              <Text style={[styles.location, { color: subColor }]}>Remote</Text>
            </View>

            <Text style={[styles.description, { color: subColor }]}>
              {job.description}
            </Text>
            <Text style={[styles.posted, { color: subColor }]}>
              Posted {job.posted}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: navBg, borderColor: lineColor },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/homeScreen")}>
          <Ionicons
            name="home-outline"
            size={26}
            color={iconDim}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/savedjobs")}>
          <Ionicons name="heart-outline" size={26} color={iconDim} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons
            name="notifications"
            size={26}
            color={isDark ? "#fff" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={26} color={iconDim} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  logo: { width: 40, height: 40 },
  topTitle: {
    fontSize: 22,
    fontWeight: "700",
    position: "absolute",
    right: 20,
    marginTop: 20
  },
  logoLine: {
    width: "100%",
    height: 1,
  },

  updateBox: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    alignItems: "center",
  },
  updateText: { fontWeight: "600", fontSize: 14 },

  sortWrapper: { paddingHorizontal: 20, marginTop: 10 },
  sortBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-end" },
  sortText: { marginLeft: 5, color: "#0078D7", fontWeight: "600" },

  jobCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  jobTitle: { fontSize: 18, fontWeight: "700", maxWidth: "70%" },
  badge: {
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
    borderRadius: 8,
  },
  company: { fontSize: 13 },
  expires: { fontSize: 12, fontWeight: "600" },

  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  location: { marginLeft: 5 },

  description: { marginTop: 10, lineHeight: 18 },
  posted: { marginTop: 8, fontSize: 12 },

  noResultWrapper: { marginTop: 40, alignItems: "center", paddingHorizontal: 30 },
  noResultText: { fontSize: 20, fontWeight: "700", marginTop: 10 },
  noResultSub: { textAlign: "center", fontSize: 16, marginTop: 8, lineHeight: 20 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 12,
    width: "80%",
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
  },
  modalOptionText: { fontSize: 16, fontWeight: "600" },
});
