import { useState } from 'react';
import { Calculator, Check, MessageCircle, FileText, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/quotation.ts';
import { OFFICIAL_PHONE_DIGITS, OFFICIAL_PHONE } from '../utils/whatsapp.ts';

interface PackagesQuotationsViewProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export function PackagesQuotationsView({ onNavigate }: PackagesQuotationsViewProps) {
  // Interactive estimator state
  const [selectedDays, setSelectedDays] = useState<'1' | '2' | '3'>('2');
  const [includeCandid, setIncludeCandid] = useState(true);
  const [includeTraditionalPhoto, setIncludeTraditionalPhoto] = useState(true);
  const [includeCinematicFilm, setIncludeCinematicFilm] = useState(true);
  const [includeTraditionalVideo, setIncludeTraditionalVideo] = useState(true);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [includePreWedding, setIncludePreWedding] = useState(false);
  const [albumTier, setAlbumTier] = useState<'canvera_heritage' | 'standard' | 'none'>('canvera_heritage');

  // Pricing constants (demo rates clearly identified)
  const rates = {
    candidPerDay: 35000,
    traditionalPhotoPerDay: 20000,
    cinematicFilmPerDay: 40000,
    traditionalVideoPerDay: 20000,
    droneCoverage: 15000,
    preWeddingShoot: 35000,
    albumHeritage: 22000,
    albumStandard: 14000,
  };

  const daysNum = parseInt(selectedDays, 10);

  let subtotal = 0;
  if (includeCandid) subtotal += rates.candidPerDay * daysNum;
  if (includeTraditionalPhoto) subtotal += rates.traditionalPhotoPerDay * daysNum;
  if (includeCinematicFilm) subtotal += rates.cinematicFilmPerDay * daysNum;
  if (includeTraditionalVideo) subtotal += rates.traditionalVideoPerDay * daysNum;
  if (includeDrone) subtotal += rates.droneCoverage;
  if (includePreWedding) subtotal += rates.preWeddingShoot;
  if (albumTier === 'canvera_heritage') subtotal += rates.albumHeritage;
  if (albumTier === 'standard') subtotal += rates.albumStandard;

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const advance = Math.round(total * 0.3);
  const balance = total - advance;

  const handleWhatsAppEnquireEstimate = () => {
    const inclusions: string[] = [];
    if (includeCandid) inclusions.push('Candid Photography');
    if (includeTraditionalPhoto) inclusions.push('Traditional Photography');
    if (includeCinematicFilm) inclusions.push('4K Cinematic Film');
    if (includeTraditionalVideo) inclusions.push('Full Ceremony Video');
    if (includeDrone) inclusions.push('Aerial Drone');
    if (includePreWedding) inclusions.push('Pre-Wedding Session');
    if (albumTier === 'canvera_heritage') inclusions.push('Canvera Heritage Luxury Album');
    if (albumTier === 'standard') inclusions.push('Standard Photo Album');

    const msg = [
      'Hello Gitesh Bari Photography,',
      '',
      'I calculated an estimated wedding package on your website quotation builder:',
      `Duration: ${selectedDays} Day(s)`,
      `Selected Services: ${inclusions.join(', ')}`,
      `Estimated Subtotal: ${formatINR(subtotal)}`,
      `Estimated Total (inc. 18% GST): ${formatINR(total)}`,
      '',
      'Please check date availability and share your official quotation.',
      'Thank you!',
    ].join('\n');

    const url = `https://wa.me/${OFFICIAL_PHONE_DIGITS}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B38728] block">
          Transparent Investment & Custom Estimation
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#801B2E]">
          Packages & Quotations
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Use our interactive package builder to configure your custom wedding coverage, albums, and cinematic film.
          For official binding proposals, our studio generates signed branded PDF quotations with payment milestones.
        </p>
      </div>

      {/* Interactive Quotation Calculator Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configurator */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
            <Calculator className="w-5 h-5 text-[#801B2E]" />
            <h2 className="font-serif text-xl font-bold text-stone-900">Configure Your Coverage</h2>
          </div>

          {/* 1. Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              1. Event Duration
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '1', label: '1 Day', sub: 'Wedding Only' },
                { id: '2', label: '2 Days', sub: 'Haldi + Wedding' },
                { id: '3', label: '3 Days', sub: 'Haldi, Sangeet & Vows' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDays(d.id as any)}
                  className={`p-3 text-left rounded border transition-all cursor-pointer ${
                    selectedDays === d.id
                      ? 'border-[#801B2E] bg-[#FDFBF7] ring-1 ring-[#801B2E]'
                      : 'border-stone-200 bg-white hover:border-stone-400'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{d.label}</p>
                  <p className="text-[11px] text-stone-500">{d.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Photography Options */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              2. Photography Coverage
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeCandid}
                    onChange={(e) => setIncludeCandid(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">Candid Photography</span>
                    <p className="text-[11px] text-stone-500">Emotional unstaged heirloom moments & portraits</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.candidPerDay * daysNum)}</span>
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeTraditionalPhoto}
                    onChange={(e) => setIncludeTraditionalPhoto(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">Traditional Stage & Ritual Photography</span>
                    <p className="text-[11px] text-stone-500">Every ritual, guest greeting, and stage group portrait</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.traditionalPhotoPerDay * daysNum)}</span>
              </label>
            </div>
          </div>

          {/* 3. Videography & Films */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              3. Videography & Cinematic Films
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeCinematicFilm}
                    onChange={(e) => setIncludeCinematicFilm(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">4K Cinematic Wedding Highlight Film</span>
                    <p className="text-[11px] text-stone-500">Color-graded 4-6 minute narrative film + 60s teaser</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.cinematicFilmPerDay * daysNum)}</span>
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeTraditionalVideo}
                    onChange={(e) => setIncludeTraditionalVideo(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">Traditional Full-Length Ceremony Video</span>
                    <p className="text-[11px] text-stone-500">Complete documentation of sacred rituals (60-90 mins)</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.traditionalVideoPerDay * daysNum)}</span>
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeDrone}
                    onChange={(e) => setIncludeDrone(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">4K Aerial Drone Coverage</span>
                    <p className="text-[11px] text-stone-500">Aerial perspectives of baraat, outdoor lawns & venue</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.droneCoverage)}</span>
              </label>
            </div>
          </div>

          {/* 4. Pre-Wedding & Albums */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              4. Pre-Wedding & Albums
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/70 rounded border border-stone-200 cursor-pointer text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includePreWedding}
                    onChange={(e) => setIncludePreWedding(e.target.checked)}
                    className="w-4 h-4 text-[#801B2E] accent-[#801B2E] rounded"
                  />
                  <div>
                    <span className="font-bold text-stone-900">Cinematic Pre-Wedding Shoot Add-On</span>
                    <p className="text-[11px] text-stone-500">1 Full day at coastal beach & heritage backdrops with video teaser</p>
                  </div>
                </div>
                <span className="font-mono text-stone-700 font-semibold">{formatINR(rates.preWeddingShoot)}</span>
              </label>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Printed Heirloom Photo Album
                </label>
                <select
                  value={albumTier}
                  onChange={(e) => setAlbumTier(e.target.value as any)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded bg-white"
                >
                  <option value="canvera_heritage">Canvera Signature Heritage Hardcover (40 Pages) — ₹22,000</option>
                  <option value="standard">Standard Lay-flat Photo Book (30 Pages) — ₹14,000</option>
                  <option value="none">No Album (Digital delivery only) — ₹0</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary Card */}
        <div className="lg:col-span-5 sticky top-28 bg-[#FDFBF7] border border-[#EAE2D8] p-6 sm:p-8 rounded-lg shadow-md space-y-6">
          <div className="border-b border-[#EAE2D8] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B38728] block">
              Live Custom Estimate
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#801B2E]">
              Investment Breakdown
            </h3>
            <p className="text-[11px] text-stone-500 mt-1">
              *Sample calculation based on selected options. Final quote is subject to availability and specific logistics.
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Duration Coverage:</span>
              <span className="font-semibold">{selectedDays} Day(s)</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Subtotal Services:</span>
              <span className="font-mono tabular-nums">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Applicable GST (18%):</span>
              <span className="font-mono tabular-nums">{formatINR(gst)}</span>
            </div>

            <div className="border-t-2 border-stone-300 pt-3 flex justify-between text-base font-bold text-[#801B2E]">
              <span>Estimated Package Total:</span>
              <span className="font-mono text-lg tabular-nums">{formatINR(total)}</span>
            </div>

            <div className="bg-white p-3.5 rounded border border-[#EAE2D8] space-y-2 text-xs text-stone-700 mt-4">
              <div className="flex justify-between">
                <span>Advance Token to Reserve (30%):</span>
                <span className="font-mono font-bold text-[#801B2E]">{formatINR(advance)}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Balance on Event:</span>
                <span className="font-mono font-semibold">{formatINR(balance)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppEnquireEstimate}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share Estimate on WhatsApp</span>
            </button>

            <button
              onClick={() => onNavigate('book')}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase tracking-wider rounded transition-all"
            >
              <span>Book This Custom Configuration</span>
            </button>
          </div>

          <div className="border-t border-[#EAE2D8] pt-4 text-[11px] text-stone-500 space-y-1">
            <p><strong>Studio Manager Note:</strong> Need a customized quotation with drone waivers, additional family albums, or corporate event coverage?</p>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[#801B2E] font-medium hover:underline inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Admin: Access Official PDF Quotation Builder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
