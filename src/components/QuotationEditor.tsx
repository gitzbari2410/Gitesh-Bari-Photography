import { useState } from 'react';
import { Plus, Trash2, Save, Eye, ArrowLeft } from 'lucide-react';
import { QuotationData, QuotationLineItem, calculateQuotation, generateQuotationNumber, formatINR } from '../utils/quotation.ts';

interface QuotationEditorProps {
  initialQuotation?: QuotationData | null;
  onSave: (quotation: QuotationData) => void;
  onCancel: () => void;
  onPreview: (quotation: QuotationData) => void;
}

const DEFAULT_TERMS = [
  '30% advance required to confirm and reserve event dates.',
  '50% due on the primary event day.',
  'Remaining balance payable upon final photo selection.',
  'Sneak peeks shared within 48 hours; final digital edits within 3–4 weeks.',
  'Printed photo albums delivered within 4–6 weeks post client design approval.',
];

const PRESET_SERVICES: Omit<QuotationLineItem, 'id'>[] = [
  { name: 'Candid Wedding Photography (Full Day)', category: 'photography', quantity: 1, unitPrice: 40000, description: '1 Senior Candid Photographer capturing natural, unposed heirloom moments' },
  { name: 'Traditional Wedding Photography', category: 'photography', quantity: 1, unitPrice: 25000, description: '1 Traditional Photographer covering stage rituals and family portraits' },
  { name: '4K Cinematic Wedding Film Coverage', category: 'videography', quantity: 1, unitPrice: 50000, description: '2 Cinematographers, teaser reel (60s) + cinematic film (4-6 min)' },
  { name: 'Traditional Full Ceremony Video', category: 'videography', quantity: 1, unitPrice: 25000, description: 'Full documentation of Saptapadi, Kanyadaan & rituals (60-90 min)' },
  { name: 'Canvera Heritage 40-Page Photobook', category: 'albums', quantity: 1, unitPrice: 20000, description: 'Luxury metallic or velvet cover with protective presentation box' },
  { name: '4K Aerial Drone Coverage', category: 'addons', quantity: 1, unitPrice: 15000, description: 'High-definition aerial cinematography (subject to local venue permissions)' },
  { name: 'Haldi Ceremony Special Coverage', category: 'photography', quantity: 1, unitPrice: 30000, description: 'High-speed shutter candid coverage of flower shower & turmeric celebration' },
  { name: 'Cinematic Pre-Wedding Shoot', category: 'photography', quantity: 1, unitPrice: 40000, description: 'Scenic beach & outdoor sunset session with cinematic teaser video' },
];

export function QuotationEditor({ initialQuotation, onSave, onCancel, onPreview }: QuotationEditorProps) {
  const [quotation, setQuotation] = useState<QuotationData>(() => {
    if (initialQuotation) return initialQuotation;
    return {
      id: `quot-${Date.now()}`,
      quotationNumber: generateQuotationNumber(Math.floor(100 + Math.random() * 900)),
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      eventNames: 'Wedding & Reception',
      eventDates: '',
      eventVenues: 'Palghar, Maharashtra',
      items: [
        {
          id: 'item-1',
          name: 'Candid Wedding Photography (Full Day)',
          category: 'photography',
          quantity: 1,
          unitPrice: 40000,
          description: '1 Senior Candid Photographer capturing natural heirloom moments',
        },
        {
          id: 'item-2',
          name: '4K Cinematic Wedding Film Coverage',
          category: 'videography',
          quantity: 1,
          unitPrice: 50000,
          description: '2 Cinematographers, teaser reel (60s) + cinematic film (4-6 min)',
        },
      ],
      discountPercent: 0,
      discountFlat: 0,
      taxRatePercent: 18,
      advanceRequiredPercent: 30,
      validityDays: 15,
      termsAndConditions: DEFAULT_TERMS,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      notes: '',
    };
  });

  const calc = calculateQuotation(
    quotation.items,
    quotation.taxRatePercent,
    quotation.discountPercent || 0,
    quotation.discountFlat || 0,
    quotation.advanceRequiredPercent
  );

  const handleAddItem = (preset?: Omit<QuotationLineItem, 'id'>) => {
    const newItem: QuotationLineItem = preset
      ? { ...preset, id: `item-${Date.now()}` }
      : {
          id: `item-${Date.now()}`,
          name: 'New Custom Service',
          category: 'photography',
          quantity: 1,
          unitPrice: 10000,
          description: '',
        };
    setQuotation({ ...quotation, items: [...quotation.items, newItem] });
  };

  const handleUpdateItem = (id: string, updates: Partial<QuotationLineItem>) => {
    setQuotation({
      ...quotation,
      items: quotation.items.map((it) => (it.id === id ? { ...it, ...updates } : it)),
    });
  };

  const handleRemoveItem = (id: string) => {
    setQuotation({
      ...quotation,
      items: quotation.items.filter((it) => it.id !== id),
    });
  };

  const handleSave = () => {
    if (!quotation.clientName.trim()) {
      alert('Please enter client name.');
      return;
    }
    if (!quotation.clientPhone.trim()) {
      alert('Please enter client contact phone number.');
      return;
    }
    onSave(quotation);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel / Back to List</span>
          </button>
          <h2 className="font-serif text-2xl font-bold text-[#801B2E]">
            {initialQuotation ? 'Edit Quotation' : 'Create New Quotation'}
          </h2>
          <p className="text-xs text-stone-500">
            Quotation Reference: <span className="font-mono font-semibold">{quotation.quotationNumber}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onPreview(quotation)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-stone-600" />
            <span>Preview Branded PDF</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#801B2E] hover:bg-[#6B1728] rounded transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#D4AF37]" />
            <span>Save Quotation</span>
          </button>
        </div>
      </div>

      {/* Client and Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Client Full Name *
          </label>
          <input
            type="text"
            required
            value={quotation.clientName}
            onChange={(e) => setQuotation({ ...quotation, clientName: e.target.value })}
            placeholder="e.g. Rahul Sharma & Ananya"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Client Phone / WhatsApp *
          </label>
          <input
            type="text"
            required
            value={quotation.clientPhone}
            onChange={(e) => setQuotation({ ...quotation, clientPhone: e.target.value })}
            placeholder="+91 9876543210"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Client Email
          </label>
          <input
            type="email"
            value={quotation.clientEmail || ''}
            onChange={(e) => setQuotation({ ...quotation, clientEmail: e.target.value })}
            placeholder="client@example.com"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Event Name(s)
          </label>
          <input
            type="text"
            value={quotation.eventNames}
            onChange={(e) => setQuotation({ ...quotation, eventNames: e.target.value })}
            placeholder="Haldi, Wedding, Reception"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Event Date(s)
          </label>
          <input
            type="text"
            value={quotation.eventDates}
            onChange={(e) => setQuotation({ ...quotation, eventDates: e.target.value })}
            placeholder="e.g. December 15–16, 2026"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Event Venue / City
          </label>
          <input
            type="text"
            value={quotation.eventVenues}
            onChange={(e) => setQuotation({ ...quotation, eventVenues: e.target.value })}
            placeholder="e.g. Boisar, Palghar, Maharashtra"
            className="w-full text-xs p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none"
          />
        </div>
      </div>

      {/* Preset Quick Add Buttons */}
      <div className="bg-[#FDFBF7] p-4 border border-[#EAE2D8] rounded-lg space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B38728] block">
          Quick-Add Standard Packages & Inclusions
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SERVICES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddItem(preset)}
              className="text-[11px] bg-white border border-stone-300 hover:border-[#801B2E] hover:text-[#801B2E] px-2.5 py-1.5 rounded transition-colors text-left"
            >
              + {preset.name} ({formatINR(preset.unitPrice)})
            </button>
          ))}
        </div>
      </div>

      {/* Line Items Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-stone-800">Quotation Line Items</h3>
          <button
            type="button"
            onClick={() => handleAddItem()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#801B2E] border border-[#801B2E] hover:bg-[#801B2E] hover:text-white rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {quotation.items.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 bg-stone-50 border border-stone-200 rounded grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-5 space-y-1">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                  placeholder="Service name"
                  className="w-full text-xs font-semibold p-1.5 bg-white border border-stone-300 rounded"
                />
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                  placeholder="Inclusions / specifications"
                  className="w-full text-[11px] text-stone-600 p-1 bg-white border border-stone-200 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <select
                  value={item.category}
                  onChange={(e) => handleUpdateItem(item.id, { category: e.target.value as any })}
                  className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                >
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="albums">Albums & Prints</option>
                  <option value="addons">Drone & Add-ons</option>
                  <option value="additional_days">Extra Days</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(item.id, { quantity: Number(e.target.value) || 1 })}
                  className="w-full text-xs text-center p-1.5 bg-white border border-stone-300 rounded font-mono"
                  title="Quantity"
                />
              </div>

              <div className="md:col-span-2">
                <input
                  type="number"
                  step="500"
                  value={item.unitPrice}
                  onChange={(e) => handleUpdateItem(item.id, { unitPrice: Number(e.target.value) || 0 })}
                  className="w-full text-xs text-right p-1.5 bg-white border border-stone-300 rounded font-mono tabular-nums"
                  title="Unit Price in INR"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono text-stone-800 tabular-nums">
                  {formatINR(item.quantity * item.unitPrice)}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Adjustments & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stone-200 pt-6">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Terms & Payment Rules
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">GST Tax Rate (%)</label>
              <input
                type="number"
                value={quotation.taxRatePercent}
                onChange={(e) => setQuotation({ ...quotation, taxRatePercent: Number(e.target.value) || 0 })}
                className="w-full text-xs p-2 border border-stone-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Advance Required (%)</label>
              <input
                type="number"
                value={quotation.advanceRequiredPercent}
                onChange={(e) => setQuotation({ ...quotation, advanceRequiredPercent: Number(e.target.value) || 0 })}
                className="w-full text-xs p-2 border border-stone-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Discount (%)</label>
              <input
                type="number"
                value={quotation.discountPercent || 0}
                onChange={(e) => setQuotation({ ...quotation, discountPercent: Number(e.target.value) || 0 })}
                className="w-full text-xs p-2 border border-stone-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Quotation Validity (Days)</label>
              <input
                type="number"
                value={quotation.validityDays}
                onChange={(e) => setQuotation({ ...quotation, validityDays: Number(e.target.value) || 15 })}
                className="w-full text-xs p-2 border border-stone-300 rounded font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-stone-600 mb-1">Status</label>
            <select
              value={quotation.status}
              onChange={(e) => setQuotation({ ...quotation, status: e.target.value as any })}
              className="w-full text-xs p-2 border border-stone-300 rounded capitalize"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent to Client</option>
              <option value="accepted">Accepted / Booked</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-stone-600 mb-1">Internal Notes</label>
            <textarea
              rows={2}
              value={quotation.notes || ''}
              onChange={(e) => setQuotation({ ...quotation, notes: e.target.value })}
              className="w-full text-xs p-2 border border-stone-300 rounded"
              placeholder="Private notes on couple preferences, ceremony details, etc."
            />
          </div>
        </div>

        {/* Live Calculation Preview Card */}
        <div className="bg-[#FDFBF7] p-5 border border-[#EAE2D8] rounded-lg space-y-3">
          <h4 className="font-serif text-base font-bold text-[#801B2E]">Live Calculation</h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({quotation.items.length} items):</span>
              <span className="font-mono font-semibold tabular-nums">{formatINR(calc.subtotal)}</span>
            </div>

            {calc.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({quotation.discountPercent}%):</span>
                <span className="font-mono tabular-nums">- {formatINR(calc.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Taxable Value:</span>
              <span className="font-mono tabular-nums">{formatINR(calc.taxableAmount)}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>GST ({quotation.taxRatePercent}%):</span>
              <span className="font-mono tabular-nums">{formatINR(calc.taxAmount)}</span>
            </div>

            <div className="border-t-2 border-stone-300 pt-2 flex justify-between text-base font-bold text-[#801B2E]">
              <span>Grand Total:</span>
              <span className="font-mono tabular-nums">{formatINR(calc.grandTotal)}</span>
            </div>

            <div className="border-t border-stone-200 pt-2 text-[11px] space-y-1">
              <div className="flex justify-between text-stone-700">
                <span>Advance Required ({quotation.advanceRequiredPercent}%):</span>
                <span className="font-mono font-bold text-[#801B2E]">{formatINR(calc.advanceAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Balance Payable:</span>
                <span className="font-mono font-semibold">{formatINR(calc.balancePayable)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onPreview(quotation)}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded"
            >
              Preview PDF
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#801B2E] hover:bg-[#6B1728] rounded shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
