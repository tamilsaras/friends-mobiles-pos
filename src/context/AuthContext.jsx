import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = storage.getAuth();
    if (savedAuth) {
      setAuth(savedAuth);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = [
      { username: 'owner', password: 'friends123', role: 'owner', name: 'Owner' },
      { username: 'staff', password: 'staff123', role: 'staff', name: 'Staff' },
    ];

    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      const authData = { ...user, loginTime: new Date().toISOString() };
      setAuth(authData);
      storage.setAuth(authData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth(null);
    storage.clearAuth();
  };

  const hasAccess = (moduleName) => {
    if (!auth) return false;
    if (auth.role === 'owner') return true;

    // Staff access control
    const staffModules = [
      'Dashboard',
      'Stock',
      'Billing',
      'Recharge',
      'Money Transfer',
      'Second Hand',
      'Other Income',
      'Service',
      'Customers',
    ];

    return staffModules.includes(moduleName);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, hasAccess, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
