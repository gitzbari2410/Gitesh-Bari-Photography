import { ArrowLeft, Check, Sparkles, Calendar, MessageCircle, Camera, Film, MapPin } from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp.ts';

interface SpecialtyServiceViewProps {
  slug: string;
  onNavigate: (view: string, serviceSlug?: string) => void;
}

interface SpecialtyData {
  title: string;
  kicker: string;
  leadParagraph: string;
  image: string;
  traditions: string[];
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const SPECIALTY_MAP: Record<string, SpecialtyData> = {
  'wedding': {
    title: 'Maharashtrian & Indian Wedding Photography',
    kicker: 'Sacred Rituals · Heirloom Vows · Royal Mandap',
    leadParagraph:
      'A Maharashtrian wedding is a celebration of timeless rituals, spiritual blessings, and deep familial bonds. From the auspicious Ganpati Puja and Seemant Pujan to the emotional Kanyadaan, Saptapadi, and the joyous Sunmukh, our lenses capture every nuance with deep cultural reverence.',
    image: '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg',
    traditions: [
      'Gauri Har Puja & Bride’s blessing rituals',
      'Antarpat drop & emotional Mangalashtak verses',
      'Kanyadaan, Panigrahan & Saptapadi (Seven Vows around sacred Agni)',
      'Karmasamapti & Sunmukh welcome at groom’s house',
      'Candid moments with elders touching feet and shedding joyful tears',
      'Bespoke bridal portraits in rich traditional Paithani silk and handcrafted gold nath',
    ],
    features: [
      {
        title: 'Two-Angle Simultaneous Coverage',
        desc: 'One candid photographer captures bride and groom expressions while the traditional photographer documents ritual priests, parents, and fire offerings.',
      },
      {
        title: 'Low-Light Heritage Aesthetics',
        desc: 'Our prime glass maintains warm, flattering skin tones in indoor banquet halls, traditional wadas, or open outdoor lawns without blinding flash disruptions.',
      },
      {
        title: 'Archival Canvera Photo Album',
        desc: 'Printed on 250 GSM velvet-finish paper designed to preserve color vibrancy for 50+ years.',
      },
    ],
    faqs: [
      {
        q: 'Do you cover weddings outside Palghar / Boisar?',
        a: 'Yes! We travel across Maharashtra (Mumbai, Thane, Pune, Nashik) and destination wedding venues across India.',
      },
      {
        q: 'How many edited photos will we receive?',
        a: 'For a full two-day wedding, you will receive 400+ meticulously color-graded photos and all raw capture files.',
      },
    ],
  },
  'cinematic-films': {
    title: 'Cinematic Wedding Films & Showreels',
    kicker: '4K Cinema · Sound Design · Narrative Storytelling',
    leadParagraph:
      'We do not make monotonous 3-hour video recordings. We craft cinematic love story films that feel like an emotional movie. Using cinema-grade mirrorless cameras, optical stabilizers, aerial drones, and professional audio recorders, we preserve the laughter, the sacred Vedic mantras, and the heartfelt vows.',
    image: '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg',
    traditions: [
      'Live recorded vows, speeches, and ambient ceremony sound',
      '4K Cinematic Highlight Trailer (4 to 7 minutes)',
      'Full ceremony chronological ritual film with chapter markers',
      'Vertical Instagram Reels (9:16) for immediate social celebration',
      'Licensed music scoring tailored to the couple’s emotional vibe',
    ],
    features: [
      {
        title: 'Dedicated Audio Mastering',
        desc: 'We place discreet wireless lavalier microphones on the groom and panditji to guarantee crystal-clear Sanskrit mantras and vow audio.',
      },
      {
        title: '4K Aerial Drone Cinematography',
        desc: 'Breathtaking bird’s-eye perspectives of the wedding venue, baraat arrival, and coastal sunset backdrop.',
      },
      {
        title: 'Express Teaser Delivery',
        desc: 'A 60-second teaser ready for Instagram within 48 to 72 hours of the celebration.',
      },
    ],
    faqs: [
      {
        q: 'Can we choose the music for our wedding film?',
        a: 'Yes, we collaborate closely with you on song selections, tempo, and style preferences.',
      },
      {
        q: 'What resolution is the final video delivered in?',
        a: 'Ultra HD 4K (3840x2160) master file delivered on an encrypted high-speed flash drive and private cloud streaming.',
      },
    ],
  },
  'pre-wedding': {
    title: 'Cinematic Pre-Wedding Photography & Films',
    kicker: 'Coastal Beaches · Heritage Forts · Scenic Romance',
    leadParagraph:
      'Before the bustle of wedding schedules, a pre-wedding session allows you to relax, connect, and celebrate your courtship. Shot along Maharashtra’s picturesque beaches (Navapur, Kelva, Shirgaon) or historic heritage wadas, we direct you naturally without awkward poses.',
    image: '/src/assets/images/portfolio_prewedding_cinematic_1792655861755.jpg',
    traditions: [
      'Golden hour sunrise & sunset beach sessions',
      'Dual outfit styling (Traditional Paithani & Western Evening)',
      'Cinematic musical teaser video with drone perspectives',
      '75+ High-res retouched editorial frames',
      'Coffee table guestbook album for wedding reception display',
    ],
    features: [
      {
        title: 'Natural Direction',
        desc: 'No robotic poses. We create prompts and activities that spark genuine laughter, spontaneous hugs, and peaceful intimacy.',
      },
      {
        title: 'Location Expertise in Palghar District',
        desc: 'We know the exact secret tide timings, secluded beaches, and rocky cliffs around Navapur and Boisar for dramatic light.',
      },
      {
        title: 'Ready for Wedding Stage Display',
        desc: 'Receive digital invites and slideshow files ready to play during your wedding Sangeet or reception dinner.',
      },
    ],
    faqs: [
      {
        q: 'How far in advance should we schedule the pre-wedding?',
        a: 'We recommend shooting 4 to 8 weeks before the wedding so albums and save-the-date graphics are ready.',
      },
      {
        q: 'Do you help with outfit guidance and makeup artists?',
        a: 'Yes! We share a comprehensive mood board and can recommend trusted makeup artists in Palghar.',
      },
    ],
  },
  'haldi-mehendi': {
    title: 'Haldi & Mehendi Celebration Photography',
    kicker: 'Marigold Splashes · Vibrant Colors · Unfiltered Joy',
    leadParagraph:
      'Haldi and Mehendi are the most colorful, unrestrained celebrations of an Indian wedding. From laughter-filled turmeric splashes and water showers to the delicate patience of intricate henna art, our documentary lenses capture the energy as it unfolds.',
    image: '/src/assets/images/portfolio_haldi_celebration_1792655862790.jpg',
    traditions: [
      'Flower shower celebrations & turmeric paste application rituals',
      'Intricate bridal mehendi details and henna storytelling portraits',
      'Family dance performances and spontaneous Dhol tasha celebrations',
      'Emotional candid moments with grandmothers and siblings',
      'High-speed burst capture freezing floating petals and joyful chaos',
    ],
    features: [
      {
        title: 'Fast Action Shutter Speeds',
        desc: 'We shoot with specialized 1/1000s shutter equipment to freeze airborne flower petals and water splashes crisply.',
      },
      {
        title: 'Vibrant True-to-Life Color Science',
        desc: 'We balance yellows, oranges, and festive pinks without blowing out skin highlights.',
      },
      {
        title: 'Next-Day Sneak Peeks',
        desc: 'Get your top 20 favorite Haldi frames within 24 hours to post while the celebration is still fresh.',
      },
    ],
    faqs: [
      {
        q: 'Do your cameras handle water or turmeric splashes safely?',
        a: 'Yes, our equipment is fully weather-sealed professional gear accustomed to celebratory chaos.',
      },
    ],
  },
  'engagement': {
    title: 'Engagement & Sakharpuda Photography',
    kicker: 'The Beginning of Forever · Ring Ceremony · Intimate Moments',
    leadParagraph:
      'The formal declaration of union in Maharashtrian culture—the Sakharpuda—is sweet, intimate, and filled with promise. We capture the exchange of sugar, rings, traditional gifts, and the warm smiles exchanged between the newly united families.',
    image: '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg',
    traditions: [
      'Sakharpuda traditional rituals & gift exchanges',
      'Close-up macro ring exchange photography',
      'Family stage group portraits with balanced studio lighting',
      'Intimate couple portraits post-ceremony',
    ],
    features: [
      {
        title: 'Macro Lens Detailing',
        desc: 'Dedicated 90mm macro optics capturing the sparkling diamond cut and intricate jewelry design.',
      },
      {
        title: 'Prompt Family Coordination',
        desc: 'Smooth stage direction so elders are seated comfortably and family group photos flow quickly.',
      },
    ],
    faqs: [
      {
        q: 'Can engagement photos be bundled with the wedding package?',
        a: 'Yes, bundling saves up to 15% on overall photography fees. Check our package builder for combos.',
      },
    ],
  },
  'maternity-baby': {
    title: 'Maternity & Baby Photography',
    kicker: 'Gentle Portraits · Motherhood · Pure Beginnings',
    leadParagraph:
      'The arrival of a child is life’s most profound milestone. Our maternity and infant sessions prioritize warmth, quiet patience, and safety. Conducted in comfortable home settings or outdoor natural light.',
    image: '/src/assets/images/portfolio_bridal_portrait_1792655861428.jpg',
    traditions: [
      'Maternity silhouette portraits with soft diffused window light',
      'Baby shower (Dohale Jevan) ritual documentation',
      'Candid infant portraits with parents and grandparents',
      'Gentle unhurried pacing with breaks for mother and baby',
    ],
    features: [
      {
        title: 'Safety & Hygiene First',
        desc: 'Sanitized equipment and comfortable room temperatures to ensure the newborn feels calm.',
      },
      {
        title: 'Timeless Monochromes',
        desc: 'Fine-art black and white conversions that highlight the pure innocence and tiny details.',
      },
    ],
    faqs: [
      {
        q: 'What is the best month for maternity photography?',
        a: 'Between the 28th and 34th week of pregnancy, when the bump is beautifully visible and mom is comfortable.',
      },
    ],
  },
  'birthday-events': {
    title: 'Birthday & Event Photography',
    kicker: 'Milestone Celebrations · Family Anniversaries · Social Events',
    leadParagraph:
      'Whether a child’s 1st birthday milestone, a 50th golden wedding anniversary, or a traditional naming ceremony, we bring the same fine-art documentary care to your family celebrations.',
    image: '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg',
    traditions: [
      'Event stage decoration and venue ambiance shots',
      'Cake cutting & celebration bursts',
      'Candid guest interactions and laughter',
      'Full family heirloom group portraits',
    ],
    features: [
      {
        title: 'Quick 7-Day Digital Delivery',
        desc: 'Edited high-resolution gallery delivered within a week so guests can relive the celebration.',
      },
      {
        title: 'Flexible Hourly Coverage',
        desc: 'Book for 3 to 6 hours as needed without paying for full-day packages.',
      },
    ],
    faqs: [
      {
        q: 'Do you provide photo print souvenirs for guests on-site?',
        a: 'Yes, instant 4x6 print counters are available as an optional add-on.',
      },
    ],
  },
};

export function SpecialtyServiceView({ slug, onNavigate }: SpecialtyServiceViewProps) {
  const data = SPECIALTY_MAP[slug] || SPECIALTY_MAP['wedding'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#801B2E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </button>
      </div>

      {/* Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
            {data.kicker}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E] leading-tight">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-xl">
            {data.leadParagraph}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('book')}
              className="px-6 py-3 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase tracking-wider rounded shadow-xs"
            >
              Book This Coverage
            </button>
            <a
              href={createGeneralWhatsAppUrl(`Hello Gitesh, I would like to enquire specifically about ${data.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Gitesh Bari</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[340px] rounded-lg overflow-hidden shadow-xl bg-stone-900">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider text-[10px] block">
              Gitesh Bari Photography
            </span>
            <span className="font-serif font-bold text-amber-100">{data.title} Archive</span>
          </div>
        </div>
      </div>

      {/* Cultural Traditions Covered */}
      <div className="bg-[#F5EFEB] border border-[#EAE2D8] p-8 sm:p-12 rounded-lg space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B38728] block">
            Ritual Documentation
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Traditions & Key Moments We Preserve
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.traditions.map((tradition, idx) => (
            <div key={idx} className="bg-white p-4 rounded border border-stone-200 flex items-start gap-3 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs text-stone-700 leading-relaxed font-medium">{tradition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Craft & Technical Approach */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Our Craft & Aesthetic Direction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features.map((feat, idx) => (
            <div key={idx} className="bg-white border border-[#EAE2D8] p-6 rounded-lg space-y-2 shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#801B2E]">{feat.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="border-t border-[#EAE2D8] pt-12 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-5 rounded border border-stone-200 space-y-2">
              <h3 className="font-semibold text-xs text-stone-900">{faq.q}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Booking Banner */}
      <div className="bg-[#801B2E] text-white p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-amber-100">Ready to Book Your {data.title}?</h3>
          <p className="text-xs text-stone-200 mt-1">Connect directly with studio director Gitesh Bari for date checking.</p>
        </div>
        <button
          onClick={() => onNavigate('book')}
          className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B38728] text-stone-900 text-xs font-bold uppercase tracking-wider rounded shadow-sm shrink-0"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
