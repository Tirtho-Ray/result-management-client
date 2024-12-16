// utils/tokenService.ts

// Define the token keys
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Retrieve access token from localStorage
export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);

// Set access token in localStorage
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Retrieve refresh token from localStorage
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

// Set refresh token in localStorage
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Remove tokens from localStorage
// export const clearTokens = (): void => {
//   localStorage.removeItem(ACCESS_TOKEN_KEY);
//   localStorage.removeItem(REFRESH_TOKEN_KEY);
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeToken = (token: string): any | null => {
    try {
      const base64Url = token.split(".")[1]; // Get the payload part of the JWT (the middle part)
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Decode base64Url
      const jsonPayload = atob(base64); // Decode base64 to JSON string
      return JSON.parse(jsonPayload); // Parse the JSON string to get the payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  export const clearTokens = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
