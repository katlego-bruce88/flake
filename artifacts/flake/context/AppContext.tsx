import React, { createContext, useContext, useState } from "react";
import { Profile, Group, Conversation, Message } from "@/src/types";
import { MOCK_PROFILES, MOCK_GROUPS, MOCK_CONVERSATIONS } from "@/src/lib/mockData";

const p3 = require("@/assets/images/profile3.png");

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
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
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
        profiles, groups, conversations, messages,
        likedIds, passedIds,
        likeProfile, passProfile, sendMessage, toggleMessageLike,
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

export { MOCK_PROFILES } from "@/src/lib/mockData";