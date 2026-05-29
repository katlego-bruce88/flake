import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "@/types";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TILE_SIZE = (SCREEN_WIDTH - 48) / 2;

interface VideoTileProps {
  profile: Profile;
  muted?: boolean;
  speaking?: boolean;
  isMe?: boolean;
}

export function VideoTile({ profile, muted = false, speaking = false, isMe = false }: VideoTileProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.tile,
        {
          borderRadius: colors.radius,
          borderWidth: speaking ? 2 : 0,
          borderColor: speaking ? colors.primary : "transparent",
        },
      ]}
    >
      <Image source={profile.photo} style={styles.photo} />
      <View style={styles.overlay} />

      {/* Name */}
      <View style={styles.bottom}>
        <Text style={styles.name} numberOfLines={1}>
          {isMe ? "You" : profile.name}
        </Text>
        {muted && (
          <View style={[styles.mutedBadge, { backgroundColor: "rgba(0,0,0,0.6)" }]}>
            <Ionicons name="mic-off" size={12} color="#FFFFFF" />
          </View>
        )}
      </View>

      {/* Speaking ring */}
      {speaking && (
        <View
          style={[
            styles.speakingRing,
            {
              borderColor: colors.primary,
              borderRadius: colors.radius + 2,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE * 1.2,
    overflow: "hidden",
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  bottom: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  mutedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  speakingRing: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
  },
});
