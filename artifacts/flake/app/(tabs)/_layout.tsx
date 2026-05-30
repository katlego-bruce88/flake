import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY = "#FF6247";
const TAB_BG = "#111111";
const INACTIVE = "#666666";

function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
    index:    { active: "heart",         inactive: "heart-outline" },
    groups:   { active: "people",        inactive: "people-outline" },
    home:     { active: "home",          inactive: "home-outline" },
    messages: { active: "chatbubble",    inactive: "chatbubble-outline" },
    profile:  { active: "person",        inactive: "person-outline" },
  };

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: Platform.OS === "web" ? 10 : insets.bottom + 4 },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const icon = icons[route.name] ?? { active: "ellipse", inactive: "ellipse-outline" };

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
              <Ionicons
                name={isFocused ? icon.active : icon.inactive}
                size={22}
                color={isFocused ? PRIMARY : INACTIVE}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="groups" />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: TAB_BG,
    paddingTop: 10,
    borderTopWidth: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  iconWrapActive: {
    backgroundColor: "rgba(255,98,71,0.15)",
  },
});
