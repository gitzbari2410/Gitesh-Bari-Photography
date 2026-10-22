export const OFFICIAL_PHONE = '+91 9960703646';
export const OFFICIAL_PHONE_DIGITS = '919960703646';
export const OFFICIAL_ADDRESS =
  'At-Post-Navapur, Tal-Dist-Palghar, Boisar (W), Navapur Village, Near Janata Highschool & Water Tank, PIN 401501, Maharashtra, India.';

export interface BookingEnquiryData {
  fullName: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  numberOfDays?: string;
  preferredPackage?: string;
  approximateBudget?: string;
  photographyRequirements?: string;
  videographyRequirements?: string;
  albumRequirements?: string;
  additionalMessage?: string;
}

export function buildWhatsAppBookingMessage(enquiry: BookingEnquiryData): string {
  const lines: string[] = [
    'Hello Gitesh Bari Photography,',
    '',
    'I would like to enquire about a photography booking.',
    '',
    `Name: ${enquiry.fullName || '—'}`,
    `Event Type: ${enquiry.eventType || '—'}`,
    `Event Date: ${enquiry.eventDate || '—'}`,
    `Event Location: ${enquiry.eventLocation || '—'}`,
    `Preferred Package: ${enquiry.preferredPackage || 'Custom Package'}`,
    `Approximate Budget: ${enquiry.approximateBudget || 'To be discussed'}`,
  ];

  const reqs: string[] = [];
  if (enquiry.numberOfDays) reqs.push(`Duration: ${enquiry.numberOfDays}`);
  if (enquiry.photographyRequirements) reqs.push(`Photography: ${enquiry.photographyRequirements}`);
  if (enquiry.videographyRequirements) reqs.push(`Videography: ${enquiry.videographyRequirements}`);
  if (enquiry.albumRequirements) reqs.push(`Albums: ${enquiry.albumRequirements}`);
  if (enquiry.additionalMessage) reqs.push(`Note: ${enquiry.additionalMessage}`);

  lines.push(`Additional Requirements: ${reqs.length > 0 ? reqs.join(', ') : 'None specified'}`);
  lines.push('');
  lines.push('Please share your availability and quotation.');
  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
}

export function createWhatsAppBookingUrl(enquiry: BookingEnquiryData): string {
  const message = buildWhatsAppBookingMessage(enquiry);
  return `https://wa.me/${OFFICIAL_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}

export function createGeneralWhatsAppUrl(customNote?: string): string {
  const text = customNote || 'Hello Gitesh Bari Photography, I would like to enquire about your photography services.';
  return `https://wa.me/${OFFICIAL_PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

export function createQuotationWhatsAppShareUrl(clientPhone: string, quotationNumber: string, grandTotalFormatted: string, clientName: string): string {
  const cleanPhone = clientPhone.replace(/\D/g, '');
  const targetPhone = cleanPhone.length >= 10 ? (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone) : OFFICIAL_PHONE_DIGITS;

  const msg = [
    `Hello ${clientName},`,
    '',
    `Here is your photography quotation summary from *Gitesh Bari Photography*:`,
    `*Quotation No:* ${quotationNumber}`,
    `*Estimated Total:* ${grandTotalFormatted}`,
    '',
    `Studio: Gitesh Bari Photography`,
    `Phone: +91 9960703646`,
    `Location: Navapur Village, Near Janata Highschool, Boisar (W), Palghar, Maharashtra.`,
    '',
    `Please review the complete PDF quotation sent to you. Feel free to message back with any questions or modifications.`,
    'Thank you!',
  ].join('\n');

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
}
