import { User, Friendship } from "../../context/types";
import { api } from "../api";

const friendService = {
  getFriends: async (userId: number): Promise<{ success: boolean, data: User[], message?: string }> => {
    return api<{ success: boolean, data: User[], message?: string }>(`/friends/list/${userId}`);
  },
  
  getPendingRequests: async (userId: number): Promise<{ success: boolean, data: Friendship[], message?: string }> => {
    return api<{ success: boolean, data: Friendship[], message?: string }>(`/friends/requests/${userId}`);
  },
  
  sendRequest: async (userId: number, friendId: number): Promise<{ success: boolean, message: string }> => {
    return api<{ success: boolean, message: string }>(`/friends/request`, {
      method: "POST",
      body: JSON.stringify({ userId, friendId }),
    });
  },
  
  acceptRequest: async (requestId: number): Promise<{ success: boolean, message: string }> => {
    return api<{ success: boolean, message: string }>(`/friends/accept/${requestId}`, { 
      method: "POST" 
    });
  },
  
  rejectRequest: async (requestId: number): Promise<{ success: boolean, message: string }> => {
    return api<{ success: boolean, message: string }>(`/friends/reject/${requestId}`, { 
      method: "POST" 
    });
  },
  
  removeFriend: async (userId: number, friendId: number): Promise<{ success: boolean, message: string }> => {
    return api<{ success: boolean, message: string }>(`/friends/remove`, {
      method: "POST",
      body: JSON.stringify({ userId, friendId }),
    });
  }
};

export default friendService;