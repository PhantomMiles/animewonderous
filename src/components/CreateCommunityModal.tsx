import { X, ImageIcon, Globe, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { createCommunity } from '../app/actions';
import { useTransition, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCommunityModal({ isOpen, onClose }: CreateCommunityModalProps) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto min-h-[100dvh]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display uppercase tracking-wider">Create a Community</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-elevated rounded-full transition-colors text-text-secondary hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form className="p-6 space-y-6 max-h-[80vh] overflow-y-auto" action={(formData) => {
          if (avatarUrl) formData.append('avatarUrl', avatarUrl);
          startTransition(async () => {
            await createCommunity(formData);
            setAvatarUrl(null);
            onClose();
          });
        }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Community Name</label>
              <input 
                type="text" 
                name="name"
                required
                placeholder="e.g. Solo Leveling Fans"
                className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Privacy</label>
              <div className="flex gap-2">
                <button type="button" className="flex-1 flex items-center gap-2 px-4 py-3 bg-primary/10 border border-primary text-primary rounded-xl text-sm font-bold">
                  <Globe className="h-4 w-4" /> Public
                </button>
                <button type="button" className="flex-1 flex items-center gap-2 px-4 py-3 bg-background border border-border text-text-muted rounded-xl text-sm font-bold">
                  <Lock className="h-4 w-4" /> Private
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Tags (comma separated)</label>
            <input 
              type="text" 
              name="tags"
              placeholder="e.g. Anime, Cosplay, Gaming"
              className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Description</label>
            <textarea 
              name="description"
              required
              rows={4}
              placeholder="Tell everyone what this community is about..."
              className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <div>
            <div className="space-y-2 max-w-sm">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Avatar Image</label>
              {avatarUrl ? (
                <div className="relative h-32 rounded-2xl overflow-hidden border border-border group">
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => setAvatarUrl(null)} className="text-white text-xs underline">Remove</button>
                  </div>
                  <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-400" />
                </div>
              ) : (
                <CldUploadWidget uploadPreset="animewonderous_preset" onSuccess={(r: any) => setAvatarUrl(r.info.secure_url)}>
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="w-full h-32 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-white/[0.02] transition-all cursor-pointer">
                      <ImageIcon className="h-8 w-8 text-text-muted" />
                      <span className="text-xs text-text-muted font-bold">Upload Avatar</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
            <Button className="px-8" disabled={isPending}>{isPending ? 'Creating...' : 'Create Community'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
