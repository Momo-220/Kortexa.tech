declare module 'framer-motion';
declare module '@headlessui/react';

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// Déclaration React vide pour éviter les erreurs avec JSX
declare namespace React {
  interface HTMLAttributes<T> {
    className?: string;
  }
} 