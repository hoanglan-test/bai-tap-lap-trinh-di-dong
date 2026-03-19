
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // đơn giản: đăng nhập thành công nếu email có chứa "@"
    if (email.includes("@") && password.length > 3) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    if (email.includes("@") && password.length > 3) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};