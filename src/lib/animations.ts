
import { useEffect, useRef, useState } from 'react';

export function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!options.triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return [ref, isInView] as const;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const currentProgress = totalHeight > 0 ? scrollPosition / totalHeight : 0;
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return progress;
}

export function usePageTransition() {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  const startTransition = () => {
    setIsPageTransitioning(true);
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 300); // Duration of transition
    });
  };
  
  const endTransition = () => {
    setIsPageTransitioning(false);
  };
  
  return {
    isPageTransitioning,
    startTransition,
    endTransition
  };
}
