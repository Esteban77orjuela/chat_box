import { useAuthStore } from '../store/authStore';

const API_URL = 'http://127.0.0.1:8000/api/v1';

/**
 * Función centralizada para hacer peticiones al backend.
 * Automáticamente inyecta el token JWT si el usuario está logueado.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const { token, logout } = useAuthStore.getState();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Si el token expiró o es inválido, cerramos sesión automáticamente
        if (response.status === 401) {
            logout();
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Error en la petición');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Error de conexión con el servidor');
    }
}
