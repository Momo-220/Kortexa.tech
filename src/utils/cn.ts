import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et optimise les classes CSS avec Tailwind
 * Utilise clsx pour combiner les classes conditionnelles et twMerge pour résoudre les conflits Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 