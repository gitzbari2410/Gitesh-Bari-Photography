import { useState } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_DIGITS, OFFICIAL_ADDRESS, createGeneralWhatsAppUrl } from '../utils/whatsapp.ts';

interface FooterProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
  brandName: string;
}

export function Footer({ onNavigate, brandName }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(OFFICIAL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Navapur Village Near Janata Highschool Boisar Palghar Maharashtra 401501'
  )}`;

  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800 pt-16 pb-12 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Studio Brand & Bio */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-amber-100 uppercase block">
              {brandName}
            </span>
            <p className="text-xs tracking-[0.18em] uppercase text-[#D4AF37] font-semibold">
              Fine Art Wedding & Cinematic Film Studio
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Crafting emotional, timeless heirloom photography across Palghar, Boisar, Mumbai, and destination
              venues. Rooted in authentic Maharashtrian heritage and cinematic elegance.
            </p>
            <div className="pt-2">
              <a
                href={createGeneralWhatsAppUrl('Hello Gitesh Bari Photography, I would like to enquire about your packages.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Explore Coverage
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'wedding')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Wedding Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'cinematic-films')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Cinematic Wedding Films
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'pre-wedding')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Pre-Wedding Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'haldi-mehendi')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Haldi & Mehendi Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'engagement')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Engagement Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'maternity-baby')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Maternity & Baby Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('specialty', 'birthday-events')}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Birthday & Event Photography
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Client Portal & Info
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-amber-200 transition-colors">
                  Portfolio Gallery & Exif
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-amber-200 transition-colors">
                  Packages & Quotations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book')} className="hover:text-amber-200 transition-colors font-medium text-amber-300">
                  Book a Session / Check Availability
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-200 transition-colors">
                  About Gitesh Bari & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-200 transition-colors">
                  Contact Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-amber-200 transition-colors">
                  Privacy Policy & Data Security
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Dashboard Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Studio Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-stone-300 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p>At-Post-Navapur, Tal-Dist-Palghar, Boisar (W),</p>
                <p>Navapur Village, Near Janata Highschool & Water Tank,</p>
                <p>PIN 401501, Maharashtra, India.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
              </button>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Google Maps</span>
              </a>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`tel:${OFFICIAL_PHONE}`} className="hover:text-white font-medium">
                  {OFFICIAL_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="mailto:gitzbari@gmail.com" className="hover:text-white">
                  gitzbari@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-stone-300">
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span>Navapur, Palghar, Maharashtra</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button onClick={() => onNavigate('admin')} className="text-amber-400/80 hover:text-amber-300">
              Admin Sign In
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
