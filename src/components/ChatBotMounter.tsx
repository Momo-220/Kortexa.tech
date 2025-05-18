'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createRoot } from 'react-dom/client';
import ChatBot from '@/components/ui/ChatBot';

// Configuration du chatbot
const CHATBOT_CONFIG = {
  position: "bottom-right" as "bottom-right" | "bottom-left",
  title: "Assistant KORTEXA",
  welcomeMessage: "Bonjour ! Je suis l'assistant virtuel de KORTEXA. Comment puis-je vous aider aujourd'hui ?",
  iconImage: "/chatbot-icon.gif",
  iconSize: 120
};

export default function ChatBotMounter() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const rootRef = useRef<any>(null);
  const chatbotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  // Monter et démonter le ChatBot
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Démarrer monté à false
    setMounted(false);
    
    // Déterminer le délai en fonction de la page
    const delay = isHomePage ? 5500 : 1500;

    // Nettoyer un timer existant
    if (chatbotTimerRef.current) {
      clearTimeout(chatbotTimerRef.current);
    }

    // Programmer le montage du chatbot
    chatbotTimerRef.current = setTimeout(() => {
      try {
        // Vérifier si le conteneur existe
        const container = document.getElementById('chatbot-container');
        if (!container) {
          console.warn("Conteneur du chatbot non trouvé");
          return;
        }

        // Nettoyer le conteneur si nécessaire
        if (container.childNodes.length > 0) {
          container.innerHTML = '';
        }

        // Créer la racine React et monter le chatbot
        rootRef.current = createRoot(container);
        rootRef.current.render(
          <ChatBot
            position={CHATBOT_CONFIG.position}
            title={CHATBOT_CONFIG.title}
            welcomeMessage={CHATBOT_CONFIG.welcomeMessage}
            iconImage={CHATBOT_CONFIG.iconImage}
            iconSize={CHATBOT_CONFIG.iconSize}
          />
        );
        
        setMounted(true);
      } catch (error) {
        console.error("Erreur lors du montage du ChatBot:", error);
        setMounted(false);
      }
    }, delay);

    // Nettoyer au démontage ou au changement de page
    return () => {
      if (chatbotTimerRef.current) {
        clearTimeout(chatbotTimerRef.current);
        chatbotTimerRef.current = null;
      }

      if (rootRef.current) {
        try {
          rootRef.current.unmount();
          rootRef.current = null;
          setMounted(false);
        } catch (error) {
          console.error("Erreur lors du démontage du ChatBot:", error);
        }
      }
    };
  }, [isHomePage, pathname]);

  return null;
} 