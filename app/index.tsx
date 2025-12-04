import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CoffeeModal from "../components/CoffeeModal"; // ✅ ADDED
import FilterTabs from "../components/FilterTabs";
import JobCard from "../components/JobCard";

import { Job } from "../types/job";

export default function Home() {
  const [selected, setSelected] = useState<string>("All Jobs");
  const [searchText, setSearchText] = useState("");

  const [coffeeVisible, setCoffeeVisible] = useState(false); // ✅ ADDED

  const router = useRouter();

  const handleTitleClick = (job: Job) => {
    router.push(`apply`);
  };

  const jobs: Job[] = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      location: "Rivers, Nigeria",
      remote: true,
      skilled: false,
      unskilled: true,
      expires: "12/31/2025",
      level: "Unskilled",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      location: "Rivers, Nigeria",
      remote: true,
      skilled: true,
      unskilled: false,
      expires: "12/31/2025",
      level: "Skilled",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      location: "Rivers, Nigeria",
      remote: true,
      skilled: true,
      unskilled: false,
      expires: "12/31/2025",
      level: "Skilled",
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      location: "Rivers, Nigeria",
      remote: true,
      skilled: false,
      unskilled: true,
      expires: "12/31/2025",
      level: "Unskilled",
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      location: "Rivers, Nigeria",
      remote: true,
      skilled: false,
      unskilled: true,
      expires: "12/31/2025",
      level: "Unskilled",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchText.toLowerCase());

    if (!matchesSearch) return false;

    if (selected === "All Jobs") return true;
    if (selected === "Skilled") return job.skilled;
    if (selected === "Unskilled") return job.unskilled;
    if (selected === "Internship") return job.internship;

    return true;
  });

  return (
    <>
      {/* ================= COFFEE MODAL ================= */}
      <Modal visible={coffeeVisible} animationType="slide" transparent>
        <CoffeeModal onClose={() => setCoffeeVisible(false)} />
      </Modal>

      {/* ================= MAIN SCREEN ================= */}
      <ScrollView style={styles.container}>
        {/* ---------------- HEADER ---------------- */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>OYJB</Text>
          </View>

          <View style={styles.headerIcons}>
            {/* OPEN COFFEE MODAL */}
            <TouchableOpacity onPress={() => setCoffeeVisible(true)}>
              <MaterialCommunityIcons
                name="coffee-outline"
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

        {/* ---------------- TITLE ---------------- */}
        <Text style={styles.title}>Find Your Dream Job</Text>
        <Text style={styles.subtitle}>
          Discover verified job opportunities from trusted employers. No
          registration required - just browse, download, and apply!
        </Text>

        {/* ---------------- SEARCH BOX ---------------- */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="gray" />

          <TextInput
            placeholder="Search jobs, companies, location..."
            style={{ flex: 1 }}
            placeholderTextColor="#777"
            value={searchText}
            onChangeText={setSearchText}
          />

          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* ---------------- FILTER TABS ---------------- */}
        <FilterTabs selected={selected} onSelect={setSelected} />

        {/* ---------------- JOB LISTINGS ---------------- */}
        {filteredJobs.length === 0 ? (
          <View style={styles.noJobsContainer}>
            <Ionicons
              name="briefcase-outline"
              size={55}
              color="#d3d3d3"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.noJobsTitle}>No jobs found</Text>
            <Text style={styles.noJobsSubtitle}>
              Try adjusting your search criteria or check{"\n"}
              back later for new opportunities
            </Text>
          </View>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onTitlePress={handleTitleClick} />
          ))
        )}

        {/* LOAD MORE */}
        <TouchableOpacity style={styles.loadMore}>
          <Text>Load more</Text>
        </TouchableOpacity>

        {/* ---------------- ADVERTISEMENT ---------------- */}
        <View style={styles.adBox}>
          <Text style={styles.adTitle}>Advertisement Space</Text>
          <Text style={styles.adText}>
            Partner with us to reach thousands of job seekers
          </Text>
        </View>

        {/* ---------------- FOOTER ---------------- */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Join us</Text>
          <Text style={styles.footerSub}>Build the future of tech.</Text>

          <View style={styles.inputField}>
            <TextInput placeholder="Enter your email" />
          </View>

          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

/* --------------------------------------------------------- */
/*                       STYLES (unchanged)                  */
/* --------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 30,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 38, height: 38, marginRight: 6 },
  logoText: { fontSize: 18, fontWeight: "700", color: "#000" },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdfe6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  noJobsContainer: {
    alignItems: "center",
    paddingVertical: 40,
    opacity: 0.9,
  },
  noJobsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#c2c2c2",
    marginBottom: 4,
  },
  noJobsSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#c2c2c2",
    lineHeight: 20,
  },

  loadMore: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    marginVertical: 30,
  },

  adBox: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 25,
  },
  adTitle: { textAlign: "center", fontSize: 16, fontWeight: "700" },
  adText: { textAlign: "center", marginTop: 6, color: "gray" },

  footer: {
    backgroundColor: "#003d99",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  footerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  footerSub: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 4,
  },
  inputField: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  subscribeBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  subscribeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
