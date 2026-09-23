import { X, Image as ImageIcon, Globe, Lock } from 'lucide-react';
import { Button } from './ui/Button';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCommunityModal({ isOpen, onClose }: CreateCommunityModalProps) {
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
        
        <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Community Name</label>
              <input 
                type="text" 
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
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Description</label>
            <textarea 
              rows={4}
              placeholder="Tell everyone what this community is about..."
              className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Avatar Image</label>
              <div className="h-32 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-white/[0.02] transition-all cursor-pointer">
                <ImageIcon className="h-8 w-8 text-text-muted" />
                <span className="text-xs text-text-muted font-bold">Upload Avatar</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Banner Image</label>
              <div className="h-32 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-white/[0.02] transition-all cursor-pointer">
                <ImageIcon className="h-8 w-8 text-text-muted" />
                <span className="text-xs text-text-muted font-bold">Upload Banner</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button className="px-8" onClick={onClose}>Create Community</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
