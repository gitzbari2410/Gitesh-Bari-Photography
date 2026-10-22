import { useState } from 'react';
import { Menu, X, Phone, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/whatsapp.ts';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, serviceSlug?: string) => void;
  brandName: string;
}

export function Navbar({ currentView, onNavigate, brandName }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'packages', label: 'Packages & Quotations' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const serviceCategories = [
    { slug: 'wedding', label: 'Wedding Photography' },
    { slug: 'cinematic-films', label: 'Cinematic Wedding Films' },
    { slug: 'pre-wedding', label: 'Pre-Wedding Photography' },
    { slug: 'engagement', label: 'Engagement Photography' },
    { slug: 'haldi-mehendi', label: 'Haldi & Mehendi Photography' },
    { slug: 'maternity-baby', label: 'Maternity & Baby Photography' },
    { slug: 'birthday-events', label: 'Birthday & Event Photography' },
  ];

  const handleLinkClick = (id: string, slug?: string) => {
    onNavigate(id, slug);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE2D8]">
      {/* Top Announcement Strip */}
      <div className="bg-[#801B2E] text-amber-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-between sm:justify-center gap-4">
        <span className="truncate">
          Now booking 2026–2027 Wedding Season · Palghar, Mumbai & Destination Shoots
        </span>
        <a
          href={`tel:${OFFICIAL_PHONE}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-amber-200 hover:text-white transition-colors ml-4 shrink-0 font-medium"
        >
          <Phone className="w-3 h-3 text-[#D4AF37]" />
          <span>{OFFICIAL_PHONE}</span>
        </a>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#801B2E] uppercase block group-hover:text-[#6B1728] transition-colors">
            {brandName}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#B38728] font-semibold block">
            Luxury Indian Wedding Photography
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.id}
                  className="relative group py-2"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleLinkClick('services')}
                    className={`flex items-center gap-1 transition-colors hover:text-[#801B2E] whitespace-nowrap cursor-pointer ${
                      currentView === 'services' || currentView === 'specialty'
                        ? 'text-[#801B2E] font-semibold'
                        : 'text-stone-700'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-[#FDFBF7] border border-[#EAE2D8] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#B38728] border-b border-stone-200/60 mb-1">
                        Specialized Coverage
                      </div>
                      <button
                        onClick={() => handleLinkClick('services')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#801B2E] hover:bg-[#F5EFEB] transition-colors block"
                      >
                        All Services Overview →
                      </button>
                      {serviceCategories.map((sub) => (
                        <button
                          key={sub.slug}
                          onClick={() => handleLinkClick('specialty', sub.slug)}
                          className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:text-[#801B2E] hover:bg-[#F5EFEB] transition-colors block truncate"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors hover:text-[#801B2E] whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#801B2E] font-semibold' : 'text-stone-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('book')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#801B2E] hover:bg-[#6B1728] active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer uppercase"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Book Your Date</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#801B2E] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#EAE2D8] px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === link.id ? 'text-[#801B2E] font-bold bg-[#F5EFEB]' : 'text-stone-700 hover:bg-[#F5EFEB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EAE2D8]">
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-[#B38728] mb-2">
              Photography Specialties
            </div>
            <div className="grid grid-cols-1 gap-1">
              {serviceCategories.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => handleLinkClick('specialty', sub.slug)}
                  className="text-left px-3 py-1.5 text-xs text-stone-600 hover:text-[#801B2E]"
                >
                  · {sub.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAE2D8] flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('book')}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-wider text-white bg-[#801B2E] hover:bg-[#6B1728] uppercase shadow"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Book Your Date Now
            </button>
            <button
              onClick={() => handleLinkClick('admin')}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-stone-600 hover:text-[#801B2E]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
