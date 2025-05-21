











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
   dishScore: number;
  setDishScore: React.Dispatch<React.SetStateAction<number>>;
  puzzle2048Score: number;
  setPuzzle2048Score: React.Dispatch<React.SetStateAction<number>>;
  tetrisScore: number;
  setTetrisScore: React.Dispatch<React.SetStateAction<number>>;
  minesScore: number;
  setMinesScore: React.Dispatch<React.SetStateAction<number>>;
}
const ScoreContext = createContext<AuthContextType | undefined>(undefined);
export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
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
   const [dishScore, setDishScore] = useState(0);
  const [puzzle2048Score, setPuzzle2048Score] = useState(0);
  const [tetrisScore, setTetrisScore] = useState(0);
  const [minesScore, setMinesScore] = useState(0);

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
        dishScore,
        setDishScore,
        puzzle2048Score,
        setPuzzle2048Score,
        tetrisScore,
        setTetrisScore,
        minesScore,
        setMinesScore,
      }}
    >
      {children}
    </AuthContext.Provider>

  );
};
