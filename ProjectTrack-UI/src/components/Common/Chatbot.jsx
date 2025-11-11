// src/components/Chatbot.js
import { useEffect } from 'react';

// Chatbot loader: we load the remote embed only when a valid ID is provided
// and add lightweight guards so a broken remote script doesn't crash the app.
const Chatbot = () => {
  useEffect(() => {
  // Read configuration from environment so different deployments can opt-in.
  // This project uses Vite — use import.meta.env.VITE_* variables.
  const CHATBOT_ID = import.meta.env.VITE_CHATBOT_ID || '';
  const CHATBOT_DOMAIN = import.meta.env.VITE_CHATBOT_DOMAIN || 'www.chatbase.co';

    if (!CHATBOT_ID) {
      // No id configured — skip loading remote embed to avoid 404s.
      console.info('Chatbot: no CHATBOT_ID configured, skipping embed load.');
      return undefined;
    }

    // Expose config expected by the embed script
    window.embeddedChatbotConfig = {
      chatbotId: CHATBOT_ID,
      domain: CHATBOT_DOMAIN,
    };

    const script = document.createElement('script');
    script.src = `https://${CHATBOT_DOMAIN}/embed.min.js`;
    script.defer = true;

    // Temporary handler that suppresses the specific unhandled rejection caused
    // by the remote script requesting styles that return 404 and then throwing.
    // We scope it to messages that include the chatbot id or the get-chatbot-styles path.
    const onUnhandledRejection = (evt) => {
      try {
        const reason = evt?.reason;
        const text = typeof reason === 'string' ? reason : JSON.stringify(reason || '');
        if (text.includes('get-chatbot-styles') || text.includes(CHATBOT_ID) || text.includes('chatbase')) {
          // prevent the console uncaught error from surfacing for this known remote failure
          evt.preventDefault();
          console.warn('Chatbot: suppressed known remote embed error:', reason);
        }
      } catch {
        // fallthrough — do not interfere with other errors
      }
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection);

    const cleanUp = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      // remove temporary global handler
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
      // remove the config we set
  try { delete window.embeddedChatbotConfig; } catch { window.embeddedChatbotConfig = undefined; }
    };

    script.onload = () => {
      // Remote script loaded; we can remove our temporary unhandledRejection listener
      // after a short delay to give it time to finish any startup fetches.
      setTimeout(() => window.removeEventListener('unhandledrejection', onUnhandledRejection), 2000);
      console.info('Chatbot embed script loaded.');
    };

    script.onerror = (err) => {
      console.warn('Chatbot embed failed to load:', err);
      // cleanup and keep the app healthy
      cleanUp();
    };

    document.body.appendChild(script);

    // Cleanup when component unmounts
    return () => {
      cleanUp();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div id="chatbase-widget" className="bg-white shadow-lg rounded-full">
        {/* Chatbot widget will be automatically inserted here by the embed script when available. */}
      </div>
    </div>
  );
};

export default Chatbot;
