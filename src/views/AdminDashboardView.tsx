import { useState } from 'react';
import {
  Home,
  Image as ImageIcon,
  Package,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  Share2,
  Eye,
  ExternalLink,
  MessageCircle,
  Database,
  Star,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../data/store.ts';
import { PortfolioItem, ServicePackage, Testimonial, BookingEnquiry, PortfolioCategory } from '../types/index.ts';
import { QuotationData, formatINR } from '../utils/quotation.ts';
import { QuotationEditor } from '../components/QuotationEditor.tsx';
import { QuotationPrintView } from '../components/QuotationPrintView.tsx';
import { createQuotationWhatsAppShareUrl, OFFICIAL_PHONE_DIGITS } from '../utils/whatsapp.ts';

interface AdminDashboardViewProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

type AdminTab =
  | 'homepage'
  | 'portfolio'
  | 'services'
  | 'quotations'
  | 'enquiries'
  | 'settings'
  | 'firebase';

export function AdminDashboardView({ onLogout, onNavigateHome }: AdminDashboardViewProps) {
  const { settings, portfolio, services, testimonials, quotations, enquiries, actions } = useAppStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('homepage');

  // Quotation sub-views: list | edit | print
  const [quotationMode, setQuotationMode] = useState<'list' | 'edit' | 'print'>('list');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationData | null>(null);

  // Status feedback toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // --- Homepage Editor States ---
  const [hpHeadline, setHpHeadline] = useState(settings.heroHeadline);
  const [hpSubheading, setHpSubheading] = useState(settings.heroSubheading);
  const [hpAboutStory, setHpAboutStory] = useState(settings.aboutStory);
  const [hpAboutPhilosophy, setHpAboutPhilosophy] = useState(settings.aboutPhilosophy);

  // --- Portfolio New Item Form State ---
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<PortfolioCategory>('weddings');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');
  const [newPhotoLocation, setNewPhotoLocation] = useState('Palghar, Maharashtra');
  const [newPhotoFeatured, setNewPhotoFeatured] = useState(true);
  const [newPhotoCamera, setNewPhotoCamera] = useState('Sony A7 IV');
  const [newPhotoLens, setNewPhotoLens] = useState('50mm f/1.2 GM');
  const [newPhotoSettings, setNewPhotoSettings] = useState('1/500s · f/1.4 · ISO 100');

  // --- Service New Item Form State ---
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Wedding Photography');
  const [newServiceShortDesc, setNewServiceShortDesc] = useState('');
  const [newServiceFullDesc, setNewServiceFullDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(75000);
  const [newServicePhotographers, setNewServicePhotographers] = useState(2);
  const [newServiceCinematographers, setNewServiceCinematographers] = useState(1);
  const [newServiceCoverage, setNewServiceCoverage] = useState('Full Day (Up to 10 Hours)');
  const [newServiceAlbum, setNewServiceAlbum] = useState('Canvera 30-Page Album');

  // --- Website Settings State ---
  const [brandName, setBrandName] = useState(settings.brandName);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [address, setAddress] = useState(settings.address);
  const [email, setEmail] = useState(settings.email);
  const [hours, setHours] = useState(settings.openingHours);
  const [taxRate, setTaxRate] = useState(settings.taxRatePercent);
  const [advanceRate, setAdvanceRate] = useState(settings.defaultAdvancePercent);
  const [instagram, setInstagram] = useState(settings.instagramUrl);
  const [youtube, setYoutube] = useState(settings.youtubeUrl);
  const [facebook, setFacebook] = useState(settings.facebookUrl);

  // Handlers
  const handleSaveHomepage = () => {
    actions.updateSettings({
      heroHeadline: hpHeadline,
      heroSubheading: hpSubheading,
      aboutStory: hpAboutStory,
      aboutPhilosophy: hpAboutPhilosophy,
    });
    showToast('Homepage text and stories saved successfully!');
  };

  const handleSaveSettings = () => {
    actions.updateSettings({
      brandName,
      phone,
      whatsappNumber,
      address,
      email,
      openingHours: hours,
      taxRatePercent: Number(taxRate) || 18,
      defaultAdvancePercent: Number(advanceRate) || 30,
      instagramUrl: instagram,
      youtubeUrl: youtube,
      facebookUrl: facebook,
    });
    showToast('Website contact & business settings updated!');
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) {
      alert('Please provide a title and image URL');
      return;
    }

    actions.addPortfolioItem({
      title: newPhotoTitle,
      category: newPhotoCategory,
      imageUrl: newPhotoUrl,
      description: newPhotoDesc,
      location: newPhotoLocation,
      featuredOnHome: newPhotoFeatured,
      exif: {
        camera: newPhotoCamera,
        lens: newPhotoLens,
        settings: newPhotoSettings,
      },
      isSample: false,
    });

    setShowAddPhotoModal(false);
    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoDesc('');
    showToast('New photograph added to portfolio!');
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) {
      alert('Please enter service title');
      return;
    }

    const slug = newServiceTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    actions.addService({
      slug,
      title: newServiceTitle,
      category: newServiceCategory,
      shortDesc: newServiceShortDesc,
      fullDesc: newServiceFullDesc,
      demoPriceINR: Number(newServicePrice) || 50000,
      isSamplePrice: true,
      photographersCount: Number(newServicePhotographers) || 1,
      cinematographersCount: Number(newServiceCinematographers) || 0,
      coverageHours: newServiceCoverage,
      albumSpecs: newServiceAlbum,
      deliverables: ['High-res color-graded photos', 'Online digital cloud gallery'],
      deliveryTimeline: '2 to 3 weeks',
      optionalAddons: [{ name: 'Drone Aerial Highlights', priceINR: 10000 }],
      isPublished: true,
      imageUrl: '/src/assets/images/hero_wedding_cinematic_1792655860993.jpg',
    });

    setShowAddServiceModal(false);
    setNewServiceTitle('');
    setNewServiceShortDesc('');
    setNewServiceFullDesc('');
    showToast('New photography service package created!');
  };

  // If viewing or editing quotation
  if (quotationMode === 'print' && selectedQuotation) {
    return (
      <QuotationPrintView
        quotation={selectedQuotation}
        onBack={() => setQuotationMode('list')}
      />
    );
  }

  if (quotationMode === 'edit') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <QuotationEditor
          initialQuotation={selectedQuotation}
          onSave={(saved) => {
            if (selectedQuotation) {
              actions.updateQuotation(saved.id, saved);
              showToast(`Quotation ${saved.quotationNumber} updated!`);
            } else {
              actions.addQuotation(saved);
              showToast(`New Quotation ${saved.quotationNumber} generated!`);
            }
            setQuotationMode('list');
            setSelectedQuotation(null);
          }}
          onCancel={() => {
            setQuotationMode('list');
            setSelectedQuotation(null);
          }}
          onPreview={(q) => {
            setSelectedQuotation(q);
            setQuotationMode('print');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Admin Navbar */}
      <div className="bg-[#801B2E] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-serif font-bold text-[#D4AF37]">
            GB
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight">Gitesh Bari Photography</h1>
            <p className="text-[10px] uppercase tracking-widest text-amber-200">
              Master Admin & Studio Operations Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="text-xs text-amber-200 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/20 hover:bg-black/40 text-amber-100 hover:text-white rounded text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-[#D4AF37] animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white p-3 rounded-lg border border-stone-200 shadow-xs space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Studio Management
          </div>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'homepage' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Homepage & Hero Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'portfolio' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Portfolio Manager ({portfolio.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'services' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Services & Packages ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotations')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'quotations' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Quotations & PDF ({quotations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'enquiries' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4" />
              <span>Booking Enquiries</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-800'
            }`}>
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
              activeTab === 'settings' ? 'bg-[#801B2E] text-white' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website & Studio Settings</span>
          </button>

          <div className="pt-2 border-t border-stone-100 mt-2">
            <button
              onClick={() => setActiveTab('firebase')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold rounded transition-colors text-left ${
                activeTab === 'firebase' ? 'bg-[#801B2E] text-white' : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <Database className="w-4 h-4 text-[#B38728]" />
              <span>Firebase Cloud Integration</span>
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
          {/* TAB 1: HOMEPAGE EDITOR */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Homepage Content Editor</h2>
                  <p className="text-xs text-stone-500">Edit hero headings, subtitles, and studio philosophy text.</p>
                </div>
                <button
                  onClick={handleSaveHomepage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase rounded shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={hpHeadline}
                    onChange={(e) => setHpHeadline(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded font-serif text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Hero Subtitle & Specialties
                  </label>
                  <input
                    type="text"
                    value={hpSubheading}
                    onChange={(e) => setHpSubheading(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    About Section — Studio Heritage & Story
                  </label>
                  <textarea
                    rows={4}
                    value={hpAboutStory}
                    onChange={(e) => setHpAboutStory(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    About Section — Artistic Philosophy
                  </label>
                  <textarea
                    rows={3}
                    value={hpAboutPhilosophy}
                    onChange={(e) => setHpAboutPhilosophy(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Portfolio Image Manager</h2>
                  <p className="text-xs text-stone-500">
                    Upload new photographs, replace, delete, change categories, or toggle homepage spotlight.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddPhotoModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase rounded shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Upload / Add Photograph</span>
                </button>
              </div>

              {/* Photos List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex gap-3 items-start justify-between"
                  >
                    <div className="flex gap-3 items-start">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded bg-stone-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5 text-xs">
                        <h4 className="font-semibold text-stone-900">{item.title}</h4>
                        <p className="text-stone-500 text-[11px] capitalize">{item.category.replace('-', ' ')}</p>
                        <p className="text-stone-400 text-[10px]">{item.location}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              actions.updatePortfolioItem(item.id, { featuredOnHome: !item.featuredOnHome });
                              showToast(`Updated featured status for ${item.title}`);
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                              item.featuredOnHome
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span>{item.featuredOnHome ? 'Featured on Home' : 'Not Featured'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                          actions.deletePortfolioItem(item.id);
                          showToast(`Deleted ${item.title}`);
                        }
                      }}
                      className="text-stone-400 hover:text-red-600 p-1"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES & PACKAGES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Services & Package Templates</h2>
                  <p className="text-xs text-stone-500">Manage wedding packages, inclusions, demo rates, and deliverables.</p>
                </div>
                <button
                  onClick={() => setShowAddServiceModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase rounded shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Create New Service</span>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{srv.title}</span>
                        <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded uppercase font-semibold text-stone-700">
                          {srv.category}
                        </span>
                      </div>
                      <p className="text-stone-600">{srv.shortDesc}</p>
                      <p className="text-stone-500 text-[11px]">
                        Team: {srv.photographersCount} Photo, {srv.cinematographersCount} Film · {srv.coverageHours}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase">Price</span>
                        <span className="font-mono font-bold text-[#801B2E] text-sm tabular-nums">
                          {formatINR(srv.demoPriceINR)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete service "${srv.title}"?`)) {
                            actions.deleteService(srv.id);
                            showToast(`Deleted service ${srv.title}`);
                          }
                        }}
                        className="text-stone-400 hover:text-red-600 p-1"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: QUOTATIONS */}
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Quotation Management</h2>
                  <p className="text-xs text-stone-500">
                    Create formal quotations, print/download branded PDFs, and share via WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedQuotation(null);
                    setQuotationMode('edit');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase rounded shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Build New Quotation</span>
                </button>
              </div>

              {quotations.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No quotations created yet. Click "Build New Quotation" to create one.
                </div>
              ) : (
                <div className="space-y-3">
                  {quotations.map((q) => {
                    const subtotal = q.items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
                    const grand = Math.round(subtotal * (1 + q.taxRatePercent / 100));
                    const whatsAppShare = createQuotationWhatsAppShareUrl(
                      q.clientPhone,
                      q.quotationNumber,
                      formatINR(grand),
                      q.clientName
                    );

                    return (
                      <div
                        key={q.id}
                        className="p-4 bg-stone-50 border border-stone-200 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#801B2E]">{q.quotationNumber}</span>
                            <span className="font-semibold text-stone-900">{q.clientName}</span>
                            <span className="capitalize text-[10px] bg-stone-200 px-2 py-0.5 rounded font-medium">
                              {q.status}
                            </span>
                          </div>
                          <p className="text-stone-600">Events: {q.eventNames} · Phone: {q.clientPhone}</p>
                          <p className="text-stone-400 text-[11px]">{q.items.length} line items · Created {q.createdAt}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-right mr-2">
                            <span className="text-[10px] text-stone-400 block uppercase">Est. Total</span>
                            <span className="font-mono font-bold text-stone-900 tabular-nums">
                              {formatINR(grand)}
                            </span>
                          </div>

                          <a
                            href={whatsAppShare}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-[#25D366] text-white hover:bg-[#20ba59] rounded"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedQuotation(q);
                              setQuotationMode('print');
                            }}
                            className="p-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded"
                            title="Print / Save PDF"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedQuotation(q);
                              setQuotationMode('edit');
                            }}
                            className="p-2 bg-[#801B2E] text-white hover:bg-[#6B1728] rounded"
                            title="Edit Quotation"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete quotation ${q.quotationNumber}?`)) {
                                actions.deleteQuotation(q.id);
                                showToast(`Deleted quotation ${q.quotationNumber}`);
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-red-600"
                            title="Delete Quotation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: BOOKING ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <h2 className="font-serif text-2xl font-bold text-stone-900">Client Booking Enquiries</h2>
                <p className="text-xs text-stone-500">
                  Client submissions captured via WhatsApp booking form. Track lead status and contact clients.
                </p>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No booking enquiries yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => {
                    const cleanPhone = enq.phone.replace(/\D/g, '');
                    const clientWhatsAppUrl = `https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(
                      `Hello ${enq.fullName}, this is Gitesh Bari regarding your photography enquiry for ${enq.eventDate}.`
                    )}`;

                    return (
                      <div
                        key={enq.id}
                        className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-200 pb-2">
                          <div>
                            <span className="font-bold text-stone-900 text-sm">{enq.fullName}</span>
                            <span className="text-stone-500 ml-2">Phone: {enq.phone}</span>
                            {enq.email && <span className="text-stone-400 ml-2">· {enq.email}</span>}
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enq.status}
                              onChange={(e) => {
                                actions.updateEnquiry(enq.id, { status: e.target.value as any });
                                showToast(`Enquiry status updated to ${e.target.value}`);
                              }}
                              className="text-xs p-1 bg-white border border-stone-300 rounded font-semibold capitalize"
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="quoted">Quoted</option>
                              <option value="booked">Booked</option>
                              <option value="archived">Archived</option>
                            </select>

                            <a
                              href={clientWhatsAppUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba59] text-white rounded text-[11px] font-semibold"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete enquiry from ${enq.fullName}?`)) {
                                  actions.deleteEnquiry(enq.id);
                                  showToast('Enquiry deleted');
                                }
                              }}
                              className="p-1 text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-600">
                          <p><strong>Event:</strong> {enq.eventType}</p>
                          <p><strong>Date:</strong> {enq.eventDate}</p>
                          <p><strong>Location:</strong> {enq.eventLocation}</p>
                          <p><strong>Package:</strong> {enq.preferredPackage || 'Custom'}</p>
                          <p><strong>Budget:</strong> {enq.approximateBudget || 'Open'}</p>
                          <p><strong>Duration:</strong> {enq.numberOfDays || '1 Day'}</p>
                        </div>

                        {enq.additionalMessage && (
                          <div className="p-2 bg-white rounded border border-stone-200 text-stone-700">
                            <strong>Client Note:</strong> {enq.additionalMessage}
                          </div>
                        )}

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-500 mb-0.5">
                            Internal Studio Notes (Private to Admin):
                          </label>
                          <input
                            type="text"
                            defaultValue={enq.internalNotes || ''}
                            onBlur={(e) => {
                              actions.updateEnquiry(enq.id, { internalNotes: e.target.value });
                              showToast('Internal notes saved');
                            }}
                            placeholder="Add private note (e.g. Sent sample album link, couple preferred sunset slot)"
                            className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: WEBSITE & STUDIO SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Website & Studio Settings</h2>
                  <p className="text-xs text-stone-500">Configure studio details, GST tax rates, and social profiles.</p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#801B2E] hover:bg-[#6B1728] text-white text-xs font-semibold uppercase rounded shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded font-serif"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone & WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Official Studio Address (At-Post-Navapur)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Studio Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Default GST Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                    className="w-full p-2.5 border border-stone-300 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Default Advance Token Required (%)
                  </label>
                  <input
                    type="number"
                    value={advanceRate}
                    onChange={(e) => setAdvanceRate(Number(e.target.value) || 0)}
                    className="w-full p-2.5 border border-stone-300 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Instagram Profile Link
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    YouTube Channel Link
                  </label>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full p-2.5 border border-stone-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FIREBASE CLOUD INTEGRATION */}
          {activeTab === 'firebase' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B38728] block">
                  Cloud Storage & Multi-Device Sync Architecture
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Firebase & Persistent Cloud Storage Guide
                </h2>
                <p className="text-xs text-stone-500">
                  Connect Firebase Authentication, Cloud Firestore, and Firebase Storage for production deployment.
                </p>
              </div>

              <div className="bg-[#FDFBF7] p-5 rounded-lg border border-[#EAE2D8] space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold text-stone-900">Active Storage Mode: Local Persistent Engine (Online)</span>
                </div>
                <p className="text-stone-600">
                  Your website is currently storing all homepage copy, portfolio photographs, quotation calculations,
                  and client enquiries in local browser storage. All changes persist across reloads.
                </p>
              </div>

              {/* Step-by-Step Production Setup Instructions */}
              <div className="space-y-4 text-xs text-stone-700">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  To Connect Live Firebase Cloud Project:
                </h3>

                <ol className="list-decimal pl-5 space-y-3 leading-relaxed">
                  <li>
                    <strong>Create Firebase Project:</strong> Visit{' '}
                    <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#801B2E] underline">
                      Firebase Console
                    </a>{' '}
                    and create a new project named <code>gitesh-bari-photography</code>.
                  </li>
                  <li>
                    <strong>Enable Authentication:</strong> In Firebase Console → Authentication → Sign-in method,
                    enable <strong>Email/Password</strong> and create user <code>gitzbari@gmail.com</code>.
                  </li>
                  <li>
                    <strong>Enable Cloud Firestore:</strong> In Firestore Database, create database in Production
                    mode with regional location <code>asia-south1 (Mumbai)</code>.
                  </li>
                  <li>
                    <strong>Configure Security Rules:</strong> Allow public read for published portfolio and
                    services; restrict write operations and private quotation documents to authenticated admin (<code>request.auth != null</code>).
                  </li>
                  <li>
                    <strong>Enable Cloud Storage:</strong> Under Storage, create bucket for wedding high-resolution
                    photos and client sneak peeks.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Photograph */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801B2E]">Add Photograph to Portfolio</h3>
            <form onSubmit={handleAddPhotoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Photograph Title *</label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="e.g. Sunset Antarpat Ceremony"
                  className="w-full p-2 border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                    className="w-full p-2 border border-stone-300 rounded capitalize"
                  >
                    <option value="weddings">Weddings</option>
                    <option value="candid">Candid Photography</option>
                    <option value="traditional">Traditional Photography</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="haldi">Haldi</option>
                    <option value="mehendi">Mehendi</option>
                    <option value="engagement">Engagement</option>
                    <option value="maternity">Maternity</option>
                    <option value="baby">Baby</option>
                    <option value="birthday-events">Birthday & Events</option>
                    <option value="cinematic-films">Cinematic Films</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newPhotoLocation}
                    onChange={(e) => setNewPhotoLocation(e.target.value)}
                    placeholder="Palghar, Maharashtra"
                    className="w-full p-2 border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full p-2 border border-stone-300 rounded font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description / Story</label>
                <textarea
                  rows={2}
                  value={newPhotoDesc}
                  onChange={(e) => setNewPhotoDesc(e.target.value)}
                  placeholder="Ceremony context, lighting, or couple emotion"
                  className="w-full p-2 border border-stone-300 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featHome"
                  checked={newPhotoFeatured}
                  onChange={(e) => setNewPhotoFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#801B2E] accent-[#801B2E]"
                />
                <label htmlFor="featHome" className="text-stone-700 font-medium">Feature on Homepage Bento Grid</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#801B2E] text-white font-semibold rounded"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-xl border border-stone-200 p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#801B2E]">Create Photography Package</h3>
            <form onSubmit={handleAddServiceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  placeholder="e.g. Royal Maharashtrian 2-Day Celebration"
                  className="w-full p-2 border border-stone-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Demo Rate in INR (₹)</label>
                  <input
                    type="number"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(Number(e.target.value) || 0)}
                    className="w-full p-2 border border-stone-300 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={newServiceShortDesc}
                  onChange={(e) => setNewServiceShortDesc(e.target.value)}
                  placeholder="1-line summary for cards"
                  className="w-full p-2 border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Description</label>
                <textarea
                  rows={2}
                  value={newServiceFullDesc}
                  onChange={(e) => setNewServiceFullDesc(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#801B2E] text-white font-semibold rounded"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
