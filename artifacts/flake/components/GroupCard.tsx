import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Group } from "@/types";
import { useColors } from "@/hooks/useColors";

interface GroupCardProps {
  group: Group;
  onPress: () => void;
  variant?: "full" | "compact";
}

export function GroupCard({ group, onPress, variant = "full" }: GroupCardProps) {
  const colors = useColors();

  if (variant === "compact") {
    return (
      <TouchableOpacity
        style={[styles.compact, { backgroundColor: colors.card, borderRadius: colors.radius }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Image source={group.photo} style={styles.compactPhoto} />
        <View style={styles.compactInfo}>
          <Text style={[styles.compactName, { color: colors.foreground }]}>{group.name}</Text>
          <View style={styles.compactMeta}>
            <View style={[styles.onlineDot, { backgroundColor: colors.online }]} />
            <Text style={[styles.compactMembers, { color: colors.mutedForeground }]}>
              {group.members} Members
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { borderRadius: colors.radius, shadowColor: "#000" }]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      <Image source={group.photo} style={styles.cover} />
      <View style={[styles.overlay, { borderRadius: colors.radius }]} />
      <View style={styles.cardContent}>
        <View style={[styles.categoryPill, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
          <Text style={styles.categoryText}>{group.category}</Text>
        </View>
        <Text style={styles.cardName}>{group.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={1}>
          {group.description}
        </Text>
        <View style={styles.cardMeta}>
          <Ionicons name="people" size={14} color="rgba(255,255,255,0.8)" />
          <Text style={styles.cardMetaText}>{group.members} members</Text>
          <View style={styles.onlineDotWhite} />
          <Text style={styles.cardMetaText}>{group.online} online</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  cardContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  categoryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  cardDesc: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardMetaText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  onlineDotWhite: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#22C55E",
  },

  compact: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  compactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 14,
    resizeMode: "cover",
  },
  compactInfo: {
    flex: 1,
    gap: 4,
  },
  compactName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  compactMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  compactMembers: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
});
