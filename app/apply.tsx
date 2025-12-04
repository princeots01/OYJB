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

// IMPORT YOUR MODAL COMPONENT
import CoffeeModal from "../components/CoffeeModal";

export default function JobDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false);

  // ---------------- APPLY HANDLER ----------------
  const handleApply = () => {
    Alert.alert("Success", "Application submitted successfully!", [
      {
        text: "OK",
        onPress: () => router.push("/"), // go back to index
      },
    ]);
  };

  // ---------------- FAVORITE HANDLER ----------------
  const handleFavorite = () => {
    Alert.alert("Favorite", "Added to favorite ✓");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>OYJB</Text>
        </View>

        <View style={styles.headerIcons}>
          {/* Coffee icon → opens imported modal */}
          <TouchableOpacity onPress={() => setCoffeeModalVisible(true)}>
            <Ionicons
              name="cafe-outline"
              size={26}
              color="#000"
              style={{ marginRight: 18 }}
            />
          </TouchableOpacity>

          {/* Heart icon → show Added to favorite */}
          <TouchableOpacity onPress={handleFavorite}>
            <Ionicons name="heart-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------------- CONTENT ---------------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 120 }}
      >
        <Text style={styles.title}>Software{"\n"}Engineer</Text>
        <Text style={styles.location}>Location: Remote</Text>
        <Text style={styles.timeAgo}>2w ago</Text>

        {/* ABOUT US */}
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras risus velit, porttitor in quam vitae, congue congue sapien. Praesent eget velit condimentum, viverra purus ut, commodo diam. Maecenas in varius massa. Aenean molestie consectetur ante elementum faucibus. Nunc aliquet egestas justo id hendrerit. Sed enim ante, eleifend at sem vel, laoreet luctus leo. Donec ut lectus et neque scelerisque pharetra. Phasellus volutpat sapien ac sagittis pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </Text>

        {/* WHAT YOU'LL DO */}
        <Text style={styles.sectionTitle}>What you'll do</Text>
        <Text style={styles.bodyText}>
          Donec pharetra ipsum vel enim luctus feugiat. Etiam efficitur consectetur orci, in tempus magna suscipit non.
        </Text>

        {/* WHAT WE OFFER */}
        <Text style={styles.sectionTitle}>What we offer</Text>
        <Text style={styles.bodyText}>
          Maecenas in varius massa. Aenean molestie consectetur ante elementum faucibus. Nunc aliquet egestas justo id hendrerit. Sed enim ante, eleifend at sem vel, laoreet luctus leo. Donec ut lectus et neque scelerisque pharetra. Phasellus volutpat sapien ac sagittis pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </Text>

        {/* JOB DESCRIPTION */}
        <Text style={styles.sectionTitle}>Job description</Text>
        <Text style={styles.bodyText}>
          Sed eu leo malesuada, dignissim eros at, ultricies quam. Morbi fringilla felis ligula, ac tincidunt odio facilisis sed. Cras faucibus ligula in quam mattis feugiat. Nunc eros nisi, euismod vel ullamcorper nec, dictum ac sapien. Nulla tincidunt leo nec nisi blandit aliquam. Vestibulum dictum purus faucibus dui aliquam porta. In venenatis et tellus in condimentum. Etiam magna massa, tincidunt non vulputate vitae, semper at nunc. Nullam et tempor lectus, quis egestas turpis.
        </Text>
      </ScrollView>

      {/* ---------------- BOTTOM APPLY BAR ---------------- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favBtn} onPress={handleFavorite}>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ---------------- IMPORTED COFFEE MODAL ---------------- */}
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
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoImage: { width: 28, height: 28, resizeMode: "contain" },
  logoText: { fontSize: 18, fontWeight: "700", marginLeft: 6 },
  headerIcons: { flexDirection: "row", marginLeft: "auto" },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
    lineHeight: 33,
  },
  location: { color: "#333", fontSize: 15, marginBottom: 2 },
  timeAgo: { color: "#777", fontSize: 14, marginBottom: 25 },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  bodyText: { color: "#444", lineHeight: 20, fontSize: 14 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#0D47A1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  favBtn: {
    marginLeft: 14,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
