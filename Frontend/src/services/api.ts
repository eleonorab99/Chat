import serverConfig from "../config/fetchUrl";

/**
 * Funzione unificata per le chiamate API al backend
 * @param endpoint - endpoint API senza il prefisso /api
 * @param options - opzioni fetch standard
 * @returns risultato della chiamata API come promise
 */
export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Utilizzo import.meta.env invece di process.env (standard in Vite)
  const baseUrl = import.meta.env.PROD 
    ? '/api' 
    : `${serverConfig.basePath}${serverConfig.basePort}${serverConfig.baseRest}`;
  
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Errore ${response.status}: ${response.statusText}`);
    }
    
    // Per le risposte 204 No Content
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Errore API: ${error}`);
    throw error;
  }
}

export default api;
