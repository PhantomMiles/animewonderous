import { X, Plus, Trash2, BarChart2, AlignLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { createForumPost } from '../app/actions';
import { useTransition, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId?: string;
}

export function NewDiscussionModal({ isOpen, onClose, communityId }: NewDiscussionModalProps) {
  const [isPending, startTransition] = useTransition();
  const [postType, setPostType] = useState<'TEXT' | 'POLL'>('TEXT');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        
        <form className="p-6 space-y-6 max-h-[80vh] overflow-y-auto" action={(formData) => {
          startTransition(async () => {
            formData.append('type', postType);
            if (postType === 'POLL') {
              formData.append('pollOptions', JSON.stringify(pollOptions.filter(o => o.trim() !== '')));
            }
            if (selectedImage) {
              formData.append('image', selectedImage);
            }
            await createForumPost(formData);
            setPostType('TEXT');
            setPollOptions(['', '']);
            setSelectedImage(null);
            onClose();
          });
        }}>
          {communityId && <input type="hidden" name="communityId" value={communityId} />}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Discussion Title</label>
            <input 
              type="text" 
              name="title"
              required
              placeholder="What's on your mind?"
              className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Category</label>
            <select name="category" className="w-full h-14 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors appearance-none">
              <option value="General Discussion">General Discussion</option>
              <option value="Anime News">Anime News</option>
              <option value="Gaming">Gaming</option>
              <option value="Merch & Collectibles">Merch & Collectibles</option>
              <option value="Events & Meetups">Events & Meetups</option>
            </select>
          </div>
          
          <div className="flex bg-background border border-border rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setPostType('TEXT')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${postType === 'TEXT' ? 'bg-surface text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground hover:bg-surface/50'}`}
            >
              <AlignLeft className="h-4 w-4" /> Text Post
            </button>
            <button
              type="button"
              onClick={() => setPostType('POLL')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${postType === 'POLL' ? 'bg-surface text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground hover:bg-surface/50'}`}
            >
              <BarChart2 className="h-4 w-4" /> Poll
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">{postType === 'POLL' ? 'Poll Question / Description' : 'Message Content'}</label>
            <textarea 
              name="body"
              required
              rows={postType === 'POLL' ? 3 : 6}
              placeholder={postType === 'POLL' ? 'Add context for your poll...' : 'Tell the community about it...'}
              className="w-full bg-background border border-border rounded-xl p-4 outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Add Image (Optional)</label>
            {selectedImage ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                <img src={selectedImage} alt="Post preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <CldUploadWidget 
                uploadPreset="animewonderous_preset"
                onSuccess={(result: any) => setSelectedImage(result.info.secure_url)}
              >
                {({ open }) => (
                  <button 
                    type="button" 
                    onClick={() => open()}
                    className="w-full h-14 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <ImageIcon className="h-5 w-5" />
                    <span>Upload Image</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>

          {postType === 'POLL' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Poll Options</label>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required={index < 2}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...pollOptions];
                      newOptions[index] = e.target.value;
                      setPollOptions(newOptions);
                    }}
                    className="flex-1 h-12 bg-background border border-border rounded-xl px-4 outline-none focus:border-primary/50 transition-colors"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== index))}
                      className="p-3 text-text-muted hover:text-red-400 hover:bg-background rounded-xl transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              {pollOptions.length < 5 && (
                <button
                  type="button"
                  onClick={() => setPollOptions([...pollOptions, ''])}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium px-2 py-1"
                >
                  <Plus className="h-4 w-4" /> Add Option
                </button>
              )}
            </div>
          )}
          
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
            <Button className="px-8" disabled={isPending || (postType === 'POLL' && pollOptions.filter(o => o.trim() !== '').length < 2)}>{isPending ? 'Posting...' : 'Post Discussion'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
