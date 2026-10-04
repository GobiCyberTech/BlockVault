import React from 'react';
import { X, ShieldCheck, Cpu, Lock, Layers, History, Award } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#414755]/40 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
          <div className="flex items-center gap-2 text-[#48d7f9]">
            <Award className="w-5 h-5" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Smart India Hackathon • PS 26125 Briefing
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#c1c6d7] leading-relaxed">
          <strong className="text-white">BlockVault</strong> is a Defense-grade Blockchain-Based Secure Platform
          for Decentralized Public Key Infrastructure (DPKI), Role-Based Access Control (RBAC), and
          Hardware Digital Asset Management designed for Bharat Electronics Limited (BEL).
        </p>

        <div className="p-3 bg-[#16202f] rounded border border-[#414755]/30 space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Sovereign EVM Chain:</span>
            <span className="text-[#48d7f9] font-bold">Local Hardhat Subnet (Chain ID 31337)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Identity Spec:</span>
            <span className="text-[#d9e3f7]">W3C DID Standard + Sovereign DPKI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Access Control:</span>
            <span className="text-[#d9e3f7]">Defense Tier-4 Smart Contract Matrix</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Hardware Asset Spec:</span>
            <span className="text-[#d9e3f7]">ERC-721 Digital Twin + TPM 2.0 Enclave</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Tamper Engine:</span>
            <span className="text-[#6de039] font-bold">Merkle Proof discrepancy reconciler</span>
          </div>
        </div>

        <p className="text-[11px] text-[#8b90a0] leading-normal font-sans">
          Every hardware movement requires multi-sig cryptographic authorization. The ledger is the
          single, non-repudiable source of truth against physical tag spoofing or database tampering.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 bg-[#1677ff] text-white rounded text-xs font-semibold hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer"
        >
          Close Briefing
        </button>
      </div>
    </div>
  );
};
