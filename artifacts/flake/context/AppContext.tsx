import React, { createContext, useContext, useState } from "react";
import { Profile, Group, Conversation, Message } from "@/types";

const p1 = require("@/assets/images/profile1.png");
const p2 = require("@/assets/images/profile2.png");
const p3 = require("@/assets/images/profile3.png");

export const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    name: "Jessica",
    age: 26,
    bio: "Chasing sunsets and mountain tops",
    interests: ["CraftBeer", "Hiking", "Running", "Bouldering"],
    photo: p1,
    distance: "2 km away",
    online: true,
  },
  {
    id: "2",
    name: "Marcus",
    age: 29,
    bio: "City explorer and coffee enthusiast",
    interests: ["Coffee", "Photography", "Travel", "Jazz"],
    photo: p2,
    distance: "5 km away",
    online: true,
  },
  {
    id: "3",
    name: "Sophie",
    age: 24,
    bio: "Beach lover and always down for adventures",
    interests: ["Beach", "Yoga", "Music", "Art"],
    photo: p3,
    distance: "3 km away",
    online: false,
  },
  {
    id: "4",
    name: "Tyler",
    age: 31,
    bio: "Weekend warrior. Craft beer collector.",
    interests: ["Climbing", "Skiing", "Beer", "Cycling"],
    photo: p2,
    distance: "7 km away",
    online: true,
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "1",
    name: "Peak Seekers",
    members: 9,
    online: 9,
    category: "Outdoor",
    description: "Hiking, climbing, and outdoor adventures with cool people",
    photo: p1,
  },
  {
    id: "2",
    name: "Code & Cocktails",
    members: 17,
    online: 14,
    category: "Social",
    description: "Tech people who love to unwind together",
    photo: p2,
  },
  {
    id: "3",
    name: "Golden Hour Club",
    members: 23,
    online: 8,
    category: "Photography",
    description: "Photography + good vibes only",
    photo: p3,
  },
  {
    id: "4",
    name: "Sunday Brunch Crew",
    members: 12,
    online: 5,
    category: "Food & Drink",
    description: "Bottomless brunch every Sunday",
    photo: p1,
  },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "2",
      senderName: "Marcus",
      senderPhoto: p2,
      type: "text",
      content: "Please provide more details about your request",
      timestamp: "7:55 PM",
      liked: true,
    },
    {
      id: "m2",
      senderId: "me",
      senderName: "You",
      senderPhoto: p3,
      type: "voice",
      content: "2:19",
      timestamp: "7:57 PM",
      liked: false,
    },
    {
      id: "m3",
      senderId: "2",
      senderName: "Marcus",
      senderPhoto: p2,
      type: "imagecard",
      content: "Here's what I created:",
      timestamp: "7:59 PM",
      liked: false,
    },
    {
      id: "m4",
      senderId: "me",
      senderName: "You",
      senderPhoto: p3,
      type: "text",
      content: "I like it! Let's make in another style",
      timestamp: "8:12 PM",
      liked: false,
    },
  ],
  "2": [
    {
      id: "m1",
      senderId: "3",
      senderName: "Sophie",
      senderPhoto: p3,
      type: "text",
      content: "Who's coming to the meetup tonight?",
      timestamp: "3:14 PM",
      liked: false,
    },
    {
      id: "m2",
      senderId: "me",
      senderName: "You",
      senderPhoto: p1,
      type: "text",
      content: "I'll be there around 8!",
      timestamp: "3:16 PM",
      liked: false,
    },
  ],
  "3": [
    {
      id: "m1",
      senderId: "1",
      senderName: "Jessica",
      senderPhoto: p1,
      type: "text",
      content: "Golden hour was amazing today",
      timestamp: "Yesterday",
      liked: false,
    },
  ],
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    group: MOCK_GROUPS[0],
    lastMessage: "I like it! Let's make in another style",
    lastTime: "8:12 PM",
    unread: 0,
    participants: [MOCK_PROFILES[0], MOCK_PROFILES[1], MOCK_PROFILES[2]],
  },
  {
    id: "2",
    group: MOCK_GROUPS[1],
    lastMessage: "I'll be there around 8!",
    lastTime: "3:16 PM",
    unread: 2,
    participants: [MOCK_PROFILES[2], MOCK_PROFILES[3], MOCK_PROFILES[0]],
  },
  {
    id: "3",
    group: MOCK_GROUPS[2],
    lastMessage: "Golden hour was amazing today",
    lastTime: "Yesterday",
    unread: 5,
    participants: [MOCK_PROFILES[1], MOCK_PROFILES[2]],
  },
];

interface AppContextType {
  profiles: Profile[];
  groups: Group[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  likedIds: Set<string>;
  passedIds: Set<string>;
  likeProfile: (id: string) => void;
  passProfile: (id: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  toggleMessageLike: (conversationId: string, messageId: string) => void;
  currentUser: Profile;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles] = useState<Profile[]>(MOCK_PROFILES);
  const [groups] = useState<Group[]>(MOCK_GROUPS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());

  const currentUser: Profile = {
    id: "me",
    name: "Alex",
    age: 27,
    bio: "Adventurer at heart. Let's explore together.",
    interests: ["Hiking", "Coffee", "Photography", "Travel"],
    photo: p3,
    distance: "",
    online: true,
  };

  const likeProfile = (id: string) => setLikedIds((prev) => new Set(prev).add(id));
  const passProfile = (id: string) => setPassedIds((prev) => new Set(prev).add(id));

  const sendMessage = (conversationId: string, content: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      senderPhoto: p3,
      type: "text",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      liked: false,
    };
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] ?? []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: content, lastTime: newMsg.timestamp, unread: 0 }
          : c
      )
    );
  };

  const toggleMessageLike = (conversationId: string, messageId: string) => {
    setMessages((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] ?? []).map((m) =>
        m.id === messageId ? { ...m, liked: !m.liked } : m
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        profiles,
        groups,
        conversations,
        messages,
        likedIds,
        passedIds,
        likeProfile,
        passProfile,
        sendMessage,
        toggleMessageLike,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
