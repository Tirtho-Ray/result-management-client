// contexts/AuthContext.tsx
import  { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { TokenPayload, AuthContextType } from "../types/auth";
import { clearTokens, decodeToken, getAccessToken, getRefreshToken } from "../utils/tokenutils";

// Define the context and types
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const decoded = decodeToken(accessToken);
      if (decoded) {
        setUser({ accessToken, refreshToken: getRefreshToken() || "" });
      } else {
        // If token is invalid, clear the tokens and reset user state
        clearTokens();
      }
    }
  }, []);

  const logout = () => {
    setUser(null); // Clear the user state
    clearTokens(); // Clear tokens from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser, logout }}>
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
