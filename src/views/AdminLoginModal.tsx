import { useState } from 'react';
import { Lock, ShieldCheck, X, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { useAppStore } from '../data/store.ts';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const { actions } = useAppStore();
  const [email, setEmail] = useState('gitzbari@gmail.com');
  const [password, setPassword] = useState('GiteshBari@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Validate credentials
      const cleanEmail = email.trim().toLowerCase();
      if ((cleanEmail === 'gitzbari@gmail.com' || cleanEmail === 'admin@giteshbari.com') && password === 'GiteshBari@2026') {
        actions.setAdminLoggedIn(true);
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Please use the authorized studio email and password.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('gitzbari@gmail.com');
    setPassword('GiteshBari@2026');
    setError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admin Sign In Portal"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#801B2E] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold leading-tight">Studio Admin Portal</h3>
              <p className="text-[11px] text-amber-200">Gitesh Bari Photography Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white rounded"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Admin Email ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none text-xs"
              placeholder="gitzbari@gmail.com"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded focus:ring-1 focus:ring-[#801B2E] outline-none text-xs pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#FDFBF7] border border-[#EAE2D8] rounded text-[11px] text-stone-600 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-800 flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-[#B38728]" />
                Owner Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#801B2E] hover:underline font-semibold"
              >
                Auto-fill
              </button>
            </div>
            <p><strong>Email:</strong> <code className="font-mono text-stone-700">gitzbari@gmail.com</code></p>
            <p><strong>Password:</strong> <code className="font-mono text-stone-700">GiteshBari@2026</code></p>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-[#801B2E] hover:bg-[#6B1728] text-white font-semibold uppercase tracking-wider rounded shadow transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
