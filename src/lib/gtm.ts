declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GTM_ID = import.meta.env.VITE_GTM_ID || "GTM-WX5N4SH6";
export const GOOGLE_ADS_ID = "AW-18369189975";
export const GOOGLE_ADS_CONVERSION_LABEL = "AW-18369189975/ZK3aCKCA0JMdENewjrdE";

/**
 * Envia eventos e dados para o Google Tag Manager (dataLayer).
 * Seguro para execução em SSR (só executa no cliente).
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}

/**
 * Dispara evento de conversão do Google Ads.
 */
export function trackGoogleAdsConversion(conversionLabel = GOOGLE_ADS_CONVERSION_LABEL): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: conversionLabel,
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", "conversion", { send_to: conversionLabel }]);
  }

  // Também envia evento de conversão genérico para dataLayer (compatível com GTM)
  pushToDataLayer({
    event: "conversion",
    event_category: "Leads",
    event_label: "WhatsApp Lead",
    send_to: conversionLabel,
  });
}
