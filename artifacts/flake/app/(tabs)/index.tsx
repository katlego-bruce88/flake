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
import { useApp } from "@/context/AppContext";
import { ProfileCard } from "@/components/ProfileCard";
import { ActionBar } from "@/components/ActionBar";
import { Avatar } from "@/components/Avatar";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const { profiles, groups, likedIds, passedIds, likeProfile, passProfile } = useApp();
  const topPad = Platform.OS === "web" ? 50 : insets.top;

  const active = profiles.filter((p) => !likedIds.has(p.id) && !passedIds.has(p.id));
  const current = active[0];
  const next = active[1];
  const headerGroup = groups[1];
  const stripGroup = groups[0];

  const [superLikedId, setSuperLikedId] = useState<string | null>(null);

  const handleSuperLike = () => {
    if (!current) return;
    setSuperLikedId(current.id);
    setTimeout(() => {
      likeProfile(current.id);
      setSuperLikedId(null);
    }, 350);
  };

  return (
    <View style={[styles.screen, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="menu" size={24} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.appName}>flake</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={23} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Group strip */}
      <View style={styles.groupHeader}>
        <View style={styles.avatarStack}>
          {[profiles[0], profiles[1], profiles[2]].map((p, i) => (
            <Avatar
              key={p.id}
              photo={p.photo}
              size={34}
              style={{ marginLeft: i === 0 ? 0 : -12, zIndex: 3 - i }}
            />
          ))}
          <View style={styles.plusPill}>
            <Text style={styles.plusPillText}>+{headerGroup.online}</Text>
          </View>
        </View>
        <View style={styles.groupHeaderInfo}>
          <Text style={styles.groupHeaderName}>{headerGroup.name}</Text>
          <View style={styles.groupHeaderMeta}>
            <Ionicons name="people-outline" size={11} color="#888888" />
            <Text style={styles.groupHeaderCount}>{headerGroup.members} Members</Text>
          </View>
        </View>
      </View>

      {/* Card stack */}
      <View style={styles.cardArea}>
        {active.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-dislike-outline" size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>You've seen everyone!</Text>
            <Text style={styles.emptyText}>Check back soon for more profiles</Text>
          </View>
        ) : (
          <>
            {next && (
              <View style={styles.cardBehind}>
                <ProfileCard
                  key={next.id}
                  profile={next}
                  onLike={() => likeProfile(next.id)}
                  onPass={() => passProfile(next.id)}
                  isTop={false}
                />
              </View>
            )}
            {current && (
              <ProfileCard
                key={current.id}
                profile={current}
                onLike={() => likeProfile(current.id)}
                onPass={() => passProfile(current.id)}
                isTop
              />
            )}
          </>
        )}
      </View>

      {/* Action bar */}
      {active.length > 0 && (
        <ActionBar
          onPass={() => current && passProfile(current.id)}
          onSuperLike={handleSuperLike}
          onBoost={() => current && likeProfile(current.id)}
          onLike={() => current && likeProfile(current.id)}
        />
      )}

      {/* Bottom group strip */}
      <TouchableOpacity
        style={styles.bottomStrip}
        onPress={() => router.push({ pathname: "/room/[id]", params: { id: stripGroup.id } })}
        activeOpacity={0.85}
      >
        <View style={styles.stripAvatars}>
          {[profiles[0], profiles[1], profiles[2]].map((p, i) => (
            <Avatar
              key={p.id}
              photo={p.photo}
              size={30}
              style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }}
            />
          ))}
          <View style={[styles.plusPill, { width: 28, height: 28 }]}>
            <Text style={[styles.plusPillText, { fontSize: 10 }]}>+4</Text>
          </View>
        </View>
        <View style={styles.stripInfo}>
          <Text style={styles.stripName}>{stripGroup.name}</Text>
          <View style={styles.stripMeta}>
            <Ionicons name="people-outline" size={11} color="#888888" />
            <Text style={styles.stripCount}>{stripGroup.members} members</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#111111",
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FF6247",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -12,
    zIndex: 0,
  },
  plusPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  groupHeaderInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  groupHeaderName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#111111",
  },
  groupHeaderMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 1,
  },
  groupHeaderCount: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBehind: {
    transform: [{ scale: 0.95 }, { translateY: 14 }],
    opacity: 0.6,
  },
  empty: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#111111",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#888888",
    textAlign: "center",
  },
  bottomStrip: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 12,
    backgroundColor: "#F0EFED",
    borderRadius: 16,
    gap: 12,
  },
  stripAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  stripInfo: {
    flex: 1,
  },
  stripName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#111111",
  },
  stripMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  stripCount: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#888888",
  },
});
