import { QuotationData, calculateQuotation, formatINR } from '../utils/quotation.ts';
import { OFFICIAL_PHONE, OFFICIAL_ADDRESS, createQuotationWhatsAppShareUrl } from '../utils/whatsapp.ts';
import { Printer, Share2, ArrowLeft } from 'lucide-react';

interface QuotationPrintViewProps {
  quotation: QuotationData;
  onBack: () => void;
}

export function QuotationPrintView({ quotation, onBack }: QuotationPrintViewProps) {
  const calc = calculateQuotation(
    quotation.items,
    quotation.taxRatePercent,
    quotation.discountPercent || 0,
    quotation.discountFlat || 0,
    quotation.advanceRequiredPercent
  );

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsAppUrl = createQuotationWhatsAppShareUrl(
    quotation.clientPhone,
    quotation.quotationNumber,
    formatINR(calc.grandTotal),
    quotation.clientName
  );

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print bg-white p-4 border border-stone-200 shadow-sm rounded-lg">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#801B2E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quotation Management</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={shareWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share on WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold rounded transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#D4AF37]" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 border border-stone-300 shadow-lg text-stone-900 printable-document">
        {/* Header with Luxury Brand Accent */}
        <div className="border-b-2 border-[#801B2E] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <span className="font-serif text-3xl font-bold tracking-tight text-[#801B2E] uppercase block">
              Gitesh Bari Photography
            </span>
            <p className="text-xs tracking-[0.2em] uppercase text-[#B38728] font-bold mt-1">
              Fine Art Indian Wedding & Cinematic Films Studio
            </p>
            <div className="mt-3 text-xs text-stone-600 space-y-0.5">
              <p className="font-medium text-stone-800">Phone / WhatsApp: {OFFICIAL_PHONE}</p>
              <p>Email: gitzbari@gmail.com</p>
              <p className="max-w-md">{OFFICIAL_ADDRESS}</p>
            </div>
          </div>

          <div className="sm:text-right shrink-0 bg-[#FDFBF7] p-4 border border-[#EAE2D8] rounded">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Official Quotation
            </span>
            <span className="font-mono text-xl font-bold text-[#801B2E] block mt-0.5">
              {quotation.quotationNumber}
            </span>
            <div className="text-xs text-stone-600 mt-2 space-y-0.5">
              <p>Date: {quotation.createdAt || new Date().toLocaleDateString()}</p>
              <p>Validity: {quotation.validityDays} Days</p>
              <p className="font-semibold text-stone-800 capitalize">
                Status: <span className="text-[#B38728]">{quotation.status}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Client & Event Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 bg-stone-50 border border-stone-200 rounded">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-1">
              Quotation Prepared For
            </h4>
            <p className="font-bold text-base text-stone-900">{quotation.clientName}</p>
            <p className="text-xs text-stone-600 mt-0.5">Phone: {quotation.clientPhone}</p>
            {quotation.clientEmail && <p className="text-xs text-stone-600">Email: {quotation.clientEmail}</p>}
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-1">
              Event Schedule & Venue
            </h4>
            <p className="text-xs font-semibold text-stone-800">Events: {quotation.eventNames}</p>
            <p className="text-xs text-stone-600">Dates: {quotation.eventDates}</p>
            <p className="text-xs text-stone-600">Venues: {quotation.eventVenues}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-stone-300 bg-stone-100 text-stone-700">
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Service Description</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Category</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">Qty</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-right">Rate (₹)</th>
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {quotation.items.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-stone-50/50">
                  <td className="py-3 px-3">
                    <p className="font-semibold text-stone-900">{item.name}</p>
                    {item.description && <p className="text-stone-500 text-[11px] mt-0.5">{item.description}</p>}
                  </td>
                  <td className="py-3 px-3 text-stone-600 capitalize">{item.category.replace('_', ' ')}</td>
                  <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">{formatINR(item.unitPrice)}</td>
                  <td className="py-3 px-3 text-right font-mono font-semibold tabular-nums text-stone-900">
                    {formatINR(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 pt-4 border-t border-stone-300">
          {/* Payment Milestones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#801B2E]">
              Payment Milestones & Schedule
            </h4>
            <div className="bg-stone-50 p-3.5 border border-stone-200 rounded space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-600">Booking Advance ({quotation.advanceRequiredPercent}%):</span>
                <span className="font-mono font-bold text-[#801B2E]">{formatINR(calc.advanceAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Balance on Event / Delivery:</span>
                <span className="font-mono font-semibold text-stone-800">{formatINR(calc.balancePayable)}</span>
              </div>
              <div className="border-t border-stone-200 pt-1 text-[11px] text-stone-500">
                Payment options: Bank NEFT/RTGS, UPI (+91 9960703646), or Cheque.
              </div>
            </div>
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-stone-50 p-4 border border-stone-200 rounded space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">{formatINR(calc.subtotal)}</span>
            </div>

            {calc.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Special Courtesy Discount:</span>
                <span className="font-mono tabular-nums">- {formatINR(calc.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Taxable Total:</span>
              <span className="font-mono tabular-nums">{formatINR(calc.taxableAmount)}</span>
            </div>

            {quotation.taxRatePercent > 0 ? (
              <div className="flex justify-between text-stone-600">
                <span>Applicable GST ({quotation.taxRatePercent}%):</span>
                <span className="font-mono tabular-nums">{formatINR(calc.taxAmount)}</span>
              </div>
            ) : (
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Taxes:</span>
                <span>Included / Exempt</span>
              </div>
            )}

            <div className="border-t-2 border-stone-300 pt-2 flex justify-between text-sm font-bold text-[#801B2E]">
              <span>Estimated Grand Total:</span>
              <span className="font-mono text-base tabular-nums">{formatINR(calc.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t border-stone-200 pt-4 mt-6 text-[11px] text-stone-600 space-y-1.5">
          <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-2">
            Terms & Studio Policies
          </h4>
          <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
            {quotation.termsAndConditions.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
          {quotation.notes && (
            <p className="pt-2 text-stone-500 italic">
              <strong>Studio Note:</strong> {quotation.notes}
            </p>
          )}
        </div>

        {/* Authorized Signature Block */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-stone-600">
          <div>
            <p className="font-serif text-sm font-bold text-[#801B2E]">Gitesh Bari</p>
            <p className="text-[11px] text-stone-500">Founder & Principal Photographer</p>
            <p className="text-[11px] text-[#B38728]">Gitesh Bari Photography · Navapur, Palghar</p>
          </div>

          <div className="text-right">
            <div className="h-10 border-b border-stone-400 w-48 mb-1"></div>
            <p className="text-[11px] text-stone-500">Authorized Studio Seal & Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
