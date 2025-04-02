
import { useEffect, useState } from 'react';

// Animation that triggers when element comes into view
export const useAnimateOnScroll = (threshold = 0.1): [boolean, (node: any) => void] => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);
  
  return [isVisible, setRef];
};

// Staggered animation for multiple elements
export const useStaggeredAnimation = (itemCount: number, delay = 100): Array<{ className: string }> => {
  return Array.from({ length: itemCount }).map((_, i) => ({
    className: `animate-fade-in opacity-0 animate-delay-${(i * delay) % 500}`
  }));
};

// Delayed animation start
export const useDelayedAnimation = (delay = 300): { className: string } => {
  const delayClass = delay <= 500 ? `animate-delay-${delay}` : '';
  return {
    className: `animate-fade-in opacity-0 ${delayClass}`
  };
};
