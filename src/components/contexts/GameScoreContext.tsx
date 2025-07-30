import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameScoreContextType {
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
}

const GameScoreContext = createContext<GameScoreContextType | undefined>(undefined);

export const GameScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalScore, setTotalScore] = useState(0);

  return (
    <GameScoreContext.Provider value={{ totalScore, setTotalScore }}>
      {children}
    </GameScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(GameScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a GameScoreProvider");
  }
  return context;
};
