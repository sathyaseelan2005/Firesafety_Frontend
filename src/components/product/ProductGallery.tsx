import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const defaultImage = 'https://images.pexels.com/photos/1161682/pexels-photo-1161682.jpeg?auto=compress&cs=tinysrgb&w=800';

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const urls = images?.length ? images : [defaultImage];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col gap-2 mr-0 lg:mr-4 lg:order-2 lg:flex-row lg:flex-col">
        {urls.map((url, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`w-12 h-12 shrink-0 border rounded-md overflow-hidden bg-white transition-colors ${
              selectedIndex === idx
                ? 'border-theme-accent shadow-[0_0_0_1px] shadow-theme-accent'
                : 'border-theme-surface-hover hover:border-theme-text-muted'
            }`}
          >
            <img src={url} alt={`${alt} ${idx + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center p-4 bg-theme-surface rounded-lg border border-theme-surface-hover min-h-[300px] lg:min-h-[400px]">
        <img
          src={urls[selectedIndex]}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
    </div>
  );
}
