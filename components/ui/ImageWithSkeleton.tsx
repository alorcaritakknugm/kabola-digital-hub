import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
  skeletonClassName?: string;
  children?: React.ReactNode;
}

export default function ImageWithSkeleton({
  wrapperClassName = "",
  skeletonClassName = "bg-slate-200 animate-pulse",
  className = "",
  alt,
  children,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName} ${!isLoaded ? skeletonClassName : 'bg-transparent'}`}>
      <Image
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
      {children}
    </div>
  );
}
