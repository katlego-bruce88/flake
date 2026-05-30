import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useColors } from "@/src/hooks/useColors";

interface BadgeProps {
  count: number;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  style?: ViewStyle;
}

export function Badge({ count, variant = "primary", size = "sm", style }: BadgeProps) {
  const colors = useColors();
  const bgColor = variant === "primary" ? colors.primary : colors.secondary;
  const dim = size === "sm" ? 20 : 24;

  if (count <= 0) return null;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          minWidth: dim,
          height: dim,
          borderRadius: dim / 2,
          paddingHorizontal: size === "sm" ? 5 : 7,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size === "sm" ? 11 : 13 }]}>{count > 99 ? "99+" : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
  },
});