import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Message } from "@/types";
import { Avatar } from "./Avatar";
import { useColors } from "@/hooks/useColors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const WAVEFORM_BARS = [12, 20, 16, 28, 18, 24, 14, 30, 20, 16, 22, 18, 26, 14];

interface MessageBubbleProps {
  message: Message;
  onLike: () => void;
}

function VoiceMessage({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[styles.voiceBubble, { backgroundColor: colors.secondary }]}>
      <TouchableOpacity style={[styles.playBtn, { backgroundColor: colors.foreground }]}>
        <Ionicons name="play" size={14} color={colors.background} />
      </TouchableOpacity>
      <View style={styles.waveform}>
        {WAVEFORM_BARS.map((h, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              {
                height: h,
                backgroundColor: i < 8 ? colors.foreground : colors.mutedForeground,
                opacity: i < 8 ? 1 : 0.5,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.voiceDuration, { color: colors.mutedForeground }]}>2:19</Text>
    </View>
  );
}

function ImageMessage({ colors, photo }: { colors: ReturnType<typeof useColors>; photo: any }) {
  return (
    <Image
      source={photo}
      style={[styles.imageMessage, { borderRadius: colors.radius - 4 }]}
    />
  );
}

export function MessageBubble({ message, onLike }: MessageBubbleProps) {
  const colors = useColors();
  const isMe = message.senderId === "me";
  const p1 = require("@/assets/images/profile1.png");
  const p2 = require("@/assets/images/profile2.png");

  return (
    <View style={[styles.row, isMe && styles.rowMe]}>
      {!isMe && (
        <Avatar photo={message.senderPhoto} size={32} style={styles.avatar} />
      )}
      <View style={[styles.bubbleWrapper, isMe && styles.bubbleWrapperMe]}>
        {message.type === "text" && (
          <View
            style={[
              styles.bubble,
              {
                backgroundColor: isMe ? colors.primary : colors.secondary,
                borderRadius: colors.radius,
                borderBottomRightRadius: isMe ? 4 : colors.radius,
                borderBottomLeftRadius: isMe ? colors.radius : 4,
              },
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                { color: isMe ? colors.primaryForeground : colors.foreground },
              ]}
            >
              {message.content}
            </Text>
          </View>
        )}
        {message.type === "voice" && <VoiceMessage colors={colors} />}
        {message.type === "image" && (
          <ImageMessage colors={colors} photo={isMe ? p1 : p2} />
        )}

        <View style={[styles.meta, isMe && styles.metaMe]}>
          <Text style={[styles.timestamp, { color: colors.mutedForeground }]}>
            {message.timestamp}
          </Text>
          <TouchableOpacity onPress={onLike} style={styles.likeBtn}>
            <Ionicons
              name={message.liked ? "heart" : "heart-outline"}
              size={14}
              color={message.liked ? colors.accent : colors.mutedForeground}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
    paddingHorizontal: 16,
    gap: 8,
  },
  rowMe: {
    flexDirection: "row-reverse",
  },
  avatar: {
    marginBottom: 18,
  },
  bubbleWrapper: {
    maxWidth: SCREEN_WIDTH * 0.68,
  },
  bubbleWrapperMe: {
    alignItems: "flex-end",
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },
  voiceBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    minWidth: 220,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
  voiceDuration: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  imageMessage: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.4,
    resizeMode: "cover",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  metaMe: {
    flexDirection: "row-reverse",
  },
  timestamp: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  likeBtn: {
    padding: 2,
  },
});
