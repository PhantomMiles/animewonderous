import { useState, useTransition } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { Button } from './ui/Button';
import { signIn } from 'next-auth/react';
import { signUpUser } from '../app/actions';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [selectedAvatar, setSelectedAvatar] = useState('/images/avatars/default.webp');
  const router = useRouter();

  const presetAvatars = [
    '/images/avatars/default.webp',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Felix',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Jasper',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Mia',
    'https://api.dicebear.com/9.x/notionists/svg?seed=Ryker'
  ];

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    startTransition(async () => {
      try {
        if (mode === 'signup') {
          await signUpUser(formData);
        }
        
        // Log in the user immediately after sign up or if mode is sign in
        const res = await signIn('credentials', {
          redirect: false,
          username,
          password,
        });

        if (res?.error) {
          setError(res.error === 'CredentialsSignin' ? 'Invalid credentials' : res.error);
        } else {
          router.refresh();
          onClose();
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    });
  }

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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <input 
                  name="username"
                  type="text" 
                  required
                  placeholder="Username"
                  className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                    <input 
                      name="email"
                      type="email" 
                      placeholder="name@example.com"
                      className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Choose Avatar</label>
                  <input type="hidden" name="avatar" value={selectedAvatar} />
                  <div className="flex flex-wrap gap-3">
                    {presetAvatars.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 ${
                          selectedAvatar === url 
                            ? 'ring-2 ring-primary scale-110' 
                            : 'ring-1 ring-border opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <input 
                  name="password"
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full h-12 bg-background border border-border rounded-xl pl-12 pr-4 outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {mode === 'signin' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:underline">Forgot Password?</button>
              </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full h-12 mt-4">
              {isPending ? 'Processing...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-8">
            {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
              }}
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
