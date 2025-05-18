/**
 * Service pour l'intégration de l'API Gemini
 * Documentation: https://ai.google.dev/docs/gemini-api
 */

// URL de base de l'API Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Interface pour la configuration du client Gemini
interface GeminiConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
}

// Interface pour les paramètres de génération
interface GenerationParams {
  prompt: string;
  context?: string[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
}

// Interface pour la réponse de l'API
interface GeminiResponse {
  text: string;
  finishReason?: string;
  safetyRatings?: Array<{
    category: string;
    probability: string;
  }>;
}

/**
 * Client pour interagir avec l'API Gemini
 */
export class GeminiClient {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private topP: number;
  private topK: number;

  /**
   * Crée une nouvelle instance du client Gemini
   * @param config Configuration du client
   */
  constructor(config: GeminiConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-1.5-pro';
    this.maxTokens = config.maxTokens || 1024;
    this.temperature = config.temperature || 0.7;
    this.topP = config.topP || 0.95;
    this.topK = config.topK || 40;
  }

  /**
   * Génère une réponse à partir d'un prompt
   * @param params Paramètres de génération
   * @returns Réponse générée
   */
  async generateContent(params: GenerationParams): Promise<GeminiResponse> {
    try {
      const url = `${GEMINI_API_URL}/models/${this.model}:generateContent?key=${this.apiKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: params.prompt
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: params.maxTokens || this.maxTokens,
          temperature: params.temperature || this.temperature,
          topP: params.topP || this.topP,
          topK: params.topK || this.topK,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur API Gemini: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      // Extraction du texte de la réponse
      const text = data.candidates[0]?.content?.parts[0]?.text || '';
      const finishReason = data.candidates[0]?.finishReason;
      const safetyRatings = data.candidates[0]?.safetyRatings;

      return {
        text,
        finishReason,
        safetyRatings
      };
    } catch (error) {
      console.error('Erreur lors de la génération de contenu avec Gemini:', error);
      throw error;
    }
  }

  /**
   * Génère une réponse pour un chatbot avec contexte de conversation
   * @param userMessage Message de l'utilisateur
   * @param conversationHistory Historique de la conversation
   * @returns Réponse générée
   */
  async chatResponse(userMessage: string, conversationHistory: string[] = []): Promise<string> {
    try {
      // Construction du prompt avec l'historique de la conversation
      let prompt = '';
      
      if (conversationHistory.length > 0) {
        prompt += "Historique de la conversation:\n";
        for (let i = 0; i < conversationHistory.length; i++) {
          const prefix = i % 2 === 0 ? "Utilisateur: " : "Assistant: ";
          prompt += `${prefix}${conversationHistory[i]}\n`;
        }
        prompt += "\nNouveau message de l'utilisateur: " + userMessage;
      } else {
        prompt = userMessage;
      }
      
      // Instructions pour le comportement du chatbot
      const instructions = `
Tu es un assistant virtuel pour KORTEXA, une entreprise spécialisée dans l'intelligence artificielle et le développement web.
Réponds de manière concise, professionnelle et utile aux questions des utilisateurs.
Utilise un ton amical mais professionnel. Limite tes réponses à 2-3 phrases sauf si une explication détaillée est nécessaire.
Si tu ne connais pas la réponse, suggère de contacter directement l'équipe KORTEXA.
Réponds toujours en français.
      `;
      
      const fullPrompt = instructions + "\n\n" + prompt;
      
      const response = await this.generateContent({
        prompt: fullPrompt,
        maxTokens: 300, // Réponses plus courtes pour un chatbot
        temperature: 0.8 // Légèrement plus créatif
      });
      
      return response.text;
    } catch (error) {
      console.error('Erreur lors de la génération de réponse pour le chatbot:', error);
      throw error;
    }
  }
}

/**
 * Crée une instance du client Gemini avec la clé API fournie
 * @param apiKey Clé API Gemini
 * @returns Instance du client Gemini
 */
export function createGeminiClient(apiKey: string): GeminiClient {
  return new GeminiClient({ apiKey });
} 