'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from './Image';
import { cn } from '@/utils/cn';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  threshold?: number;
  placeholderSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  fill = false,
  threshold = 0.1,
  placeholderSrc,
  ...props
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si l'image est prioritaire, on la charge immédiatement
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '200px', // Préchargement 200px avant que l'image soit visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={cn(
        'overflow-hidden relative',
        !isLoaded && !isVisible && 'bg-gray-900/10',
        className
      )}
      style={{
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
      }}
    >
      {(isVisible || priority) ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          sizes={sizes}
          quality={quality}
          fill={fill}
          onLoad={handleLoad}
          {...props}
        />
      ) : placeholderSrc ? (
        <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
          <img 
            src={placeholderSrc} 
            alt={alt} 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900/20 animate-pulse" />
      )}
    </div>
  );
} 