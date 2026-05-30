import React from "react";
import { View, Text, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { useColors } from "@/src/hooks/useColors";

interface TagProps {
  label: string;
  variant?: "light" | "dark";
  style?: ViewStyle;
}

export function Tag({ label, variant = "light", style }: TagProps) {
  const colors = useColors();
  const bgColor = variant === "dark" ? colors.secondary : "rgba(255,255,255,0.9)";
  const textColor = variant === "dark" ? colors.foreground : "#333333";

  return (
    <View style={[styles.tag, { backgroundColor: bgColor }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

interface TagListProps {
  tags: string[];
  variant?: "light" | "dark";
  horizontal?: boolean;
  style?: ViewStyle;
}

export function TagList({ tags, variant = "light", horizontal = true, style }: TagListProps) {
  const content = tags.map((tag) => <Tag key={tag} label={tag} variant={variant} />);

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        style={style}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={[styles.wrapContainer, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  text: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});