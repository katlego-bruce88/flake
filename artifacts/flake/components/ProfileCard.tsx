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
import { InterestTags } from "./InterestTags";
import { Profile } from "@/types";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_HEIGHT = SCREEN_HEIGHT * 0.62;
const SWIPE_THRESHOLD = 100;

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
  isTop: boolean;
}

export function ProfileCard({ profile, onLike, onPass, isTop }: ProfileCardProps) {
  const colors = useColors();
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-8deg", "0deg", "8deg"],
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
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onLike();
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH * 1.5, y: 0 },
            duration: 300,
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
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate },
          ],
          borderRadius: colors.radius,
        },
      ]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image source={profile.photo} style={styles.photo} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={styles.gradient}
      />

      {/* LIKE indicator */}
      <Animated.View style={[styles.indicator, styles.likeIndicator, { opacity: likeOpacity }]}>
        <Text style={[styles.indicatorText, { color: colors.online }]}>LIKE</Text>
      </Animated.View>

      {/* NOPE indicator */}
      <Animated.View style={[styles.indicator, styles.nopeIndicator, { opacity: nopeOpacity }]}>
        <Text style={[styles.indicatorText, { color: colors.accent }]}>NOPE</Text>
      </Animated.View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text>
        <Text style={styles.bio} numberOfLines={2}>
          {profile.bio}
        </Text>
        <View style={styles.tags}>
          <InterestTags tags={profile.interests} variant="light" />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 32,
    height: CARD_HEIGHT,
    overflow: "hidden",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
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
    height: "60%",
  },
  content: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  bio: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  tags: {
    marginLeft: -4,
  },
  indicator: {
    position: "absolute",
    top: 40,
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
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
});
