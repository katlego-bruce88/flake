import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

interface ActionBarProps {
  onPass: () => void;
  onSuperLike: () => void;
  onBoost: () => void;
  onLike: () => void;
}

export function ActionBar({ onPass, onSuperLike, onBoost, onLike }: ActionBarProps) {
  const colors = useColors();

  const handlePress = (action: () => void, haptic: "light" | "medium" | "heavy") => {
    Haptics.impactAsync(
      haptic === "light"
        ? Haptics.ImpactFeedbackStyle.Light
        : haptic === "medium"
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Heavy
    );
    action();
  };

  return (
    <View style={styles.container}>
      {/* Pass */}
      <TouchableOpacity
        style={[styles.btn, styles.btnLg, { backgroundColor: colors.card, shadowColor: "#000" }]}
        onPress={() => handlePress(onPass, "light")}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={30} color="#888888" />
      </TouchableOpacity>

      {/* Super Like */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.card }]}
        onPress={() => handlePress(onSuperLike, "medium")}
        activeOpacity={0.8}
      >
        <Ionicons name="star" size={22} color={colors.gold} />
      </TouchableOpacity>

      {/* Boost */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#2A2A2A" }]}
        onPress={() => handlePress(onBoost, "medium")}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Like */}
      <TouchableOpacity
        style={[styles.btn, styles.btnLg, { backgroundColor: colors.accent }]}
        onPress={() => handlePress(onLike, "heavy")}
        activeOpacity={0.8}
      >
        <Ionicons name="heart" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 4,
  },
  btn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  btnLg: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
