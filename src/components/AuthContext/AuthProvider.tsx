import React, { createContext, useState } from "react";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext }; 