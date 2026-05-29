import React from "react";
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
import { router } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { Avatar } from "@/components/Avatar";
import { Conversation } from "@/types";

function ConversationRow({ item, onPress }: { item: Conversation; onPress: () => void }) {
  const colors = useColors();
  const topParticipants = item.participants.slice(0, 2);

  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.avatarGroup}>
        {topParticipants.map((p, i) => (
          <Avatar
            key={p.id}
            photo={p.photo}
            size={48}
            online={p.online}
            style={{
              marginLeft: i === 0 ? 0 : -16,
              zIndex: 2 - i,
              borderWidth: 2,
            }}
          />
        ))}
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowTop}>
          <Text style={[styles.groupName, { color: colors.foreground }]}>
            {item.group.name}
          </Text>
          <Text style={[styles.time, { color: colors.mutedForeground }]}>{item.lastTime}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text
            style={[
              styles.lastMsg,
              { color: item.unread > 0 ? colors.foreground : colors.mutedForeground },
              item.unread > 0 && styles.lastMsgBold,
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MessagesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { conversations } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Messages</Text>
        <TouchableOpacity style={[styles.newBtn, { backgroundColor: colors.secondary }]}>
          <Ionicons name="create-outline" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationRow
            item={item}
            onPress={() =>
              router.push({ pathname: "/chat/[id]", params: { id: item.id } })
            }
          />
        )}
        scrollEnabled={!!conversations.length}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={52} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No messages yet</Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Join a group or match with someone to start chatting
            </Text>
          </View>
        }
      />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  newBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  avatarGroup: {
    flexDirection: "row",
    width: 64,
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupName: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  time: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastMsg: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  lastMsgBold: {
    fontFamily: "Inter_500Medium",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
});
