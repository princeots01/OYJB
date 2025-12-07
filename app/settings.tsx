import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get("window");

export default function SettingsOverlay() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [notifEnabled, setNotifEnabled] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width * 0.8));

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeSettings = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";
  const panelColor = isDark ? "#1E1E1E" : "#D3E8FF";
  const borderColor = isDark ? "#888" : "#D3E8FF";

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateX: slideAnim }],
            backgroundColor: panelColor,
            borderColor: borderColor,
          },
        ]}
      >
        <TouchableOpacity style={styles.closeBtn} onPress={closeSettings}>
          <Ionicons name="close" size={22} color={textColor} />
        </TouchableOpacity>

        <View style={[styles.box, { borderColor: borderColor }]}>
          <View style={styles.rowBetween}>
            <Text style={[styles.label, { color: textColor }]}>
              Notifications
            </Text>
            <Switch
              value={notifEnabled}
              onValueChange={() => setNotifEnabled(!notifEnabled)}
            />
          </View>

          <TouchableOpacity style={styles.rowLeft} onPress={toggleTheme}>
            <Text style={[styles.label, { color: textColor }]}>Theme</Text>
            <Ionicons
              name={isDark ? "moon-outline" : "sunny-outline"}
              size={20}
              color={textColor}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/buymecoffee")}>
            <Text style={[styles.label, { color: textColor }]}>
              Buy us a Coffee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.label, { color: textColor }]}>
              Want to post a job?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.label, { color: textColor }]}>
              Signup to our Newsletter
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={[styles.footerBox, { borderColor: borderColor }]}>
          <TouchableOpacity style={styles.rowLeft}>
            <Text style={[styles.label, { color: textColor }]}>Website</Text>
            <Ionicons
              name="globe-outline"
              size={18}
              color={textColor}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowLeft}>
            <Text style={[styles.label, { color: textColor }]}>Enquiries</Text>
            <Ionicons
              name="mail-outline"
              size={18}
              color={textColor}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <Text style={[styles.label, { color: textColor, marginTop: 12 }]}>
            Socials
          </Text>

          {/* CLICKABLE SOCIAL ICONS */}
          <View style={styles.socialsRow}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://instagram.com/")
              }
            >
              <Ionicons name="logo-instagram" size={24} color={textColor} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://twitter.com/")
              }
            >
              <Ionicons name="logo-x" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0)",
  },

  panel: {
    width: "75%",
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderRightWidth: 2,
  },

  closeBtn: {
    position: "absolute",
    right: 15,
    top: 50,
    zIndex: 10,
  },

  box: {
    borderRadius: 6,
    padding: 18,
  },

  footerBox: {
    borderRadius: 6,
    padding: 18,
    marginTop: 70,
  },

  label: {
    fontSize: 15,
    marginVertical: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  socialsRow: {
    flexDirection: "row",
    marginTop: 10,
    columnGap: 15,
  },
});
