import { useState, useTransition, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { editForumPost } from '../app/actions';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: { id: string; title: string; body: string; category: string };
};

export function EditPostModal({ isOpen, onClose, post }: Props) {
  const [isPending, startTransition] = useTransition();
  const [body, setBody] = useState(post?.body || '');

  useEffect(() => {
    if (isOpen) {
      setBody(post?.body || '');
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append('postId', post.id);
      formData.append('body', body);
      await editForumPost(formData);
      onClose();
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-display uppercase tracking-wider">Edit Discussion</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
               <div>
                  <label className="text-sm font-bold text-text-secondary mb-2 block">Title</label>
                  <input 
                    type="text" 
                    value={post.title} 
                    disabled
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none opacity-50"
                  />
               </div>
               
               <div>
                  <label className="text-sm font-bold text-text-secondary mb-2 block">Discussion Details</label>
                  <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors min-h-[200px] resize-y"
                  />
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
