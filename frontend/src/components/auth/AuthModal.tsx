import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { apiFetch } from '../../services/api';
import { Bot, LogIn, UserPlus, AlertCircle } from 'lucide-react';

const AuthModal: React.FC = () => {
    const { setAuth } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (isLogin) {
                // FastAPI requiere Form data (application/x-www-form-urlencoded) para OAuth2PasswordRequestForm
                const formData = new URLSearchParams();
                formData.append('username', email); // FastAPI OAuth2 usa 'username' pero enviaremos el email
                formData.append('password', password);

                const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });

                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.detail || 'Error al iniciar sesión');
                }

                const token = data.access_token;
                const meResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userData = await meResponse.json();
                if (!meResponse.ok) {
                    throw new Error(userData.detail || 'Error al obtener usuario');
                }

                setAuth(
                    { id: userData.id, username: userData.username, email: userData.email },
                    token
                );
            } else {
                // Registro (JSON)
                const data = await apiFetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ email, username, password }),
                });
                
                // Si se registró con éxito, pasamos a modo Login para que inicie sesión
                setIsLogin(true);
                setError('¡Registro exitoso! Por favor inicia sesión.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/80 backdrop-blur-sm p-4">
            <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] relative overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl shadow-brand-blue/20">
                {/* Header decorativo */}
                <div className="flex flex-col items-center justify-center mb-8 space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-tr from-brand-blue to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/40">
                        <Bot size={36} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                    </h2>
                    <p className="text-brand-light/50 text-sm font-light">
                        {isLogin ? 'Ingresa para continuar a Chat Box' : 'Únete a la nueva era conversacional'}
                    </p>
                </div>

                {/* Mensaje de error / éxito */}
                {error && (
                    <div className={`flex items-center gap-2 p-3 mb-6 rounded-xl text-sm ${error.includes('exitoso') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        <AlertCircle size={16} />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-brand-light/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-brand-light/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-brand-light/30 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Procesando...</span>
                        ) : (
                            <>
                                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}
                        className="text-brand-light/50 hover:text-white text-sm transition-colors"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
