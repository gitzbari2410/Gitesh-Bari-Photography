import { useState } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Copy, Check, ExternalLink, Clock, Instagram, Youtube, Facebook, Send } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { OFFICIAL_PHONE, OFFICIAL_ADDRESS, OFFICIAL_PHONE_DIGITS, createGeneralWhatsAppUrl } from '../utils/whatsapp.ts';

export function ContactView() {
  const { settings, actions } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(settings.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Navapur Village Near Janata Highschool Boisar Palghar Maharashtra 401501'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    actions.addEnquiry({
      fullName: formName,
      phone: formPhone,
      eventType: 'General Studio Inquiry',
      eventDate: 'Not specified',
      eventLocation: 'Palghar / Boisar',
      additionalMessage: formMsg,
    });

    const msg = `Hello Gitesh Bari Photography,\n\nName: ${formName}\nPhone: ${formPhone}\nInquiry: ${formMsg || 'General query regarding photography services'}\n\nThank you.`;
    const url = `https://wa.me/${OFFICIAL_PHONE_DIGITS}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSentSuccess(true);
    setFormName('');
    setFormPhone('');
    setFormMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Studio Headquarters & Direct Reach
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          We welcome clients at our studio in Navapur village, Boisar (W), Palghar district. Connect with us to
          discuss your wedding dates, schedule a portfolio review, or request a custom quotation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Location Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FDFBF7] p-8 rounded-lg border border-[#EAE2D8] shadow-xs space-y-6">
            <div>
              <span className="font-serif text-2xl font-bold text-[#801B2E] uppercase block">
                {settings.brandName}
              </span>
              <p className="text-xs tracking-[0.18em] uppercase text-[#B38728] font-bold mt-1">
                Navapur Studio & Office
              </p>
            </div>

            {/* Address */}
            <div className="space-y-3 text-xs text-stone-700 leading-relaxed border-t border-[#EAE2D8] pt-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#801B2E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Official Studio Address:</p>
                  <p className="text-stone-600 mt-1">
                    At-Post-Navapur, Tal-Dist-Palghar,<br />
                    Boisar (W), Navapur Village,<br />
                    Near Janata Highschool & Water Tank,<br />
                    PIN 401501, Maharashtra, India.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-stone-300 hover:border-[#801B2E] text-stone-700 text-xs font-medium rounded transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Address Copied!' : 'Copy Studio Address'}</span>
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="space-y-3 text-xs border-t border-[#EAE2D8] pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-stone-200 flex items-center justify-center text-[#801B2E]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Phone & Booking</span>
                  <a href={`tel:${settings.phone}`} className="font-semibold text-stone-900 hover:text-[#801B2E] text-sm">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 block">WhatsApp Chat</span>
                  <a
                    href={createGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#25D366] hover:underline text-sm"
                  >
                    +91 9960703646 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-stone-200 flex items-center justify-center text-stone-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Official Studio Email</span>
                  <a href={`mailto:${settings.email}`} className="font-semibold text-stone-900 hover:text-[#801B2E]">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white border border-stone-200 flex items-center justify-center text-stone-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Studio Working Hours</span>
                  <p className="font-medium text-stone-800">{settings.openingHours}</p>
                </div>
              </div>
            </div>

            {/* Social Channels (Configurable through Admin) */}
            <div className="border-t border-[#EAE2D8] pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Official Studio Channels
              </span>
              <div className="flex items-center gap-3">
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white border border-stone-200 hover:border-[#801B2E] text-stone-700 hover:text-[#801B2E] rounded transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.youtubeUrl && (
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white border border-stone-200 hover:border-[#801B2E] text-stone-700 hover:text-[#801B2E] rounded transition-colors"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white border border-stone-200 hover:border-[#801B2E] text-stone-700 hover:text-[#801B2E] rounded transition-colors"
                    aria-label="Facebook Page"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-6 bg-white p-8 rounded-lg border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Send an Instant Studio Message
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Have a quick question or want to check date availability? Leave a note and connect over WhatsApp.
            </p>
          </div>

          {sentSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded">
              Your inquiry was recorded! If WhatsApp did not open automatically, please click the WhatsApp chat button above.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Mobile Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="+91 9960703646"
                className="w-full p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Your Message / Event Date & Questions
              </label>
              <textarea
                rows={4}
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                placeholder="Tell us about your celebration date, location, or questions..."
                className="w-full p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase tracking-wider rounded shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>Send Message & Open WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
