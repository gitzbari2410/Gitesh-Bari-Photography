import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuotation, generateQuotationNumber } from './quotation.ts';
import { buildWhatsAppBookingMessage, createWhatsAppBookingUrl } from './whatsapp.ts';

test('calculateQuotation computes subtotal, discounts, GST, advance and balance', () => {
  const items = [
    {
      id: '1',
      name: 'Full Wedding Candid Photography',
      category: 'photography' as const,
      quantity: 2,
      unitPrice: 35000,
    },
    {
      id: '2',
      name: 'Cinematic Wedding Film (4K)',
      category: 'videography' as const,
      quantity: 1,
      unitPrice: 50000,
    },
    {
      id: '3',
      name: 'Canvera Signature Heritage Album',
      category: 'albums' as const,
      quantity: 1,
      unitPrice: 20000,
    },
  ];

  // Subtotal = 2*35000 + 50000 + 20000 = 70000 + 50000 + 20000 = 140000
  // Discount 10% = 14000 => Taxable = 126000
  // GST 18% = 22680 => Grand Total = 148680
  // Advance 30% = 44604 => Balance = 104076
  const calc = calculateQuotation(items, 18, 10, 0, 30);

  assert.equal(calc.subtotal, 140000);
  assert.equal(calc.discountAmount, 14000);
  assert.equal(calc.taxableAmount, 126000);
  assert.equal(calc.taxAmount, 22680);
  assert.equal(calc.grandTotal, 148680);
  assert.equal(calc.advanceAmount, 44604);
  assert.equal(calc.balancePayable, 104076);
});

test('generateQuotationNumber formats correctly with current year and padded sequence', () => {
  const qNum = generateQuotationNumber(5);
  const currentYear = new Date().getFullYear();
  assert.equal(qNum, `GBP-${currentYear}-0005`);
});

test('buildWhatsAppBookingMessage includes all key fields in prompt specification', () => {
  const message = buildWhatsAppBookingMessage({
    fullName: 'Rahul Sharma',
    phone: '+91 9876543210',
    eventType: 'Traditional Maharashtrian Wedding',
    eventDate: '2026-11-20',
    eventLocation: 'Boisar, Palghar',
    preferredPackage: 'Royal Heritage Wedding + Film',
    approximateBudget: '₹1,50,000 - ₹2,00,000',
    photographyRequirements: '2 Candid + 1 Traditional',
    videographyRequirements: 'Cinematic Film + Drone',
    albumRequirements: '1 Premium Album',
    additionalMessage: 'Haldi ceremony is in morning, reception at night.',
  });

  assert.ok(message.includes('Hello Gitesh Bari Photography,'));
  assert.ok(message.includes('Name: Rahul Sharma'));
  assert.ok(message.includes('Event Type: Traditional Maharashtrian Wedding'));
  assert.ok(message.includes('Event Date: 2026-11-20'));
  assert.ok(message.includes('Event Location: Boisar, Palghar'));
  assert.ok(message.includes('Please share your availability and quotation.'));

  const url = createWhatsAppBookingUrl({
    fullName: 'Rahul Sharma',
    phone: '+91 9876543210',
    eventType: 'Wedding',
    eventDate: '2026-11-20',
    eventLocation: 'Palghar',
  });
  assert.ok(url.startsWith('https://wa.me/919960703646?text='));
});
