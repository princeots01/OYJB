import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context"; // UPDATED

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState("All Jobs");
  const [searchText, setSearchText] = useState("");

  const categories = [
    { name: "All Jobs", icon: "briefcase-outline" },
    { name: "Skilled", icon: "hammer-wrench" },
    { name: "Unskilled", icon: "account-hard-hat-outline" },
    { name: "Internship", icon: "school-outline" },
  ];

  const allJobs = [
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
  ];

  const jobsByCategory =
    selected === "All Jobs"
      ? allJobs
      : allJobs.filter((job) => job.type === selected);

  const filteredJobs = jobsByCategory.filter((job) => {
    const t = searchText.toLowerCase();
    return (
      job.title.toLowerCase().includes(t) ||
      job.company.toLowerCase().includes(t) ||
      job.location.toLowerCase().includes(t) ||
      job.type.toLowerCase().includes(t) ||
      job.description.toLowerCase().includes(t)
    );
  });

  const badgeColors: Record<string, string> = {
    Skilled: "#0078D7",
    Unskilled: "#16a34a",
    Internship: "#f59e0b",
  };

  const bg = isDark ? "#1E1E1E" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const subText = isDark ? "#ccc" : "#555";
  const cardBg = isDark ? "#2A2A2A" : "#fff";
  const lineColor = isDark ? "#444" : "#E5E5E5";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {/* TOP BAR */}
      <View style={[styles.topBar, { backgroundColor: bg }]}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.topTitle, { color: textColor }]}>Home</Text>
      </View>

      {/* LINE */}
      <View style={[styles.logoLine, { backgroundColor: lineColor }]} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Find Your Dream Job
          </Text>
          <Text style={[styles.headerSubtitle, { color: subText }]}>
            Discover verified job opportunities from trusted employers. No
            registration required – just browse, download, and apply!
          </Text>
        </View>

        {/* SEARCH BAR */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: isDark ? "#333" : "#f1f1f1" },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={isDark ? "#bbb" : "#777"}
            style={{ marginLeft: 5 }}
          />
          <TextInput
            placeholder="Search jobs, companies, locations"
            placeholderTextColor={isDark ? "#888" : "#777"}
            style={[styles.searchInput, { color: textColor }]}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchBtnInside}>
            <Text style={styles.searchInsideText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* CATEGORIES */}
        <View style={styles.categoryRow}>
          {categories.map((cat) => {
            const selectedCat = selected === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryBtn,
                  {
                    backgroundColor: selectedCat
                      ? "#0078D7"
                      : isDark
                      ? "#333"
                      : "#e8f1ff",
                  },
                ]}
                onPress={() => setSelected(cat.name)}
              >
                <MaterialCommunityIcons
                  name={cat.icon}
                  size={22}
                  color={selectedCat ? "#fff" : "#0078D7"}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: selectedCat ? "#fff" : "#0078D7" },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SORT */}
        <View style={styles.sortWrapper}>
          <TouchableOpacity style={styles.sortBtn}>
            <Ionicons
              name="options-outline"
              size={20}
              color={isDark ? "#bbb" : "#0078D7"}
            />
            <Text
              style={[styles.sortText, { color: isDark ? "#bbb" : "#0078D7" }]}
            >
              Sort
            </Text>
          </TouchableOpacity>
        </View>

        {/* NO RESULT */}
        {filteredJobs.length === 0 && (
          <View style={styles.noResultWrapper}>
            <Ionicons
              name="briefcase-outline"
              size={70}
              color={isDark ? "#777" : "#999"}
            />
            <Text style={[styles.noResultText, { color: subText }]}>
              No Job Found
            </Text>
            <Text style={[styles.noResultSub, { color: subText }]}>
              Try adjusting your search criteria or check back later for new
              opportunities.
            </Text>
          </View>
        )}

        {/* JOB CARDS */}
        {filteredJobs.map((job, index) => (
          <View
            key={index}
            style={[styles.jobCard, { backgroundColor: cardBg }]}
          >
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
                  { backgroundColor: badgeColors[job.type] || "#0078D7" },
                ]}
              >
                {job.type}
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={[styles.company, { color: subText }]}>
                {job.company}
              </Text>
              <Text style={[styles.expires, { color: subText }]}>
                Expires: {job.expires}
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons
                name="location-outline"
                size={16}
                color={isDark ? "#aaa" : "#555"}
              />
              <Text style={[styles.location, { color: subText }]}>
                {job.location}
              </Text>

              <MaterialCommunityIcons
                name="access-point"
                size={16}
                color={isDark ? "#aaa" : "#555"}
                style={{ marginLeft: 12 }}
              />
              <Text style={[styles.location, { color: subText }]}>
                Remote
              </Text>
            </View>

            <Text style={[styles.description, { color: subText }]}>
              {job.description}
            </Text>
            <Text style={[styles.posted, { color: subText }]}>
              Posted {job.posted}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: isDark ? "#1E1E1E" : "#F9FAFB" },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/homeScreen")}>
          <Ionicons name="home" size={26} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/savedjobs")}>
          <Ionicons
            name="heart-outline"
            size={26}
            color={isDark ? "#ccc" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={isDark ? "#ccc" : "#777"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={26}
            color={isDark ? "#ccc" : "#777"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
  logo: { width: 40, height: 40 },
  topTitle: { fontSize: 22, fontWeight: "700" },
  logoLine: { width: "100%", height: 1 },
  header: { padding: 20, alignItems: "center" },
  headerTitle: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  headerSubtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
    lineHeight: 18,
    width: "90%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  searchBtnInside: {
    backgroundColor: "#0078D7",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchInsideText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 18,
  },
  categoryBtn: {
    width: "23%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },
  sortWrapper: { paddingHorizontal: 20, marginTop: 10 },
  sortBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-end" },
  sortText: { marginLeft: 5, fontWeight: "600" },
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
    overflow: "hidden",
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
    elevation: 10,
  },
});
