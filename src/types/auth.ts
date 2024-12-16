// types/auth.ts

export interface TokenPayload {
    accessToken: string;
    refreshToken: string;
    // Add other properties from your payload, if any
  }
  
  export interface AuthContextType {
    user: TokenPayload | null;
    isAuthenticated: boolean;
    setUser: (user: TokenPayload | null) => void;  // Add this line to define setUser
    logout: () => void; 
  }
  