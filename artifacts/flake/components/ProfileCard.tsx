import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Profile } from "@/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_HEIGHT = SCREEN_HEIGHT * 0.58;
const SWIPE_THRESHOLD = 100;

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
  isTop: boolean;
}

export function ProfileCard({ profile, onLike, onPass, isTop }: ProfileCardProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-6deg", "0deg", "6deg"],
    extrapolate: "clamp",
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onMoveShouldSetPanResponder: () => isTop,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, { dx }) => {
        if (dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH * 1.5, y: 0 },
            duration: 280,
            useNativeDriver: true,
          }).start(() => {
            onLike();
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH * 1.5, y: 0 },
            duration: 280,
            useNativeDriver: true,
          }).start(() => {
            onPass();
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            friction: 6,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
        },
      ]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image source={profile.photo} style={styles.photo} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.18)", "rgba(0,0,0,0.72)"]}
        style={styles.gradient}
        locations={[0, 0.4, 1]}
      />

      <Animated.View style={[styles.indicator, styles.likeIndicator, { opacity: likeOpacity }]}>
        <Text style={[styles.indicatorText, { color: "#22C55E" }]}>LIKE</Text>
      </Animated.View>

      <Animated.View style={[styles.indicator, styles.nopeIndicator, { opacity: nopeOpacity }]}>
        <Text style={[styles.indicatorText, { color: "#FF4B6E" }]}>NOPE</Text>
      </Animated.View>

      <View style={styles.content}>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.tags}>
          {profile.interests.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 24,
    height: CARD_HEIGHT,
    borderRadius: 22,
    overflow: "hidden",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  content: {
    position: "absolute",
    bottom: 22,
    left: 20,
    right: 20,
    gap: 12,
  },
  bio: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  indicator: {
    position: "absolute",
    top: 36,
    padding: 10,
    borderWidth: 3,
    borderRadius: 8,
  },
  likeIndicator: {
    left: 20,
    borderColor: "#22C55E",
    transform: [{ rotate: "-15deg" }],
  },
  nopeIndicator: {
    right: 20,
    borderColor: "#FF4B6E",
    transform: [{ rotate: "15deg" }],
  },
  indicatorText: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
});
