import { useEffect, useRef } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

interface Props {
  enabled: Boolean;
  onIntersect: Function;
  options?: IntersectionObserverEntry;
}

export const useIntersectionObserver = ({
  enabled,
  onIntersect,
  options,
}: Props) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    const mergedOptions = { ...defaultOptions, ...options };
    const observer = new IntersectionObserver((ent) => {
      if (ent[0].isIntersecting && enabled) onIntersect();
    }, mergedOptions);

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, enabled, onIntersect, options]);

  return ref;
};
