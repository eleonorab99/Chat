import { DirectMessage } from "../../context/types";
import { api } from "../api";

const directMessageService = {
  getMessages: async (userId: number): Promise<DirectMessage[]> => {
    return api<DirectMessage[]>(`/messages/direct/${userId}`);
  },

  sendMessage: async (
    receiverId: number,
    content: string
  ): Promise<DirectMessage> => {
    return api<DirectMessage>("/messages/direct", {
      method: "POST",
      body: JSON.stringify({ receiverId, content }),
    });
  },
  
  uploadFile: async (receiverId: number, file: File): Promise<DirectMessage> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('receiverId', receiverId.toString());
    
    return api<DirectMessage>("/messages/direct/upload", {
      method: "POST",
      body: formData,
      headers: {} // Rimuove Content-Type per consentire al browser di impostarlo con il boundary
    });
  }
};

export default directMessageService;
