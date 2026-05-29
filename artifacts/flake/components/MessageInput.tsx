import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: bottomPad + 8,
        },
      ]}
    >
      <TouchableOpacity style={styles.attachBtn}>
        <Ionicons name="add" size={24} color={colors.mutedForeground} />
      </TouchableOpacity>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.secondary,
            color: colors.foreground,
            borderRadius: 24,
          },
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Type your message..."
        placeholderTextColor={colors.mutedForeground}
        multiline
        returnKeyType="default"
      />
      <TouchableOpacity
        style={[
          styles.sendBtn,
          { backgroundColor: text.trim() ? "#2B7FFF" : colors.secondary },
        ]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Ionicons
          name="arrow-up"
          size={20}
          color={text.trim() ? "#FFFFFF" : colors.mutedForeground}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  attachBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    maxHeight: 120,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
