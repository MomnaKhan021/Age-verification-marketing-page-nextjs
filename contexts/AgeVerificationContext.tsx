'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Status = 'unknown' | 'verified' | 'denied';

type ContextValue = {
  /** Hydrated value from storage. `true` once we have read localStorage. */
  ready: boolean;
  status: Status;
  verifiedAt: string | null;
  /**
   * Marks the user as verified and optionally redirects. Errors from
   * localStorage or navigation are caught so the UI never gets stuck.
   */
  verify: (redirectTo?: string) => void;
  deny: () => void;
  reset: () => void;
};

const STORAGE_KEY = 'jood:age-verification';
const Ctx = createContext<ContextValue | null>(null);

export function AgeVerificationProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('unknown');
  const [verifiedAt, setVerifiedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { status: Status; verifiedAt: string | null };
        if (parsed && (parsed.status === 'verified' || parsed.status === 'denied')) {
          setStatus(parsed.status);
          setVerifiedAt(parsed.verifiedAt ?? null);
        }
      }
    } catch (err) {
      console.warn('[age-verification] could not read localStorage:', err);
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Status) => {
    const ts = next === 'unknown' ? null : new Date().toISOString();
    setStatus(next);
    setVerifiedAt(ts);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: next, verifiedAt: ts }));
    } catch (err) {
      // Private mode / quota / disabled — state still lives in React memory.
      console.warn('[age-verification] could not write localStorage:', err);
    }
  }, []);

  const value = useMemo<ContextValue>(
    () => ({
      ready,
      status,
      verifiedAt,
      verify: (redirectTo?: string) => {
        persist('verified');
        if (!redirectTo || typeof window === 'undefined') return;
        try {
          window.location.assign(redirectTo);
        } catch (err) {
          // Some browsers throw if navigation is blocked (e.g. sandboxed iframes).
          console.error('[age-verification] redirect failed:', err);
          try {
            window.location.href = redirectTo;
          } catch (err2) {
            console.error('[age-verification] fallback navigation failed:', err2);
          }
        }
      },
      deny: () => persist('denied'),
      reset: () => persist('unknown'),
    }),
    [ready, status, verifiedAt, persist],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAgeVerification() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAgeVerification must be used within <AgeVerificationProvider>');
  return ctx;
}
