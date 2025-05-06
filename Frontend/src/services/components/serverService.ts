import { Server, Channel } from "../../context/types";
import { ChannelPermissions } from "../../types/components/typesDiscordSidebar";
import { api } from "../api";

interface ServerResponse {
  details: Server[];
}

const serverService = {
  getServers: async (): Promise<Server[]> => {
    try {
      const response = await api<ServerResponse>("/servers/server");
      return response.details || [];
    } catch (error) {
      console.error("Errore nel recupero dei server:", error);
      return [];
    }
  },

  getChannels: async (serverId: number): Promise<Channel[]> => {
    try {
      const response = await api<{ details: Channel[] }>(`/servers/${serverId}/channels`);
      return response.details || [];
    } catch (error) {
      console.error("Errore nel recupero dei canali:", error);
      return [];
    }
  },

  getChannelType: async (channelId: number): Promise<string> => {
    try {
      const response = await api<{ type: string }>(`/channels/${channelId}/type`);
      return response.type;
    } catch (error) {
      console.error("Errore nel recupero del tipo di canale:", error);
      return 'text';
    }
  },

  getChannelPermissions: async (channelId: number): Promise<ChannelPermissions> => {
    try {
      const response = await api<{ permissions: ChannelPermissions }>(`/channels/${channelId}/permissions`);
      return response.permissions;
    } catch (error) {
      console.error("Errore nel recupero dei permessi del canale:", error);
      return { read: true, write: true };
    }
  },
  
  createServer: async (name: string, icon?: File): Promise<Server> => {
    const formData = new FormData();
    formData.append('name', name);
    if (icon) {
      formData.append('icon', icon);
    }
    
    return api<Server>("/servers", {
      method: "POST",
      body: formData,
      headers: {}
    });
  },
  
  createChannel: async (serverId: number, name: string, type: 'text' | 'voice' | 'video'): Promise<Channel> => {
    return api<Channel>(`/servers/${serverId}/channels`, {
      method: "POST",
      body: JSON.stringify({ name, type })
    });
  }
};

export default serverService;