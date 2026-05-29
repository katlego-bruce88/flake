import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { InterestTags } from "@/components/InterestTags";

interface SettingsRowProps {
  icon: string;
  label: string;
  value?: string;
  danger?: boolean;
  onPress: () => void;
}

function SettingsRow({ icon, label, value, danger = false, onPress }: SettingsRowProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.settingsRow, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        style={[styles.settingsIcon, { backgroundColor: danger ? "#FEE2E2" : colors.secondary }]}
      >
        <Ionicons
          name={icon as any}
          size={18}
          color={danger ? colors.destructive : colors.foreground}
        />
      </View>
      <Text
        style={[
          styles.settingsLabel,
          { color: danger ? colors.destructive : colors.foreground },
        ]}
      >
        {label}
      </Text>
      <View style={styles.settingsRight}>
        {value && (
          <Text style={[styles.settingsValue, { color: colors.mutedForeground }]}>{value}</Text>
        )}
        <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { currentUser, likedIds } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: bottomPad + 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cover & avatar */}
      <View style={[styles.coverSection, { paddingTop: topPad }]}>
        <LinearGradient
          colors={[colors.primary, "#FF8C42"]}
          style={styles.coverGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.avatarWrapper}>
          <Image source={currentUser.photo} style={styles.avatar} />
          <TouchableOpacity
            style={[styles.editAvatarBtn, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="camera" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Text style={[styles.name, { color: colors.foreground }]}>
          {currentUser.name}, {currentUser.age}
        </Text>
        <Text style={[styles.bio, { color: colors.mutedForeground }]}>{currentUser.bio}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>{likedIds.size}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Likes</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Groups</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>48</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Matches</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.editProfileBtn, { borderColor: colors.primary, borderRadius: colors.radius }]}
        >
          <Text style={[styles.editProfileText, { color: colors.primary }]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Interests</Text>
        <InterestTags tags={currentUser.interests} variant="dark" />
      </View>

      {/* Settings */}
      <View style={[styles.section, { paddingHorizontal: 0 }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, paddingHorizontal: 20 }]}>
          Account
        </Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderRadius: colors.radius }]}>
          <SettingsRow icon="location-outline" label="Location" value="San Francisco" onPress={() => {}} />
          <SettingsRow icon="shield-checkmark-outline" label="Privacy" onPress={() => {}} />
          <SettingsRow icon="notifications-outline" label="Notifications" onPress={() => {}} />
          <SettingsRow icon="card-outline" label="Subscription" value="Free" onPress={() => {}} />
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: 0 }]}>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderRadius: colors.radius }]}>
          <SettingsRow icon="help-circle-outline" label="Help & Support" onPress={() => {}} />
          <SettingsRow icon="log-out-outline" label="Sign Out" danger onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverSection: {
    height: 160,
    alignItems: "center",
    position: "relative",
  },
  coverGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -44,
    alignSelf: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    resizeMode: "cover",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  infoSection: {
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  bio: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 8,
  },
  stat: {
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  editProfileBtn: {
    marginTop: 4,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderWidth: 1.5,
  },
  editProfileText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 12,
  },
  settingsCard: {
    marginHorizontal: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  settingsIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  settingsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  settingsValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
