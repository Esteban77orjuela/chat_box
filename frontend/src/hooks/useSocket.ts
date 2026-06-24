import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

const SOCKET_URL = 'http://localhost:8000';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const { addMessage, setLoading } = useChatStore();

    useEffect(() => {
        const token = useAuthStore.getState().token;
        socketRef.current = io(SOCKET_URL, {
            auth: { token }
        });

        socketRef.current.on('connect', () => {
            console.log('Socket conectado');
        });

        socketRef.current.on('receive_message', (message) => {
            addMessage(message);
            setLoading(false);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [addMessage, setLoading]);

    const sendMessage = (content: string, history: any[]) => {
        if (socketRef.current) {
            setLoading(true);
            socketRef.current.emit('send_message', {
                content,
                history: history.slice(-5)
            });
        }
    };

    return { sendMessage };
};

