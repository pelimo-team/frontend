import { createContext, useState, useEffect, ReactNode } from "react";
import { CategoryType } from "../components/AdvancedSearch/types";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  activeTab: CategoryType;
  setActiveTab: (tab: CategoryType) => void;
  role: "user" | "manager" | "";
  setRole: (role: "user" | "manager" | "") => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  activeTab: "Restaurant", // Default Value
  role: "",
  setRole: () => {},
  setActiveTab: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<CategoryType>("Restaurant"); // New State
  const [role, setRole] = useState<"user" | "manager" | "">(""); // New role state

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        activeTab,
        setActiveTab,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
