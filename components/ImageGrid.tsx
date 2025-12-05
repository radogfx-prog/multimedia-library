import React from 'react';
import { MediaItem } from '../types';

interface ImageGridProps {
  items: MediaItem[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ items }) => {
  return (
    <main className="px-6 lg:px-container pb-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-card">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 group cursor-pointer">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-sm bg-brand-gray950 w-full">
               {/* Aspect Ratio Handling */}
              <div className={`w-full relative ${
                item.aspectRatio === '1:1' ? 'aspect-square' :
                item.aspectRatio === '16:9' ? 'aspect-video' :
                item.aspectRatio === '4:3' ? 'aspect-[4/3]' :
                'aspect-[9/16]' /* Portrait */
              }`}>
                <img 
                  src={item.src} 
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-3 text-brand-gray600 text-xs">
                <div className="w-[1px] h-3 bg-brand-gray800"></div>
                <p>Użyte w: <span className="text-brand-gray600">{item.usageInfo}</span></p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};