import React from "react";
import { View } from "react-native";
import CoffeeModal from "../components/CoffeeModal";

export default function CoffeeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CoffeeModal />
    </View>
  );
}
