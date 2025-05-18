'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { GeminiClient, createGeminiClient } from '@/services/gemini';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  position?: 'bottom-right' | 'bottom-left';
  title?: string;
  welcomeMessage?: string;
  apiKey?: string;
  className?: string;
  iconImage?: string;  // URL de l'image GIF pour l'icône
  iconSize?: number;   // Taille de l'icône
}

export default function ChatBot({
  position = 'bottom-right',
  title = 'Assistant KORTEXA',
  welcomeMessage = 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
  apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  className,
  iconImage = '/chatbot-icon.gif',  // Image par défaut (à placer dans le dossier public)
  iconSize = 40,  // Taille par défaut
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiClient, setGeminiClient] = useState<GeminiClient | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialise le client Gemini
  useEffect(() => {
    if (apiKey) {
      try {
        const client = createGeminiClient(apiKey);
        setGeminiClient(client);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du client Gemini:', error);
      }
    }
  }, [apiKey]);

  // Ajoute le message de bienvenue au chargement
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          content: welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [welcomeMessage, messages.length]);

  // Défilement automatique vers le bas lors de nouveaux messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Gère l'envoi d'un message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (geminiClient) {
        // Prépare l'historique de conversation pour le contexte
        const conversationHistory = messages
          .filter(msg => msg.id !== 'welcome') // Exclut le message de bienvenue
          .map(msg => msg.content);
        
        // Appel à l'API Gemini
        const response = await geminiClient.chatResponse(
          userMessage.content,
          conversationHistory
        );
        
        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          content: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botResponse]);
      } else {
        // Simulation si l'API n'est pas disponible
        setTimeout(() => {
          const botResponse: Message = {
            id: `bot-${Date.now()}`,
            content: `Je suis en mode démonstration car l'API Gemini n'est pas configurée. Votre message: "${userMessage.content}"`,
            sender: 'bot',
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, botResponse]);
        }, 1500);
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec Gemini API:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer plus tard.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Gère l'appui sur Entrée pour envoyer un message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn('fixed z-50', {
      'bottom-6 right-6': position === 'bottom-right',
      'bottom-6 left-6': position === 'bottom-left',
    }, className)}>
      {/* Bouton du chatbot */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        style={{ width: `${iconSize + 16}px`, height: `${iconSize + 16}px` }} // +16px pour le padding
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </motion.svg>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {iconImage ? (
                // Affiche le GIF personnalisé ou l'image si fourni
                <Image
                  src={iconImage}
                  alt="Chat avec nous"
                  width={iconSize}
                  height={iconSize}
                  className="rounded-full"
                />
              ) : (
                // Icône SVG par défaut
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre du chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[450px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* En-tête du chat */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-500 text-white p-4 flex items-center justify-between">
              <h3 className="font-medium">{title}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fermer le chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Corps du chat avec les messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex", {
                    "justify-end": message.sender === 'user',
                    "justify-start": message.sender === 'bot',
                  })}
                >
                  <div
                    className={cn("max-w-[80%] rounded-lg px-4 py-2", {
                      "bg-accent-500 text-white": message.sender === 'user',
                      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100": message.sender === 'bot',
                    })}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gray-500"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Référence pour le défilement automatique */}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message..."
                  className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 min-h-[40px] max-h-[120px]"
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={cn(
                    "p-2 rounded-full",
                    inputValue.trim() && !isTyping
                      ? "bg-accent-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  )}
                  aria-label="Envoyer le message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                Propulsé par Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 