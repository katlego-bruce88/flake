import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const layout = {
  screen: { width, height },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  padding: {
    horizontal: 20,
    safeTop: Platform.OS === "web" ? 67 : 0,
    safeBottom: Platform.OS === "web" ? 34 : 0,
    tabBarBottom: 120,
  },
  card: {
    profileCardHeight: Math.min(height * 0.48, 480),
    defaultRadius: 18,
    smallRadius: 14,
  },
  avatar: {
    sm: 30,
    md: 40,
    lg: 48,
    xl: 56,
    profile: 90,
  },
  icon: {
    sm: 18,
    md: 22,
    lg: 26,
  },
} as const;