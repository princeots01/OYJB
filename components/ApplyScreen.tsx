import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobDetails() {
  const { id } = useLocalSearchParams();
  const [coffeeModalVisible, setCoffeeModalVisible] = useState(false); // modal state

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
          {/* Coffee icon */}
          <TouchableOpacity onPress={() => setCoffeeModalVisible(true)}>
            <Ionicons
              name="cafe-outline" // coffee icon
              size={26}
              color="#000"
              style={{ marginRight: 18 }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras risus
          velit, porttitor in quam vitae, congue congue sapien...
        </Text>

        {/* WHAT YOU'LL DO */}
        <Text style={styles.sectionTitle}>What you'll do</Text>
        <Text style={styles.bodyText}>
          Donec pharetra ipsum vel enim luctus feugiat. Etiam efficitur
          consectetur orci, in tempus magna suscipit non.
        </Text>

        {/* WHAT WE OFFER */}
        <Text style={styles.sectionTitle}>What we offer</Text>
        <Text style={styles.bodyText}>
          Maecenas in varius massa. Aenean molestie consectetur ante elementum
          faucibus...
        </Text>

        {/* JOB DESCRIPTION */}
        <Text style={styles.sectionTitle}>Job description</Text>
        <Text style={styles.bodyText}>
          Sed eu leo malesuada, dignissim eros at, ultricies quam...
        </Text>

        {/* WHAT WE OFFER AGAIN */}
        <Text style={styles.sectionTitle}>What we offer</Text>
        <Text style={styles.bodyText}>
          Nulla tincidunt leo nec nisi blandit aliquam...
        </Text>
      </ScrollView>

      {/* ---------------- BOTTOM APPLY BAR ---------------- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favBtn}>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ---------------- COFFEE MODAL ---------------- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={coffeeModalVisible}
        onRequestClose={() => setCoffeeModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Coffee Break ☕</Text>
            <Text style={styles.modalBody}>
              Take a short coffee break! Relax, recharge, and get back to work.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setCoffeeModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 6,
  },
  headerIcons: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
    lineHeight: 33,
  },
  location: { color: "#333", fontSize: 15, marginBottom: 2 },
  timeAgo: { color: "#777", fontSize: 14, marginBottom: 25 },
  sectionTitle: { fontWeight: "700", fontSize: 16, marginTop: 25, marginBottom: 10 },
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
    backgroundColor: "#003d99",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  favBtn: {
    marginLeft: 14,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  /* Modal styles */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  modalBody: { fontSize: 16, color: "#444", textAlign: "center", marginBottom: 20 },
  modalCloseBtn: {
    backgroundColor: "#003d99",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalCloseText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
