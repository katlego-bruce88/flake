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

export function ActionBar({ onPass, onSuperLike, onBoost, onLike }: ActionBarProps) {
  const fire = (action: () => void, style: "Light" | "Medium" | "Heavy") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style]);
    action();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => fire(onPass, "Light")} activeOpacity={0.75}>
        <Ionicons name="close" size={26} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => fire(onSuperLike, "Medium")} activeOpacity={0.75}>
        <Ionicons name="star" size={22} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => fire(onBoost, "Medium")} activeOpacity={0.75}>
        <Ionicons name="arrow-redo" size={22} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeBtn} onPress={() => fire(onLike, "Heavy")} activeOpacity={0.8}>
        <LinearGradient colors={["#FF8A50", "#FF6247", "#FF4B6E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.likeBtnGradient}>
          <Ionicons name="heart" size={26} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4,
    paddingVertical: 8, paddingHorizontal: 10, marginHorizontal: 16, marginBottom: 4,
    backgroundColor: "#1C1C1C", borderRadius: 40,
    shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.22, shadowRadius: 14, elevation: 6,
  },
  btn: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", backgroundColor: "transparent" },
  likeBtn: { shadowColor: "#FF6247", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  likeBtnGradient: { width: 112, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
});