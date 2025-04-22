// AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  loginStatus: number | null;
  setLoginStatus: (status: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
