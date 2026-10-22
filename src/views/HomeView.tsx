import { useState } from 'react';
import { ArrowRight, Calendar, Camera, Heart, Film, Award, MapPin, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { Lightbox } from '../components/Lightbox.tsx';
import { PortfolioItem } from '../types/index.ts';
import { OFFICIAL_PHONE, createGeneralWhatsAppUrl } from '../utils/whatsapp.ts';

interface HomeViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const { settings, portfolio, services, testimonials } = useAppStore();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredPortfolio = portfolio.filter((p) => p.featuredOnHome);
  const displayPortfolio = featuredPortfolio.length > 0 ? featuredPortfolio : portfolio.slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section: 2-Column Balanced Split as recommended by frontend-design skill */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 border-b border-[#EAE2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
                  Fine Art Indian Wedding & Cinematic Studio
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl/tight font-bold text-[#801B2E] tracking-tight text-balance">
                  {settings.heroHeadline}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                {settings.heroSubheading}. Preserving raw emotions, sacred Maharashtrian wedding traditions, and
                cinematic celebrations across Palghar, Mumbai, and destination venues worldwide.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#801B2E] hover:bg-[#6B1728] active:scale-95 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Your Date</span>
                </button>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#EAE2D8] hover:border-[#801B2E] hover:bg-[#F5EFEB] text-stone-800 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-[#801B2E]" />
                </button>
              </div>

              {/* Unboxed Metadata Trust Bar (Zero-pill discipline) */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="font-medium text-stone-700">Boisar & Palghar Studio</span>
                <span aria-hidden="true">·</span>
                <span>Canvera Signature Albums</span>
                <span aria-hidden="true">·</span>
                <span>4K Cinema & Drone</span>
                <span aria-hidden="true">·</span>
                <span>Fast 48h Sneak Peeks</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Container at Matching Height */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] rounded-lg overflow-hidden shadow-2xl group">
              <img
                src={settings.heroImages[0] || '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg'}
                alt="Luxury Indian Wedding Photography by Gitesh Bari"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                  Featured Celebration
                </span>
                <p className="font-serif text-lg font-bold text-amber-100">
                  The Sacred Vows & Royal Mandap Ceremony
                </p>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Palghar, Maharashtra · Maharashtrian Wedding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Metrics Row Below Split (as required by frontend-design skill) */}
          <div className="mt-16 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="font-serif text-3xl font-bold text-[#801B2E] tabular-nums">400+</p>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Weddings Documented</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl font-bold text-[#801B2E] tabular-nums">100%</p>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Heirloom Handcrafted Albums</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl font-bold text-[#801B2E] tabular-nums">10+ Yrs</p>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Visual Storytelling Heritage</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl font-bold text-[#801B2E] tabular-nums">48 Hrs</p>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Social Sneak Peek Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFEB] border border-[#EAE2D8] p-8 sm:p-14 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
                The Gitesh Bari Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#801B2E]">
                Where Sacred Rituals Meet Cinematic Emotion
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {settings.aboutStory}
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {settings.aboutPhilosophy}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#801B2E] hover:text-[#6B1728]"
                >
                  <span>Learn more about our studio & approach</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white p-5 rounded border border-[#EAE2D8] shadow-xs space-y-2">
                <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#801B2E]" />
                  <span>Unobtrusive Candid Storytelling</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We don't disrupt the flow of rituals. We let families laugh, weep, and celebrate naturally while we
                  capture the quiet moments from respectful angles.
                </p>
              </div>

              <div className="bg-white p-5 rounded border border-[#EAE2D8] shadow-xs space-y-2">
                <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#801B2E]" />
                  <span>Color Graded Cinema & Sound Design</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our wedding films are tuned with authentic audio recordings of Vedic chants, live shehnai, and family
                  vows with film-grade 4K color grading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
              Curated Highlights
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#801B2E]">
              Featured Wedding Stories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#801B2E] hover:underline"
          >
            <span>View All Works & Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Bento Box Gallery as specified in frontend-design reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {displayPortfolio.map((item, index) => {
            const isWide = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-lg bg-stone-900 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isWide ? 'lg:col-span-8 min-h-[360px] sm:min-h-[420px]' : 'lg:col-span-4 min-h-[300px] sm:min-h-[420px]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {item.category.replace('-', ' ')}
                    </span>
                    {item.isSample && (
                      <span className="text-[10px] text-amber-200/70 border border-amber-300/30 px-1.5 py-0.5 rounded">
                        Sample Portfolio
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-50 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1">{item.description}</p>
                  {item.location && (
                    <p className="text-[11px] text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.location}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
            Crafted for Indian Celebrations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#801B2E]">
            Our Photography & Film Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From two-day grand wedding ceremonies to scenic pre-weddings, every package is tailored with transparent
            deliverables and handcrafted heirloom albums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#EAE2D8] rounded-lg overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#801B2E]/90 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {service.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#801B2E] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{service.photographersCount} Photographers · {service.cinematographersCount} Cinematographers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{service.coverageHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                    Starting From (Demo)
                  </span>
                  <span className="font-mono text-sm font-bold text-[#801B2E] tabular-nums">
                    ₹{service.demoPriceINR.toLocaleString('en-IN')}*
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('specialty', service.slug)}
                    className="text-xs font-semibold text-[#801B2E] hover:underline"
                  >
                    Details →
                  </button>
                  <button
                    onClick={() => onNavigate('book')}
                    className="px-3 py-1.5 bg-[#801B2E] hover:bg-[#6B1728] text-white text-[11px] font-semibold uppercase rounded"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FDFBF7] border border-[#801B2E] text-[#801B2E] hover:bg-[#801B2E] hover:text-white text-xs font-semibold uppercase tracking-wider rounded transition-all"
          >
            <span>Open Interactive Package & Quotation Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-[#EAE2D8] py-16">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
              The Studio Difference
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#801B2E]">
              Why Couples Choose Gitesh Bari Photography
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-white border border-[#EAE2D8] rounded-lg">
              <div className="w-10 h-10 rounded bg-[#F5EFEB] flex items-center justify-center text-[#801B2E]">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Maharashtrian Heritage Knowledge
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We intimately understand every ritual—from the Antarpat and Mangalashtak to the Kanyadaan and Saptapadi.
                Never a missed sacred moment.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-white border border-[#EAE2D8] rounded-lg">
              <div className="w-10 h-10 rounded bg-[#F5EFEB] flex items-center justify-center text-[#801B2E]">
                <Film className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                True Cinematic Color & 4K Master
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Shot on cinema-grade mirrorless cameras with premium prime lenses. We color-grade each film like a
                feature film, not an oversaturated clip.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-white border border-[#EAE2D8] rounded-lg">
              <div className="w-10 h-10 rounded bg-[#F5EFEB] flex items-center justify-center text-[#801B2E]">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Canvera Heirloom Print Guarantee
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Digital files can fade or be lost, but our handcrafted lay-flat photo albums are designed to last for
                generations with UV-resistant archival paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clean, Attributable, clearly labeled demo data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
            Love Stories & Memories
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#801B2E]">
            Kind Words From Our Couples
          </h2>
          <p className="text-xs text-stone-500">
            *Demo client feedback representations. Studio owner can manage and replace with verified Google reviews in Admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white border border-[#EAE2D8] p-8 rounded-lg shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-amber-500 text-lg">★★★★★</span>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{testi.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-serif font-bold text-stone-900 text-sm">{testi.clientNames}</h4>
                <div className="text-[11px] text-stone-500 space-x-1">
                  <span>{testi.eventType}</span>
                  <span>·</span>
                  <span>{testi.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#801B2E] text-white p-10 sm:p-16 rounded-xl shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4AF37] block">
              Dates Fill Quickly
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amber-50">
              Let's Document Your Wedding Heirloom Together
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              We take only a limited number of weddings each season to guarantee meticulous attention and bespoke
              editing. Check your dates today with Gitesh Bari.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={() => onNavigate('book')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#B38728] text-stone-900 text-xs font-bold uppercase tracking-wider rounded shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Wedding Date</span>
            </button>

            <a
              href={createGeneralWhatsAppUrl('Hello Gitesh Bari, I would like to check availability for our upcoming wedding.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded shadow-md transition-all"
            >
              <span>Instant WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox for featured images */}
      {lightboxIndex !== null && (
        <Lightbox
          items={displayPortfolio}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
}
