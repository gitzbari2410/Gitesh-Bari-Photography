import { Camera, Film, Clock, BookOpen, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { formatINR } from '../utils/quotation.ts';

interface ServicesViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function ServicesView({ onNavigate }: ServicesViewProps) {
  const { services } = useAppStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Wedding & Event Coverage Collections
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          Investment & Services
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Every celebration is unique. Our packages combine unobtrusive candid documentation, classical ritual
          coverage, 4K cinematic film highlights, and handcrafted heirloom Canvera albums.
        </p>

        <div className="bg-[#FDFBF7] border border-[#EAE2D8] p-3.5 rounded text-[11px] text-stone-600 max-w-xl">
          <strong className="text-stone-800">Demo Pricing Notice:</strong> Package rates shown are sample rates for
          initial demonstration. Final pricing depends on location, hours, and custom inclusions. Click “Request Custom
          Quotation” to build a tailored proposal.
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.slug}
            className="bg-white border border-[#EAE2D8] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-stone-900">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#801B2E] text-amber-100 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                {service.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-900">{service.title}</h2>
                    <p className="text-xs text-[#B38728] font-medium mt-0.5">{service.shortDesc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-stone-400 block font-medium">Demo Package Rate</span>
                    <span className="font-mono text-xl font-bold text-[#801B2E] tabular-nums">
                      {formatINR(service.demoPriceINR)}*
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FDFBF7] p-3.5 rounded border border-[#EAE2D8] text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Team</span>
                    <p className="font-semibold text-stone-800">
                      {service.photographersCount} Photo · {service.cinematographersCount} Film
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Coverage</span>
                    <p className="font-semibold text-stone-800">{service.coverageHours}</p>
                  </div>

                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Delivery</span>
                    <p className="font-semibold text-stone-800">{service.deliveryTimeline}</p>
                  </div>
                </div>

                {/* Deliverables List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Package Deliverables & Inclusions:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Album Specs */}
                {service.albumSpecs && (
                  <div className="flex items-start gap-2 text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded border border-amber-200/50">
                    <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span><strong>Album Specification:</strong> {service.albumSpecs}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate('specialty', service.slug)}
                  className="text-xs font-semibold text-[#801B2E] hover:underline flex items-center gap-1"
                >
                  <span>Explore Detailed Case Study & Tips</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('packages')}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                  >
                    Request Custom Quotation
                  </button>

                  <button
                    onClick={() => onNavigate('book')}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#801B2E] hover:bg-[#6B1728] rounded shadow-xs transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
