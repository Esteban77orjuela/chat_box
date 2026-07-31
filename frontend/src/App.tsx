import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Sidebar } from './components/layout/Sidebar';
import { Welcome } from './components/views/Welcome';
import { ChatInput } from './components/chat/ChatInput';
import { ChatMessage } from './components/chat/ChatMessage';
import { useAuthStore } from './store/authStore';
import { useChatStore } from './store/chatStore';
import { apiFetch } from './services/api';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export default function App() {
  const { setAuth, logout } = useAuthStore();
  const {
    messages,
    isLoading,
    streamingContent,
    addMessage,
    setLoading,
    setStreamingContent,
    setActiveConversation,
    setConversations,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ensureGuestSession = async () => {
    const currentAuth = useAuthStore.getState();

    if (currentAuth.token) {
      try {
        const meResponse = await fetch(API_URL + '/auth/me', {
          headers: { Authorization: 'Bearer ' + currentAuth.token },
        });
        if (meResponse.ok) {
          const user = await meResponse.json();
          setAuth({ id: user.id, username: user.username, email: user.email }, currentAuth.token);
          return currentAuth.token;
        }
      } catch {
        // The guest login below will show a real error if the backend is unavailable.
      }
      logout();
    }

    const response = await fetch(API_URL + '/auth/guest', { method: 'POST' });
    if (!response.ok) {
      throw new Error('No se pudo iniciar la sesion invitada. Revisa que el backend este corriendo.');
    }

    const data = await response.json();
    const meResponse = await fetch(API_URL + '/auth/me', {
      headers: { Authorization: 'Bearer ' + data.access_token },
    });

    if (meResponse.ok) {
      const user = await meResponse.json();
      setAuth({ id: user.id, username: user.username, email: user.email }, data.access_token);
    } else {
      setAuth({ id: 0, username: 'Invitado', email: 'guest@chatbox.dev' }, data.access_token);
    }

    return data.access_token;
  };

  const ensureConversation = async (firstMessage: string) => {
    const currentConversationId = useChatStore.getState().activeConversationId;
    if (currentConversationId && currentConversationId > 0) {
      return currentConversationId;
    }

    const title = firstMessage.slice(0, 60) || 'Nuevo chat';
    const conversation = await apiFetch('/chat/', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });

    setActiveConversation(conversation.id);

    try {
      const conversations = await apiFetch('/chat/');
      setConversations(conversations);
    } catch {
      setConversations([conversation]);
    }

    return conversation.id;
  };

  useEffect(() => {
    ensureGuestSession().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, streamingContent]);

  const streamText = async (text: string, delay = 12) => {
    let displayed = '';
    for (let i = 0; i < text.length; i++) {
      displayed += text[i];
      setStreamingContent(displayed);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };

  const handleSend = async (content: string) => {
    setLoading(true);
    setStreamingContent('');

    let userMessageAdded = false;
    const showUserMessage = () => {
      if (!userMessageAdded) {
        addMessage({ content, sender_type: 'user', timestamp: new Date().toISOString() });
        userMessageAdded = true;
      }
    };

    try {
      await ensureGuestSession();
      const conversationId = await ensureConversation(content);
      showUserMessage();

      const data = await apiFetch('/chat/' + conversationId + '/messages', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });

      const fullText = data.content || 'No recibi una respuesta.';
      await streamText(fullText);
      addMessage({ content: fullText, sender_type: 'bot', timestamp: data.timestamp });
    } catch (error: any) {
      showUserMessage();
      const detail = error?.message || 'Error de conexion con el servidor.';
      const fallback = 'No pude obtener respuesta. ' + detail;
      await streamText(fallback, 10);
      addMessage({ content: fallback, sender_type: 'bot', timestamp: new Date().toISOString() });
    } finally {
      setLoading(false);
      setStreamingContent('');
    }
  };

  return (
    <div className="min-h-screen w-full relative flex">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen flex relative z-10"
      >
        <Sidebar />

        <main className="flex-1 flex flex-col h-screen relative">
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#030014] to-transparent z-10 pointer-events-none" />

          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 pt-12">
            {messages.length === 0 ? (
              <Welcome onSuggest={handleSend} />
            ) : (
              <div className="flex flex-col">
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    content={msg.content}
                    senderType={msg.sender_type}
                    isLast={idx === messages.length - 1}
                  />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 w-full max-w-4xl mx-auto py-6"
                  >
                    <div className="shrink-0 pt-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 whitespace-pre-wrap text-white/70 text-sm leading-relaxed">
                      {streamingContent || 'Pensando...'}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            )}
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent pt-12 pb-6 px-4 z-20">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </main>
      </motion.div>
    </div>
  );
}
