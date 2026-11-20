/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const SESSION_KEY = 'sonido-vivo-session';
const USERS_KEY = 'sonido-vivo-users';

const demoUsers = [
  { username: 'admin', password: 'admin123', role: 'admin', nombre: 'Administrador' },
  { username: 'cliente', password: 'cliente123', role: 'cliente', nombre: 'Cliente demo' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const getRegisteredUsers = () => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      return Array.isArray(users) ? users : [];
    } catch {
      return [];
    }
  };

  const login = (username, password) => {
    const registeredUsers = getRegisteredUsers();

    const normalizedUsername = username.trim().toLowerCase();
    const found = [...demoUsers, ...registeredUsers].find(
      (item) => item.username.toLowerCase() === normalizedUsername && item.password === password
    );

    if (!found) return { ok: false, message: 'Usuario o contraseña incorrectos.' };

    const sessionUser = { username: found.username, role: found.role, nombre: found.nombre };
    setUser(sessionUser);
    return { ok: true, user: sessionUser };
  };

  const register = (account) => {
    const registeredUsers = getRegisteredUsers();

    const username = account.username.trim().toLowerCase();
    const exists = [...demoUsers, ...registeredUsers].some((item) => item.username.toLowerCase() === username);
    if (exists) return { ok: false, message: 'Ese usuario ya existe.' };

    const nextUsers = [...registeredUsers, { username, password: account.password, role: 'cliente', nombre: account.nombre }];
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));

    const sessionUser = { username, role: 'cliente', nombre: account.nombre };
    setUser(sessionUser);
    return { ok: true, user: sessionUser };
  };

  const logout = () => setUser(null);

  const value = { user, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
