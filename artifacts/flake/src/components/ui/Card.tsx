import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useColors } from "@/src/hooks/useColors";
import { layout } from "@/src/constants/layout";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated";
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, variant = "default", style, padding = layout.spacing.lg }: CardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.card,
          borderRadius: layout.card.defaultRadius,
          padding,
          ...(variant === "elevated"
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }
            : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});