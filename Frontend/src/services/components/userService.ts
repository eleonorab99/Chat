import { User } from "../../context/types";
import { api } from "../api";

const userService = {
  searchUsers: async (query: string, currentUserId: number): Promise<{ success: boolean, data: User[], message?: string }> => {
    return api<{ success: boolean, data: User[], message?: string }>(`/users/search?query=${encodeURIComponent(query)}&exclude=${currentUserId}`);
  },
  
  getUserProfile: async (userId: number): Promise<User> => {
    return api<User>(`/users/${userId}`);
  },
  
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return api<User>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData)
    });
  },
  
  uploadAvatar: async (avatar: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    
    return api<{ avatarUrl: string }>("/users/avatar", {
      method: "POST",
      body: formData,
      headers: {}
    });
  }
};

export default userService;

