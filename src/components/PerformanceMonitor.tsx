'use client';

import { useEffect } from 'react';

type MetricName = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB' | 'INP';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Interfaces pour les types de performance non standards
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/**
 * Composant qui surveille les métriques Web Vitals en mode développement uniquement
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // N'exécuter qu'en développement pour alléger la production
    if (process.env.NODE_ENV !== 'development') return;
    
    // Ne s'exécute que côté client
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // Seuils pour les métriques Web Vitals
    const thresholds = {
      CLS: [0.1, 0.25],
      FID: [100, 300],
      LCP: [2500, 4000],
      FCP: [1800, 3000],
      TTFB: [800, 1800],
      INP: [200, 500]
    };

    // Détermine la notation de la métrique
    const getRating = (name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const [good, poor] = thresholds[name];
      if (value <= good) return 'good';
      if (value <= poor) return 'needs-improvement';
      return 'poor';
    };

    // Fonction pour enregistrer la métrique
    const reportMetric = (metric: PerformanceMetric) => {
        const color = 
          metric.rating === 'good' ? 'color: green' : 
          metric.rating === 'needs-improvement' ? 'color: orange' : 
          'color: red';
        
        console.log(
          `%c${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`, 
          color
        );
    };

    // Observer factory pour simplifier le code
    const createObserver = (type: string, metricName: MetricName, valueExtractor: (entry: any) => number) => {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
          
          // Pour CLS, nous avons besoin d'accumuler les valeurs
          if (metricName === 'CLS') {
      let clsValue = 0;
        entries.forEach((entry) => {
          const clsEntry = entry as unknown as LayoutShift;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
              }
            });
            
            if (clsValue > 0) {
              reportMetric({
                name: metricName,
              value: clsValue,
                rating: getRating(metricName, clsValue)
              });
            }
            return;
          }
          
          // Pour les autres métriques, utiliser la dernière entrée ou toutes si nécessaire
          if (metricName === 'LCP' || metricName === 'FCP') {
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              const value = valueExtractor(lastEntry);
              reportMetric({
                name: metricName,
                value,
                rating: getRating(metricName, value)
              });
            }
          } else {
            // Pour FID, INP
        entries.forEach((entry) => {
              const value = valueExtractor(entry);
              reportMetric({
                name: metricName,
                value,
                rating: getRating(metricName, value)
              });
        });
          }
        }).observe({ type, buffered: true } as PerformanceObserverInit);
    } catch (e) {
        console.error(`${metricName} monitoring error:`, e);
    }
    };

    // Créer les observateurs pour chaque métrique
    createObserver('largest-contentful-paint', 'LCP', (entry) => entry.startTime);
    createObserver('first-input', 'FID', (entry) => entry.processingStart - entry.startTime);
    createObserver('layout-shift', 'CLS', (entry) => entry.value);
    createObserver('paint', 'FCP', (entry) => entry.startTime);

    // TTFB (version simplifiée)
    try {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const ttfb = (navigationEntries[0] as PerformanceNavigationTiming).responseStart;
        reportMetric({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb)
        });
      }
    } catch (e) {
      console.error('TTFB monitoring error:', e);
    }
  }, []);

  return null;
} 