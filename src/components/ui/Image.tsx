'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { cn } from '@/utils/cn';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  onLoad?: () => void;
}

export default function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  fill = false,
  onLoad,
  ...props
}: ImageProps & React.ComponentPropsWithoutRef<typeof NextImage>) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className={cn('overflow-hidden relative', className)}>
      <NextImage
        src={src}
        alt={alt || ''}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn(
          'transition-all duration-300',
          isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0',
          className
        )}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fill={fill}
        onLoad={handleLoad}
        {...props}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-900/20 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
} 