import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// THEME CONTEXT
import { useTheme } from "@/context/ThemeContext";

// MODAL
import CoffeeModal from "../components/CoffeeModal";

export default function JobDetails() {
  const { height, width } = Dimensions.get("window"); // NOW USING YOUR 390×844 FRAME

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);

  // APPLY ACTION
  const handleApply = () => {
    Alert.alert("Success", "Application submitted successfully!", [
      { text: "OK", onPress: () => router.push("/homeScreen") },
    ]);
  };

  // FAVORITE ACTION
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
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={[styles.headerLine, { backgroundColor: lineColor }]} />

      {/* MAIN CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingBottom: height * 0.18, // SPACE FOR APPLY BUTTON + NAV
        }}
      >
        {/* TITLE + HEART */}
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

        <Text style={[styles.location, { color: subColor }]}>
          Location: Remote
        </Text>
        <Text style={[styles.timeAgo, { color: subColor }]}>2w ago</Text>

        {/* ABOUT US */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          About Us
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras risus
          velit, porttitor in quam vitae...
        </Text>

        {/* WHAT YOU'LL DO */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          What you'll do
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Donec pharetra ipsum vel enim luctus feugiat...
        </Text>

        {/* WHAT WE OFFER */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          What we offer
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Maecenas in varius massa. Aenean molestie...
        </Text>

        {/* JOB DESCRIPTION */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Job description
        </Text>
        <Text style={[styles.bodyText, { color: subColor }]}>
          Sed eu leo malesuada, dignissim eros at, ultricies quam...
        </Text>
      </ScrollView>

      {/* APPLY BUTTON */}
      <View
        style={[
          styles.applyBar,
          {
            backgroundColor: cardBg,
            bottom: 60, // fits into 390×844 screen
          },
        ]}
      >
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM NAV */}
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

        <TouchableOpacity onPress={() => router.push("/notifications")}>
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

      {/* COFFEE MODAL */}
      <CoffeeModal
        visible={coffeeModalVisible}
        onClose={() => setCoffeeModalVisible(false)}
      />
    </SafeAreaView>
  );
}

/* ---------------------------------------------------------
                      STYLES (390×844 optimized)
--------------------------------------------------------- */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 6,
  },

  logoImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 26, // fits 390px width well
    fontWeight: "700",
    lineHeight: 32,
    flex: 1,
  },

  location: { fontSize: 15, marginTop: 8, marginBottom: 2 },
  timeAgo: { fontSize: 14, marginBottom: 20 },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },

  bodyText: {
    lineHeight: 20,
    fontSize: 14,
  },

  applyBar: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  applyBtn: {
    backgroundColor: "#0D47A1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

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
    marginTop: 4,
  },
});
