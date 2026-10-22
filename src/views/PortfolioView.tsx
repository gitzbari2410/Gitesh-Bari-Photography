import { useState } from 'react';
import { Camera, MapPin, Tag, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { Lightbox } from '../components/Lightbox.tsx';
import { PortfolioCategory } from '../types/index.ts';

interface PortfolioViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function PortfolioView({ onNavigate }: PortfolioViewProps) {
  const { portfolio } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: { key: PortfolioCategory; label: string }[] = [
    { key: 'all', label: 'All Works' },
    { key: 'weddings', label: 'Weddings' },
    { key: 'candid', label: 'Candid' },
    { key: 'traditional', label: 'Traditional' },
    { key: 'pre-wedding', label: 'Pre-Wedding' },
    { key: 'haldi', label: 'Haldi' },
    { key: 'mehendi', label: 'Mehendi' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'maternity', label: 'Maternity' },
    { key: 'baby', label: 'Baby' },
    { key: 'birthday-events', label: 'Events' },
    { key: 'cinematic-films', label: 'Cinematic Films' },
  ];

  const filteredItems = activeCategory === 'all'
    ? portfolio
    : portfolio.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Visual Archives · Gitesh Bari Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          The Portfolio Gallery
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          An editorial archive of intimate wedding vows, sacred Maharashtrian rituals, coastal pre-weddings, and
          golden candid moments. Click any photograph to inspect camera metadata (EXIF) and view in high resolution.
        </p>
      </div>

      {/* Filter Tabs (Interactive buttons allowed as per frontend-design skill) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-stone-400 mr-2 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer rounded ${
                isActive
                  ? 'bg-[#801B2E] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
          <Camera className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-700">No photographs in this category yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You can upload photographs to this category anytime using the Admin Dashboard.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-[#801B2E] hover:underline"
          >
            Show All Photographs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group bg-white border border-[#EAE2D8] rounded-lg overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-200 px-2 py-0.5 rounded backdrop-blur-xs">
                    {item.category.replace('-', ' ')}
                  </span>
                  {item.isSample && (
                    <span className="text-[10px] bg-amber-950/80 text-amber-200 border border-amber-500/40 px-2 py-0.5 rounded">
                      Demo Sample
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="p-4 bg-white space-y-2 border-t border-stone-100">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {item.exif && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-mono text-stone-600">{item.exif.camera}</span>
                    <span>{item.exif.settings}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-[#F5EFEB] border border-[#EAE2D8] p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-bold text-[#801B2E]">
            Envisioning Your Big Day In Our Frames?
          </h3>
          <p className="text-xs text-stone-600">
            Check date availability for Palghar, Mumbai, or destination ceremonies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('book')}
            className="px-5 py-2.5 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase tracking-wider rounded shadow-xs"
          >
            Check Studio Availability
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="px-4 py-2.5 bg-white border border-stone-300 text-stone-700 text-xs font-medium rounded hover:bg-stone-50"
          >
            Manage Photos (Admin)
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
}
