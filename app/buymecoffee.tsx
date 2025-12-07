import { useTheme } from "@/context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BuyCoffeeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "#1E1E1E" : "#D7DEE6";
  const text = isDark ? "#FFFFFF" : "#000000";

  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const donationAmounts = ["$1", "$5", "$10", "Custom"];

  const handleDonatePress = () => {
    Alert.alert(
      "Payment Feature",
      "Payment feature coming soon",
      [
        {
          text: "OK",
          onPress: () => router.push("/homeScreen"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* =================== HEADER CONTAINER =================== */}
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.topTitle}>Buy Us a Coffee</Text>
        </View>
        {/* BLACK LINE BELOW HEADER */}
        <View style={styles.headerLine} />
      </View>

      {/* =================== CONTENT =================== */}
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={[styles.title, { color: text }]}>Support OYJB</Text>

        <Text style={[styles.subtitle, { color: text }]}>
          Help us keep this platform free for job seekers by buying us a coffee!
        </Text>

        {/* =================== AMOUNT BOXES =================== */}
        <View style={styles.amountRow}>
          {donationAmounts.map((label) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.amountBox,
                selectedAmount === label && styles.amountSelected,
              ]}
              onPress={() => {
                setSelectedAmount(label);
                if (label !== "Custom") setCustomAmount("");
              }}
            >
              <MaterialCommunityIcons
                name="currency-usd"
                size={26}
                color="#fff"
              />
              <Text style={styles.amountText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CUSTOM AMOUNT */}
        {selectedAmount === "Custom" && (
          <TextInput
            placeholder="Enter amount"
            placeholderTextColor="#444"
            value={customAmount}
            onChangeText={setCustomAmount}
            keyboardType="numeric"
            style={styles.customInput}
          />
        )}

        {/* =================== PAYMENT METHOD =================== */}
        <Text style={[styles.methodTitle, { color: text }]}>
          Payment method
        </Text>

        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[styles.methodBox, paymentMethod === "Bank" && styles.methodSelected]}
            onPress={() => setPaymentMethod("Bank")}
          >
            <Text style={styles.methodText}>Bank Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodBox, paymentMethod === "Card" && styles.methodSelected]}
            onPress={() => setPaymentMethod("Card")}
          >
            <Text style={styles.methodText}>Credit/Debit Card</Text>
          </TouchableOpacity>
        </View>

        {/* =================== DONATE BUTTON =================== */}
        <TouchableOpacity style={styles.donateBtn} onPress={handleDonatePress}>
          <Text style={styles.donateText}>Donate</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* =================== BOTTOM NAV =================== */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/homeScreen")}>
          <Ionicons name="home" size={26} color="#0078D7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/savedjobs")}>
          <Ionicons name="heart-outline" size={26} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Ionicons name="notifications-outline" size={26} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={26} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =================== STYLES =================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* -------------------- HEADER -------------------- */
  headerContainer: {
    backgroundColor: "#fff",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 10,
    marginTop: 50,
    justifyContent: "space-between",
  },

  logo: { width: 40, height: 40 },

  topTitle: {
    fontSize: 20,
    fontWeight: "700",
    position: "absolute",
    right: 20,
  },

  headerLine: {
    width: "100%",
    height: 2,
    /* backgroundColor: "#000", */
  },

  /* -------------------- CONTENT -------------------- */
  inner: {
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 25,
    width: "90%",
  },

  /* -------------------- AMOUNTS -------------------- */
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  amountBox: {
    width: 75,
    height: 75,
    backgroundColor: "#003C88",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  amountSelected: {
    backgroundColor: "#0A66C2",
  },

  amountText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5,
  },

  customInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 25,
  },

  /* -------------------- METHOD -------------------- */
  methodTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
  },

  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  methodBox: {
    width: "48%",
    backgroundColor: "#0A66C2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  methodSelected: {
    backgroundColor: "#003C88",
  },

  methodText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },

  /* -------------------- DONATE -------------------- */
  donateBtn: {
    marginTop: 40,
    backgroundColor: "#0A66C2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  donateText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  /* -------------------- BOTTOM NAV -------------------- */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    elevation: 10,
  },
});
