export interface QuotationLineItem {
  id: string;
  name: string;
  description?: string;
  category: 'photography' | 'videography' | 'albums' | 'additional_days' | 'addons';
  quantity: number;
  unitPrice: number;
}

export interface QuotationData {
  id: string;
  quotationNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  eventNames: string;
  eventDates: string;
  eventVenues: string;
  items: QuotationLineItem[];
  discountPercent?: number;
  discountFlat?: number;
  taxRatePercent: number; // e.g. 18 for 18% GST or 0
  advanceRequiredPercent: number; // e.g. 30 for 30% advance
  validityDays: number;
  termsAndConditions: string[];
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  createdAt: string;
  notes?: string;
}

export interface QuotationCalculation {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  grandTotal: number;
  advanceAmount: number;
  balancePayable: number;
}

export function calculateQuotation(
  items: QuotationLineItem[],
  taxRatePercent: number = 18,
  discountPercent: number = 0,
  discountFlat: number = 0,
  advancePercent: number = 30
): QuotationCalculation {
  const subtotal = items.reduce((acc, item) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const price = Math.max(0, Number(item.unitPrice) || 0);
    return acc + qty * price;
  }, 0);

  let discountAmount = 0;
  if (discountPercent > 0) {
    discountAmount += (subtotal * discountPercent) / 100;
  }
  if (discountFlat > 0) {
    discountAmount += discountFlat;
  }
  discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * Math.max(0, taxRatePercent)) / 100;
  const grandTotal = Math.round(taxableAmount + taxAmount);

  const safeAdvancePercent = Math.min(100, Math.max(0, advancePercent));
  const advanceAmount = Math.round((grandTotal * safeAdvancePercent) / 100);
  const balancePayable = Math.max(0, grandTotal - advanceAmount);

  return {
    subtotal: Math.round(subtotal),
    discountAmount: Math.round(discountAmount),
    taxableAmount: Math.round(taxableAmount),
    taxAmount: Math.round(taxAmount),
    grandTotal,
    advanceAmount,
    balancePayable,
  };
}

export function generateQuotationNumber(sequence: number = 1): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(4, '0');
  return `GBP-${year}-${padded}`;
}

export function formatINR(amount: number): string {
  const rounded = Math.round(Number(amount) || 0);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

