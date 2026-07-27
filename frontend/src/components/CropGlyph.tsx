import type { CSSProperties } from 'react';

import { getCropProfile } from '../data/crops';
import type { CropId } from '../types';

type CropGlyphProps = {
  cropId: CropId;
  size?: number;
  className?: string;
};

function CropShape({ cropId }: { cropId: CropId }) {
  switch (cropId) {
    case 'tomate':
      return (
        <>
          <circle cx="12" cy="13.2" r="7.1" fill="currentColor" stroke="none" opacity=".24" />
          <circle cx="12" cy="13.2" r="6.3" />
          <path fill="currentColor" stroke="none" d="m12 4.2 1.5 4 4.1-1.3-2.7 3.2 3.3 2-4.4-.6-1.8 3.8-1.8-3.8-4.4.6 3.3-2-2.7-3.2 4.1 1.3 1.5-4Z" />
        </>
      );
    case 'lechuga':
      return (
        <>
          <path fill="currentColor" stroke="none" opacity=".24" d="M12 21C6.4 21 3 17.5 3 12.3 3 7.7 6.4 4 10.1 3c-.2 2.5.7 4 1.9 5.1C13.2 7 14.1 5.5 13.9 3 17.6 4 21 7.7 21 12.3c0 5.2-3.4 8.7-9 8.7Z" />
          <path d="M12 20.5V8M12 15 7.5 10.5M12 15l4.5-4.5" />
          <path d="M12 21C6.4 21 3 17.5 3 12.3 3 7.7 6.4 4 10.1 3c-.2 2.5.7 4 1.9 5.1C13.2 7 14.1 5.5 13.9 3 17.6 4 21 7.7 21 12.3c0 5.2-3.4 8.7-9 8.7Z" />
        </>
      );
    case 'albahaca':
      return (
        <>
          <path fill="currentColor" stroke="none" opacity=".26" d="M3.5 19.8C3.8 9.5 9.2 4 20.5 3.5 20.2 14 14.7 19.5 3.5 19.8Z" />
          <path d="M4 20 17.5 6.5M9.3 14.7 8 9.5M13 11l5.3 1.2M3.5 19.8C3.8 9.5 9.2 4 20.5 3.5 20.2 14 14.7 19.5 3.5 19.8Z" />
        </>
      );
    case 'pepino':
      return (
        <>
          <path fill="currentColor" stroke="none" opacity=".26" d="M5.6 19.3C2.2 15.8 3.4 9.2 8.4 4.7s10.2-4.2 12.4-1.2c2.5 3.4.5 9.4-4.4 13.8-4.8 4.3-8.2 4.6-10.8 2Z" />
          <path d="M5.6 19.3C2.2 15.8 3.4 9.2 8.4 4.7s10.2-4.2 12.4-1.2c2.5 3.4.5 9.4-4.4 13.8-4.8 4.3-8.2 4.6-10.8 2Z" />
          <circle cx="9" cy="15.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="13.5" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="17.2" cy="6.7" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case 'pimiento':
      return (
        <>
          <path fill="currentColor" stroke="none" opacity=".25" d="M8.3 6.6C4 6.6 1.8 10 3 14.7 4 18.5 7.2 21 12 21s8-2.5 9-6.3c1.2-4.7-1-8.1-5.3-8.1-1.5 0-2.7.5-3.7 1.4-1-.9-2.2-1.4-3.7-1.4Z" />
          <path d="M8.3 6.6C4 6.6 1.8 10 3 14.7 4 18.5 7.2 21 12 21s8-2.5 9-6.3c1.2-4.7-1-8.1-5.3-8.1-1.5 0-2.7.5-3.7 1.4-1-.9-2.2-1.4-3.7-1.4ZM12 8v13M12 8c0-3 1.4-4.7 4.2-5" />
        </>
      );
  }
}

export function CropGlyph({ cropId, size = 24, className }: CropGlyphProps) {
  const crop = getCropProfile(cropId);
  const style: CSSProperties = { color: crop.accent };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <CropShape cropId={cropId} />
    </svg>
  );
}
