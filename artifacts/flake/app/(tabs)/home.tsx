import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";

const { width: W } = Dimensions.get("window");
const CARD_W = (W - 48) / 2;

export default function MatchesScreen() {
  const insets = useSafeAreaInsets();
  const { profiles, likedIds } = useApp();
  const topPad = Platform.OS === "web" ? 50 : insets.top;

  const matches = profiles.filter((p) => likedIds.has(p.id));

  return (
    <View style={[styles.screen, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="options-outline" size={22} color="#111111" />
        </TouchableOpacity>
      </View>

      {matches.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={56} color="#DDDDDD" />
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.emptyText}>
            Start swiping on the Discover tab to find people nearby
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(p) => p.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.85}>
              <Image source={item.photo} style={styles.cardPhoto} />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardName}>{item.name}, {item.age}</Text>
                <View style={styles.cardOnline}>
                  <View style={[styles.dot, { backgroundColor: item.online ? "#22C55E" : "#AAAAAA" }]} />
                  <Text style={styles.cardDist}>{item.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#111111",
    letterSpacing: -0.4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    lineHeight: 20,
  },
  grid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  card: {
    width: CARD_W,
    height: CARD_W * 1.3,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  cardPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  cardOnline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardDist: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
});
