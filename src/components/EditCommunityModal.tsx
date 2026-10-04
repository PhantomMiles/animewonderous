'use client';

import { X, ImageIcon, CheckCircle2, Trash2, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { updateCommunity } from '../app/actions';
import { useTransition, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

interface EditCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    tags: string[];
    rules: string[];
  };
}

export function EditCommunityModal({ isOpen, onClose, community }: EditCommunityModalProps) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [rules, setRules] = useState<string[]>(community.rules?.length ? community.rules : ['Be respectful to all members']);
  const router = useRouter();

  if (!isOpen) return null;

  function addRule() {
    setRules(prev => [...prev, '']);
  }

  function updateRule(index: number, value: string) {
    setRules(prev => prev.map((r, i) => (i === index ? value : r)));
  }

  function removeRule(index: number) {
    setRules(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto min-h-[100dvh]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display uppercase tracking-wider">Edit Community</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-elevated rounded-full transition-colors text-text-secondary hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form className="p-6 space-y-6 max-h-[80vh] overflow-y-auto" action={(formData) => {
          if (avatarUrl) formData.append('avatarUrl', avatarUrl);
          if (bannerUrl) formData.append('bannerUrl', bannerUrl);
          formData.append('communityId', community.id);
          formData.append('rules', JSON.stringify(rules.filter(r => r.trim())));
          startTransition(async () => {
            await updateCommunity(formData);
            router.refresh();
            onClose();
          });
        }}>
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Community Name</label>
            <input
              name="name"
              defaultValue={community.name}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              defaultValue={community.description}
              rows={3}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Tags (comma-separated)</label>
            <input
              name="tags"
              defaultValue={community.tags.join(', ')}
              placeholder="Anime, Action, Shonen"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Community Rules</label>
            {rules.map((rule, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-primary font-bold text-sm w-5 shrink-0">{i + 1}.</span>
                <input
                  value={rule}
                  onChange={e => updateRule(i, e.target.value)}
                  placeholder={`Rule ${i + 1}`}
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeRule(i)}
                  className="text-text-muted hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRule}
              className="flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" /> Add Rule
            </button>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
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
                      <span className="text-xs text-text-muted font-bold">Upload New Avatar</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Banner Image</label>
              {bannerUrl ? (
                <div className="relative h-32 rounded-2xl overflow-hidden border border-border group">
                  <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => setBannerUrl(null)} className="text-white text-xs underline">Remove</button>
                  </div>
                  <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-400" />
                </div>
              ) : (
                <CldUploadWidget uploadPreset="animewonderous_preset" onSuccess={(r: any) => setBannerUrl(r.info.secure_url)}>
                  {({ open }) => (
                    <button type="button" onClick={() => open()} className="w-full h-32 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-white/[0.02] transition-all cursor-pointer">
                      <ImageIcon className="h-8 w-8 text-text-muted" />
                      <span className="text-xs text-text-muted font-bold">Upload New Banner</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
            <Button className="px-8" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
