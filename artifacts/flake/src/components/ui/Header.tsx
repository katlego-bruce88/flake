import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/src/hooks/useColors";
import { layout } from "@/src/constants/layout";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
    badge?: number;
  };
  variant?: "light" | "dark";
  style?: ViewStyle;
}

export function Header({ title, onBack, rightAction, variant = "light", style }: HeaderProps) {
  const colors = useColors();

  const bgColor = variant === "dark" ? "#111111" : "transparent";
  const textColor = variant === "dark" ? "#FFFFFF" : colors.foreground;
  const iconColor = variant === "dark" ? "#FFFFFF" : colors.foreground;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      {onBack ? (
        <TouchableOpacity style={styles.sideBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.sideBtn} />
      )}

      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>

      {rightAction ? (
        <TouchableOpacity style={styles.sideBtn} onPress={rightAction.onPress}>
          <Ionicons name={rightAction.icon as any} size={22} color={iconColor} />
          {rightAction.badge != null && rightAction.badge > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{rightAction.badge}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.sideBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
    minHeight: 52,
  },
  sideBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Inter_700Bold",
  },
});