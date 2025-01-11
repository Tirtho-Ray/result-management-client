/* eslint-disable @typescript-eslint/no-unused-vars */
// import { AxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from '../utils/tokenutils';
import axios from 'axios';

// Define the API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Update with your backend URL

  headers: {
    'Content-Type': 'application/json',
  },
});
// console.log(import.meta.env.VITE_API_URL)

// Request interceptor for adding the access token to the headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`; // Ensure headers is not undefined
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response, // If response is OK, just return it
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized, try refreshing the token
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/refresh`, { refreshToken });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { accessToken }:any = data;
          setAccessToken(accessToken); // Save the new access token
          error.config.headers!['Authorization'] = `Bearer ${accessToken}`; // Retry the failed request with new token
          return api.request(error.config); // Retry the original request
        } catch (error){
          clearTokens(); // If refresh fails, clear tokens
          window.location.href = "/login"; // Redirect to login page
        }
      } else {
        clearTokens();
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error); // Reject other errors
  }
);

export default api;
