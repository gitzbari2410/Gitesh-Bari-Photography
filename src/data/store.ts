import { useState, useEffect } from 'react';
import {
  PortfolioItem,
  ServicePackage,
  Testimonial,
  WebsiteSettings,
  BookingEnquiry,
} from '../types/index.ts';
import { QuotationData } from '../utils/quotation.ts';
import {
  initialSettings,
  initialPortfolio,
  initialServices,
  initialTestimonials,
  initialQuotations,
  initialEnquiries,
} from './initialData.ts';

const STORAGE_KEYS = {
  SETTINGS: 'gbp_settings_v1',
  PORTFOLIO: 'gbp_portfolio_v1',
  SERVICES: 'gbp_services_v1',
  TESTIMONIALS: 'gbp_testimonials_v1',
  QUOTATIONS: 'gbp_quotations_v1',
  ENQUIRIES: 'gbp_enquiries_v1',
  AUTH: 'gbp_admin_auth_v1',
};

// Safe storage helpers
function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Failed to read ${key} from storage:`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger custom event so other components or tabs update immediately
    window.dispatchEvent(new CustomEvent('gbp_storage_updated', { detail: { key } }));
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e);
  }
}

// In-memory singletons for instantaneous state sync
let stateSettings: WebsiteSettings = loadStorage(STORAGE_KEYS.SETTINGS, initialSettings);
let statePortfolio: PortfolioItem[] = loadStorage(STORAGE_KEYS.PORTFOLIO, initialPortfolio);
let stateServices: ServicePackage[] = loadStorage(STORAGE_KEYS.SERVICES, initialServices);
let stateTestimonials: Testimonial[] = loadStorage(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
let stateQuotations: QuotationData[] = loadStorage(STORAGE_KEYS.QUOTATIONS, initialQuotations);
let stateEnquiries: BookingEnquiry[] = loadStorage(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
let stateIsAdminLoggedIn: boolean = loadStorage(STORAGE_KEYS.AUTH, false);

// Event dispatch helper
function notifyListeners() {
  window.dispatchEvent(new Event('gbp_state_change'));
}

export const Store = {
  // Settings
  getSettings: () => stateSettings,
  updateSettings: (newSettings: Partial<WebsiteSettings>) => {
    stateSettings = { ...stateSettings, ...newSettings };
    saveStorage(STORAGE_KEYS.SETTINGS, stateSettings);
    notifyListeners();
  },

  // Portfolio
  getPortfolio: () => statePortfolio,
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'order'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
      order: statePortfolio.length + 1,
    };
    statePortfolio = [newItem, ...statePortfolio];
    saveStorage(STORAGE_KEYS.PORTFOLIO, statePortfolio);
    notifyListeners();
    return newItem;
  },
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => {
    statePortfolio = statePortfolio.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveStorage(STORAGE_KEYS.PORTFOLIO, statePortfolio);
    notifyListeners();
  },
  deletePortfolioItem: (id: string) => {
    statePortfolio = statePortfolio.filter((item) => item.id !== id);
    saveStorage(STORAGE_KEYS.PORTFOLIO, statePortfolio);
    notifyListeners();
  },
  reorderPortfolio: (items: PortfolioItem[]) => {
    statePortfolio = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    saveStorage(STORAGE_KEYS.PORTFOLIO, statePortfolio);
    notifyListeners();
  },

  // Services
  getServices: () => stateServices,
  addService: (service: Omit<ServicePackage, 'id'>) => {
    const newService: ServicePackage = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    stateServices = [...stateServices, newService];
    saveStorage(STORAGE_KEYS.SERVICES, stateServices);
    notifyListeners();
    return newService;
  },
  updateService: (id: string, updates: Partial<ServicePackage>) => {
    stateServices = stateServices.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveStorage(STORAGE_KEYS.SERVICES, stateServices);
    notifyListeners();
  },
  deleteService: (id: string) => {
    stateServices = stateServices.filter((s) => s.id !== id);
    saveStorage(STORAGE_KEYS.SERVICES, stateServices);
    notifyListeners();
  },

  // Quotations
  getQuotations: () => stateQuotations,
  addQuotation: (quotation: QuotationData) => {
    stateQuotations = [quotation, ...stateQuotations];
    saveStorage(STORAGE_KEYS.QUOTATIONS, stateQuotations);
    notifyListeners();
    return quotation;
  },
  updateQuotation: (id: string, updates: Partial<QuotationData>) => {
    stateQuotations = stateQuotations.map((q) => (q.id === id ? { ...q, ...updates } : q));
    saveStorage(STORAGE_KEYS.QUOTATIONS, stateQuotations);
    notifyListeners();
  },
  deleteQuotation: (id: string) => {
    stateQuotations = stateQuotations.filter((q) => q.id !== id);
    saveStorage(STORAGE_KEYS.QUOTATIONS, stateQuotations);
    notifyListeners();
  },

  // Enquiries
  getEnquiries: () => stateEnquiries,
  addEnquiry: (enquiry: Omit<BookingEnquiry, 'id' | 'status' | 'createdAt'>) => {
    const newEnquiry: BookingEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    stateEnquiries = [newEnquiry, ...stateEnquiries];
    saveStorage(STORAGE_KEYS.ENQUIRIES, stateEnquiries);
    notifyListeners();
    return newEnquiry;
  },
  updateEnquiry: (id: string, updates: Partial<BookingEnquiry>) => {
    stateEnquiries = stateEnquiries.map((e) => (e.id === id ? { ...e, ...updates } : e));
    saveStorage(STORAGE_KEYS.ENQUIRIES, stateEnquiries);
    notifyListeners();
  },
  deleteEnquiry: (id: string) => {
    stateEnquiries = stateEnquiries.filter((e) => e.id !== id);
    saveStorage(STORAGE_KEYS.ENQUIRIES, stateEnquiries);
    notifyListeners();
  },

  // Testimonials
  getTestimonials: () => stateTestimonials,
  addTestimonial: (testi: Omit<Testimonial, 'id'>) => {
    const newTesti: Testimonial = { ...testi, id: `test-${Date.now()}` };
    stateTestimonials = [newTesti, ...stateTestimonials];
    saveStorage(STORAGE_KEYS.TESTIMONIALS, stateTestimonials);
    notifyListeners();
  },
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => {
    stateTestimonials = stateTestimonials.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveStorage(STORAGE_KEYS.TESTIMONIALS, stateTestimonials);
    notifyListeners();
  },
  deleteTestimonial: (id: string) => {
    stateTestimonials = stateTestimonials.filter((t) => t.id !== id);
    saveStorage(STORAGE_KEYS.TESTIMONIALS, stateTestimonials);
    notifyListeners();
  },

  // Auth
  isAdminLoggedIn: () => stateIsAdminLoggedIn,
  setAdminLoggedIn: (val: boolean) => {
    stateIsAdminLoggedIn = val;
    saveStorage(STORAGE_KEYS.AUTH, val);
    notifyListeners();
  },
  resetToDefaults: () => {
    stateSettings = initialSettings;
    statePortfolio = initialPortfolio;
    stateServices = initialServices;
    stateTestimonials = initialTestimonials;
    stateQuotations = initialQuotations;
    stateEnquiries = initialEnquiries;
    saveStorage(STORAGE_KEYS.SETTINGS, stateSettings);
    saveStorage(STORAGE_KEYS.PORTFOLIO, statePortfolio);
    saveStorage(STORAGE_KEYS.SERVICES, stateServices);
    saveStorage(STORAGE_KEYS.TESTIMONIALS, stateTestimonials);
    saveStorage(STORAGE_KEYS.QUOTATIONS, stateQuotations);
    saveStorage(STORAGE_KEYS.ENQUIRIES, stateEnquiries);
    notifyListeners();
  },
};

export function useAppStore() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setVersion((v) => v + 1);
    };
    window.addEventListener('gbp_state_change', handleUpdate);
    window.addEventListener('gbp_storage_updated', handleUpdate);
    return () => {
      window.removeEventListener('gbp_state_change', handleUpdate);
      window.removeEventListener('gbp_storage_updated', handleUpdate);
    };
  }, []);

  return {
    settings: Store.getSettings(),
    portfolio: Store.getPortfolio(),
    services: Store.getServices(),
    testimonials: Store.getTestimonials(),
    quotations: Store.getQuotations(),
    enquiries: Store.getEnquiries(),
    isAdmin: Store.isAdminLoggedIn(),
    actions: Store,
  };
}
