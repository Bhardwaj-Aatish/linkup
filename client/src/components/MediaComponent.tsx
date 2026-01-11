import Image from 'next/image';
import { useState } from 'react';
import {ChevronLeft, ChevronRight } from '@mui/icons-material';

type MediaItem = {
    url: string;
    type: 'image' | 'video';
  };
  
  type MediaComponent = {
    media: MediaItem[];
    height?: number; // optional for reuse
  };

const MediaComponent = ({ media, height = 400 }: MediaComponent) => {
  const [index, setIndex] = useState(0);

  if (!media?.length) return null;

  const item = media[index];
  const hasPrev = index > 0;
  const hasNext = index < media.length - 1;

  return (
    <div
      className="relative w-full mt-2 rounded-lg overflow-hidden flex"
      style={{ height }}
    >
      {item.type === 'video' ? (
        <video
          src={item.url}
          controls
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={item.url}
          className="object-scale-down border-border border-2 rounded-lg"
          alt="post media"
          sizes="(max-width: 800px) 100vw, 800px"
        />
      )}

      {hasPrev && (
        <button
          onClick={() => setIndex(i => i - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft fontSize='medium'/>
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => setIndex(i => i + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
        >
          <ChevronRight fontSize='medium'/>
        </button>
      )}
    </div>
  );
}


export default MediaComponent;