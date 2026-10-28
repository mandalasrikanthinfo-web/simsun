const P = {
  code: <><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /><path d="M14 4l-4 16" /></>,
  cloud: <><path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.5 4.3 4.3 0 0 0 7 18z" /></>,
  ai: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /><path d="M9.5 15l1.5-6 1.5 6M10 13.2h2M14.5 9v6" /></>,
  devices: <><rect x="2" y="4" width="14" height="10" rx="1.5" /><path d="M6 18h6M9 14v4" /><rect x="17" y="8" width="5" height="11" rx="1" /></>,
  megaphone: <><path d="M3 10v4h3l7 4V6L6 10H3z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" /></>,
  cap: <><path d="M2 9l10-5 10 5-10 5L2 9z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></>,
  building: <><rect x="4" y="3" width="11" height="18" rx="1" /><path d="M15 9h5v12h-5M8 7h3M8 11h3M8 15h3M9 21v-3h1v3" /></>,
  heart: <><path d="M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z" /><path d="M3.5 12h4l1.5-2.5 2.5 5 1.5-2.5h3" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
  rocket: <><path d="M12 3c4 2 6 6 5.5 11L15 16.5H9L6.5 14C6 9 8 5 12 3z" /><circle cx="12" cy="9.5" r="1.8" /><path d="M9 16.5L7 21l3-1.5M15 16.5l2 4.5-3-1.5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <><path d="M5 12.5l4.5 4.5L19 7.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  phone: <><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
}

export default function Icon({ name, size = 24, className = '', stroke = 1.7 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  )
}
