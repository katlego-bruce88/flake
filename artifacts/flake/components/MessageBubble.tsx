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

const SCREEN_WIDTH = Dimensions.get("window").width;
const p1 = require("@/assets/images/profile1.png");
const p2 = require("@/assets/images/profile2.png");
const p3 = require("@/assets/images/profile3.png");

const WAVEFORM = [6, 14, 10, 22, 16, 28, 12, 24, 18, 10, 20, 14, 26, 10, 18, 22, 8, 16];

interface MessageBubbleProps {
  message: Message;
  onLike: () => void;
}

function VoiceBubble({ isMe }: { isMe: boolean }) {
  return (
    <View style={[styles.voicePill, isMe && styles.voicePillMe]}>
      <TouchableOpacity style={styles.playCircle}>
        <Ionicons name="play" size={13} color="#111111" />
      </TouchableOpacity>
      <View style={styles.waveform}>
        {WAVEFORM.map((h, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              {
                height: h,
                backgroundColor: i < 10 ? "#CCCCCC" : "#555555",
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.voiceDuration}>2:19</Text>
    </View>
  );
}

function ImageCardBubble({ participants }: { participants: typeof p1[] }) {
  return (
    <View style={styles.imageCard}>
      <Text style={styles.imageCardCaption}>Here's what I created:</Text>
      <View style={styles.imageGrid}>
        <Image source={p1} style={styles.gridPhoto} />
        <Image source={p2} style={styles.gridPhoto} />
      </View>
      <View style={styles.imageCardFooter}>
        <View style={styles.imageCardAvatars}>
          {[p2, p3, p1].map((src, i) => (
            <Image
              key={i}
              source={src}
              style={[styles.footerAvatar, { marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }]}
            />
          ))}
          <Ionicons name="flame" size={16} color="#FF6247" style={{ marginLeft: 6 }} />
        </View>
        <View style={styles.reactionBtns}>
          <TouchableOpacity style={styles.reactionBtn}>
            <Ionicons name="thumbs-up" size={18} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.reactionBtn}>
            <Ionicons name="thumbs-down" size={18} color="#AAAAAA" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function MessageBubble({ message, onLike }: MessageBubbleProps) {
  const isMe = message.senderId === "me";

  return (
    <View style={[styles.row, isMe && styles.rowMe]}>
      {!isMe && (
        <Avatar photo={message.senderPhoto} size={30} style={styles.avatar} />
      )}

      <View style={[styles.wrapper, isMe && styles.wrapperMe]}>
        {message.type === "text" && (
          <>
            <View style={[styles.textBubble, isMe ? styles.textBubbleMe : styles.textBubbleThem]}>
              <Text style={[styles.textContent, isMe && styles.textContentMe]}>
                {message.content}
              </Text>
            </View>
            <View style={[styles.meta, isMe && styles.metaMe]}>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
              {!isMe && (
                <TouchableOpacity onPress={onLike}>
                  <Ionicons
                    name={message.liked ? "heart" : "heart-outline"}
                    size={13}
                    color={message.liked ? "#E53935" : "#BBBBBB"}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {message.type === "voice" && (
          <>
            <VoiceBubble isMe={isMe} />
            <View style={[styles.meta, isMe && styles.metaMe]}>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </>
        )}

        {message.type === "imagecard" && (
          <>
            <ImageCardBubble participants={[]} />
            <View style={[styles.meta, isMe && styles.metaMe]}>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </>
        )}

        {message.type === "image" && (
          <>
            <Image
              source={p2}
              style={styles.singleImage}
            />
            <View style={[styles.meta, isMe && styles.metaMe]}>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 3,
    paddingHorizontal: 14,
    gap: 8,
  },
  rowMe: {
    flexDirection: "row-reverse",
  },
  avatar: {
    marginBottom: 20,
  },
  wrapper: {
    maxWidth: SCREEN_WIDTH * 0.72,
  },
  wrapperMe: {
    alignItems: "flex-end",
  },

  textBubble: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
  },
  textBubbleThem: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 6,
  },
  textBubbleMe: {
    backgroundColor: "#1E1E1E",
    borderBottomRightRadius: 6,
  },
  textContent: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#111111",
    lineHeight: 21,
  },
  textContentMe: {
    color: "#FFFFFF",
  },

  voicePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#1A1A1A",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: 240,
  },
  voicePillMe: {},
  playCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
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
    color: "#BBBBBB",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },

  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 0,
    width: SCREEN_WIDTH * 0.72,
  },
  imageCardCaption: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#111111",
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: "row",
    gap: 4,
  },
  gridPhoto: {
    flex: 1,
    height: 110,
    borderRadius: 10,
    resizeMode: "cover",
  },
  imageCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  imageCardAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    resizeMode: "cover",
  },
  reactionBtns: {
    flexDirection: "row",
    gap: 12,
  },
  reactionBtn: {
    padding: 2,
  },

  singleImage: {
    width: SCREEN_WIDTH * 0.55,
    height: 160,
    borderRadius: 14,
    resizeMode: "cover",
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  metaMe: {
    flexDirection: "row-reverse",
  },
  timestamp: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: "#AAAAAA",
  },
});
