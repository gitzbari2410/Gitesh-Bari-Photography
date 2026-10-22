import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Calendar, MapPin, Sparkles } from 'lucide-react';
import { BookingEnquiryData, createWhatsAppBookingUrl, OFFICIAL_PHONE } from '../utils/whatsapp.ts';
import { useAppStore } from '../data/store.ts';

interface BookingFormProps {
  preselectedPackage?: string;
  onSuccess?: () => void;
}

export function BookingForm({ preselectedPackage, onSuccess }: BookingFormProps) {
  const { actions } = useAppStore();
  const [formData, setFormData] = useState<BookingEnquiryData>({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Maharashtrian Wedding Ceremony',
    eventDate: '',
    eventLocation: 'Palghar / Boisar, Maharashtra',
    numberOfDays: '2 Days',
    preferredPackage: preselectedPackage || 'Royal Heritage Wedding + Film',
    approximateBudget: '₹1,50,000 - ₹2,00,000',
    photographyRequirements: '2 Candid + 1 Traditional Photographer',
    videographyRequirements: '4K Cinematic Highlight Film + Full Ceremony Film',
    albumRequirements: 'Canvera Signature Leatherette Album',
    additionalMessage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.eventDate) errs.eventDate = 'Please select your tentative event date.';
    if (!formData.eventLocation.trim()) errs.eventLocation = 'Please provide the event venue or city.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // 1. Generate WhatsApp URL
    const url = createWhatsAppBookingUrl(formData);
    setWhatsAppUrl(url);

    // 2. Persist to store so admin has the lead record
    actions.addEnquiry({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      eventLocation: formData.eventLocation,
      numberOfDays: formData.numberOfDays,
      preferredPackage: formData.preferredPackage,
      approximateBudget: formData.approximateBudget,
      photographyRequirements: formData.photographyRequirements,
      videographyRequirements: formData.videographyRequirements,
      albumRequirements: formData.albumRequirements,
      additionalMessage: formData.additionalMessage,
    });

    setSubmitted(true);

    // 3. Open WhatsApp in new tab
    window.open(url, '_blank', 'noopener,noreferrer');

    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white border border-stone-200 shadow-md p-6 sm:p-10 rounded-lg">
      <div className="mb-8 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B38728] mb-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Check Dates & Reserve Studio Coverage</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#801B2E]">
          Book Your Photography Session
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          Fill in your wedding or event celebration details below. Your enquiry will generate an instant formatted
          WhatsApp message to studio director Gitesh Bari (+91 9960703646) and be saved to our booking calendar.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#FDFBF7] border border-[#EAE2D8] p-8 rounded-lg text-center space-y-4 animate-in fade-in duration-200">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-2xl font-bold text-stone-900">
            Enquiry Prepared for WhatsApp!
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            WhatsApp has been opened in a new tab with your prefilled details.
            <strong className="text-stone-900 block mt-2">
              Important: Please press "Send" in WhatsApp to deliver your enquiry directly to Gitesh Bari.
            </strong>
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Re-open WhatsApp Chat</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ ...formData, fullName: '', phone: '', additionalMessage: '' });
              }}
              className="px-5 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name / Couple Names *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Pritam & Shraddha"
                className={`w-full text-xs p-3 border rounded focus:ring-1 focus:ring-[#801B2E] outline-none ${
                  errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Phone Number (WhatsApp) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9960703646"
                  className={`w-full text-xs p-3 border rounded focus:ring-1 focus:ring-[#801B2E] outline-none ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                  }`}
                />
                <Phone className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Event Type, Date, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Event Type *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none bg-white"
              >
                <option value="Maharashtrian Wedding Ceremony">Maharashtrian Wedding</option>
                <option value="Wedding + Cinematic Film (2 Days)">Wedding + Cinematic Film (2 Days)</option>
                <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                <option value="Haldi & Mehendi Celebration">Haldi & Mehendi Celebration</option>
                <option value="Engagement / Roka Ceremony">Engagement / Roka Ceremony</option>
                <option value="Maternity & Newborn Session">Maternity & Newborn Session</option>
                <option value="Birthday & Milestone Event">Birthday & Milestone Event</option>
                <option value="Custom Photography Package">Custom Photography Package</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Event Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className={`w-full text-xs p-3 border rounded focus:ring-1 focus:ring-[#801B2E] outline-none ${
                    errors.eventDate ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                  }`}
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
              {errors.eventDate && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.eventDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Event Location / Venue *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.eventLocation}
                  onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                  placeholder="e.g. Boisar, Palghar, Dahanu, Mumbai"
                  className={`w-full text-xs p-3 border rounded focus:ring-1 focus:ring-[#801B2E] outline-none ${
                    errors.eventLocation ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                  }`}
                />
                <MapPin className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
              </div>
              {errors.eventLocation && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.eventLocation}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Duration, Package, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Number of Days
              </label>
              <select
                value={formData.numberOfDays}
                onChange={(e) => setFormData({ ...formData, numberOfDays: e.target.value })}
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none bg-white"
              >
                <option value="Single Day (Up to 8-10 Hours)">Single Day</option>
                <option value="2 Days (Haldi + Wedding)">2 Days (Haldi + Wedding)</option>
                <option value="3 Days (Haldi, Sangeet & Wedding)">3 Days (Haldi, Sangeet & Wedding)</option>
                <option value="Multi-Day / Destination">Multi-Day / Destination</option>
                <option value="Half Day Session (4 Hours)">Half Day Session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Preferred Package
              </label>
              <input
                type="text"
                value={formData.preferredPackage || ''}
                onChange={(e) => setFormData({ ...formData, preferredPackage: e.target.value })}
                placeholder="e.g. Royal Heritage Wedding + Film"
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Approximate Budget Range
              </label>
              <select
                value={formData.approximateBudget}
                onChange={(e) => setFormData({ ...formData, approximateBudget: e.target.value })}
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none bg-white font-mono"
              >
                <option value="Under ₹50,000">Under ₹50,000 (Pre-Wedding/Events)</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹1,75,000">₹1,00,000 - ₹1,75,000</option>
                <option value="₹1,75,000 - ₹2,50,000">₹1,75,000 - ₹2,50,000</option>
                <option value="₹2,50,000+ (Grand Royal Celebration)">₹2,50,000+ (Grand Royal)</option>
                <option value="Flexible / Please suggest">Flexible / Need Custom Advice</option>
              </select>
            </div>
          </div>

          {/* Row 4: Specific Inclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Photography Needs
              </label>
              <input
                type="text"
                value={formData.photographyRequirements || ''}
                onChange={(e) => setFormData({ ...formData, photographyRequirements: e.target.value })}
                placeholder="e.g. 2 Candid + 1 Traditional"
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Videography / Cinema Needs
              </label>
              <input
                type="text"
                value={formData.videographyRequirements || ''}
                onChange={(e) => setFormData({ ...formData, videographyRequirements: e.target.value })}
                placeholder="e.g. 4K Cinematic Highlight Film + Drone"
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Album & Print Needs
              </label>
              <input
                type="text"
                value={formData.albumRequirements || ''}
                onChange={(e) => setFormData({ ...formData, albumRequirements: e.target.value })}
                placeholder="e.g. 40-Page Canvera Album + Parents Book"
                className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Additional Details or Special Ceremonies (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.additionalMessage || ''}
              onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
              placeholder="Tell us about your wedding vision, specific family traditions (e.g. Sakharpuda, Haldi flower shower, Vidai timing), or questions."
              className="w-full text-xs p-3 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
            />
          </div>

          <div className="bg-[#FDFBF7] p-4 border border-[#EAE2D8] rounded text-[11px] text-stone-600 leading-relaxed">
            <span className="font-semibold text-stone-800">Booking Transparency Notice:</span> Clicking “Submit &
            Connect on WhatsApp” validates your enquiry, records it into our studio management dashboard, and opens
            WhatsApp with your structured enquiry details. A booking date is officially confirmed only upon studio
            availability confirmation and receipt of the advance booking token.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-stone-500">
              Need immediate urgent assistance? Call directly:{' '}
              <a href={`tel:${OFFICIAL_PHONE}`} className="font-semibold text-[#801B2E]">
                {OFFICIAL_PHONE}
              </a>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#801B2E] hover:bg-[#6B1728] active:scale-95 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>Submit & Open WhatsApp Enquiry</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
