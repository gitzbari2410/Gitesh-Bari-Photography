import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { OFFICIAL_PHONE_DIGITS, OFFICIAL_PHONE } from '../utils/whatsapp.ts';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export function FloatingWhatsApp({ onOpenBooking }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('Hello Gitesh, I would like to enquire about your wedding photography packages.');

  const handleSend = () => {
    const url = `https://wa.me/${OFFICIAL_PHONE_DIGITS}?text=${encodeURIComponent(quickMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-stone-200 shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="bg-[#801B2E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#801B2E] font-bold font-serif">
                GB
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Gitesh Bari Photography</h4>
                <p className="text-[11px] text-amber-200">Usually replies within an hour</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-amber-100 hover:text-white rounded focus:outline-none"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FDFBF7] space-y-3">
            <div className="bg-white p-3 rounded-lg border border-stone-100 shadow-xs text-xs text-stone-700 leading-relaxed">
              <p className="font-semibold text-[#801B2E] mb-1">Namaste! 🙏</p>
              <p>Welcome to Gitesh Bari Photography studio. How can we help celebrate your big day?</p>
            </div>

            <textarea
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              rows={3}
              className="w-full text-xs p-2.5 border border-stone-300 rounded bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#801B2E]"
              placeholder="Type your message..."
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="text-[11px] text-[#801B2E] hover:underline font-medium"
              >
                Detailed Booking Form →
              </button>

              <button
                type="button"
                onClick={handleSend}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded transition-colors shadow-sm"
              >
                <span>Chat Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main floating trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Open WhatsApp chat with ${OFFICIAL_PHONE}`}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide uppercase">
          Chat with Gitesh
        </span>
      </button>
    </div>
  );
}
