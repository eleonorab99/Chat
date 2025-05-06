import { api } from "../api";

interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    return api<AuthResponse>("/account/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: LoginData): Promise<AuthResponse> => {
    return api<AuthResponse>("/account/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  resetPassword: async (email: string): Promise<{ message: string }> => {
    return api<{ message: string }>("/account/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  logout: async (): Promise<void> => {
    return api<void>("/account/logout", { method: "POST" });
  },
  
  getCurrentUser: async () => {
    return api("/account/me");
  }
};

export default authService;