import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // simulate loading time before entering main app
    const timer = setTimeout(() => {
      router.replace("/homeScreen"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo or Illustration */}
      <Image
        source={require("../assets/images/logo oyjp.png")}
        style={styles.image}
        resizeMode="contain"
      />

      

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0088FF", 
    paddingHorizontal: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#141B34",
    fontWeight: "600",
  },
});
