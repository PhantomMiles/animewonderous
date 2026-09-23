import { useState } from 'react';
import { X, Mail, Lock, User, Github } from 'lucide-react';
import { Button } from './ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto min-h-[100dvh]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-display uppercase tracking-wider mb-2">
                {mode === 'signin' ? 'Welcome Back' : 'Join the Saga'}
              </h2>
              <p className="text-text-secondary text-sm">
                {mode === 'signin' 
                  ? 'Enter your details to access your account.' 
                  : 'Create an account to start your journey.'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-elevated rounded-full transition-colors text-text-secondary hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end">
                <button className="text-xs text-primary hover:underline">Forgot Password?</button>
              </div>
            )}

            <Button className="w-full h-12 mt-4" onClick={onClose}>
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-4 text-text-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <Github className="h-5 w-5" /> GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="h-5 w-5" alt="Google" /> Google
            </Button>
          </div>

          <p className="text-center text-sm text-text-secondary mt-8">
            {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-primary font-bold hover:underline"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
