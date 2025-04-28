import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handleTimeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handleTimeout);
  }, [value, delay]);

  return debounced;
}
