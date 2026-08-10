import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  clipRevealMode?: 'center' | 'left' | 'polygon' | 'circle' | 'none';
  onError?: React.ReactEventHandler<HTMLImageElement>;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  clipRevealMode = 'center',
  onError,
  onLoad,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onError) {
      onError(e);
    }
  };

  const getClipClass = () => {
    if (clipRevealMode === 'none') return '';
    const baseModeClass = `clip-reveal-${clipRevealMode}`;
    const loadedClass = isLoaded ? 'clip-loaded' : '';
    return `${baseModeClass} ${loadedClass}`;
  };

  return (
    <div className={`relative overflow-hidden clip-reveal-container ${containerClassName}`}>
      {/* Skeleton Background Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#0B2545]/80 animate-pulse z-10" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${getClipClass()} transition-all duration-500 ease-out ${
          isLoaded 
            ? 'blur-0 opacity-100' 
            : 'blur-sm opacity-40'
        } ${className}`}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}
