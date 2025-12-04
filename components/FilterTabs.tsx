import {
    FontAwesome5,
    Ionicons
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  selected: string;
  onSelect: (value: string) => void;
}

export default function FilterTabs({ selected, onSelect }: Props) {
  const tabs = [
    {
      label: "All Jobs",
      icon: (
        <Ionicons
          name="briefcase-outline"
          size={20}
          color={selected === "All Jobs" ? "#007bff" : "#555"}
        />
      ),
    },
    {
      label: "Skilled",
      icon: (
        <FontAwesome5
          name="user-cog"
          size={18}
          color={selected === "Skilled" ? "#007bff" : "#555"}
        />
      ),
    },
    {
      label: "Unskilled",
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={selected === "Unskilled" ? "#007bff" : "#555"}
        />
      ),
    },
    {
      label: "Internship",
      icon: (
        <Ionicons
          name="school-outline"
          size={20}
          color={selected === "Internship" ? "#007bff" : "#555"}
        />
      ),
    },
  ];

  return (
    <View style={styles.row}>
      {tabs.map((tab) => {
        const active = selected === tab.label;
        return (
          <TouchableOpacity
            key={tab.label}
            onPress={() => onSelect(tab.label)}
            style={[styles.tab, active && styles.activeTab]}
          >
            {tab.icon}
            <Text style={[styles.tabText, active && styles.activeText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: "#f5f7fa",
    borderWidth: 1,
    borderColor: "#e2e6ef",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activeTab: {
    borderColor: "#007bff",
    backgroundColor: "#eef5ff",
  },
  tabText: {
    color: "#444",
    fontSize: 13,
    fontWeight: "500",
  },
  activeText: {
    color: "#007bff",
    fontWeight: "700",
  },
});
