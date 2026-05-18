/**
 * Telemetry tracker utility for user interactions.
 */
export const trackEvent = async (eventType, eventData = {}) => {
  try {
    // Fire-and-forget async POST to prevent blocking client UI transitions
    fetch('http://localhost:5000/api/telemetry', {
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
