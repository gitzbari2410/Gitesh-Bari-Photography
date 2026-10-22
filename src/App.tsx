import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { HomeView } from './views/HomeView.tsx';
import { PortfolioView } from './views/PortfolioView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { SpecialtyServiceView } from './views/SpecialtyServiceView.tsx';
import { PackagesQuotationsView } from './views/PackagesQuotationsView.tsx';
import { BookingView } from './views/BookingView.tsx';
import { ContactView } from './views/ContactView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { PrivacyView } from './views/PrivacyView.tsx';
import { AdminDashboardView } from './views/AdminDashboardView.tsx';
import { AdminLoginModal } from './views/AdminLoginModal.tsx';
import { useAppStore } from './data/store.ts';

export default function App() {
  const { settings, isAdmin, actions } = useAppStore();
  const [currentView, setCurrentView] = useState<string>('home');
  const [serviceSlug, setServiceSlug] = useState<string>('wedding');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Scroll to top upon navigating to a new view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, serviceSlug]);

  const handleNavigate = (view: string, slug?: string) => {
    if (view === 'specialty' && slug) {
      setServiceSlug(slug);
      setCurrentView('specialty');
      return;
    }

    if (view === 'admin') {
      if (isAdmin) {
        setCurrentView('admin');
      } else {
        setShowLoginModal(true);
      }
      return;
    }

    setCurrentView(view);
  };

  const handleAdminLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    actions.setAdminLoggedIn(false);
    setCurrentView('home');
  };

  // If currently in the admin dashboard view
  if (currentView === 'admin' && isAdmin) {
    return (
      <AdminDashboardView
        onLogout={handleAdminLogout}
        onNavigateHome={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        brandName={settings.brandName}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentView === 'portfolio' && <PortfolioView onNavigate={handleNavigate} />}
        {currentView === 'services' && <ServicesView onNavigate={handleNavigate} />}
        {currentView === 'specialty' && (
          <SpecialtyServiceView
            slug={serviceSlug}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'packages' && <PackagesQuotationsView onNavigate={handleNavigate} />}
        {currentView === 'book' && <BookingView onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {currentView === 'privacy' && <PrivacyView />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} brandName={settings.brandName} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp onOpenBooking={() => setCurrentView('book')} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
