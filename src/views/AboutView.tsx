import { Heart, Camera, Film, Award, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { OFFICIAL_PHONE, OFFICIAL_ADDRESS } from '../utils/whatsapp.ts';

interface AboutViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const { settings } = useAppStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Behind The Lens · Gitesh Bari Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          About Gitesh Bari Photography
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Rooted in the coastal beauty of Navapur village, Boisar (W), Palghar district, our studio preserves the
          timeless rituals, raw emotions, and celebratory energy of Indian weddings.
        </p>
      </div>

      {/* Main Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
            The Studio Story
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Documenting Generations of Sacred Bonds & Family Joy
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {settings.aboutStory}
          </p>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {settings.aboutPhilosophy}
          </p>
          <div className="p-4 bg-[#F5EFEB] rounded border border-[#EAE2D8] text-xs text-stone-700 space-y-1">
            <p className="font-bold text-stone-900">Gitesh Bari · Lead Photographer & Director</p>
            <p className="text-stone-500">
              Navapur Village, Near Janata Highschool & Water Tank, Boisar (W), Palghar.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-4/3 rounded-lg overflow-hidden shadow-2xl bg-stone-900">
          <img
            src="/src/assets/images/portfolio_bridal_portrait_1792655861428.jpg"
            alt="Artistic Bridal Portrait by Gitesh Bari"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider text-[10px] block">
              Editorial Craft
            </span>
            <p className="font-serif text-lg font-bold text-amber-100">
              Capturing Timeless Indian Bridal Emotion
            </p>
          </div>
        </div>
      </div>

      {/* Pillars of our Craft */}
      <div className="bg-[#FDFBF7] border border-[#EAE2D8] p-8 sm:p-14 rounded-lg space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
            Our Standard of Excellence
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#801B2E]">
            How We Document Your Wedding
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-3">
            <Camera className="w-6 h-6 text-[#801B2E]" />
            <h4 className="font-serif text-base font-bold text-stone-900">Cinema Optics & Color</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We shoot on dual-slot full-frame camera systems with fast f/1.2 and f/1.4 prime lenses, delivering
              creamy bokeh, natural skin tones, and rich shadow details.
            </p>
          </div>

          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-3">
            <Heart className="w-6 h-6 text-[#801B2E]" />
            <h4 className="font-serif text-base font-bold text-stone-900">Patience & Cultural Respect</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Indian weddings involve intricate sacred rituals. Our team stays patient, coordinates gracefully with
              pandits and elders, and never rushes religious moments.
            </p>
          </div>

          <div className="bg-white p-6 rounded border border-stone-200 shadow-xs space-y-3">
            <Award className="w-6 h-6 text-[#801B2E]" />
            <h4 className="font-serif text-base font-bold text-stone-900">Heirloom Handcrafted Albums</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every album is custom designed page-by-page. We use Canvera and archival printing presses with
              anti-scratch coatings and leatherette covers that withstand time.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Location & Invitation */}
      <div className="border border-stone-200 p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-serif text-xl font-bold text-stone-900">Meet Gitesh Bari at our Navapur Studio</h4>
          <p className="text-xs text-stone-600">
            Come browse our physical sample albums, discuss your dates, and have a cup of chai with our team.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Studio Directions & Maps
          </button>
          <button
            onClick={() => onNavigate('book')}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded"
          >
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
}
