export type USPIconName = 'clinicians' | 'time' | 'support' | 'delivery';

type Props = { name: USPIconName; className?: string };

export function USPIcon({ name, className = 'h-6 w-6' }: Props) {
  switch (name) {
    case 'clinicians':
      return (
        <svg viewBox="0 0 25 25" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12.5 13a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M4.5 21.5a8 8 0 0116 0" />
          <path d="M18.5 7.5v3M17 9h3" />
        </svg>
      );
    case 'time':
      return (
        <svg viewBox="0 0 25 25" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12.5" cy="12.5" r="9" />
          <path d="M12.5 7v6l4 2.2" />
        </svg>
      );
    case 'support':
      return (
        <svg viewBox="0 0 25 25" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13a7.5 7.5 0 1115 0v4a2.5 2.5 0 01-2.5 2.5H16V13h3.5" />
          <path d="M5 13h3.5v6.5H7A2 2 0 015 17.5V13z" />
        </svg>
      );
    case 'delivery':
      return (
        <svg viewBox="0 0 25 25" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2.5 6.5h11v10h-11zM13.5 10h4l4 3v3.5h-8" />
          <circle cx="7.5" cy="18.5" r="2" />
          <circle cx="17" cy="18.5" r="2" />
        </svg>
      );
  }
}
