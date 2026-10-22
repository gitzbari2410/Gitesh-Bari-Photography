import { BookingForm } from '../components/BookingForm.tsx';
import { Calendar, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { OFFICIAL_PHONE, createGeneralWhatsAppUrl } from '../utils/whatsapp.ts';

interface BookingViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function BookingView({ onNavigate }: BookingViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Reserve Your Wedding Date · Gitesh Bari Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          Book a Photography Session
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Popular auspicious wedding muhurats fill up months in advance. Submit your celebration details below
          to immediately verify studio availability, review tailored package options, and connect via WhatsApp.
        </p>
      </div>

      {/* Main Grid: Form + Trust Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <BookingForm />
        </div>

        {/* Sidebar Information */}
        <div className="lg:col-span-4 space-y-6">
          {/* Studio Direct Contact Box */}
          <div className="bg-[#FDFBF7] p-6 rounded-lg border border-[#EAE2D8] shadow-xs space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B38728] block">
              Direct Inquiries
            </span>
            <h4 className="font-serif text-lg font-bold text-[#801B2E]">
              Speak Directly with Gitesh Bari
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prefer an immediate voice call or casual chat before submitting the form? You can reach Gitesh directly
              on his studio mobile or WhatsApp.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <a
                href={`tel:${OFFICIAL_PHONE}`}
                className="flex items-center gap-2.5 p-2.5 bg-white border border-stone-200 hover:border-[#801B2E] text-stone-800 font-semibold rounded transition-colors"
              >
                <Phone className="w-4 h-4 text-[#801B2E]" />
                <span>Call {OFFICIAL_PHONE}</span>
              </a>

              <a
                href={createGeneralWhatsAppUrl('Hello Gitesh Bari, I would like to check availability for my wedding date.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded transition-colors"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Booking Flow Explanation */}
          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900">
              How the Booking Process Works
            </h4>
            <ol className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <span className="font-bold font-mono text-[#801B2E]">01.</span>
                <span><strong>Submit Enquiry:</strong> Complete the form with your date and venue.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold font-mono text-[#801B2E]">02.</span>
                <span><strong>WhatsApp Chat:</strong> Send the auto-filled message to discuss dates and package customization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold font-mono text-[#801B2E]">03.</span>
                <span><strong>Official Quotation:</strong> Receive a signed branded PDF quote with payment milestones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold font-mono text-[#801B2E]">04.</span>
                <span><strong>Token Advance:</strong> Secure and block your dates exclusively on our master studio calendar.</span>
              </li>
            </ol>
          </div>

          {/* Transparent Policy Notice */}
          <div className="bg-amber-50/60 p-4 rounded border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-[#B38728] mb-1" />
            <p>
              <strong>Date Reservation Policy:</strong> Submitting this enquiry does not automatically book the date.
              Dates are blocked only once availability is mutually confirmed and the standard 30% advance token is received.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
