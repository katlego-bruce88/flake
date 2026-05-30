import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useLocalSearchParams, router } from "expo-router";
import { useApp } from "@/context/AppContext";
import { MessageBubble } from "@/components/MessageBubble";
import { MessageInput } from "@/components/MessageInput";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { conversations, messages, sendMessage, toggleMessageLike } = useApp();
  const topPad = Platform.OS === "web" ? 0 : insets.top;

  const conversation = useMemo(
    () => conversations.find((c) => c.id === id),
    [conversations, id]
  );

  const chatMessages = useMemo(() => messages[id ?? ""] ?? [], [messages, id]);
  const reversed = useMemo(() => [...chatMessages].reverse(), [chatMessages]);

  if (!conversation) {
    return (
      <View style={styles.notFound}>
        <Text style={{ color: "#111111" }}>Conversation not found</Text>
      </View>
    );
  }

  const { group, participants } = conversation;

  return (
    <View style={styles.container}>
      {/* Dark header */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{group.name}</Text>
        <TouchableOpacity style={styles.castBtn}>
          <Ionicons name="tv-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Subheader: avatars + online */}
      <View style={styles.subHeader}>
        <View style={styles.subAvatars}>
          {participants.slice(0, 3).map((p, i) => (
            <Image
              key={p.id}
              source={p.photo}
              style={[styles.subAvatar, { marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }]}
            />
          ))}
          <View style={styles.subAvatarMore}>
            <Text style={styles.subAvatarMoreText}>+{group.online}</Text>
          </View>
        </View>
        <View style={styles.onlineInfo}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
          <Text style={styles.peopleText}>  {group.members} People</Text>
        </View>
      </View>

      {/* Messages on light background */}
      <KeyboardAvoidingView
        style={styles.messageArea}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={reversed}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              onLike={() => toggleMessageLike(id ?? "", item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        />
        <MessageInput onSend={(text) => sendMessage(id ?? "", text)} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    letterSpacing: -0.2,
  },
  castBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111111",
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  subAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  subAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#111111",
    resizeMode: "cover",
  },
  subAvatarMore: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  subAvatarMoreText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  onlineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 5,
  },
  onlineText: {
    color: "#22C55E",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  peopleText: {
    color: "#888888",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  messageArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listContent: {
    paddingVertical: 14,
    gap: 2,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAF9",
  },
});
