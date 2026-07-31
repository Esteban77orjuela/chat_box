import { create } from 'zustand';

export interface Message {
  id?: number;
  content: string;
  sender_type: 'user' | 'bot';
  timestamp?: string;
}

interface Conversation {
  id: number;
  title: string;
  created_at: string;
}

interface ChatState {
  messages: Message[];
  conversations: Conversation[];
  activeConversationId: number | null;
  isLoading: boolean;
  streamingContent: string;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: number) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  streamingContent: '',
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      streamingContent: '',
    })),
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ isLoading: loading }),
  setStreamingContent: (content) => set({ streamingContent: content }),
  appendStreamingContent: (chunk) =>
    set((state) => ({
      streamingContent: state.streamingContent + chunk,
    })),
  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (id) =>
    set({ activeConversationId: id, messages: [] }),
  clearChat: () => set({ messages: [], streamingContent: '' }),
}));
