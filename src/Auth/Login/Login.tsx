import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Api/Api";
import { useAuth } from "../../Context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const Login = () => {
  const { setUser } = useAuth(); // Access context to set user after login
  const [formData, setFormData] = useState<LoginFormData>({
    email: "testAdmi2n@gmail.com",
    password: "admin@123",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<ApiResponse>("/api/auth/login", formData);

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;

        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setUser({ accessToken, refreshToken }); // Update the context immediately
          toast.success("Login successful!");
          navigate("/admin/dashboard/home"); // Redirect after successful login
        } else {
          console.error("Tokens are missing in the response.");
          toast.error("Tokens are missing in the response.");
        }
      } else {
        setError(response.data.message);
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Enter your email"
            required
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
