// AuthContext.tsx
export { AuthProvider, useAuth } from "../components/AuthContext";
export type { AuthContextType } from "../components/AuthContext";
import { createContext, useContext, useState, ReactNode } from "react";

interface ScoreContextType {
  dishScore: number;
  setDishScore: React.Dispatch<React.SetStateAction<number>>;
  puzzle2048Score: number;
  setPuzzle2048Score: React.Dispatch<React.SetStateAction<number>>;
  tetrisScore: number;
  setTetrisScore: React.Dispatch<React.SetStateAction<number>>;
  minesScore: number;
  setMinesScore: React.Dispatch<React.SetStateAction<number>>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [dishScore, setDishScore] = useState(0);
  const [puzzle2048Score, setPuzzle2048Score] = useState(0);
  const [tetrisScore, setTetrisScore] = useState(0);
  const [minesScore, setMinesScore] = useState(0);

  return (
    <ScoreContext.Provider
      value={{
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
    </ScoreContext.Provider>
  );
};
