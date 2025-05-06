import { ChannelMessage } from "../../context/types";
import { api } from "../api";

const channelMessageService = {
  getMessages: async (channelId: number): Promise<ChannelMessage[]> => {
    return api<ChannelMessage[]>(`/channels/${channelId}/messages`);
  },

  sendMessage: async (
    channelId: number,
    content: string
  ): Promise<ChannelMessage> => {
    return api<ChannelMessage>(`/channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
  
  uploadFile: async (channelId: number, file: File): Promise<ChannelMessage> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api<ChannelMessage>(`/channels/${channelId}/messages/upload`, {
      method: "POST",
      body: formData,
      headers: {} // Rimuove Content-Type per consentire al browser di impostarlo con il boundary
    });
  }
};

export default channelMessageService;
