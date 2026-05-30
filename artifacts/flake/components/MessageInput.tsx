import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom;

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
        { paddingBottom: bottomPad + 10 },
      ]}
    >
      <TouchableOpacity style={styles.plusBtn}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type your message..."
        placeholderTextColor="#AAAAAA"
        multiline
        returnKeyType="default"
      />
      <TouchableOpacity
        style={[styles.sendBtn, { backgroundColor: text.trim() ? "#111111" : "#E0E0E0" }]}
        onPress={handleSend}
        disabled={!text.trim()}
        activeOpacity={0.8}
      >
        <Ionicons
          name="paper-plane"
          size={17}
          color={text.trim() ? "#FFFFFF" : "#999999"}
          style={{ marginRight: -1, marginTop: -1 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#EBEBEB",
    gap: 10,
  },
  plusBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    fontSize: 26,
    color: "#333333",
    fontFamily: "Inter_300Light",
    lineHeight: 30,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#111111",
    maxHeight: 120,
    paddingVertical: 0,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});
