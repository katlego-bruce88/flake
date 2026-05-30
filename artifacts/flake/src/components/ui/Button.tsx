import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { useColors } from "@/src/hooks/useColors";
import { layout } from "@/src/constants/layout";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const colors = useColors();

  const bgMap = {
    primary: colors.primary,
    secondary: colors.secondary,
    outline: "transparent",
    ghost: "transparent",
    danger: colors.destructive,
  };
  const textColorMap = {
    primary: colors.primaryForeground,
    secondary: colors.secondaryForeground,
    outline: colors.primary,
    ghost: colors.foreground,
    danger: colors.destructiveForeground,
  };
  const heightMap = { sm: 36, md: 44, lg: 52 };
  const padMap = { sm: 16, md: 20, lg: 28 };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: bgMap[variant],
          height: heightMap[size],
          paddingHorizontal: padMap[size],
          borderRadius: layout.card.defaultRadius,
          opacity: disabled ? 0.5 : 1,
          borderWidth: variant === "outline" ? 1.5 : 0,
          borderColor: variant === "outline" ? colors.primary : undefined,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator color={textColorMap[variant]} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              {
                color: textColorMap[variant],
                fontSize: size === "sm" ? 13 : size === "md" ? 15 : 17,
                marginLeft: icon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter_600SemiBold",
  },
});