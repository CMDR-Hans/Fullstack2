import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const adminAccount = {
  id: 'admin',
  nombre: 'Administrador',
  email: 'admin@admin.cl',
  password: 'admin123',
  role: 'admin',
};
const regularAccount = {
  id: 'usuario',
  nombre: 'Usuario',
  email: 'usuario@usuario.cl',
  password: 'usuario123',
  role: 'user',
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const registerUser = ({ nombre, email, password }) => {
    const cleanNombre = nombre.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanNombre || !cleanEmail || !password.trim()) {
      return { ok: false, message: 'Todos los campos son obligatorios.' };
    }

    if ([adminAccount.email, regularAccount.email].includes(cleanEmail)) {
      return { ok: false, message: 'Este correo está reservado para una cuenta del sistema.' };
    }

    const emailExists = users.some((user) => user.email.toLowerCase() === cleanEmail);

    if (emailExists) {
      return { ok: false, message: 'Este correo ya está registrado.' };
    }

    const newUser = {
      id: Date.now(),
      nombre: cleanNombre,
      email: cleanEmail,
      password: password.trim(),
      role: 'user',
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser);

    return { ok: true, message: 'Usuario registrado correctamente.' };
  };

  const loginUser = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === adminAccount.email) {
      if (cleanPassword !== adminAccount.password) {
        return { ok: false, message: 'Correo o contraseña incorrectos.' };
      }

      setCurrentUser(adminAccount);
      return { ok: true, message: 'Bienvenido, Administrador.' };
    }

    if (cleanEmail === regularAccount.email) {
      if (cleanPassword !== regularAccount.password) {
        return { ok: false, message: 'Correo o contraseña incorrectos.' };
      }

      setCurrentUser(regularAccount);
      return { ok: true, message: `Bienvenido, ${regularAccount.nombre}.` };
    }

    const user = users.find(
      (entry) => entry.email.toLowerCase() === cleanEmail && entry.password === cleanPassword
    );

    if (!user) {
      return { ok: false, message: 'Correo o contraseña incorrectos.' };
    }

    setCurrentUser(user);
    return { ok: true, message: `Bienvenido, ${user.nombre}.` };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({ users, currentUser, registerUser, loginUser, logoutUser }),
    [users, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
