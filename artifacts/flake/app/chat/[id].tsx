import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useLocalSearchParams, router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";
import { Avatar } from "@/components/Avatar";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { conversations, messages, sendMessage, toggleMessageLike } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const conversation = useMemo(
    () => conversations.find((c) => c.id === id),
    [conversations, id]
  );

  const chatMessages = useMemo(
    () => messages[id ?? ""] ?? [],
    [messages, id]
  );

  const reversedMessages = useMemo(() => [...chatMessages].reverse(), [chatMessages]);

  if (!conversation) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground }}>Conversation not found</Text>
      </View>
    );
  }

  const { group, participants } = conversation;

  return (
    <View style={[styles.container, { backgroundColor: "#111111" }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 6, borderBottomColor: "#2A2A2A" }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{group.name}</Text>
          <View style={styles.headerMeta}>
            <View style={[styles.onlineDot, { backgroundColor: colors.online }]} />
            <Text style={styles.headerSub}>Online • {group.online} People</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.participantAvatars}>
            {participants.slice(0, 3).map((p, i) => (
              <Avatar
                key={p.id}
                photo={p.photo}
                size={26}
                style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="square-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={reversedMessages}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onLike={() => toggleMessageLike(id ?? "", item.id)}
            />
          )}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          scrollEnabled={!!reversedMessages.length}
        />
        <MessageInput onSend={(text) => sendMessage(id ?? "", text)} />
      </KeyboardAvoidingView>
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
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  headerMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerSub: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  participantAvatars: {
    flexDirection: "row",
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  messageList: {
    paddingVertical: 12,
    gap: 4,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
