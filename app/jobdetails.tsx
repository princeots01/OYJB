import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// THEME CONTEXT IMPORT
import { useTheme } from "@/context/ThemeContext";

// IMPORT YOUR MODAL COMPONENT
import CoffeeModal from "../components/CoffeeModal";

export default function JobDetails() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);

  const handleApply = () => {
    Alert.alert("Success", "Application submitted successfully!", [
      { text: "OK", onPress: () => router.push("/homeScreen") },
    ]);
  };

  const handleFavorite = () => {
    Alert.alert("Favorite", "Added to favorite ✓");
  };

  // THEME COLORS
  const bg = isDark ? "#1E1E1E" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const subColor = isDark ? "#bbb" : "#444";
  const cardBg = isDark ? "#2A2A2A" : "#fff";
  const lineColor = isDark ? "#444" : "#E5E5E5";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {/* ---------------- HEADER ---------------- */}
      <View>
        <View style={[styles.header]}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
        </View>

        {/* STRAIGHT LINE UNDER LOGO */}
        <View style={[styles.headerLine, { backgroundColor: lineColor }]} />
      </View>

      {/* ---------------- CONTENT ---------------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 150 }}
      >
        {/* JOB TITLE + HEART */}
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: textColor }]}>
            Software{"\n"}Engineer
          </Text>

          <TouchableOpacity onPress={handleFavorite}>
            <Ionicons
              name="heart-outline"
              size={30}
              color={isDark ? "#888" : "#D0D5DD"}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.location, { color: subColor }]}>Location: Remote</Text>
        <Text style={[styles.timeAgo, { color: subColor }]}>2w ago</Text>

        {/* -------- ABOUT US -------- */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          About Us
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras risus
          velit, porttitor in quam vitae, congue congue sapien...
        </Text>

        {/* -------- WHAT YOU'LL DO -------- */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          What you'll do
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Donec pharetra ipsum vel enim luctus feugiat...
        </Text>

        {/* -------- WHAT WE OFFER -------- */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          What we offer
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Maecenas in varius massa. Aenean molestie consectetur ante elementum...
        </Text>

        {/* -------- JOB DESCRIPTION -------- */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Job description
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Sed eu leo malesuada, dignissim eros at, ultricies quam...
        </Text>
      </ScrollView>

      {/* ---------------- APPLY BUTTON ---------------- */}
      <View style={[styles.applyBar, { backgroundColor: cardBg }]}>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* ---------------- BOTTOM NAVIGATION ---------------- */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: cardBg, borderColor: lineColor },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/homeScreen")}>
          <Ionicons
            name="home-outline"
            size={28}
            color={isDark ? "#bbb" : "#D0D5DD"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/buymecoffee")}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={isDark ? "#bbb" : "#D0D5DD"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color={isDark ? "#bbb" : "#D0D5DD"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={28}
            color={isDark ? "#bbb" : "#D0D5DD"}
          />
        </TouchableOpacity>
      </View>

      {/* ---------------- IMPORTED MODAL ---------------- */}
      <CoffeeModal
        visible={coffeeModalVisible}
        onClose={() => setCoffeeModalVisible(false)}
      />
    </SafeAreaView>
  );
}

/* ---------------------------------------------------------
                          STYLES
--------------------------------------------------------- */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },

  logoImage: { width: 35, height: 35, resizeMode: "contain" },

  /* TITLE + HEART */
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 33,
    marginBottom: 6,
    flex: 1,
  },

  location: { fontSize: 15, marginBottom: 2 },
  timeAgo: { fontSize: 14, marginBottom: 25 },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },

  bodyText: { lineHeight: 20, fontSize: 14 },

  /* APPLY BUTTON BAR */
  applyBar: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  applyBtn: {
    flex: 1,
    backgroundColor: "#0D47A1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  /* BOTTOM NAV */
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  headerLine: {
    width: "100%",
    height: 1.2,
    marginTop: 6,
  },
});
