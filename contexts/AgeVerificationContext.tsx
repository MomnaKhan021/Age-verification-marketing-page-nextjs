'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Status = 'unknown' | 'verified' | 'denied';

type ContextValue = {
  status: Status;
  verifiedAt: string | null;
  verify: () => void;
  deny: () => void;
  reset: () => void;
};

const STORAGE_KEY = 'jood:age-verification';
const Ctx = createContext<ContextValue | null>(null);

export function AgeVerificationProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('unknown');
  const [verifiedAt, setVerifiedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { status: Status; verifiedAt: string | null };
      setStatus(parsed.status);
      setVerifiedAt(parsed.verifiedAt);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const persist = useCallback((next: Status) => {
    const ts = next === 'unknown' ? null : new Date().toISOString();
    setStatus(next);
    setVerifiedAt(ts);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: next, verifiedAt: ts }));
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<ContextValue>(
    () => ({
      status,
      verifiedAt,
      verify: () => persist('verified'),
      deny: () => persist('denied'),
      reset: () => persist('unknown'),
    }),
    [status, verifiedAt, persist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAgeVerification() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAgeVerification must be used within <AgeVerificationProvider>');
  return ctx;
}
