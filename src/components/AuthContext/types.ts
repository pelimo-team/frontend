export type AuthContextType = {
  loginStatus: number | null;
  setLoginStatus: (status: number) => void;
}; 