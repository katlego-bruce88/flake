import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { VideoTile } from "@/components/VideoTile";
import { RoomControls } from "@/components/RoomControls";
import { MOCK_PROFILES } from "@/context/AppContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function RoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { groups, currentUser } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const group = useMemo(
    () => groups.find((g) => g.id === id),
    [groups, id]
  );

  const participants = useMemo(() => {
    const base = MOCK_PROFILES.slice(0, 5);
    return [{ ...currentUser, id: "me" }, ...base];
  }, [currentUser]);

  if (!group) {
    return (
      <View style={[styles.notFound, { backgroundColor: "#111111" }]}>
        <Text style={{ color: "#FFFFFF" }}>Room not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#111111" }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 6 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>room chat</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.chatBtn, { backgroundColor: "#1E1E1E" }]}
            onPress={() => router.push({ pathname: "/chat/[id]", params: { id } })}
          >
            <Ionicons name="chatbubble-ellipses" size={18} color="#FFFFFF" />
            <View style={[styles.notifBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.notifText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Video grid */}
      <FlatList
        data={participants}
        keyExtractor={(p) => p.id}
        numColumns={2}
        scrollEnabled={participants.length > 6}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item, index }) => (
          <VideoTile
            profile={item}
            muted={index % 3 === 2}
            speaking={index === 0}
            isMe={item.id === "me"}
          />
        )}
      />

      {/* Controls */}
      <View style={{ paddingBottom: Platform.OS === "web" ? 34 : insets.bottom }}>
        <RoomControls onEnd={() => router.back()} />
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
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  notifText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontFamily: "Inter_700Bold",
  },
  grid: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 16,
  },
  gridRow: {
    gap: 10,
    justifyContent: "space-between",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
