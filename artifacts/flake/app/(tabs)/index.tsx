import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { ProfileCard } from "@/components/ProfileCard";
import { ActionBar } from "@/components/ActionBar";
import { Avatar } from "@/components/Avatar";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DiscoverScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profiles, groups, likedIds, passedIds, likeProfile, passProfile } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const activeProfiles = profiles.filter(
    (p) => !likedIds.has(p.id) && !passedIds.has(p.id)
  );

  const [superLikedId, setSuperLikedId] = useState<string | null>(null);

  const currentProfile = activeProfiles[0];
  const nextProfile = activeProfiles[1];

  const handleSuperLike = () => {
    if (!currentProfile) return;
    setSuperLikedId(currentProfile.id);
    setTimeout(() => {
      likeProfile(currentProfile.id);
      setSuperLikedId(null);
    }, 400);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="menu" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.appName, { color: colors.foreground }]}>flake</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="notifications-outline" size={22} color={colors.foreground} />
            <View style={[styles.badge, { backgroundColor: colors.primary }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="settings-outline" size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Online strip */}
      <View style={[styles.onlineStrip, { paddingHorizontal: 16 }]}>
        <View style={styles.avatarStack}>
          {profiles.slice(0, 3).map((p, i) => (
            <Avatar
              key={p.id}
              photo={p.photo}
              size={32}
              online={p.online}
              style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }}
            />
          ))}
          <View style={[styles.moreCount, { backgroundColor: colors.primary }]}>
            <Text style={styles.moreCountText}>+{profiles.length}</Text>
          </View>
        </View>
        <Text style={[styles.onlineText, { color: colors.mutedForeground }]}>
          nearby now
        </Text>
      </View>

      {/* Card Stack */}
      <View style={styles.cardArea}>
        {activeProfiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-dislike-outline" size={52} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              You've seen everyone!
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Check back soon for more profiles nearby
            </Text>
          </View>
        ) : (
          <>
            {nextProfile && (
              <View style={[styles.cardBehind, { borderRadius: colors.radius }]}>
                <ProfileCard
                  key={nextProfile.id}
                  profile={nextProfile}
                  onLike={() => likeProfile(nextProfile.id)}
                  onPass={() => passProfile(nextProfile.id)}
                  isTop={false}
                />
              </View>
            )}
            {currentProfile && (
              <ProfileCard
                key={currentProfile.id}
                profile={currentProfile}
                onLike={() => likeProfile(currentProfile.id)}
                onPass={() => passProfile(currentProfile.id)}
                isTop
              />
            )}
          </>
        )}
      </View>

      {/* Action Buttons */}
      {activeProfiles.length > 0 && (
        <ActionBar
          onPass={() => currentProfile && passProfile(currentProfile.id)}
          onSuperLike={handleSuperLike}
          onBoost={() => currentProfile && likeProfile(currentProfile.id)}
          onLike={() => currentProfile && likeProfile(currentProfile.id)}
        />
      )}

      {/* Group Strip */}
      <View style={styles.groupStrip}>
        <TouchableOpacity
          style={[styles.groupRow, { backgroundColor: colors.card, borderRadius: colors.radius }]}
          onPress={() => router.push({ pathname: "/room/[id]", params: { id: "1" } })}
          activeOpacity={0.85}
        >
          <View style={styles.groupAvatars}>
            {groups[0].photo && (
              <Image source={groups[0].photo} style={styles.groupPhoto} />
            )}
          </View>
          <View style={styles.groupInfo}>
            <Text style={[styles.groupName, { color: colors.foreground }]}>
              {groups[0].name}
            </Text>
            <View style={styles.groupMeta}>
              <Ionicons name="people-outline" size={12} color={colors.mutedForeground} />
              <Text style={[styles.groupMetaText, { color: colors.mutedForeground }]}>
                {groups[0].members} members
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  appName: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    gap: 4,
  },
  onlineStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 12,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  moreCountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  onlineText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardBehind: {
    transform: [{ scale: 0.95 }, { translateY: 12 }],
    opacity: 0.7,
  },
  emptyState: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  groupStrip: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  groupRow: {
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
  groupAvatars: {
    flexDirection: "row",
  },
  groupPhoto: {
    width: 44,
    height: 44,
    borderRadius: 12,
    resizeMode: "cover",
  },
  groupInfo: {
    flex: 1,
    gap: 3,
  },
  groupName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  groupMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  groupMetaText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
