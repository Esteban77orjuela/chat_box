import { create } from 'zustand';

export interface Message {
    id?: number;
    content: string;
    sender_type: 'user' | 'ai';
    timestamp?: string;
}

interface ChatState {
    messages: Message[];
    isLoading: boolean;
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isLoading: false,
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    setMessages: (messages) => set({ messages }),
    setLoading: (loading) => set({ isLoading: loading }),
}));
