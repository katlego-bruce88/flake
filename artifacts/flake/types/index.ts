export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  photo: ReturnType<typeof require>;
  distance: string;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: ReturnType<typeof require>;
  type: "text" | "voice" | "image" | "imagecard";
  content: string;
  caption?: string;
  timestamp: string;
  liked: boolean;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  online: number;
  category: string;
  description: string;
  photo?: ReturnType<typeof require>;
}

export interface Conversation {
  id: string;
  group: Group;
  lastMessage: string;
  lastTime: string;
  unread: number;
  participants: Profile[];
}
