// components/ChatWidgetSimple.tsx
'use client';

import { useEffect } from 'react';

const ChatWidgetSimple = () => {
  useEffect(() => {
    // Remove any existing chatbase scripts first
    const existingScript = document.querySelector('script[src*="chatbase"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Remove any existing chatbase styles
    const existingStyles = document.querySelectorAll('style[data-chatbase-style]');
    existingStyles.forEach(style => document.head.removeChild(style));

    // Add Chatbase script to your page
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', 'wyMDRY-aNbuAilUg5Kv3B'); // Your Bot ID
    script.setAttribute('domain', 'www.chatbase.co');
    
    document.head.appendChild(script);

    // Add custom styles for the chatbot icon using Tailwind-inspired colors
    const style = document.createElement('style');
    style.setAttribute('data-chatbase-style', 'true');
    style.textContent = `
      /* Customize the chat button with your color #a3d921 */
      #chatbase-button {
        background-color: #a3d921 !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        transition: all 0.3s ease !important;
      }
      
      #chatbase-button:hover {
        background-color: #8bb81f !important;
        transform: scale(1.05) !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
      }
      
      /* Chat window styling */
      .chatbase-chat-window {
        border-radius: 0.75rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        border: 1px solid #e5e7eb !important;
      }
      
      /* Header styling */
      .chatbase-chat-window-header {
        background-color: #a3d921 !important;
        color: #000000 !important;
        border-top-left-radius: 0.75rem !important;
        border-top-right-radius: 0.75rem !important;
        font-weight: 600 !important;
      }
      
      /* Close button */
      .chatbase-close-button {
        color: #000000 !important;
        opacity: 0.7 !important;
      }
      
      .chatbase-close-button:hover {
        opacity: 1 !important;
      }
      
      /* Message bubbles */
      .chatbase-user-message {
        background-color: #a3d921 !important;
        color: #000000 !important;
        border-radius: 1.125rem 1.125rem 0.25rem 1.125rem !important;
      }
      
      .chatbase-bot-message {
        background-color: #f9fafb !important;
        color: #374151 !important;
        border-radius: 1.125rem 1.125rem 1.125rem 0.25rem !important;
        border: 1px solid #e5e7eb !important;
      }
      
      /* Input area */
      .chatbase-input-area {
        border-top: 1px solid #e5e7eb !important;
        background-color: #ffffff !important;
        border-bottom-left-radius: 0.75rem !important;
        border-bottom-right-radius: 0.75rem !important;
      }
      
      .chatbase-input {
        border-radius: 1.25rem !important;
        border: 1px solid #d1d5db !important;
        padding: 0.625rem 1rem !important;
        color: #374151 !important;
      }
      
      .chatbase-send-button {
        background-color: #a3d921 !important;
        border-radius: 50% !important;
        color: #000000 !important;
      }
      
      .chatbase-send-button:hover {
        background-color: #8bb81f !important;
      }
      
      /* Timestamp text */
      .chatbase-timestamp {
        color: #6b7280 !important;
      }
      
      /* Chat history border */
      .chatbase-chat-history {
        border-bottom: 1px solid #e5e7eb !important;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      // Clean up when component unmounts
      const script = document.querySelector('script[src*="chatbase"]');
      if (script) {
        document.head.removeChild(script);
      }
      
      const style = document.querySelector('style[data-chatbase-style]');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default ChatWidgetSimple;