'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import i18next from 'i18next';

/**
 * Composant de débogage pour le système de traduction
 * Affiche les informations sur l'état des traductions et des clés
 */
const LanguageDebug = () => {
  const { language, ready, t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [translationKey, setTranslationKey] = useState('homepage.tabFeature.mainTitle');
  const [translationResult, setTranslationResult] = useState('');
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const [resourcesData, setResourcesData] = useState<any>(null);
  
  // N'afficher qu'en développement
  const isDev = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    if (!isDev) return;
    
    // Ajouter un raccourci clavier pour afficher/masquer
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDev]);
  
  // Test de traduction et informations sur i18next
  useEffect(() => {
    if (!isVisible) return;
    
    try {
      // Obtenir le résultat de la traduction
      const result = t(translationKey);
      setTranslationResult(typeof result === 'string' ? result : JSON.stringify(result));
      
      // Vérifier si les resources sont chargées
      if (i18next.isInitialized) {
        setResourcesLoaded(true);
        
        // Récupérer les données de ressources pour le débogage
        const resources = i18next.getDataByLanguage(language);
        setResourcesData(resources);
        
        if (!resources) {
          // Si aucune ressource n'est disponible, essayer de recharger
          i18next.reloadResources()
            .then(() => {
              console.log('Traductions rechargées avec succès');
              const updatedResources = i18next.getDataByLanguage(language);
              setResourcesData(updatedResources);
            })
            .catch(err => console.error('Erreur lors du rechargement des traductions:', err));
        }
      } else {
        setResourcesLoaded(false);
      }
    } catch (e) {
      setTranslationResult(`Error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }, [isVisible, translationKey, t, language]);
  
  // Fonction pour forcer le rechargement des traductions
  const reloadTranslations = () => {
    i18next.reloadResources()
      .then(() => {
        console.log('Traductions rechargées avec succès');
        const updatedResources = i18next.getDataByLanguage(language);
        setResourcesData(updatedResources);
        
        // Tester à nouveau la traduction
        const result = t(translationKey);
        setTranslationResult(typeof result === 'string' ? result : JSON.stringify(result));
      })
      .catch(err => console.error('Erreur lors du rechargement des traductions:', err));
  };
  
  // Vérifier si une clé de traduction existe
  const checkTranslationExists = (key: string): string => {
    if (!resourcesData || !resourcesData.common) return 'Non disponible';
    
    // Séparer la clé par les points et naviguer dans l'objet
    const keyParts = key.split('.');
    let current = resourcesData.common;
    
    for (const part of keyParts) {
      if (!current[part]) {
        return 'Clé non trouvée';
      }
      current = current[part];
    }
    
    return typeof current === 'string' 
      ? `✓ Valeur: "${current}"`
      : '✓ Objet (contient des sous-clés)';
  };
  
  if (!isDev || !isVisible) return null;
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 max-h-80 overflow-auto"
      style={{ 
        fontSize: '12px',
        fontFamily: 'monospace'
      }}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">I18n Debug (Ctrl+Shift+D pour fermer)</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-red-500 px-2 rounded"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2">
            <div><strong>Language:</strong> {language}</div>
            <div><strong>Ready:</strong> {String(ready)}</div>
            <div><strong>Initialized:</strong> {String(i18next.isInitialized)}</div>
            <div><strong>Resources Loaded:</strong> {String(resourcesLoaded)}</div>
            <div>
              <strong>Backend URL:</strong> {
                (i18next.options.backend as any)?.loadPath || 'Non défini'
              }
            </div>
            
            <button 
              onClick={reloadTranslations}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
            >
              Recharger les traductions
            </button>
          </div>
          
          <div className="mb-2">
            <label className="block mb-1">
              Test Translation Key:
              <input 
                value={translationKey}
                onChange={e => setTranslationKey(e.target.value)}
                className="ml-2 px-2 py-1 bg-gray-800 text-white rounded w-full"
              />
            </label>
            <div>
              <strong>Result:</strong> {translationResult}
            </div>
            <div>
              <strong>Exists:</strong> {checkTranslationExists(translationKey)}
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-2">
            <strong>Test Keys:</strong>
            <ul className="list-disc pl-4">
              <li className="cursor-pointer hover:text-blue-400" onClick={() => setTranslationKey('homepage.tabFeature.title')}>
                homepage.tabFeature.title - {checkTranslationExists('homepage.tabFeature.title')}
              </li>
              <li className="cursor-pointer hover:text-blue-400" onClick={() => setTranslationKey('homepage.tabFeature.mainTitle')}>
                homepage.tabFeature.mainTitle - {checkTranslationExists('homepage.tabFeature.mainTitle')}
              </li>
              <li className="cursor-pointer hover:text-blue-400" onClick={() => setTranslationKey('nav.home')}>
                nav.home - {checkTranslationExists('nav.home')}
              </li>
              <li className="cursor-pointer hover:text-blue-400" onClick={() => setTranslationKey('contact.title')}>
                contact.title - {checkTranslationExists('contact.title')}
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <strong>Ressources disponibles:</strong>
            <div className="max-h-20 overflow-auto mt-1 bg-gray-800 p-2 rounded">
              {resourcesLoaded ? 
                Object.keys(resourcesData?.common || {}).map(key => (
                  <div key={key} className="text-xs">
                    {key}: {typeof resourcesData.common[key] === 'object' ? '(objet)' : '✓'}
                  </div>
                ))
                : 
                <div className="text-red-400">Aucune ressource chargée</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageDebug; 