import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

interface RoomControlsProps {
  onEnd: () => void;
}

export function RoomControls({ onEnd }: RoomControlsProps) {
  const colors = useColors();
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [headphones, setHeadphones] = useState(true);

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter((v) => !v);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: cameraOn ? colors.secondary : colors.secondary }]}
        onPress={() => toggle(setCameraOn)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={cameraOn ? "videocam" : "videocam-off"}
          size={22}
          color={cameraOn ? colors.foreground : colors.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: headphones ? colors.secondary : colors.secondary }]}
        onPress={() => toggle(setHeadphones)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="headset"
          size={22}
          color={headphones ? colors.foreground : colors.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btn,
          styles.micBtn,
          { backgroundColor: micOn ? colors.primary : colors.secondary },
        ]}
        onPress={() => toggle(setMicOn)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={micOn ? "mic" : "mic-off"}
          size={24}
          color={micOn ? "#FFFFFF" : colors.mutedForeground}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#EF4444" }]}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          onEnd();
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={22} color="#FFFFFF" style={{ transform: [{ rotate: "135deg" }] }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  micBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
