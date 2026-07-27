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
  | 'add'
  | 'send';

type AgroIconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: AgroIconName;
  size?: number;
};

const icons: Record<AgroIconName, ReactNode> = {
  brand: (
    <>
      <path fill="currentColor" stroke="none" d="M10.7 21H6.5V9.8h4.2V21Z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M8.6 12.2C9.2 6.9 12.5 3.8 19.3 3c-.5 6.1-4 9.2-10.7 9.2ZM8.5 16.8C4.2 16.7 2 14.6 2 10.7c4.4.2 6.5 2.2 6.5 6.1Z"
      />
      <path d="M3.5 21h11" />
    </>
  ),
  home: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        opacity=".22"
        d="M3 18.8C5.4 11.5 8.4 8 12 8s6.6 3.5 9 10.8H3Z"
      />
      <path d="M3 18.8C5.4 11.5 8.4 8 12 8s6.6 3.5 9 10.8M5.5 18.8h13" />
      <circle cx="12" cy="13.5" r="2.3" fill="currentColor" stroke="none" />
    </>
  ),
  crops: (
    <>
      <path d="M12 21V9" />
      <path
        fill="currentColor"
        stroke="none"
        opacity=".28"
        d="M11.7 15C6.8 15 4.2 12.4 4.2 7.5c4.9 0 7.5 2.6 7.5 7.5ZM12.3 11.7c0-5 2.5-7.5 7.5-7.5 0 4.9-2.6 7.5-7.5 7.5Z"
      />
      <path d="M11.7 15C6.8 15 4.2 12.4 4.2 7.5c4.9 0 7.5 2.6 7.5 7.5ZM12.3 11.7c0-5 2.5-7.5 7.5-7.5 0 4.9-2.6 7.5-7.5 7.5ZM7 21h10" />
    </>
  ),
  missions: (
    <>
      <path fill="currentColor" stroke="none" opacity=".25" d="M7 4h11l-2.4 4L18 12H7V4Z" />
      <path d="M6 21V3.5M6 4h12l-2.4 4L18 12H6M3.5 21h7" />
    </>
  ),
  kinti: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        opacity=".24"
        d="M4.6 14c.5-4.7 3.5-7.4 7.8-7.4 2.2 0 4 .7 5.4 2l4.2-.9-3.8 2.5c.3 4.5-2.3 8.2-6.6 8.8-2 .3-3.8-.2-5.2-1.3L3 19l1.8-4.2L2 10.4 4.6 14Z"
      />
      <path d="M4.6 14c.5-4.7 3.5-7.4 7.8-7.4 2.2 0 4 .7 5.4 2l4.2-.9-3.8 2.5c.3 4.5-2.3 8.2-6.6 8.8-2 .3-3.8-.2-5.2-1.3L3 19l1.8-4.2L2 10.4 4.6 14Z" />
      <circle cx="14.5" cy="9.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  sensor: (
    <>
      <rect x="5" y="3" width="14" height="10" rx="2" fill="currentColor" stroke="none" />
      <path d="M8.5 13v8M15.5 13v8" />
      <path d="M8.5 7h7" stroke="var(--icon-cut, currentColor)" opacity=".55" />
    </>
  ),
  water: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2.5S5.5 9.2 5.5 14.4a6.5 6.5 0 0 0 13 0C18.5 9.2 12 2.5 12 2.5Z"
      />
      <path d="M9.1 15.2c.5 1.4 1.5 2.1 3 2.1" stroke="var(--icon-cut, #0d1f16)" />
    </>
  ),
  temperature: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        opacity=".26"
        d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Z"
      />
      <path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0ZM12 8v8" />
      <circle cx="12" cy="17" r="2.2" fill="currentColor" stroke="none" />
    </>
  ),
  weather: (
    <>
      <circle cx="8" cy="8" r="4" fill="currentColor" stroke="none" opacity=".3" />
      <path d="M8 1.5v2M1.5 8h2M3.4 3.4l1.4 1.4" />
      <path
        fill="currentColor"
        stroke="none"
        d="M6.2 19h11a4.1 4.1 0 0 0 .1-8.2 5.5 5.5 0 0 0-10.6 1.5A3.4 3.4 0 0 0 6.2 19Z"
      />
    </>
  ),
  rain: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        opacity=".24"
        d="M5.8 14.5h11.7a4 4 0 0 0 .1-8A5.7 5.7 0 0 0 6.5 8a3.3 3.3 0 0 0-.7 6.5Z"
      />
      <path d="M5.8 14.5h11.7a4 4 0 0 0 .1-8A5.7 5.7 0 0 0 6.5 8a3.3 3.3 0 0 0-.7 6.5Z" />
      <path d="m8 17-1 3M13 17l-1 3M18 17l-1 3" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5" />
      <path d="M18.6 12A7.4 7.4 0 1 1 17 6.2L20 9" />
    </>
  ),
  arrow: <path d="M4 12h15M14 7l5 5-5 5" />,
  check: <path d="m4 12.5 4.7 4.7L20 6" />,
  level: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        opacity=".25"
        d="m12 2.5 8 4.1v6.1c0 4.7-3.3 7.6-8 8.8-4.7-1.2-8-4.1-8-8.8V6.6l8-4.1Z"
      />
      <path d="m12 2.5 8 4.1v6.1c0 4.7-3.3 7.6-8 8.8-4.7-1.2-8-4.1-8-8.8V6.6l8-4.1Z" />
      <path d="m8.3 12.2 2.4 2.4 5-5" />
    </>
  ),
  scan: (
    <>
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" opacity=".25" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  book: (
    <>
      <path fill="currentColor" stroke="none" opacity=".24" d="M3 4.8c3.8-1.1 6.8-.3 9 2.1v13.6c-2.2-2.4-5.2-3.2-9-2.1V4.8ZM21 4.8c-3.8-1.1-6.8-.3-9 2.1v13.6c2.2-2.4 5.2-3.2 9-2.1V4.8Z" />
      <path d="M3 4.8c3.8-1.1 6.8-.3 9 2.1v13.6c-2.2-2.4-5.2-3.2-9-2.1V4.8ZM21 4.8c-3.8-1.1-6.8-.3-9 2.1v13.6c2.2-2.4 5.2-3.2 9-2.1V4.8Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="11" rx="2" fill="currentColor" stroke="none" opacity=".28" />
      <rect x="4.5" y="10" width="15" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
  add: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" stroke="none" opacity=".22" />
      <path d="M12 7v10M7 12h10" />
    </>
  ),
  send: (
    <>
      <path fill="currentColor" stroke="none" d="m2.5 3.5 19 8.5-19 8.5L6.8 12 2.5 3.5Z" />
      <path d="M6.8 12h14.7" stroke="var(--icon-cut, #0d1f16)" />
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={mergedStyle}
      {...props}
    >
      {icons[name]}
    </svg>
  );
}
