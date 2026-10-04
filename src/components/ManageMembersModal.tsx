import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, User, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { changeMemberRole } from '../app/actions';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  members: any[];
};

export function ManageMembersModal({ isOpen, onClose, communityId, members }: Props) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleRoleChange = (userId: string, newRole: 'ADMIN' | 'MODERATOR' | 'MEMBER') => {
    startTransition(async () => {
      await changeMemberRole(communityId, userId, newRole);
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
          className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[80vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
            <h2 className="text-xl font-display uppercase tracking-wider">Manage Members</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 overflow-y-auto space-y-4">
             {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between bg-background border border-border p-4 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <img src={member.user?.image || "https://i.pravatar.cc/150"} className="w-10 h-10 rounded-xl" />
                      <div>
                         <p className="font-bold text-sm">{member.user?.username}</p>
                         <div className="flex items-center gap-1 mt-0.5">
                            {member.role === 'ADMIN' && <ShieldCheck className="h-3 w-3 text-primary" />}
                            {member.role === 'MODERATOR' && <Shield className="h-3 w-3 text-blue-400" />}
                            {member.role === 'MEMBER' && <User className="h-3 w-3 text-text-muted" />}
                            <span className="text-[10px] text-text-secondary">{member.role}</span>
                         </div>
                      </div>
                   </div>

                   {member.role !== 'ADMIN' && (
                     <div className="flex gap-2">
                        <select 
                           disabled={isPending}
                           value={member.role}
                           onChange={(e) => handleRoleChange(member.userId, e.target.value as any)}
                           className="bg-surface border border-border rounded-lg text-xs px-2 py-1.5 outline-none"
                        >
                           <option value="MEMBER">Member</option>
                           <option value="MODERATOR">Moderator</option>
                           <option value="ADMIN">Admin</option>
                        </select>
                     </div>
                   )}
                </div>
             ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
