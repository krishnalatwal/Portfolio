/**
 * Telemetry tracker utility for user interactions.
 */
export const trackEvent = async (eventType, eventData = {}) => {
  try {
    const getApiUrl = () => {
      const envUrl = import.meta.env.VITE_API_URL;
      if (envUrl) {
        const normalized = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
        return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
      }
      return 'http://localhost:5000/api';
    };
    const apiBase = getApiUrl();
    // Fire-and-forget async POST to prevent blocking client UI transitions
    fetch(`${apiBase}/telemetry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventType, eventData })
    }).catch(err => {
      // Quiet fail to maintain seamless user experience if backend is offline
      console.debug('Telemetry logging failed or offline:', err.message)
    })
  } catch (error) {
    console.debug('Telemetry operation skipped:', error.message)
  }
}
