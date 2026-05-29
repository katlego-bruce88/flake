import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { GroupCard } from "@/components/GroupCard";

const CATEGORIES = ["All", "Outdoor", "Social", "Photography", "Food & Drink"];

export default function GroupsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { groups } = useApp();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const filtered = groups.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || g.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Groups</Text>
        <TouchableOpacity
          style={[styles.createBtn, { backgroundColor: colors.primary }]}
          onPress={() => {}}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchWrapper, { paddingHorizontal: 20, marginBottom: 12 }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.secondary, borderRadius: 14 }]}>
          <Ionicons name="search-outline" size={18} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search groups..."
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category pills */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryPill,
              {
                backgroundColor:
                  activeCategory === item ? colors.primary : colors.secondary,
                borderRadius: 20,
              },
            ]}
            onPress={() => setActiveCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                {
                  color: activeCategory === item ? "#FFFFFF" : colors.foreground,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.categoriesScroll}
      />

      {/* Groups list */}
      <FlatList
        data={filtered}
        keyExtractor={(g) => g.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() =>
              router.push({ pathname: "/room/[id]", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={52} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No groups found
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Try a different search or category
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  createBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrapper: {},
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  categoriesScroll: {
    marginBottom: 12,
  },
  categories: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 120,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
});
