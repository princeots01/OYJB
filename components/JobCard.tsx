import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Job } from "../types/job";

interface Props {
  job: Job;
  onApply?: (job: Job) => void;
  onTitlePress?: (job: Job) => void;
}

export default function JobCard({ job, onApply, onTitlePress }: Props) {
  const bgColor =
    job.level === "Skilled"
      ? "#d7f8df"
      : job.level === "Unskilled"
      ? "#dbe9ff"
      : "#e8f3ff";

  const textColor =
    job.level === "Skilled"
      ? "#0a863d"
      : job.level === "Unskilled"
      ? "#0056d2"
      : "#0056d2";

  return (
    <View style={styles.card}>
      {/* CLICKABLE JOB TITLE */}
      <View style={styles.rowBetween}>
        <TouchableOpacity onPress={() => onTitlePress && onTitlePress(job)}>
          <Text style={styles.title}>{job.title}</Text>
        </TouchableOpacity>

        <View style={[styles.badge, { backgroundColor: bgColor }]}>
          <Text style={[styles.badgeText, { color: textColor }]}>
            {job.level}
          </Text>
        </View>
      </View>

      {/* COMPANY + DATE */}
      <View style={styles.rowBetween}>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.expiry}>Expires: {job.expires}</Text>
      </View>

      {/* LOCATION + REMOTE */}
      <View style={[styles.row, { marginBottom: 6 }]}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.meta}>{job.location}</Text>

        <Ionicons
          name="globe-outline"
          size={16}
          color="#666"
          style={{ marginLeft: 10 }}
        />
        <Text style={styles.meta}>{job.remote ? "Remote" : "On-site"}</Text>
      </View>

      <Text style={styles.description}>
        We are looking for a passionate software engineer to join our team.
        The ideal candidate should have experience with JavaScript, React,
        and Node.js.
      </Text>

      <Text style={styles.posted}>Posted 20mins ago</Text>

      {/* APPLY BUTTON */}
{/*       <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => onApply && onApply(job)}
      >
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity> */} 

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontWeight: "700", fontSize: 16 },
  company: { color: "#6c7583", marginTop: 4, fontSize: 13.5, flex: 1 },
  expiry: { marginTop: 4, fontSize: 12, color: "#444", fontWeight: "600" },
  meta: { color: "#555", marginLeft: 4, fontSize: 13 },
  description: {
    marginTop: 10,
    color: "#444",
    fontSize: 13,
    lineHeight: 18,
  },
  posted: {
    marginTop: 14,
    color: "#7a7a7a",
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  applyBtn: {
    marginTop: 14,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
