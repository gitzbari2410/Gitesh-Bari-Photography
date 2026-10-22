import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_ADDRESS } from '../utils/whatsapp.ts';

export function PrivacyView() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="border-b border-[#EAE2D8] pb-6 space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Client Confidentiality & Rights
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#801B2E]">
          Privacy Policy & Image Rights
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: October 2026 · Gitesh Bari Photography Studio
        </p>
      </div>

      <div className="space-y-8 text-xs text-stone-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#801B2E]" />
            <span>1. Client Information & Data Protection</span>
          </h2>
          <p>
            At Gitesh Bari Photography, we hold your personal trust in highest regard. Any personal details submitted
            through our enquiry forms, quotation builder, or WhatsApp conversations (including names, phone numbers,
            email addresses, and wedding dates) are utilized exclusively for booking coordination and customer service.
            We never sell, rent, or trade client information to any third-party marketing services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#801B2E]" />
            <span>2. Portfolio Usage & Consent</span>
          </h2>
          <p>
            As fine-art wedding photographers, we take immense pride in our craftsmanship. However, we honor each
            family’s comfort and privacy preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
            <li>We only publish selected highlight photographs on our official website and social channels with client permission.</li>
            <li>If a couple or family requests a private, non-published wedding coverage (NDA / private gallery only), we strictly adhere to this request upon contract execution.</li>
            <li>Clients may at any time request the removal of any photo featuring their likeness from our website portfolio by contacting our studio.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#801B2E]" />
            <span>3. Cloud Storage & Digital Archive Security</span>
          </h2>
          <p>
            All digital photograph master files and 4K video footage are archived on redundant, high-durability cloud
            storage systems and physical local mirror drives for 12 months following your event date. Digital proofing
            galleries delivered to clients are password-protected and accessible only to authorized persons with whom
            the link is shared.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#801B2E]" />
            <span>4. Studio Contact for Privacy Inquiries</span>
          </h2>
          <div className="bg-[#FDFBF7] p-4 rounded border border-[#EAE2D8] space-y-1 text-stone-800">
            <p className="font-bold">Gitesh Bari Photography</p>
            <p>Phone: {OFFICIAL_PHONE}</p>
            <p>Email: gitzbari@gmail.com</p>
            <p>{OFFICIAL_ADDRESS}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
