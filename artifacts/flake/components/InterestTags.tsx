import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useColors } from "@/src/hooks/useColors";

interface InterestTagsProps {
  tags: string[];
  variant?: "light" | "dark";
}

export function InterestTags({ tags, variant = "light" }: InterestTagsProps) {
  const colors = useColors();
  const bgColor = variant === "light" ? "rgba(255,255,255,0.9)" : colors.secondary;
  const textColor = variant === "light" ? "#333333" : colors.foreground;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {tags.map((tag) => (
        <View key={tag} style={[styles.tag, { backgroundColor: bgColor }]}>
          <Text style={[styles.tagText, { color: textColor }]}>{tag}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, paddingHorizontal: 4 },
  tag: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  tagText: { fontSize: 13, fontFamily: "Inter_500Medium" },
});