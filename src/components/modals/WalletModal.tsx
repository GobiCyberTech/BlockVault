import React from 'react';
import { X, Wallet, CreditCard, Shield, CheckCircle2 } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: (label: string) => void;
  currentWalletLabel: string;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnectWallet,
  currentWalletLabel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#414755]/40 rounded-lg max-w-md w-full p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
          <div className="flex items-center gap-2 text-[#48d7f9]">
            <Wallet className="w-5 h-5" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Connect Sovereign Signer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#c1c6d7]">
          Select an authenticated hardware or browser signer for BEL Sovereign EVM transactions.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => {
              onConnectWallet('0x83A7...92F (MetaMask)');
              onClose();
            }}
            className="w-full p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <span className="font-semibold text-xs text-[#d9e3f7] flex items-center gap-2 group-hover:text-[#48d7f9]">
              <Wallet className="w-4 h-4 text-[#48d7f9]" />
              MetaMask / Web3 Provider
            </span>
            <span className="text-[#6de039] text-[10px] font-mono font-bold">
              READY
            </span>
          </button>

          <button
            onClick={() => {
              onConnectWallet('0x83A7...92F (BEL HSM Keycard)');
              onClose();
            }}
            className="w-full p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <span className="font-semibold text-xs text-[#d9e3f7] flex items-center gap-2 group-hover:text-[#48d7f9]">
              <CreditCard className="w-4 h-4 text-[#1677ff]" />
              BEL Defense Hardware Keycard
            </span>
            <span className="text-[#48d7f9] text-[10px] font-mono font-bold">
              INSERTED
            </span>
          </button>

          <button
            onClick={() => {
              onConnectWallet('0x83A7...92F (TPM 2.0 Enclave)');
              onClose();
            }}
            className="w-full p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <span className="font-semibold text-xs text-[#d9e3f7] flex items-center gap-2 group-hover:text-[#48d7f9]">
              <Shield className="w-4 h-4 text-[#6de039]" />
              TPM 2.0 Workstation Enclave
            </span>
            <span className="text-[#6de039] text-[10px] font-mono font-bold">
              ATTESTED
            </span>
          </button>
        </div>

        <div className="pt-2 text-[11px] font-mono text-[#8b90a0] flex justify-between items-center border-t border-[#414755]/20">
          <span>Active: {currentWalletLabel}</span>
          <span className="text-[#6de039] flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
          </span>
        </div>
      </div>
    </div>
  );
};
