import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface CoffeeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CoffeeModal({ visible, onClose }: CoffeeModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Support OYJB</Text>
          <Text style={styles.modalText}>
            Help us keep this platform free for job seekers by buying us a coffee!
          </Text>

          <View style={styles.amountRow}>
            {[3, 5, 10].map((amt, index) => (
              <TouchableOpacity key={index} style={styles.amountCard}>
                <MaterialCommunityIcons name="coffee-outline" size={26} color="#000" />
                <Text style={styles.amountText}>${amt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.donateBtn}
              onPress={() => alert("Donation feature coming soon!")}
            >
              <Text style={styles.donateText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#a9d2ff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  modalText: { fontSize: 14, marginBottom: 20 },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountCard: {
    backgroundColor: "#d3e8ff",
    width: 80,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8cbcff",
  },
  amountText: { marginTop: 6, fontSize: 16, fontWeight: "700" },
  actionRow: { flexDirection: "row", justifyContent: "space-between" },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  cancelText: { fontSize: 16, fontWeight: "600" },
  donateBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#0056d2",
    borderRadius: 8,
    alignItems: "center",
  },
  donateText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
