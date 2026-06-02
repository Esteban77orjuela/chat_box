import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/chatStore';

const SOCKET_URL = 'http://localhost:8000';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const { addMessage, setLoading } = useChatStore();

    useEffect(() => {
        // Inicializar socket
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            print('Socket conectado');
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
            // Enviamos el contenido y los últimos mensajes como contexto
            socketRef.current.emit('send_message', {
                content,
                history: history.slice(-5)
            });
        }
    };

    return { sendMessage };
};
function print(arg0: string) {
    console.log(arg0);
}
