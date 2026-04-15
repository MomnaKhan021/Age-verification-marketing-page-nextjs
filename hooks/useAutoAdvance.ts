'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  total: number;
  intervalMs?: number;
  paused?: boolean;
};

export function useAutoAdvance({ total, intervalMs = 5000, paused = false }: Options) {
  const [index, setIndex] = useState(0);
  const totalRef = useRef(total);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % totalRef.current);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, total, intervalMs]);

  return {
    index,
    setIndex,
    next: () => setIndex((i) => (i + 1) % total),
    prev: () => setIndex((i) => (i - 1 + total) % total),
  };
}
