import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";
import { useColors } from "@/src/hooks/useColors";

interface AvatarProps {
  photo: any;
  size?: number;
  online?: boolean;
  style?: ViewStyle;
}

export function Avatar({ photo, size = 40, online = false, style }: AvatarProps) {
  const colors = useColors();
  const radius = size / 2;

  return (
    <View style={[styles.wrapper, style]}>
      <Image
        source={photo}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: 2,
            borderColor: colors.card,
          },
        ]}
      />
      {online && (
        <View
          style={[
            styles.dot,
            {
              backgroundColor: colors.online,
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              borderWidth: 2,
              borderColor: colors.card,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "relative" },
  image: { resizeMode: "cover" },
  dot: { position: "absolute" },
});