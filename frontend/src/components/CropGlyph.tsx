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
          <circle cx="12" cy="13" r="6.5" />
          <path d="m12 6-1.5 3-3-1 2.2 2-2.2 2.2 4.5-1 4.5 1-2.2-2.2 2.2-2-3 1L12 6Z" />
        </>
      );
    case 'lechuga':
      return (
        <>
          <path d="M12 20c-5 0-8-3.3-8-8 0-4 3-7 6-8-.2 2 1 3 2 4 1-1 2.2-2 2-4 3 1 6 4 6 8 0 4.7-3 8-8 8Z" />
          <path d="M12 8v12M8 10l4 4 4-4" />
        </>
      );
    case 'albahaca':
      return (
        <>
          <path d="M5 18C5 9 10 4 19 4c0 9-5 14-14 14Z" />
          <path d="M5 18 16 7M10 13l-1-4M13 10l4 1" />
        </>
      );
    case 'pepino':
      return (
        <>
          <path d="M7 18c-3-3-2-8 2-12s9-5 12-2 2 8-2 12-9 5-12 2Z" />
          <circle cx="11" cy="14" r=".7" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r=".7" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
        </>
      );
    case 'pimiento':
      return (
        <>
          <path d="M9 7c-4 0-6 3-5 7 .8 3.4 3.4 6 8 6s7.2-2.6 8-6c1-4-1-7-5-7-1.2 0-2.2.4-3 1-1-.6-1.8-1-3-1Z" />
          <path d="M12 8c0-3 1.2-4.5 4-5M12 8v12" />
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
      strokeWidth="1.65"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <CropShape cropId={cropId} />
    </svg>
  );
}
