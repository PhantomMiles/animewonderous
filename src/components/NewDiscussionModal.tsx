import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDiscussionModal({ isOpen, onClose }: NewDiscussionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display uppercase tracking-wider">Start a New Discussion</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Discussion Title</label>
            <input 
              type="text" 
              placeholder="What's on your mind?"
              className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Category</label>
            <select className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors appearance-none">
              <option>General Discussion</option>
              <option>Anime News</option>
              <option>Gaming</option>
              <option>Merch & Collectibles</option>
              <option>Events & Meetups</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Message Content</label>
            <textarea 
              rows={6}
              placeholder="Tell the community about it..."
              className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
            <Button className="px-8">Post Discussion</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
