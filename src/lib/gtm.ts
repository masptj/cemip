declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-WX5N4SH6";

/**
 * Envia eventos e dados para o Google Tag Manager (dataLayer).
 * Seguro para execução em SSR (só executa no cliente).
 */
export function pushToDataLayer(data: Record<string, any>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}
