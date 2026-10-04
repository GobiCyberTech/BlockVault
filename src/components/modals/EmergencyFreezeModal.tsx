import React, { useState } from 'react';
import { X, Flame, ShieldAlert, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

interface EmergencyFreezeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFreezeExecuted: () => void;
  isFrozen: boolean;
  onUnfreeze: () => void;
}

export const EmergencyFreezeModal: React.FC<EmergencyFreezeModalProps> = ({
  isOpen,
  onClose,
  onFreezeExecuted,
  isFrozen,
  onUnfreeze,
}) => {
  const [confirmPhrase, setConfirmPhrase] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onFreezeExecuted();
      onClose();
    }, 1000);
  };

  const handleUnlock = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUnfreeze();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#ff4d4f]/60 rounded-lg max-w-md w-full p-6 space-y-4 shadow-[0_8px_32px_rgba(255,77,79,0.3)] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
          <div className="flex items-center gap-2 text-[#ff4d4f]">
            <Flame className="w-5 h-5 text-[#ff4d4f]" />
            <h3 className="text-sm font-bold font-headline">
              {isFrozen ? 'Perimeter Freeze Active' : 'Emergency Perimeter Defense Freeze'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isFrozen ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-[#2a1215] border border-[#ff4d4f] rounded text-[#ff4d4f] space-y-1.5 font-mono text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#ff4d4f]" />
                SOVEREIGN LEDGER IN EMERGENCY LOCKDOWN
              </span>
              <p className="text-[11px] text-[#c1c6d7] font-sans">
                All token minting, transfers, and identity delegations are suspended on BEL Defense EVM Node 1.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#16202f] text-[#d9e3f7] rounded text-xs hover:bg-[#212a39] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleUnlock}
                disabled={isProcessing}
                className="bg-[#6de039] text-[#002d6c] px-4 py-2 rounded text-xs font-semibold hover:bg-[#88fd54] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Disengaging Freeze...' : 'Disengage Freeze (Restore Ops)'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-[#d9e3f7] leading-relaxed">
              <strong className="text-[#ff4d4f]">PERIMETER DEFENSE WARNING:</strong> This action executes
              an immediate cryptographically enforced stop on smart contract state transitions across local subnet{' '}
              <span className="font-mono text-[#48d7f9]">127.0.0.1:8545</span>.
            </p>

            <div className="p-3 bg-[#050e1c] rounded border border-[#ff4d4f]/30 font-mono text-xs space-y-1 text-[#c1c6d7]">
              <div>Target: BEL Sovereign Node 1</div>
              <div>Gas Enclosure: Maximum Priority Tx</div>
              <div>Effect: Immediate Escrow & Transfer Lock</div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#8b90a0] block font-mono">
                Type <strong className="text-[#ff4d4f]">FREEZE</strong> to confirm:
              </label>
              <input
                type="text"
                value={confirmPhrase}
                onChange={(e) => setConfirmPhrase(e.target.value.toUpperCase())}
                placeholder="FREEZE"
                className="w-full bg-[#050e1c] border border-[#ff4d4f]/50 rounded px-3 py-1.5 text-xs font-mono text-[#ff4d4f] focus:outline-none uppercase"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#414755]/20">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#16202f] text-[#d9e3f7] rounded text-xs hover:bg-[#212a39] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmPhrase !== 'FREEZE' || isProcessing}
                className="bg-[#93000a] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#ff4d4f] hover:text-black transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(255,77,79,0.3)]"
              >
                {isProcessing ? 'Engaging Lockdown...' : 'Execute Emergency Freeze'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
