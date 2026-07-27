import type { CSSProperties, ReactNode, SVGProps } from 'react';

export type AgroIconName =
  | 'brand'
  | 'home'
  | 'crops'
  | 'missions'
  | 'kinti'
  | 'sensor'
  | 'water'
  | 'temperature'
  | 'weather'
  | 'rain'
  | 'refresh'
  | 'arrow'
  | 'check'
  | 'level'
  | 'scan'
  | 'book'
  | 'lock'
  | 'send';

type AgroIconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: AgroIconName;
  size?: number;
};

const paths: Record<AgroIconName, ReactNode> = {
  brand: (
    <>
      <path d="M7 21V7" />
      <path d="M7 12c5.6 0 9-3 10-8-5.6 0-9 3-10 8Z" />
      <path d="M7 16c-2.8 0-4.4-1.5-5-4 2.8 0 4.4 1.5 5 4Z" />
      <path d="M4 21h6" />
    </>
  ),
  home: (
    <>
      <path d="M3 17.5C5.5 11 9 7.5 12 7.5s6.5 3.5 9 10" />
      <path d="M6 17.5h12" />
      <circle cx="12" cy="13.5" r="1.8" />
    </>
  ),
  crops: (
    <>
      <path d="M12 21V10" />
      <path d="M12 14C7.3 14 5 11.7 5 7c4.7 0 7 2.3 7 7Z" />
      <path d="M12 11c4.7 0 7-2.3 7-7-4.7 0-7 2.3-7 7Z" />
      <path d="M7 21h10" />
    </>
  ),
  missions: (
    <>
      <path d="M6 21V4" />
      <path d="M6 5h11l-2.5 4L17 13H6" />
      <path d="M3 21h7" />
    </>
  ),
  kinti: (
    <>
      <path d="M5 14c0-4.5 3-7 7-7 2.2 0 4.2.8 5.6 2.2L22 8" />
      <path d="M8 14 3 10l1 6 4 3c5 2 9-1 9-5" />
      <circle cx="14.5" cy="10" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  sensor: (
    <>
      <rect x="6" y="3" width="12" height="9" rx="1.5" />
      <path d="M9 12v9M15 12v9" />
      <path d="M9 7h6" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s6 6.1 6 11a6 6 0 0 1-12 0c0-4.9 6-11 6-11Z" />
      <path d="M9 15.5c.8 1 1.8 1.5 3 1.5" />
    </>
  ),
  temperature: (
    <>
      <path d="M10 14.2V5a2 2 0 1 1 4 0v9.2a4.5 4.5 0 1 1-4 0Z" />
      <path d="M12 9v7" />
    </>
  ),
  weather: (
    <>
      <path d="M8 6V3M3.8 7.8 2 6M5 12H2M12.2 7.8 14 6" />
      <path d="M6 16h11a4 4 0 0 0-.7-7.9A5.5 5.5 0 0 0 6 10a3 3 0 0 0 0 6Z" />
    </>
  ),
  rain: (
    <>
      <path d="M7 4s3 3.2 3 5.6a3 3 0 1 1-6 0C4 7.2 7 4 7 4ZM16 8s4 4.2 4 7.3a4 4 0 1 1-8 0C12 12.2 16 8 16 8Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M19 8a8 8 0 1 0 1 7" />
      <path d="M19 3v5h-5" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  check: <path d="m4 12 5 5L20 6" />,
  level: (
    <>
      <path d="M12 3 20 7v6c0 4.5-3.4 7.1-8 8-4.6-.9-8-3.5-8-8V7l8-4Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  scan: (
    <>
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5c3-1 5.7-.5 8 1.5v13c-2.3-2-5-2.5-8-1.5v-13ZM20 5.5c-3-1-5.7-.5-8 1.5v13c2.3-2 5-2.5 8-1.5v-13Z" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  send: (
    <>
      <path d="m3 4 18 8-18 8 4-8-4-8Z" />
      <path d="M7 12h14" />
    </>
  ),
};

export function AgroIcon({ name, size = 24, style, ...props }: AgroIconProps) {
  const mergedStyle: CSSProperties = { flex: '0 0 auto', ...style };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      style={mergedStyle}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
