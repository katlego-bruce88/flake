import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

interface ActionBarProps {
  onPass: () => void;
  onSuperLike: () => void;
  onBoost: () => void;
  onLike: () => void;
}

const BTN_BG = "#1C1C1C";

export function ActionBar({ onPass, onSuperLike, onBoost, onLike }: ActionBarProps) {
  const fire = (action: () => void, style: "Light" | "Medium" | "Heavy") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style]);
    action();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: BTN_BG }]}
        onPress={() => fire(onPass, "Light")}
        activeOpacity={0.75}
      >
        <Ionicons name="close" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: BTN_BG }]}
        onPress={() => fire(onSuperLike, "Medium")}
        activeOpacity={0.75}
      >
        <Ionicons name="star" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: BTN_BG }]}
        onPress={() => fire(onBoost, "Medium")}
        activeOpacity={0.75}
      >
        <Ionicons name="arrow-redo" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.likeBtn}
        onPress={() => fire(onLike, "Heavy")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#FF8A50", "#FF6247", "#FF4B6E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.likeBtnGradient}
        >
          <Ionicons name="heart" size={26} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  likeBtn: {
    shadowColor: "#FF6247",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  likeBtnGradient: {
    width: 112,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
