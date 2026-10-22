import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, MapPin, Tag } from 'lucide-react';
import { PortfolioItem } from '../types/index.ts';

interface LightboxProps {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!currentItem) return null;

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-150"
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between text-white/80 border-b border-white/10 pb-3 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {currentItem.category.replace('-', ' ')}
          </span>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span className="text-xs text-white/60">
            {currentIndex + 1} of {items.length}
          </span>
          {currentItem.isSample && (
            <span className="text-[11px] text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Demo Work Portfolio Sample
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image stage with navigation arrows */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          aria-label="Previous photograph"
          className="absolute left-2 sm:left-6 z-20 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all focus:outline-none"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Current Image */}
        <div className="max-h-full max-w-full flex flex-col items-center justify-center">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-h-[72vh] max-w-full object-contain rounded shadow-2xl transition-all duration-200"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          aria-label="Next photograph"
          className="absolute right-2 sm:right-6 z-20 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all focus:outline-none"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom information bar */}
      <div className="border-t border-white/10 pt-3 text-white max-w-5xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-amber-100">{currentItem.title}</h3>
          <p className="text-white/70 line-clamp-2">{currentItem.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-white/60 shrink-0 text-[11px]">
          {currentItem.location && (
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentItem.location}</span>
            </div>
          )}

          {currentItem.exif && (
            <div className="flex items-center gap-1.5 text-stone-300">
              <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {currentItem.exif.camera || 'Pro Cinema'} · {currentItem.exif.lens || 'Prime Lens'} · {currentItem.exif.settings || ''}
              </span>
            </div>
          )}

          {currentItem.tags && currentItem.tags.length > 0 && (
            <div className="hidden md:flex items-center gap-1 text-white/50">
              <Tag className="w-3 h-3" />
              <span>{currentItem.tags.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
